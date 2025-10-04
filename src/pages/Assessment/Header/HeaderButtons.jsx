import { logout } from "../../../firebase/auth";
import BreakButton from "../BreakButton/BreakButton";
import styles from "../Assessment.module.css";
import LogOutButton from "../assets/LogOutButton";
import { useNavigate } from "react-router-dom";

const HeaderButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            console.log("Logging out.");
            await logout(navigate);
        } catch (err) {
            console.error("Logout failed: ", err);
        }
    }

    return (
        <>
            <div className={styles.header}>
                <BreakButton />
                <LogOutButton handleLogout={handleLogout} />
            </div>
        </>
    );
}

export default HeaderButton;