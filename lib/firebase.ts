import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDS2_7L05X_xB2BmIZ55VyMsdhB-lSV2dA",
  authDomain: "nexora-be1ad.firebaseapp.com",
  projectId: "nexora-be1ad",
  storageBucket: "nexora-be1ad.firebasestorage.app",
  messagingSenderId: "809518054836",
  appId: "1:809518054836:web:56eb86891965fcbe8d46e1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;