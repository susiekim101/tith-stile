import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import styles from "../../Assessment/QuestionTypes/SelectText.module.css";
import OtherOption from "../components/OtherOption";

const SelectText = ({ formValues, setFormValues, sectionId, id }) => {
  // Initialize variable for selected and options to display
  const [options, setOptions] = useState([]);
  const [otherText, setOtherText] = useState("");
  const selected = formValues[id] || "";

  // Access options from Firebase Firestore query
  useEffect(() => {
    const fetchOptions = async () => {
      // Reference to doc and current snapshot
      const docRef = doc(db, "assessment", sectionId, "questions", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Fetching options")
        setOptions(docSnap.data().options || [])
        setOtherText(docSnap.data().otherText || "Other");
      } else {
        console.log("Document not found");
      }
    };
    fetchOptions();
  }, [id]);

  // Updates setFormValues with new selections
  const handleSelect = (option) => {
    setFormValues((prev) => ({
      ...prev, [id]: option
    }));
  };

  return (
    <>
      <div className={styles.answerContainer}>
        <div className={styles.multipleChoice}>
          {options.map((opt, idx) => (
            opt == "other" ? (
              <OtherOption
                key={idx}
                formValues={formValues}
                setFormValues={setFormValues}
                id={id}
                isSelected={formValues.hasOwnProperty(`${id}_other`)}
                otherText={otherText}
              />
            ) : (
              <div className={styles.textOption}
                onClick={() => handleSelect(opt)}
              >
                <div className={`${styles.optionIcon} ${selected.includes(opt) ? styles.filled : ""}`}></div>

                <div
                  key={idx}
                  className={styles.textOptionStyle}
                >
                  {opt}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  );
}

export default SelectText;