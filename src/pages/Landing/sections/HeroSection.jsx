import GetStartedButton from "../components/GetStartedButton";
import styles from "./HeroSection.module.css";
import AuthModal from "../AuthModal/AuthModal";
import lampGraphic from "../../../assets/graphics/bannersLAMP4.png";
import chairGraphic from "../../../assets/graphics/chairicon11.png";
import { useState } from "react";

const HeroSection = () => {
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <>
      <section className={styles.hero}>
        <img
          className={styles.lampGraphic}
          src={lampGraphic}
          alt="Lamp graphic"
        ></img>
        <img
          className={styles.chairGraphic}
          src={chairGraphic}
          alt="Chair graphic"
        ></img>
        <h1 className={styles.title}>
          Welcome to <br />
          <span className={styles.logo}>Stile Profile</span>
        </h1>
        <p className={styles.description}>
          We’re truly so glad you’re here. Let’s collaborate to create a home
          that feels safe, reflects who you are, and supports you holistically
          in your next chapter.
        </p>

        <GetStartedButton
          textColor="text-light"
          bgColor="bgMaroon"
          onClick={() => setAuthOpen(true)}
        />

        <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
        <svg
          className={styles.wave}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#f9f1e2"
            fillOpacity="1"
            d="M0,128L30,149.3C60,171,120,213,180,213.3C240,213,300,171,360,138.7C420,107,480,85,540,101.3C600,117,660,171,720,186.7C780,203,840,181,900,186.7C960,192,1020,224,1080,245.3C1140,267,1200,277,1260,261.3C1320,245,1380,203,1410,181.3L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </section>
    </>
  );
};

export default HeroSection;
