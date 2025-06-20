import logo from "../assets/torilogo.png";
import styles from "../css/Home.module.css";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import pinkclover from "../assets/pinkclover.png";
import yellowclover from "../assets/yellowclover.png";
import tealclover from "../assets/tealclover.png";
import maroonclover from "../assets/maroonclover.png";

function Home() {
  const clovers = [pinkclover, yellowclover, tealclover, maroonclover];

  const navigate = useNavigate();

  const scatteredImageData = [
    { src: tealclover, top: 23, left: 5, size: 80 },
    { src: yellowclover, top: 23, left: 29, size: 80 },
    { src: maroonclover, top: 53, left: 16, size: 80 },
    { src: yellowclover, top: 82, left: 3, size: 80 },
    { src: tealclover, top: 83, left: 28, size: 80 },

    { src: maroonclover, top: 27, left: 62, size: 80 },
    { src: yellowclover, top: 23, left: 89, size: 80 },
    { src: tealclover, top: 47, left: 72, size: 80 },
    { src: yellowclover, top: 79, left: 63, size: 80 },
    { src: maroonclover, top: 75, left: 82, size: 80 },
  ];

  console.log(scatteredImageData);

  return (
    <div className={styles.parentContainer}>
      <div className={styles.backgroundWrapper}>
        {scatteredImageData.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={`bg-${i}`}
            className={`${styles.scatteredImage} ${styles.spinningImage}`}
            style={{
              top: `${img.top}%`,
              left: `${img.left}%`,
              width: `${img.size}px`,
              height: `${img.size}px`,
            }}
          />
        ))}
      </div>

      <h1 className={styles.titleContainer}>Stile</h1>
      <h1 className={styles.subTitleContainer}>Interior Design Assessment</h1>
      <div className={styles.titleContainer}>
        <img
          src={logo}
          alt="Tori in the House Logo"
          className={styles.logoImage}
        />
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={() => navigate("/signup")} className={styles.button}>
          Sign Up
        </button>
        <button onClick={() => navigate("/login")} className={styles.button}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default Home;
