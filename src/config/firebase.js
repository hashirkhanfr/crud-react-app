import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import  { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDKdAc7znAxcoCl1GmZhjiqLa6ZnfrpXA",
  authDomain: "fir-app-4c5f3.firebaseapp.com",
  projectId: "fir-app-4c5f3",
  storageBucket: "fir-app-4c5f3.firebasestorage.app",
  messagingSenderId: "890615883182",
  appId: "1:890615883182:web:71a5f11ad9845e0345143f",
  measurementId: "G-514RQQL995"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
