// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export { auth, db, provider };
