// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCpPG3pmt_LU2592A5xxzKtPwxEnAK1Q4A",
  authDomain: "bodima-1a391.firebaseapp.com",
  projectId: "bodima-1a391",
  storageBucket: "bodima-1a391.appspot.com",
  messagingSenderId: "570100716609",
  appId: "1:570100716609:web:80472427e0d1e442c762c0",
  measurementId: "G-PSWK7M7HP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);