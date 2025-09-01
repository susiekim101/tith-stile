import { Link } from "react-router-dom";
import logOut from "../../../assets/icons/log-out.svg";
import { logout } from "../../../firebase/auth";
import BreakButton from "../BreakButton/BreakButton";
import styles from "../Assessment.module.css";

const HeaderButton = () => {
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Logout failed: ", err);
        }
    }

    return (
        <>
        <div className={styles.header}>
            <Link to="/landing">
                <button type="button"
                    onClick={() => handleLogout}
                    className={styles.logoutContainer}>
                    <div className={styles.logoutText}>Log Out</div>
                    <img src={logOut} className={styles.logoutIcon}/>
                </button>
            </Link>
            <BreakButton />
        </div>
        </>
    );
}

export default HeaderButton;