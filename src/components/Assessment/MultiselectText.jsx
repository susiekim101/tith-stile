import firebase from "firebase/app"; 
import styles from "../../css/questions/Question2.module.css";
import ToggleSelection from "./ToggleSelection";

const MultiselectText = ({ setFormValues, id}) => {
    const db = firebase.firestore();
    const questionsRef = db.collection('questions');

    let options;
    // Retrieve the options from the db for this question id
    questionsRef.doc(id).get().then( (doc) => {
        if(doc.exists) {
            let data = doc.data();
            options = data.options;

            console.log("Extracted options: ", options);
        } else {
            console.log("Document does not exist");
        }
    })
    .catch( (error) => {
        console.error("Error getting document: ", error);
    });

    return (
        <>
            <p className={styles.caption}>Select up to three.</p>

            <div className={styles.answerContainer}>
                <div className={styles.multipleChoice}>
                    {options.map((opt, idx) => (
                        <div
                            key={idx}
                            className={`${styles.option} ${
                                selected.includes(opt) ? styles.selected: ""
                            }`}
                            onClick={() => ToggleSelection(opt, setFormValues, id)}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default MultiselectText