import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import QuestionsRenderer from "./components/QuestionsRenderer";
import styles from "./Assessment.module.css";

const saveFormToFirestore = async (results) => {
  const [userId, setUserId] = useState(null);

  if (!auth.currentUser) {
    setUserId(crypto.randomUUID());
  } else {
    setUserId(auth.currentUser.uid);
  }

  try {
    await setDoc(doc(db, "user responses", userId), {
      results,
      timestamp: new Date(),
    });
    console.log("form saved");
  } catch (error) {
    console.error("error saving form:", error);
  }
};

const Assessment = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form values:", formValues);
    await saveFormToFirestore(formValues);
    navigate("/results", { state: { quizData: formValues } });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <QuestionsRenderer
          formValues={formValues}
          setFormValues={setFormValues}
          handleSubmit={handleSubmit}
        />
      </form>
    </>
  );
}

export default Assessment;
