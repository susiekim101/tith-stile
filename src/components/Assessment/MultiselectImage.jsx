import {doc, getDoc} from "firebase/firestore"; 
import {useEffect, useState} from "react";
import {db} from "../../firebase/config";
import styles from "../../css/Assessment.module.css";
import ToggleSelection from "./ToggleSelection";

const MultiselectImage = ({ formValues, setFormValues, id}) => {
    const [options, setOptions] = useState([]);
    const selected = formValues?.[id] || [];

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

            <div className={styles.grid}>
                {options.map((opt, idx) => (
                    <div
                        key={idx}
                        className={`${styles.imageBorder} 
                        ${selected.includes(opt.label) ? styles.selected : ""}`}
                    >
                        <div className={styles.imageOption}
                        onClick={() => ToggleSelection(opt.label, setFormValues, id)}
                        >
                            <img src={opt.image} alt={opt.label} className={styles.image} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MultiselectImage