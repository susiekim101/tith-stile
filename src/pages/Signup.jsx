import styles from "../css/Login.module.css";
import { signup, signupWithGoogle } from "../firebase/auth.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleSignup = async (e) => {
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
      const user = await signup(email, password);
      console.log("User signed up:", user);
      setError("");
      navigate("/quiz");
    } catch (error) {
      setError("Sign up failed. Please check your credentials.");
      console.error("Error signing up in:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <p>Sign Up</p>
      </div>
      <form onSubmit={handleSignup} noValidate>
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
          Sign Up
        </button>
      </form>

      {error && <p className={styles.errorText}>{error}</p>}
      <Link to="/login" className={styles.link}>
        Already have an account? Log in
      </Link>
    </div>
  );
}
