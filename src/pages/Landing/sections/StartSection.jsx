import styles from "./StartSection.module.css";
import GetStartedButton from "../components/GetStartedButton";
import AuthModal from "../AuthModal/AuthModal";
import { useState } from "react";

const StartSection = () => {
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <section className={styles.start}>
      <div className={styles.transform}>
        <h2 className={styles.title}>Ready to Transform Your Space?</h2>
        <p>
          At Tori in the House, we do our best to practice ethical storytelling
          and honor your dignity. We will never use your real name or
          identifying details without permission.
        </p>
        <GetStartedButton
          textColor="text-dark"
          bgColor="bgYellow"
          onClick={() => setAuthOpen(true)}
        />

        <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      </div>
    </section>
  );
};

export default StartSection;
