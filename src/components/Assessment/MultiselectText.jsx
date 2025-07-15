import {doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../../firebase/config";
import styles from "../../css/Assessment.module.css";
import ToggleSelection from "./ToggleSelection";
import OtherOption from "./OtherOption";

const MultiselectText = ({formValues, setFormValues, id}) => {
    const [options, setOptions] = useState([]);
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
            } else {
                console.log("Document not found");
            }
        };
        fetchOptions();
    }, [id]);

    return (
        <>
            <p className={styles.caption}>Select up to two.</p>

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
                            />
                        ) : (
                            <div
                                key={idx}
                                className={`${styles.textOption} ${selected.includes(opt) ? styles.selected: ""}`}
                                onClick={() => ToggleSelection(opt, setFormValues, id)}
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

export default MultiselectText

/* 
                    {selected.some(opt => opt === "Other" || opt.startsWith("Other:")) && 
                        <OtherOption
                            otherValue={otherValue}
                            setOtherValue={setOtherValue}
                            selected={selected}
                        />} 
                        
                        useEffect(() => {
        if (selected.some(opt => opt === "Other" || opt.startsWith("Other:"))) {
            const filtered = selected.filter(opt => !opt.startsWith("Other")); // Keep all but "Other"
            const updated = [...filtered, `Other: ${otherValue}`]; // Add "Other" with correct format
            setFormValues((prev) => ({
            ...prev,
            [id]: updated
            }));
        }
        console.log(formValues);
    }, [otherValue]);
                        
                        */