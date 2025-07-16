import {doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../../firebase/config";
import styles from "../../css/Assessment.module.css";

const SectionDivider = ({id}) => {
    // const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "questions", id);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                // setTitle(docSnap.data().label);
                setDescription(docSnap.data().description);
            } else {
                console.log("Document not found)");
            }
        }
        fetchData();
    }, [id]);

    return (
        <>
            {description && (<p className={styles.caption}>{description}</p>)}
        </>
    );
}

export default SectionDivider;