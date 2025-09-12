import LogOutButton from "../../Assessment/assets/LogOutButton";
import styles from "./Header.module.css";
import { RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
const Header = () => {

    return (
        <div className={styles.container}>
            <Link className={styles.left} to="/assessment">
                Retake Stile Assessment
                <RotateCcw className={styles.redoIcon}/>
            </Link>
            <LogOutButton/>
        </div>
    );
}

export default Header;