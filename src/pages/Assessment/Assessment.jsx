import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import QuestionsRenderer from "./components/QuestionsRenderer";
import styles from "./Assessment.module.css";
import axios from "axios";

const saveFormToFirestore = async (results) => {
    const userId = auth.currentUser ? auth.currentUser.uid : crypto.randomUUID();

    try {
      await setDoc(doc(db, "user-responses", userId), {
        results,
        timestamp: new Date(),
      });
      console.log("form saved");
      return userId;
    } catch (error) {
      console.error("error saving form:", error);
    }
  };

const Assessment = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  // const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form values:", formValues);
    setIsLoading(true);
  
    const userId = await saveFormToFirestore(formValues);
    let results;

    try {
      const response = await axios.post('http://localhost:3001/api/generate-results', {
        userResults: formValues
      });

      results = response.data;
      const resultsJson = {
        "scents": results
      };
      
      await setDoc(doc(db, "stile-profiles", userId), resultsJson);

    } catch(error) {
      console.error("Frontend error: ", error);
    } finally {
      setIsLoading(false);
    }
    navigate("/results", { state: { userStile: results } });
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
