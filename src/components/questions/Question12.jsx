import SelectImage from "../Assessment/SelectImage";

const Question12 = ({ formValues, setFormValues }) => {
  return (
    <SelectImage
      formValues={formValues}
      setFormValues={setFormValues}
      id="furnitureStyle"
    />
  );
  /*const questionId = "furnitureStyle";
  const selected = formValues[questionId] || [];
  const options = quizQuestions[4].questions[0].options;

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
  );*/
};

export default Question12;
