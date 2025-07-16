import {doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../../firebase/config";
import styles from "../../css/Assessment.module.css";
import ToggleSelection from "./ToggleSelection";
import OtherOption from "./OtherOption";

const MultiselectText = ({formValues, setFormValues, id}) => {
    const [options, setOptions] = useState([]);
    const [description, setDescription] = useState("");
    const [select, setSelection] = useState(0);
    const [otherText, setOtherText] = useState("");
    const selected = formValues[id] || [];

    // Modular Firebase Firestore query
    useEffect(() => {
        // Reference to doc and current snapshot
        const fetchOptions = async () => {
            // Grab reference of the doc in "questions" collection with id
            const docRef = doc(db, "questions", id);
            // Fetches document data
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                setOptions(docSnap.data().options || []);
                setDescription(docSnap.data().description || "");
                setSelection(docSnap.data().select || 2);
                setOtherText(docSnap.data().otherText || "Other");
            } else {
                console.log("Document not found");
            }
        };
        fetchOptions();
    }, [id]);

    return (
        <>
            {description && (<p className={styles.caption}>{description}</p>)}

            <div className={styles.answerContainer}>
                <div className={styles.multipleChoice}>
                    {options.map((opt, idx) => (
                        opt === "Other" ? (
                            <OtherOption 
                                key={idx}
                                formValues={formValues}
                                setFormValues={setFormValues}
                                id={id}
                                isSelected={formValues.hasOwnProperty(`${id}_other`)}
                                otherText={otherText}
                            />
                        ) : (
                            <div
                                key={idx}
                                className={`${styles.textOption} ${selected.includes(opt) ? styles.selected: ""}`}
                                onClick={() => ToggleSelection(select, opt, setFormValues, id)}
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

export default MultiselectText;