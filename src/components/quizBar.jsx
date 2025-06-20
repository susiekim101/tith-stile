import styles from "../css/QuizBar.module.css";

const QuizBar = ({ currentQuestion }) => {
  const totalQuestions = 17;
  const circles = [];

  for (let i = 0; i < totalQuestions; i++) {
    const isActive = i < currentQuestion;
    circles.push(
      <div key={i} className={isActive ? styles.completed : styles.remaining} />
    );
  }
  return <div className={styles.row}>{circles}</div>;
};

export default QuizBar;
