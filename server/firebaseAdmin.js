import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.server") });
dotenv.config(); // fallback to default .env

let isInitialized = false;
let db = null;

try {
  if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
    const defaultLocalPath = path.resolve(process.cwd(), "serviceAccountKey.json");
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || (fs.existsSync(defaultLocalPath) ? defaultLocalPath : null);

    if (serviceAccountJson) {
      try {
        const parsed = JSON.parse(serviceAccountJson);
        admin.initializeApp({
          credential: admin.credential.cert(parsed),
        });
        isInitialized = true;
      } catch (e) {
        console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT JSON:", e.message);
      }
    } else if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      isInitialized = true;
    } else if (projectId && clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      isInitialized = true;
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      admin.initializeApp();
      isInitialized = true;
    } else {
      console.warn("⚠️ [Firebase Admin] No service account credentials found in .env.server. Using fallback mode.");
    }
  }

  if (isInitialized || admin.apps.length > 0) {
    db = admin.firestore();
  }
} catch (err) {
  console.error("❌ [Firebase Admin] Initialization error:", err.message);
}

export { admin, db, isInitialized };
