import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useNavigate } from "react-router-dom";
import styles from "./AuthModal.module.css";
import { Link } from "react-router-dom";
import { CircleX, ArrowRight } from "lucide-react";
import { signinAnon } from "../../../firebase/auth";

export default function AuthModal({ open, onOpenChange }) {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();
  const title = mode == "login" ? "Log In" : "Sign Up";
  const alternative = mode == "login" ? "Don't have an account?" : "Already have an account?"
  const altLink = mode == "login" ? "Sign Up" : "Log In"

  const handleSuccess = (previousResults) => {
    onOpenChange(false); // close dialog
    if (previousResults) {
      navigate("/results", { state: { quizData: previousResults } });
    } else {
      navigate("/assessment");
    }
  };

  const handleProceed = async () => {
    await signinAnon();
    navigate("/assessment");
  }

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
          <CircleX className={styles.closeButton}/>
        </Dialog.Close>

        <div className={styles.title}>
          {title}
        </div>

        {mode === "login" ? (
          <LoginForm onSuccess={handleSuccess} />
        ) : (
          <SignupForm onSuccess={handleSuccess} />
        )}
        
        {mode == "login" ? (
          <div className={styles.footer}>
            <div>
              <span className={styles.caption}>Don't have an account? </span>
              <button className={styles.alternative}
                      onClick={() => setMode("signup")}
                      type="button">Sign Up</button>
            </div>

            <Link to="/assessment" onClick={handleProceed} className={styles.proceed}>
              Or proceed without signing in
              <ArrowRight className={styles.proceedButton}/>
            </Link>
          </div>
        ) : (
          <div className={styles.footer}>
            <div>
              <span className={styles.caption}>Already have an account? </span>
              <button className={styles.alternative}
                      onClick={() => setMode("login")}
                      type="button">Log In</button>
            </div>
          </div>
        )}

      </Dialog.Content>
    </Dialog.Root>
  );
}
