import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, doc, query, orderBy } from "firebase/firestore";
import Header from "./Header/Header";
import Title from "./Title/Title";

const Intake = ({ }) => {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        const fetchSections = async() => {
            const sectionIds = [];
            
            const sectionQuery = query(collection(db, "intake"), orderBy("index"));
            const sectionSnap = await getDocs(sectionQuery); // Snap of collection

            for(const section of sectionSnap.docs) { // Iterate through all docs
                sectionIds.push(section.data().section);
            }

            const fetchedSections = [];
            for(const id of sectionIds) {
                const docRef = doc(db, "intake", id);
                const collectionRef = collection(docRef, "questions");
                const questionsSnapshot = await getDocs(collectionRef);

                const questions = questionsSnapshot.docs.map((doc) => doc.data());

                fetchedSections.push({
                    title: id,
                    questions
                });
            }
            setSections(fetchedSections);
        };
        fetchSections();
    }, []);

    return (
        <div>
            <Header/>
            <Title/>
        </div>
    );
}

export default Intake;