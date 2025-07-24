import styles from "../css/Login.module.css";
import { login } from "../firebase/auth.js";
import { useState } from "react";
/*import { Link, useNavigate } from "react-router-dom";*/
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Login() {
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
      setErrors((prev) => ({
        ...prev,
        submit: "Login failed. Please check your credentials.",
      }));
    }
  };

  {
    /*
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

  */
  }

  return (
    <form onSubmit={handleLogin} noValidate>
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
      <button type="submit" className={styles.button}>
        Log In
      </button>
      {errors.submit && <p className={styles.errorText}>{errors.submit}</p>}
    </form>
  );
}
