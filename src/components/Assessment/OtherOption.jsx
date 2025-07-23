import styles from "../../css/Assessment/OtherOption.module.css";
import {useState, useEffect} from "react";
import ToggleSelection from "./ToggleSelection";

const OtherOption = ({formValues, setFormValues, id, isSelected, otherText}) => {
    const [otherValue, setOtherValue] = useState(formValues.hasOwnProperty(`${id}_other`) ? formValues[`${id}_other`][0] : "");

    // If "Other" field is empty, remove it from formValues. If there is text in "Other", add it to formValues
    useEffect(() => {
        if(otherValue.trim() !== '') {
            setFormValues((prev) => ({
                ...prev,
                [`${id}_other`]: [otherValue]
            }))
        } else {
            const { [`${id}_other`]: _, ...rest} = formValues;
            setFormValues(rest);
        }
    }, [otherValue]);

    return (
        <>
        <div className={styles.optionContainer}>
            <div className={styles.textOption}>
                <div className={`${styles.optionIcon} ${isSelected ? styles.filled : ""}`}></div>
                <div
                    className={`${styles.textOptionStyle} ${isSelected ? styles.selected: ""}`}
                    onClick={() => ToggleSelection(1, otherValue, setFormValues, `${id}_other`)}
                >
                    {otherText} 
                </div>
            </div>

            <textarea
                className={`${styles.textarea} ${isSelected ? styles.selected: ""}`}
                value={otherValue}
                onChange={(e) => setOtherValue(e.target.value)}
                rows={1}
                placeholder="Type your response here..."
            />
        </div>
        </>
    )
}

export default OtherOption;