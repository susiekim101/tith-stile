import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useNavigate } from "react-router-dom";
import styles from "./AuthModal.module.css";

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const handleSuccess = (previousResults) => {
    onClose();
    if (previousResults) {
      navigate("/results", { state: { quizData: previousResults } });
    } else {
      navigate("/assessment");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          x
        </button>

        <div className={styles.toggleHeader}>
          <button
            className={mode === "login" ? styles.active : ""}
            onClick={() => setMode("login")}
          >
            Log In
          </button>
          <button
            className={mode === "signup" ? styles.active : ""}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {mode === "login" ? (
          <LoginForm onSuccess={handleSuccess} />
        ) : (
          <SignupForm onSuccess={handleSuccess} />
        )}
      </div>
    </div>
  );
}
