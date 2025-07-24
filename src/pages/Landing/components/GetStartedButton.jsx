import styles from "./GetStartedButton.module.css";

const GetStartedButton = ({ textColor, bgColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[textColor]} ${styles[bgColor]}`}
    >
      Start your design journey &rarr;
    </button>
  );
};

export default GetStartedButton;
