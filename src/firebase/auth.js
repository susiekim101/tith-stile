import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth, provider } from "./config";

export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed up:", user);
    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const signupWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    console.log("User signed up:", user);
    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User logged in:", user);
    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    console.log("User logged in:", user);
    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const authInstance = auth;
