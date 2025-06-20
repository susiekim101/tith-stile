import quizQuestions from "../../utils/quizQuestions";
import styles from "../../css/questions/Question4.module.css";

const Question9 = ({ formValues, setFormValues }) => {
  const questionId = "controlOfSpace";
  const selected = formValues[questionId] || "";
  const options = quizQuestions[3].questions[1].options;

  const handleSelect = (optionValue) => {
    setFormValues((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }));
    console.log("updating formvalues: ", formValues);
  };

  return (
    <>
    <div className={styles.answerContainer}>
      <div className={styles.multipleChoice}>
        {options.map((opt, idx) => (
          <div
            key={idx}
            className={`${styles.option} ${
              selected === opt ? styles.selected : ""
            }`}
            onClick={() => handleSelect(opt)}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Question9;
