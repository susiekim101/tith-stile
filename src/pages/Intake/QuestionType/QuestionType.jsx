import styles from "./QuestionType.module.css";

const QuestionType = ({question, responses, setResponses}) => {
    // Also accept setResponse as prop
    const { id, label, type, required, placeholder, options } = question;

    const handleResponseChange = (response) => {
        setResponses((prev) => ({
            ...prev,
            [id]: response
        }));
        console.log(responses);
    }

    const handleCheckboxChange = (response) => {
        setResponses((prev) => {
            const current = prev[id] || [];
            const newSelection = current.includes(response) ? current.filter((o) => o !== response) : [...current, response];

            return {
                ...prev,
                [id]: newSelection
            }
        })
        console.log(responses);
    }
    
    switch (type) {
        case "text":
            return (
                <div className={styles.question}>
                    <label htmlFor={id} className={styles.label}>{`${label} ${required ? "*" : ""}`}</label>
                    <input type="text" id={id} name={label} className={styles.textInput} placeholder={placeholder} required={required} onChange={(e) => handleResponseChange(e.target.value)}/>
                </div>
            );
        case "checkbox":
            return (
                <div className={styles.question}>
                    <div className={styles.checkboxLabel}>
                        {`${label} ${required ? "*" : ""}`}
                    </div>
                    {options.map((o) => (
                        <label key={o} className={styles.checkboxItem}>
                            <input className={styles.defaultCheckbox} type="checkbox" checked={responses[id] ? responses[id].includes(o) : false} onChange={() => handleCheckboxChange(o)}/>
                            <span className={styles.customCheckbox}></span>
                            {o}
                        </label>
                    ))}
                </div>
            )
        case "date":
            return (
                <div className={styles.question}>
                    <label htmlFor={id} className={styles.label}>{`${label} ${required ? "*" : ""}`}</label>
                    <input type="date" id={id} name={label} className={styles.dateInput} required={required} onChange={(e) => handleResponseChange(e.target.value)}/>
                </div>
            )
    }
}

export default QuestionType;

