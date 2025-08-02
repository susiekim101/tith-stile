import styles from "./DateInput.module.css";

const DateInput = ({formValues, setFormValues, id}) => {
    const handleResponse = (date) => {
        setFormValues((prev) => ({...prev, [id]: date}))
    }
    return (
        <>
        <div className={styles.dateResponse}>
            <input
                type="date"
                value={formValues[id] || ""}
                className={styles.datearea}
                onChange={(e) => handleResponse(e.target.value)}
            />
        </div>
        </>
    );
}

export default DateInput;