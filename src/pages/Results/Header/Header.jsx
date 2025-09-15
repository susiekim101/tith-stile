import LogOutButton from "../../Assessment/assets/LogOutButton";
import styles from "./Header.module.css";
import { RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../firebase/auth";

const Header = () => {
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
        <div className={styles.container}>
            <Link className={styles.left} to="/assessment">
                Retake Stile Assessment
                <RotateCcw className={styles.redoIcon}/>
            </Link>
            <LogOutButton handleLogout={handleLogout}/>
        </div>
    );
}

export default Header;