import styles from "../css/Login.module.css";
import { login, loginWithGoogle } from "../firebase/auth.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export default function Login() {
  const checkForPrevResults = async (user) => {
    const docRef = doc(db, "form", user.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setSubmitError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }

    if (!valid) return;

    try {
      const loggedInUser = await login(email, password);
      console.log("User logged in:", loggedInUser);
      setError("");
      const previous = await checkForPrevResults(loggedInUser);
      if (previous) {
        navigate("/results", { state: { quizData: previous } });
        return;
      }
      navigate("/quiz");
      // Redirect or perform any other action after successful login
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Error logging in:", error);
    }
  };

  console.log("Login component rendered");
  return (
    <div className={styles.container}>
      <div>
        <p>Log In</p>
      </div>
      <form onSubmit={handleLogin} noValidate>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          required
        />
        {emailError && <p className={styles.errorText}>{emailError}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
          required
        />
        {passwordError && <p className={styles.errorText}>{passwordError}</p>}
        <button type="submit" className={styles.button}>
          Log In
        </button>
      </form>

      {error && <p className={styles.errorText}>{error}</p>}
      <Link to="/signup" className={styles.link}>
        Don't have an account? Sign up
      </Link>
    </div>
  );
}
