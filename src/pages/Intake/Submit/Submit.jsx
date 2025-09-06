import styles from "./Submit.module.css";
import Buffer from "../Buffer/Buffer";
import { Link } from "react-router-dom";

const Submit = ({isValid}) => {

    return (
        <div className={styles.container}>
            <button type="submit" form="intakeForm" className={styles.submit} disabled={!isValid}>Submit</button>
        </div>
    )
}

export default Submit