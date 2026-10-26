// Scripts for firebase and firebase messaging
// We use the compat versions here because service workers operate differently
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// To dynamically pick up config if possible, but in standard practice it's injected 
// or hardcoded in the SW. For security, we only expose the public parts.
const firebaseConfig = {
  // We can rely on URL search params or just inject during build.
  // We'll leave placeholders here that Vite or a build script could inject,
  // but to keep it simple without ejecting Vite, we can just use the query string approach
  // or define it directly if it's purely public variables.
};

// Because this file is static and not built by Vite in the same way, we must configure it.
// Note: To avoid hardcoding credentials in a public SW, many modern setups either use Vite PWA
// or fetch the config from an endpoint. Here we'll rely on the standard `firebase.initializeApp`
// after injecting config.

// Wait for a message from the client to provide the config
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FIREBASE_CONFIG') {
    if (!firebase.apps.length) {
      firebase.initializeApp(event.data.config);
      const messaging = firebase.messaging();

      messaging.onBackgroundMessage((payload) => {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);

        const notificationTitle = payload.notification?.title || payload.data?.title || 'GridWise';
        const notificationOptions = {
          body: payload.notification?.body || payload.data?.body || '',
          icon: '/vite.svg',
          data: payload.data
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
      });
    }
  }
});

self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification click received.');
  
  event.notification.close();
  
  const route = event.notification.data?.route || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          client.focus();
          // We can use postMessage to navigate if we want
          client.postMessage({ type: 'NAVIGATE', route });
          return;
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(route);
      }
    })
  );
});
