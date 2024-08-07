import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyCzIUdpneVdbuUawDL2vhp8m5WBc7Rs2no",
  authDomain: "coin-6cf93.firebaseapp.com",
  projectId: "coin-6cf93",
  storageBucket: "coin-6cf93.appspot.com",
  messagingSenderId: "327499034909",
  appId: "1:327499034909:web:47c7d6d0a27fd95f1df1f4",
  measurementId: "G-GDWV1FELJE"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase Authentication 초기화
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };