import { collection, getDocs, query, orderBy } from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../../firebase/config";
import MultiselectText from "./MultiselectText"
import MultiselectImage from "./MultiselectImage"
import NavBar from "./NavigationButton";
import SelectImage from "./SelectImage";
import SelectText from "./SelectText";
import TextResponse from "./TextResponse";
import QuizTitle from "../QuizTitle";
import styles from "../../css/Assessment.module.css";

const QuestionsRenderer = ({formValues, setFormValues}) => {
    const [index, setIndex] = useState(0); // Questions 0-indexed in array
    const [questions, setQuestions] = useState([]);
    let questionComponent;

    // Fetch questions from Firestore and store in array
    useEffect(() => {
        console.log("Use effect running.");
        const fetchQuestions = async () => {
            const colQuery = query(collection(db, "questions"), orderBy("index"));
            const collectionSnap = await getDocs(colQuery);
            const fetched = collectionSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setQuestions(fetched);
            console.log(fetched);
        }
        fetchQuestions();
    }, []);

    const currentQuestion = questions[index];
    if(!currentQuestion)
        return <p>Loading Question...</p>

    const id = questions[index].id;
    const type = questions[index].type;
    const label = questions[index].label;
    const section = questions[index].section;


    switch(type) {
        case "image multiselect":
            questionComponent = <MultiselectImage
                                formValues={formValues}
                                setFormValues={setFormValues}
                                id={id}/>
            break;
        case "text multiselect":
            questionComponent = <MultiselectText
                                formValues={formValues}
                                setFormValues={setFormValues}
                                id={id} />;
            break;
        case "text select":
            questionComponent = <SelectText
                                formValues={formValues}
                                setFormValues={setFormValues}
                                id={id}/>;
            break;
        case "image select":
            questionComponent = <SelectImage
                                formValues={formValues}
                                setFormValues={setFormValues}
                                id={id}/>;
        case "text":
            questionComponent = <TextResponse 
                                formValues={formValues}
                                setFormValues={setFormValues}
                                id={id}/>
            break;
        default:
            questionComponent = <p>Unsupported question type</p>
    }

    return (
        <>
        {console.log(id)}
        {console.log(type)}
        <QuizTitle title={section} />
        <div className={styles.label}>{label}</div>
        {questionComponent}

        <NavBar
            index={index}
            setIndex={setIndex}
            total={questions.length}
        />
        </>
    );
}

export default QuestionsRenderer;