import styles from "../css/Quiz.module.css";

const NavigationButton = ({ index, setIndex, total }) => {
  return (
    <div className={styles.footerButtons}>
      <button
        type="button"
        onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
        disabled={index === 0}
        className={styles.prev}
      >
        &lt; Previous
      </button>

      <button
        type="button"
        onClick={() => setIndex((prev) => Math.min(prev + 1, total - 1))}
        disabled={index === total - 1}
        className={styles.next}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default NavigationButton;
