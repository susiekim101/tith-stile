import firebase from "firebase/app"; 
import styles from "../../css/questions/Question2.module.css";
import ToggleSelection from "./ToggleSelection";

const MultiselectImage = ({ setFormValues, id}) => {
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

            <div className={styles.grid}>
                {options.map((opt, idx) => (
                    <div
                    key={idx}
                    className={`${styles.imageBorder} ${selected.includes(opt.label) ? styles.selected : ""}`}
                    >
                        <div className={styles.option}
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