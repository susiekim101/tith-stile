import { useState } from "react";
import QuizBar from "../components/QuizBar.jsx";
import QuizTitle from "../components/QuizTitle.jsx";
import quizQuestions from "../utils/quizQuestions.js";
import styles from "../css/Quiz.module.css";
import Nav from "../components/NavigationButton.jsx";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

import Question2 from "../components/questions/Question2.jsx";
import Question3 from "../components/questions/Question3.jsx";
import Question4 from "../components/questions/Question4.jsx";
import Question5 from "../components/questions/Question5.jsx";
import Question6 from "../components/questions/Question6.jsx";
import Question7 from "../components/questions/Question7.jsx";
import Question8 from "../components/questions/Question8.jsx";
import Question9 from "../components/questions/Question9.jsx";
import Question10 from "../components/questions/Question10.jsx";
import Question11 from "../components/questions/Question11.jsx";
import Question12 from "../components/questions/Question12.jsx";
import Question13 from "../components/questions/Question13.jsx";
import Question14 from "../components/questions/Question14.jsx";
import Question15 from "../components/questions/Question15.jsx";
import Question16 from "../components/questions/Question16.jsx";
import Question17 from "../components/questions/Question17.jsx";

import chair from "../assets/icons/chair.png";
import lamp1 from "../assets/icons/lamp1.png";
import lamp2 from "../assets/icons/lamp2.png";
import lamp3 from "../assets/icons/lamp3.png";
import plant from "../assets/icons/plant.png";
import sofa from "../assets/icons/sofa.png";

export const questionComponents = {
  colorPalettes: Question2,
  textures: Question3,
  preferredScent: Question4,
  scentsDislike: Question5,
  allergies: Question6,
  sensoryTriggers: Question7,
  layoutSafety: Question8,
  controlOfSpace: Question9,
  lightingPreference: Question10,
  relaxingSounds: Question11,
  furnitureStyle: Question12,
  patterns: Question13,
  decorStyle: Question14,
  culturalItems: Question15,
  wallDecor: Question16,
  pets: Question17,
};

const allQuestions = quizQuestions.flatMap((section) =>
  section.questions.map((q) => ({ ...q, sectionTitle: section.section }))
);

const firstSectionTitle = quizQuestions[0].section;
const firstSectionQuestions = allQuestions.filter(
  (q) => q.sectionTitle === firstSectionTitle
);

const saveFormToFirestore = async (results) => {
  if (!auth.currentUser) return;

  const userId = auth.currentUser.uid;
  try {
    await setDoc(doc(db, "form", userId), {
      results,
      timestamp: new Date(),
    });
    console.log("form saved");
  } catch (error) {
    console.error("error saving form:", error);
  }
};

function Quiz() {
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [formValues, setFormValues] = useState({});

  const isInFirstSection = questionIndex < firstSectionQuestions.length;

  const progressQuestionNumber = isInFirstSection
    ? 1
    : questionIndex - firstSectionQuestions.length + 2;

  const currentQuestion = allQuestions[questionIndex];

  const handleChange = (questionId, value) => {
    setFormValues((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form values:", formValues);
    saveFormToFirestore(formValues);
    navigate("/results", { state: { quizData: formValues } });
  };

  const groupedQuestions = [];
  let tempSmallGroup = [];

  const renderOtherQuestions = (() => {
    const QuestionComponent = questionComponents[currentQuestion.id];

    return (
      <div className="relative w-screen">
        <img
          src={chair}
          alt="chair icon"
          className="absolute top-20 left-10 rotate-[-15deg] w-16 opacity-80"
        />
        <img
          src={sofa}
          alt="sofa icon"
          className="absolute bottom-20 right-30 rotate-[10deg] w-12 opacity-80"
        />
        <form onSubmit={handleSubmit}>
          <QuizBar currentQuestion={progressQuestionNumber} />
          <QuizTitle title={currentQuestion.sectionTitle} />
          <div className={styles.label}>{currentQuestion.label}</div>
          {QuestionComponent ? (
            <QuestionComponent
              formValues={formValues}
              setFormValues={setFormValues}
            />
          ) : (
            <div>Missing component for {currentQuestion.id}</div>
          )}

          {questionIndex === allQuestions.length - 1 ? (
            <button className={styles.submitForm} type="submit">
              Submit
            </button>
          ) : (
            <Nav
              index={questionIndex}
              setIndex={setQuestionIndex}
              total={allQuestions.length}
            />
          )}
        </form>
      </div>
    );
  })();

  for (let i = 0; i < firstSectionQuestions.length; i++) {
    const current = firstSectionQuestions[i];

    if (current.style === "small") {
      tempSmallGroup.push(current);
    } else {
      if (tempSmallGroup.length > 0) {
        groupedQuestions.push([...tempSmallGroup]);
        tempSmallGroup = [];
      }
      groupedQuestions.push([current]);
    }
  }
  if (tempSmallGroup.length > 0) {
    groupedQuestions.push([...tempSmallGroup]);
  }

  const renderFirstSection = (
    <div className={styles.wrapper}>
      <div className={styles.quizContainer}>
        <div>
          <QuizBar currentQuestion={progressQuestionNumber} />
          <QuizTitle title={firstSectionTitle} />
        </div>
        <form className={styles.form}>
          {groupedQuestions.map((group, groupIdx) => {
            const isRow = group[0].style === "small";

            return (
              <div
                key={groupIdx}
                className={isRow ? styles.rowGroup : styles.columnGroup}
              >
                {group.map((question, idx) => (
                  <div
                    key={question.id}
                    className={isRow ? styles.rowItem : undefined}
                  >
                    <label className={styles.label}>{question.label}</label>
                    {question.type === "text" && (
                      <input
                        type="text"
                        className={styles.text}
                        value={formValues[question.id]}
                        onChange={(e) =>
                          handleChange(question.id, e.target.value)
                        }
                      />
                    )}

                    {question.type === "select" && (
                      <select
                        className={styles.select}
                        value={formValues[question.id] || ""}
                        onChange={(e) =>
                          handleChange(question.id, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Select
                        </option>

                        {question.options.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}

                    {question.type === "email" && (
                      <input
                        type="email"
                        className={styles.email}
                        value={formValues[question.id]}
                        onChange={(e) =>
                          handleChange(question.id, e.target.value)
                        }
                        required
                      />
                    )}

                    {question.type === "date" && (
                      <input
                        type="date"
                        className={styles.date}
                        value={formValues[question.id]}
                        onChange={(e) =>
                          handleChange(question.id, e.target.value)
                        }
                        required
                      />
                    )}

                    {question.type === "multiselect" && (
                      <select
                        multiple
                        className={styles.multiselect}
                        value={formValues[question.id] || []}
                        onChange={(e) =>
                          handleChange(
                            question.id,
                            Array.from(
                              e.target.selectedOptions,
                              (option) => option.value
                            )
                          )
                        }
                        required
                      >
                        {question.options.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}

                    {question.type === "textarea" && (
                      <textarea
                        className={styles.textarea}
                        value={formValues[question.id] || ""}
                        onChange={(e) =>
                          handleChange(question.id, e.target.value)
                        }
                        rows={4}
                        placeholder="Type your response here..."
                      />
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </form>
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.next}
            onClick={() => setQuestionIndex(firstSectionQuestions.length)}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );

  return <>{isInFirstSection ? renderFirstSection : renderOtherQuestions}</>;
}

export default Quiz;
