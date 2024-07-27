import { Logger } from "./utils/Logger.js";
import { GoogleHelper } from "./GoogleHelper.js";

const SCOPES = ["https://www.googleapis.com/auth/cloud-platform"];
const SERVICE_ACCOUNT_JSON_FILE_PATH = "./config/service-account-file.json";

export class FirebaseHelper {
  static async sendPushNotification(notificationPayload) {
    try {
      Logger.warn("reading service account json...");
      const serviceAccountData = await GoogleHelper.getServiceAccountJson(
        SERVICE_ACCOUNT_JSON_FILE_PATH
      );
      if (!serviceAccountData) {
        Logger.error("service account data missing...");
        return;
      }

      Logger.warn("retrieving firebase api accessToken...");
      const accessToken = await GoogleHelper.getFirebaseAccessToken(
        serviceAccountData,
        SCOPES
      );
      if (!accessToken) {
        Logger.error("firebase api accessToken missing...");
        return;
      }

      Logger.success("firebase api accessToken successfuly retrieved!");

      Logger.warn("send notification request to firebase...");
      const response = await fetch(
        `https://fcm.googleapis.com/v1/projects/${serviceAccountData.project_id}/messages:send`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(notificationPayload),
        }
      );
      if (!response.ok) {
        Logger.error(
          "fcm push request was not successful: ",
          response.status,
          response.statusText
        );
        return;
      }

      const data = await response.json();
      Logger.success("fcm push successfully send!", data, response.status);
    } catch (error) {
      Logger.error("sendPushNotification failed: ", error);
    }
  }
}
