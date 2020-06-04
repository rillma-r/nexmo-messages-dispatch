### This is an implementation of Certification Project using Messages & Dispatch API. ###

This repo contains the code for https://vonage-workshop.nexmodev.com/messages/certification/ on using the Messages & Dispatch API.

### Prerequisites ###

* Create a Vonage Application with Messages enabled
* Link a Facebook Account with the application 

### GitHub Repository ###
You can download your own version from:
https://github.com/rillma-r/nexmo-messages-dispatch.git

### How download and run the project ###
You can use below commands:
$$\...> git clone https://github.com/rillma-r/nexmo-messages-dispatch.git 
$$\...> cd nexmo- messages-dispatch
$$\...\nexmo- messages-dispatch > npm install

### Initial Configuration ###
Edit the '.env' with your data from https:\\dashboard.nexmo.com
* `NEXMO_API_KEY`: Your nexmo API key
* `NEXMO_API_SECRET`: Your nexmo API secret
* `NEXMO_APPLICATION_ID`: The ID of the application
* `NEXMO_APPLICATION_PRIVATE_KEY_PATH`: The location of the private key for the application
* `FB_SENDER_ID`: The id of the facebook account linked to the application
* `FB_RECIPIENT_ID`: The id of the facebook account you want to send messages to
* `FROM_NUMBER`: A nexmo LVN
* `TO_NUMBER`: A second phone number

### Start the application ###
In order to star the application, run below command:

$$\...\nexmo-sms-verification> npm start

Start the ngrok to make the webhooks available publicly by running:
 $$\...\nexmo-sms-verification> ngrok http 3000

Update the application webhooks with the url provided by ngrok.

In order to trigger the message, send a POST request to `webhooks/send` as follows

```
curl -X POST -H "Content-Type: application/json" \
 -d '{"message":"Your package is ready"}' \
 http://127.0.0.1:3000/webhooks/send
```

Wait 180 seconds or more until the Facebook message will be arrived.
