import firebase from "firebase/app"; 
import MultiselectText from "./MultiselectImage"
import MultiselectImage from "./MultiselectImage"

export default QuestionsRenderer = () => {
    const db = firebase.firestore();
    let questionsRef = db.collection('questions');

    questionsRef.onSnapshot(querySnapshot => {
        const assessment = querySnapshot.docs.map(doc => {
            // function to process each question (doc)
            const id = doc.id;
            const type = doc.data().type;
            
            switch (type) {
                case "image multiselect":
                    return MultiselectImage(setFormValues, id);
                case "text multiselect":
                    return MultiselectText(setFormValues, id);
            }
        })
    })
}