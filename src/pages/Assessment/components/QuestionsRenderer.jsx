import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import MultiselectText from "../QuestionTypes/MultiselectText";
import MultiselectImage from "../QuestionTypes/MultiselectImage";
import SelectImage from "../QuestionTypes/SelectImage";
import SelectText from "../QuestionTypes/SelectText";
import TextResponse from "../QuestionTypes/TextResponse";
import SectionDivider from "../QuestionTypes/SectionDivider";
import ImageUpload from "../QuestionTypes/ImageUpload";

import NavBar from "../NavigationButton/NavigationButton";
import HeaderButton from "../Header/HeaderButtons";

import styles from "../Assessment.module.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import DateInput from "./DateInput";



const QuestionsRenderer = ({ formValues, setFormValues, handleSubmit }) => {
    const [index, setIndex] = useState(0); // Questions 0-indexed in array
    const [questions, setQuestions] = useState([]);
    const [totalQuestions, setTotalQuestions] = useState(0);
    let questionComponent;
    let cardStyle = styles.questionCard;


    // Fetch questions from Firestore and store in array
    useEffect(() => {
        const fetchQuestions = async () => {
            const assessQuery = query(collection(db, "assessment"), orderBy("index"));
            const sectionSnap = await getDocs(assessQuery);
            console.log("Fetched sectionSnap");
            let allQuestions = [];

            for (const sectionDoc of sectionSnap.docs) {
                const sectionId = sectionDoc.id;
                const sectionName = sectionDoc.data().section;
                const questionsRef = query(collection(db, "assessment", sectionId, "questions"), orderBy("index"));
                const questionsSnap = await getDocs(questionsRef);

                const sectionQuestions = questionsSnap.docs.map(doc => ({
                    id: doc.id,
                    sectionId: sectionId,
                    sectionName: sectionName,
                    ...doc.data()
                }));
                console.log(sectionQuestions);
                allQuestions = [...allQuestions, ...sectionQuestions];
            }
            setQuestions(allQuestions);
            setTotalQuestions(allQuestions.length);
        };
        fetchQuestions();
    }, []);

    const currentQuestion = questions[index];
    if (!currentQuestion)
        return <p className={styles.loading}>Loading Question...</p>

    const id = questions[index].id;
    const sectionId = questions[index].sectionId;
    const type = questions[index].type;
    const label = questions[index].label;
    const section = questions[index].sectionName;
    const description = questions[index].hasOwnProperty("description") ? questions[index].description : "";


    switch (type) {
        case "image multiselect":
            questionComponent = <MultiselectImage
                formValues={formValues}
                setFormValues={setFormValues}
                sectionId={sectionId}
                id={id} />
            cardStyle = styles.imageCard;
            break;
        case "text multiselect":
            questionComponent = <MultiselectText
                formValues={formValues}
                setFormValues={setFormValues}
                sectionId={sectionId}
                id={id} />;
            break;
        case "text select":
            questionComponent = <SelectText
                formValues={formValues}
                setFormValues={setFormValues}
                sectionId={sectionId}
                id={id} />;
            break;
        case "image select":
            questionComponent = <SelectImage
                formValues={formValues}
                setFormValues={setFormValues}
                sectionId={sectionId}
                id={id} />;
            cardStyle = styles.imageCard;
            break;
        case "text":
            questionComponent = <TextResponse
                formValues={formValues}
                setFormValues={setFormValues}
                id={id} />
            break;
        case "date":
            questionComponent = <DateInput
                formValues={formValues}
                setFormValues={setFormValues}
                id={id}
            />
            break;
        case "section":
            questionComponent = <SectionDivider
                sectionId={sectionId}
                id={id} />
            cardStyle = styles.sectionCard;
            break;
        case "image upload":
            questionComponent = <ImageUpload
                formValues={formValues}
                setFormValues={setFormValues}
                id={id}
            />
            break;
        default:
            questionComponent = <p>Unsupported question type</p>
    }

    return (
        <>
            <div className={styles.questionsContainer}>
                <div>
                    <HeaderButton />

                    <div>
                        <div className={styles.barContainer}>
                            <ProgressBar
                                index={index}
                                total={totalQuestions}
                            />
                        </div>

                        {type !== "section" ? (<div className={styles.sectionContainer}>
                            <h1 className={styles.sectionTitle}>{section}</h1>
                        </div>)
                            : (<></>)}
                    </div>
                </div>

                <div>
                    <div className={styles.labelContainer}>
                        <div className={styles.label}>{label}</div>
                    </div>

                    <div className={styles.descriptionContainer}>
                        <div className={styles.description}>{description}</div>
                    </div>

                    <div className={type === "image multiselect" || type === "image select" ? styles.imageContainer : styles.questionContainer}>
                        <div className={cardStyle}>
                            {questionComponent}
                        </div>
                    </div>
                </div>

                <NavBar
                    index={index}
                    setIndex={setIndex}
                    total={questions.length}
                    handleSubmit={handleSubmit}
                />
            </div>
        </>
    );
}

export default QuestionsRenderer;