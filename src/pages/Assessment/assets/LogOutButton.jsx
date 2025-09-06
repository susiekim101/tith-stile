import { Link } from "react-router-dom";
import styles from "./LogOutButton.module.css";
import { LogOut } from "lucide-react";

const LogOutButton = ({handleLogout}) => {
    return (
        <Link to="/landing">
            <button type="button"
                onClick={() => handleLogout}
                className={styles.logOut}
            >
                Log Out
                <LogOut className={styles.logoutIcon}/>
            </button>
        </Link>
    );
}

export default LogOutButton;