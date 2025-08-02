import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useNavigate } from "react-router-dom";
import styles from "./AuthModal.module.css";

export default function AuthModal({ open, onOpenChange }) {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const handleSuccess = (previousResults) => {
    onOpenChange(false); // close dialog
    if (previousResults) {
      navigate("/results", { state: { quizData: previousResults } });
    } else {
      navigate("/assessment");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className={styles.modalOverlay} />

      <Dialog.Content
        className={styles.modalContent}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <Dialog.Title id="dialog-title" style={{ display: "none" }}>
          {mode === "login" ? "Log In" : "Sign Up"}
        </Dialog.Title>

        <Dialog.Close asChild>
          <button className={styles.closeButton} aria-label="Close modal">
            x
          </button>
        </Dialog.Close>

        <div className={styles.toggleHeader}>
          <button
            className={mode === "login" ? styles.active : ""}
            onClick={() => setMode("login")}
            type="button"
          >
            Log In
          </button>
          <button
            className={mode === "signup" ? styles.active : ""}
            onClick={() => setMode("signup")}
            type="button"
          >
            Sign Up
          </button>
        </div>

        {mode === "login" ? (
          <LoginForm onSuccess={handleSuccess} />
        ) : (
          <SignupForm onSuccess={handleSuccess} />
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
