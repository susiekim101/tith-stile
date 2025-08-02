import GetStartedButton from "../components/GetStartedButton";
import styles from "./HeroSection.module.css";
import AuthModal from "../AuthModal/AuthModal";
import { useState } from "react";

const HeroSection = () => {
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.h1}>Welcome to</h1>
        {/* Replace with logo */}
        <h1 className={styles.heroLogo}>Tori in the House</h1>
        <p className={styles.p}>
          We’re truly so glad you’re here. Thanks for entrusting us with this
          aspect of your journey of furnishing your new home. The way we move &
          groove at Tori in the House keeps dignity, healing, collaboration, &
          joy at the foundation of our blueprint & what we do.
        </p>
        <p className={styles.p}>
          Via Tori in the House, we’re dedicated to the cause of collaborating
          with you to co-create a home that feels safe, reflective of who you
          are, & supportive of you holistically in this next chapter
        </p>
        <GetStartedButton
          textColor="text-dark"
          bgColor="bgMuave"
          onClick={() => setAuthOpen(true)}
        />

        <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      </section>
    </>
  );
};

export default HeroSection;
