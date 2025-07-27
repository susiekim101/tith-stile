import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import styles from "../QuestionTypes/SectionDivider.module.css";

const SectionDivider = ({ sectionId, id }) => {
    const [brief, setBrief] = useState("");
    const [section, setSection] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "assessment", sectionId, "questions", id);
            const docSnap = await getDoc(docRef);


            if (docSnap.exists()) {
                setBrief(docSnap.data().brief);
                setSection(docSnap.data().section);
            } else {
                console.log("Document not found");
            }
        }
        fetchData();
    }, [id, sectionId]);

    return (
        <div className={styles.sectionContainer}>
            {section && (<p className={styles.section}>{section}</p>)}
            {brief && (<p className={styles.brief}>{brief}</p>)}
        </div>
    );
}

export default SectionDivider;