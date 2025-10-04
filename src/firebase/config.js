// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAszIgswvPZpXRVPrbIPpFQkwBRwZQXsKw",
  authDomain: "stile-profile-a44c6.firebaseapp.com",
  projectId: "stile-profile-a44c6",
  storageBucket: "stile-profile-a44c6.firebasestorage.app",
  messagingSenderId: "351489981052",
  appId: "1:351489981052:web:d3a2ff680821082bdc27f9",
  measurementId: "G-TB9Q21G4CP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export { auth, db, provider, storage };
