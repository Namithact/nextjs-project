// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhmFVETQNl7vorVgcGFTl2QoqCAvaxPpY",
  authDomain: "authvault-1.firebaseapp.com",
  projectId: "authvault-1",
  storageBucket: "authvault-1.appspot.com",
  messagingSenderId: "1085853210383",
  appId: "1:1085853210383:web:fee2321f7d22b635bb907a",
  measurementId: "G-STQQYS4CKK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
