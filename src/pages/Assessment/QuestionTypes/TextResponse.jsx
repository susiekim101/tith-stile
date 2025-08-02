import styles from "../QuestionTypes/TextResponse.module.css";

const TextResponse = ({formValues, setFormValues, id}) => {
    const handleResponse = (text) => {
        setFormValues((prev) => ({...prev, [id]: text}));
    };

    return (
        <>
        <div className={styles.textResponse}>
            <textarea
                className={styles.textarea}
                value={formValues[id] || ""}
                onChange={(e) => handleResponse(e.target.value)}
                rows={1}
                placeholder="Type your response here..."
            />
        </div>
        </>
    );
}

export default TextResponse