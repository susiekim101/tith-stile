import styles from "../css/QuizTitle.module.css";

const QuizTitle = ({ title }) => {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
    </>
  );
};

export default QuizTitle;
