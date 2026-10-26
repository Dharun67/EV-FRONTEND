import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, isSupported, Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase App as a singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const initMessaging = async (): Promise<Messaging | null> => {
  try {
    const supported = await isSupported();
    if (supported) {
      return getMessaging(app);
    }
    console.warn("Firebase Messaging is not supported in this browser.");
    return null;
  } catch (err) {
    console.error("Failed to initialize Firebase Messaging:", err);
    return null;
  }
};

export const auth = getAuth(app);

export { app };
