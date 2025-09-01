import styles from "./Submit.module.css";
import Buffer from "../Buffer/Buffer";
import { Link } from "react-router-dom";

const Submit = () => {

    return (
        <div className={styles.container}>
            <Link to="/buffer">
            <button type="submit" form="intakeForm" className={styles.submit}>Submit</button>
            </Link>
        </div>
    )
}

export default Submit