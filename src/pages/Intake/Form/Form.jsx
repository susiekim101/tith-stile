import { useEffect, useState, useMemo } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../../firebase/config";
import { collection, getDoc, getDocs, doc, query, orderBy, updateDoc } from "firebase/firestore";
import styles from "./Form.module.css";
import QuestionType from "../QuestionType/QuestionType";
import Submit from "../Submit/Submit";
import { useNavigate } from "react-router-dom";

const Form = () => {
    const [userId, setUserId] = useState(null);
    const [responses, setResponses] = useState([]);
    const [sections, setSections] = useState([]);
    const auth = getAuth();
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchSections = async() => {
            const sectionIds = [];
            
            const sectionQuery = query(collection(db, "intake"), orderBy("index"));
            const sectionSnap = await getDocs(sectionQuery); // Snap of collection

            for(const section of sectionSnap.docs) { // Iterate through all docs
                sectionIds.push(section.id);
            }

            const fetchedSections = [];
            for(const id of sectionIds) {
                const docRef = doc(db, "intake", id);
                const docSnapshot = await getDoc(docRef);
                const questionsRef = query(collection(docRef, "questions"), orderBy("index"));
                const questionsSnapshot = await getDocs(questionsRef);

                const questions = questionsSnapshot.docs.map((doc) => doc.data());

                fetchedSections.push({
                    id: id,
                    title: docSnapshot.data().section,
                    questions
                });
            }
            setSections(fetchedSections);
        };
        fetchSections();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, "form", userId), responses);
        navigate("/buffer");
        console.log("Intake form submited");
    };

    const isValid = useMemo(() => {
        const isAnswered = (q) => {
            if(q.type=="checkbox")
                return responses[q.id] != null && responses[q.id].length > 0;
            return responses[q.id] != null && String(responses[q.id].trim() !== "");
        };

        return sections.every((section) => 
            (section.questions)
                .filter(q => q.required)
                .every(isAnswered)
            );
    }, [sections, responses]);

    return (
        <>
        <form id="intakeForm" onSubmit={handleSubmit} className={styles.container}>
            {
                sections.map((section) => (
                    <div key={section.id} className={styles.section}>
                        <div  className={styles.sectionHeader}>
                            <h1 className={styles.title}>{section.title}</h1>
                            <hr className={styles.sectionBreak}/>
                        </div>

                        <div className={styles.questionGrid}>
                        {
                            section.questions.map((q) => (
                                <QuestionType key={q.id} question={q} responses={responses} setResponses={setResponses}/>
                            ))
                        }
                        </div>
                    </div>
                    
                ))
            }
        </form>
        <Submit isValid={isValid}/>
        </>

    );
}

export default Form;