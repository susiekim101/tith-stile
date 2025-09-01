import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { logout } from "../../../firebase/auth";
import { ArrowRight, LogOut } from "lucide-react";
 

const Header = () => {
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Logout failed: ", err);
        }
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <span>Not a Tori in the House client?</span>

                    <Link to="/assessment" className={styles.link}>
                        Skip to Stile Assessment
                        <ArrowRight className={styles.arrow}/>
                    </Link>
                </div>

                <div className={styles.headerRight}>
                    <Link to="/landing">
                        <button type="button"
                            onClick={() => handleLogout}
                            className={styles.logOut}
                        >
                            Log Out
                            <LogOut className={styles.logoutIcon}/>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;