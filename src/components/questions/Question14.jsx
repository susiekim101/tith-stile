import quizQuestions from "../../utils/quizQuestions";
import styles from "../../css/questions/Question12.module.css";

const Question14 = ({ formValues, setFormValues }) => {
  const questionId = "decorStyle";
  const selected = formValues[questionId] || [];
  const options = quizQuestions[4].questions[2].options;

  const handleSelect = (optionValue) => {
    setFormValues((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }));
    console.log("updating formvalues: ", formValues);
  };

  return (
    <>
    <p className={styles.caption}>(Click 'Next' to skip)</p>
      <div className={styles.grid}>
        {options.map((opt, idx) => (
          <div
            key={idx}
            className={`${styles.imageBorder} ${
              selected.includes(opt.label) ? styles.selected : ""
            }`}
          >
            <div
              className={styles.option}
              onClick={() => handleSelect(opt.label)}
            >
              <img src={opt.image} alt={opt.label} className={styles.image} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Question14;
