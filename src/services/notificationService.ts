import { getToken } from "firebase/messaging";
import { initMessaging } from "../config/firebase";
import { postApi, fetchApi } from "../utils/api";

export const requestNotificationPermission = async () => {
  try {
    if (!('Notification' in window)) {
      console.warn("This browser does not support desktop notification");
      return false;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      await registerDeviceForFCM();
      return true;
    } else {
      console.warn('Notification permission denied or dismissed.');
      return false;
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return false;
  }
};

const registerDeviceForFCM = async () => {
  try {
    const messaging = await initMessaging();
    if (!messaging) return;

    // Use the public VAPID key provided via environment variables
    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
    
    if (!vapidKey) {
      console.warn("VITE_FIREBASE_VAPID_KEY is missing. Cannot generate FCM token.");
      return;
    }

    const currentToken = await getToken(messaging, { vapidKey });
    
    if (currentToken) {
      console.log("Got FCM token:", currentToken);
      // Send the token to the backend
      await sendTokenToBackend(currentToken);
    } else {
      console.warn('No registration token available. Request permission to generate one.');
    }
  } catch (err) {
    console.error('An error occurred while retrieving token. ', err);
  }
};

const sendTokenToBackend = async (token: string) => {
  try {
    // Determine platform (could be more advanced, but simple 'web' string is fine for PWA/React web)
    const platform = 'web';
    
    const response = await postApi<any>('/notifications/register-device', {
      token,
      platform
    });
    
    console.log("Token securely stored in backend.", response.data);
  } catch (error) {
    console.error("Failed to send token to backend:", error);
  }
};

export const unregisterDevice = async () => {
  try {
    const messaging = await initMessaging();
    if (!messaging) return;
    
    // Attempt to retrieve current token to unregister it
    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
    const currentToken = await getToken(messaging, { vapidKey });
    
    if (currentToken) {
      await fetchApi('/notifications/unregister-device', {
        method: 'DELETE',
        body: JSON.stringify({ token: currentToken })
      });
      console.log("Device unregistered successfully");
    }
  } catch (error) {
    console.error("Failed to unregister device:", error);
  }
};
