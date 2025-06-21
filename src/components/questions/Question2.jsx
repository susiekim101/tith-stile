import quizQuestions from "../../utils/quizQuestions";
import styles from "../../css/questions/Question2.module.css";
import MultiselectImage from "../Assessment/multiSelectImage";

const Question2 = ({ formValues, setFormValues }) => {
  return (
    <MultiselectImage 
    formValues={formValues}
    setFormValues={setFormValues}
    id="furnitureStyle"/>
  );
};

export default Question2;

  /*const questionId = "colorPalettes";
  const selected = formValues[questionId] || [];
  const options = quizQuestions[1].questions[0].options;

  const toggleSelection = (optionValue) => {
    setFormValues((prev) => {
      const selected = prev[questionId] || [];
      const isSelected = selected.includes(optionValue);
      
      if(!isSelected && selected.length >= 3) {
        return prev;
      }

      const updated = isSelected
      ? selected.filter((val) => val !== optionValue)
      : [...selected, optionValue];

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
              onClick={() => toggleSelection(opt.label)}
            >
              <img src={opt.image} alt={opt.label} className={styles.image} />
            </div>
          </div>
        ))}
      </div>
    </>
  );*/