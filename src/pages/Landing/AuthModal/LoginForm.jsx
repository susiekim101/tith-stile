import styles from "./AuthModal.module.css";
import { login } from "../../../firebase/auth.js";
import { useState } from "react";
/*import { Link, useNavigate } from "react-router-dom";*/
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config.js";

export default function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", submit: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", submit: " " }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const checkForPrevResults = async (user) => {
    const docRef = doc(db, "form", user.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    try {
      const user = await login(form.email, form.password);
      const previous = await checkForPrevResults(user);
      onSuccess(previous);
    } catch (err) {
      console.error("Login error:", err);
      setErrors((prev) => ({
        ...prev,
        submit: "Login failed. Please check your credentials.",
      }));
    }
  };

  return (
    <form onSubmit={handleLogin} noValidate className={styles.form}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      {errors.email && <p className={styles.errorText}>{errors.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      {errors.password && <p className={styles.errorText}>{errors.password}</p>}
      <button type="submit" className={styles.submitButton}>
        Log In and Start Assessment
      </button>
      {errors.submit && <p className={styles.errorText}>{errors.submit}</p>}
    </form>
  );
}
