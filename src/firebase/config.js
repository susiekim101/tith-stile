// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCpMnPJC_ZmA3gVZBaEMvRcgDVX_fLZWmc",
  authDomain: "hack2impact-69417.firebaseapp.com",
  projectId: "hack2impact-69417",
  storageBucket: "hack2impact-69417.firebasestorage.app",
  appId: "1:54015197809:web:995c75057abbf0eeded1d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export { auth, db, provider, storage };
