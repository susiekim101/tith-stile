import quizQuestions from "../../utils/quizQuestions";
import styles from "../../css/questions/Question6.module.css";

const Question6 = ({ formValues, setFormValues }) => {
  const questionId = "allergies";

  const handleSelect = (optionValue) => {
    setFormValues((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }));
  };

  return (
    <div className={styles.answerContainer}>
      <textarea
        className={styles.textarea}
        value={formValues[questionId] || ""}
        onChange={(e) => handleSelect(e.target.value)}
        rows={1}
        placeholder="Type your response here..."
      />
    </div>
  );
};

export default Question6;
