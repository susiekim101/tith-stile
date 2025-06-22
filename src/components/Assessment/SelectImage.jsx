import {doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../../firebase/config";
import styles from "../../css/Assessment.module.css";

const SelectImage = ({formValues, setFormValues, id}) => {
    // Initialize variable for selected and options to display
    const [options, setOptions] = useState([]);
    const selected = formValues[id] || [];

    // Access options from Firebase Firestore query
    useEffect(() => {
        const fetchOptions = async () => {
            const docRef = doc(db, "questions", id);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                console.log("Fetching options");
                setOptions(docSnap.data().options || []);
            } else {
                console.log("Document not found");
            }
        };
        fetchOptions();
    }, [id]);

    const handleSelect = (option) => {
        setFormValues((prev) => ({
            ...prev, [id]: option
        }));
    };

      return (
        <>
        <p className={styles.caption}>(Click 'Next' to skip)</p>
          <div className={styles.grid}>
            {options.map((opt, idx) => (
              <div
                key={idx}
                className={`${styles.imageBorder} ${
                  selected.includes(opt.label) ? styles.selected : ""
                }`}
              >
                <div
                  className={styles.imageOption}
                  onClick={() => handleSelect(opt.label)}
                >
                  <img src={opt.image} alt={opt.label} className={styles.image} />
                </div>
              </div>
            ))}
          </div>
        </>
      );
}

export default SelectImage;