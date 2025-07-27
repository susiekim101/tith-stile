import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import QuestionsRenderer from "./components/QuestionsRenderer";

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

const Quiz = () => {
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
      onSubmit={handleSubmit}>

        <QuestionsRenderer
          formValues={formValues}
          setFormValues={setFormValues}
          handleSubmit={handleSubmit}
        />
      </form>
    </>
  );
}

export default Quiz;
