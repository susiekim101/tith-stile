const SelectText = ({ setFormValues, id }) => {
    // Access Firestore DB
    const db = firebase.firestore();
    // Create reference to Firebase "questions" collection
    const questionsRef = db.collection('questions');

    // const options that holds either the selection from DB or empty string
    let options;

    questionsRef.doc(id).get().then()
    // Function to handle select. Update selection in DB


}