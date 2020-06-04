require("dotenv").config();
const app = require("express")();
const bodyParser = require("body-parser");
const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
  applicationId: process.env.NEXMO_APPLICATION_ID,
  privateKey: process.env.NEXMO_APPLICATION_PRIVATE_KEY_PATH,
});

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/webhooks/inbound", (req, res) => {
  console.log("inbound:", req.body);
  res.sendStatus(200);
});

app.post("/webhooks/status", (req, res) => {
  console.log("status:", req.body);
  res.sendStatus(200);
});

app.post("/webhooks/send", (req, res) => {
  const body = req.body;
  console.log("sending message:", body);
  nexmo.dispatch.create(
    "failover",
    [
      {
        from: { type: "sms", number: process.env.FROM_NUMBER },
        to: { type: "sms", number: process.env.TO_NUMBER },
        message: {
          content: {
            type: "text",
            text: body.message
          }
        },
        failover: {
          expiry_time: 180,
          condition_status: "read"
        }
      },
      {
        from: { type: "messenger", id: process.env.FB_SENDER_ID },
        to: { type: "messenger", id: process.env.FB_RECIPIENT_ID },
        message: {
          content: {
            type: "image",
            image: {
              url: "https://sd.keepcalms.com/i/keep-calm-your-order-is-here.png"
            }
          }
        }
      }
    ],
    (err, data) => {
      if (err) {
        console.error('There was an error', err);
      } else {
        console.log(data.dispatch_uuid);
      }
    }
  );

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`The server is running on the port ${port}`);
});
