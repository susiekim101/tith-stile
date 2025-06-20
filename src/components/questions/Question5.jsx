import quizQuestions from "../../utils/quizQuestions";
import styles from "../../css/questions/Question4.module.css";

const Question5 = ({ formValues, setFormValues }) => {
  const questionId = "scentsDislike";
  const selected = formValues[questionId] || [];
  const options = quizQuestions[1].questions[3].options;

  const toggleSelection = (optionValue) => {
    setFormValues((prev) => {
      const currentSelected = prev[questionId] || [];
      const isSelected = currentSelected.includes(optionValue);
      
      if(!isSelected && currentSelected.length >= 3) {
        return prev;
      }

      const updated = isSelected
      ? currentSelected.filter((val) => val !== optionValue)
      : [...currentSelected, optionValue];

      const newFormValues = {
        ...prev,
        [questionId]: updated,
      };

      console.log("updating formvalues: ", newFormValues);
      return newFormValues;
    });
  };

  return (
    <>
    <p className={styles.caption}>Select up to three.</p>
    <div className={styles.answerContainer}>
      <div className={styles.multipleChoice}>
        {options.map((opt, idx) => (
          <div
            key={idx}
            className={`${styles.option} ${
              selected.includes(opt) ? styles.selected : ""
            }`}
            onClick={() => toggleSelection(opt)}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Question5;
