import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB988uKta8NW8qFKU5Bi4korIiukCKethA",
  authDomain: "kgu-life-watch.firebaseapp.com",
  projectId: "kgu-life-watch",
  storageBucket: "kgu-life-watch.firebasestorage.app",
  messagingSenderId: "889480333790",
  appId: "1:889480333790:web:78cfe6b6f8b5840f68754f",
  measurementId: "G-TSMGPL225H"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);