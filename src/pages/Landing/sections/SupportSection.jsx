import styles from "./SupportSection.module.css";
import supportheart from "../assets/supportheart.png";

const SupportSection = () => {
  return (
    <section>
      <img
        className={styles.heartIcon}
        src={supportheart}
        alt="support heart"
      />
      <h1 className={styles.h1}>Support Our Mission</h1>
      <h3 className={styles.h3}>
        ✨ As part of this collaboration, we ask each client to contribute a
        small, one-time fee.
      </h3>
    </section>
  );
};

export default SupportSection;
