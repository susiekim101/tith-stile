import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "./config";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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

export async function logout(navigate) {
  const auth = getAuth();
  try {
    await signOut(auth);
    navigate("/landing");
  } catch (error) {
    console.error("Error logging out: ", error);
    throw error;
  }
}

export const authInstance = auth;
