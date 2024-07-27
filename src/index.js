import { FirebaseHelper } from "./FirebaseHelper.js";

const FCM_DEVICE_TOKEN_LENGTH = 163;

if (!process?.env?.FCM_TOKEN) {
  throw new Error("Environment Variable FCM_TOKEN is missing!");
}

if (process?.env?.FCM_TOKEN.length !== FCM_DEVICE_TOKEN_LENGTH) {
  throw new Error(
    `Environment Variable FCM_TOKEN seems to be invalid it needs to have length of ${FCM_DEVICE_TOKEN_LENGTH}!`
  );
}

//See https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages to find out what you can send inside the payload here
const NOTIFICATION_PAYLOAD = {
  message: {
    token: process.env.FCM_TOKEN,
    notification: {
      title: "Order Update",
      body: "Your Order will be delivered soon!",
    },
    data: {
      orderId: "a6bd96b6-7fa4-4643-b1b9-abe31e1ab3db",
    },
    apns: {
      headers: {
        "apns-priority": "10",
      },
      payload: {
        aps: {
          sound: "default",
          alert: {
            //subtitle: "IMPORTANT",
          },
        },
      },
    },
    android: {
      priority: "high",
      notification: {
        default_sound: true,
      },
    },
    fcm_options: {
      //analytics_label: "i-hate-tracking",
    },
  },
};

FirebaseHelper.sendPushNotification(NOTIFICATION_PAYLOAD);
