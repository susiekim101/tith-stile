import styles from "./Survey.module.css";
import { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/config";

const Survey = () => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [userId, setUserId] = useState(null);
    const [survey, setSurvey] = useState("");
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });
        return () => unsubscribe();
    }, [auth]);

    const handleSubmit = async (response) => {
        if(loading) { return; }
        setLoading(true);

        try {
            if(userId) {            
                const docRef = doc(db, "user-responses", userId);
                await setDoc(docRef, {"survey": response }, { merge: true });
            } else {

            }
        } catch (err) {
            console.error(err);
        } finally {
            console.log("Survey submitted");
            setLoading(false);
            setSubmitted(true);
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                feel like you?
            </h1>
            {submitted ? (
                <div className={styles.submitted}>
                    Thank you! We appreciate the feedback 💌
                </div>
            ):(
                <div className={styles.buttonsContainer}>
                    <button onClick={() => handleSubmit("yes")} className={styles.button}>yes</button>
                    <button onClick={() => handleSubmit("lowkey")} className={styles.button}>lowkey</button>
                    <button onClick={() => handleSubmit("no")} className={styles.button}>no</button>
                </div>
            )}

        </div>
    )
}

export default Survey;
