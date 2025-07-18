import {doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../../firebase/config";
import styles from "../../css/Assessment.module.css";
import OtherOption from "./OtherOption";

const SelectText = ({formValues, setFormValues, id}) => {
    // Initialize variable for selected and options to display
    const [options, setOptions] = useState([]);
    const [description, setDescription] = useState("");
    const selected = formValues[id] || "";

    // Access options from Firebase Firestore query
    useEffect(() => {
        const fetchOptions = async () => {
            // Reference to doc and current snapshot
            const docRef = doc(db, "questions", id);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                console.log("Fetching options")
                setOptions(docSnap.data().options || [])
                setDescription(docSnap.data().description || "");
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
          {description && (<p className={styles.caption}>{description}</p>)}

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
                  />
                ) : (
                  <div
                    key={idx}
                    className={`${styles.textOption} ${
                      selected === opt ? styles.selected : ""
                    }`}
                    onClick={() => handleSelect(opt)}
                  >
                    {opt}
                  </div>
                )
              ))}
            </div>
          </div>
        </>
      );
}

export default SelectText;