import check from "../assets/check.svg";
import styles from "../sections/StartSection.module.css";

const StartChecklist = ({ title, description }) => {
  return (
    <div className={styles.checklistItem}>
      <img className={styles.checkIcon} src={check} alt="check" />
      <div className={styles.checklistText}>
        <h2 className={styles.checklistTitle}>{title}</h2>
        <p className={styles.checklistDescription}>{description}</p>
      </div>
    </div>
  );
};

export default StartChecklist;
