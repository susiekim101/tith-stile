import styles from "./AuthModal.module.css";
import { signup } from "../../../firebase/auth.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignupForm({ onSuccess }) {
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
      newErrors.email("Please enter a valid email address.");
    }

    if (form.password.length < 6) {
      newErrors.password("Password must be at least 6 characters.");
    }

    return newErrors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    try {
      const user = await signup(form.email, form.password);
      onSuccess();
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        submit: "Sign up failed. Please check your credentials.",
      }));
    }
  };

  return (
    <form onSubmit={handleSignup} noValidate className={styles.form}>
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
        Sign Up
      </button>
      {errors.submit && <p className={styles.errorText}>{errors.submit}</p>}
    </form>
  );
}
