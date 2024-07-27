import { JWT } from "google-auth-library";
import fs from "node:fs";
import { Logger } from "./utils/Logger.js";

export class GoogleHelper {
  static getFirebaseAccessToken(
    serviceAccountData,
    scopes = ["https://www.googleapis.com/auth/cloud-platform"]
  ) {
    return new Promise((resolve, reject) => {
      const jwtClient = new JWT(
        serviceAccountData.client_email,
        null,
        serviceAccountData.private_key,
        scopes,
        null
      );
      jwtClient.authorize(function (err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        resolve(tokens.access_token);
      });
    });
  }

  static async getServiceAccountJson(filePath) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      Logger.error(
        "Error reading the google/firebase service-account-file.json file, file not found. If you don't have a service account json inside the config directory consider reading https://cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys"
      );
    }
  }
}
