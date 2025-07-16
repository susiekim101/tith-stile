import styles from "../../css/Assessment.module.css";
import {useState, useEffect} from "react";
import ToggleSelection from "./ToggleSelection";

const OtherOption = ({formValues, setFormValues, id, isSelected}) => {
    const [otherValue, setOtherValue] = useState(formValues.hasOwnProperty(`${id}_other`) ? formValues[`${id}_other`][0] : "");

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
            <div
                className={`${styles.textOption} ${isSelected ? styles.selected: ""}`}
                onClick={() => ToggleSelection(otherValue, setFormValues, `${id}_other`)}
            >
                Other: 
            </div>
            <textarea
                className={`${styles.textarea} ${isSelected ? styles.selected: ""}`}
                value={otherValue}
                onChange={(e) => setOtherValue(e.target.value)}
                rows={1}
                placeholder="Type your response here..."
            />
        </>
    )
}

export default OtherOption