import { collection, getDocs, query, orderBy } from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../../firebase/config";
import MultiselectText from "./MultiselectImage"
import MultiselectImage from "./MultiselectImage"
import NavBar from "./NavigationButton";
import SelectImage from "./SelectImage";
import SelectText from "./SelectText";
import TextResponse from "./TextResponse";
import QuizTitle from "../QuizTitle";
import styles from "../../css/Assessment.module.css";

// STILL NEED WORK 

const QuestionsRenderer = ({formValues, setFormValues}) => {
    const [index, setIndex] = useState(0);
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

    // Load the first question


    // When we press next, increments index
        // setIndex, use min
    // When we press prev, decrements index
    
    // If index == 1, disable prev button
    // If index == questionsRef.size(), disable next button. Replace with "submit"
    
    // When quiz first loads, should load from index = 1
    // next button sets index to += 1
    // previous button sets index to -= 1
    // If index is > questionsRef.size, then change button to "Submit"
    // If index is < 1, disable previous button
    // setIndex is a function that accepts the new value to set so syntax should be 
    /*
    setIndex(prev => prev + 1)

    */
   
    
}

export default QuestionsRenderer;