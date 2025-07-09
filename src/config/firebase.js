import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3AaqtfxinnRjk7FfmBThxjAQv2m3YJbI",
  authDomain: "internship-2025-465209.firebaseapp.com",
  projectId: "internship-2025-465209",
  storageBucket: "internship-2025-465209.firebasestorage.app",
  messagingSenderId: "311351364799",
  appId: "1:311351364799:web:c5284ce516b255ef018a0a"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);
