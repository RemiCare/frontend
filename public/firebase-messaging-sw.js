importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB988uKta8NW8qFKU5Bi4korIiukCKethA",
  authDomain: "kgu-life-watch.firebaseapp.com",
  projectId: "kgu-life-watch",
  storageBucket: "kgu-life-watch.appspot.com",
  messagingSenderId: "889480333790",
  appId: "1:889480333790:web:78cfe6b6f8b5840f68754f",
  measurementId: "G-TSMGPLM6XT"
});

const messaging = firebase.messaging();

// ✅ 마지막 알림 캐시 (단순 중복 방지)
let lastNotificationKey = null;

messaging.onBackgroundMessage((payload) => {
  console.log('[SW] 백그라운드 메시지 수신:', payload);

  const title = payload?.notification?.title || payload?.data?.title || '';
  const body = payload?.notification?.body || payload?.data?.body || '';
  const key = `${title}-${body}`;

  // ✅ 중복 알림이면 무시
  if (key === lastNotificationKey) {
    console.log('[SW] 🚫 중복 알림 무시됨:', key);
    return;
  }

  lastNotificationKey = key;

  // ✅ 백그라운드일 때만 알림 표시
  self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
    const isForeground = clients.some(client =>
      client.focused || client.visibilityState === 'visible'
    );

    if (isForeground) {
      console.log('[SW] 포그라운드에서 이미 처리되므로 무시함');
      return;
    }

    const options = {
      body,
      icon: '/logo.png',
    };

    self.registration.showNotification(title, options);
  });
});
