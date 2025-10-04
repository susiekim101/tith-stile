import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import styles from "./SelectImage.module.css";
import ToggleSelection from "../components/ToggleSelection";
import { Check } from "lucide-react";

const MultiselectImage = ({ formValues, setFormValues, sectionId, id }) => {
    const [options, setOptions] = useState([]);
    const [description, setDescription] = useState("");
    const [select, setSelection] = useState(0);

    const selected = formValues[id] || [];

    // Modular Firebase Firestore query
    useEffect(() => {
        // Reference to doc and current snapshot
        const fetchOptions = async () => {
            // Grab reference of the doc in "questions" collection with id
            const docRef = doc(db, "assessment", sectionId, "questions", id);
            // Fetches document data
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setOptions(docSnap.data().options || []);
                setDescription(docSnap.data().description || "");
                setSelection(docSnap.data().select || 2);
            } else {
                console.log("Document not found");
            }
        };
        fetchOptions();
    }, [id]);

    return (
        <>
            {description && (<p className={styles.caption}>{description}</p>)}

            <div className={styles.grid}>
                {options.map((opt, idx) => (
                    <div key={idx} className={styles.imageBorder}
                        onClick={() => ToggleSelection(select, opt.label, setFormValues, id)}>

                        <div className={styles.imageOption}>
                            <img src={opt.image} alt={opt.label} className={styles.image} />
                        </div>

                        <div className={styles.imageFooter}>
                            <div className={styles.check}>
                                <div className={`${selected.includes(opt.label) ? styles.imageFilled : styles.imageSelect}`}></div>
                                {selected.includes(opt.label) ? (<Check className={styles.checkMark} />) : ""}
                            </div>

                            <div className={styles.imageCaption}>{opt.label}</div>
                            <div></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MultiselectImage;