import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { logout } from "../../../firebase/auth";
import { ArrowRight, LogOut } from "lucide-react";
import LogOutButton from "../../Assessment/assets/LogOutButton";
 

const Header = ({intake}) => {
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
                {intake ? (
                    <Link to="/assessment"className={styles.headerLeft}>
                        <span>Not a Tori in the House client?</span>
                        <span className={styles.link}>
                            Skip to Stile Assessment
                            <ArrowRight className={styles.arrow}/>
                        </span>
                    </Link>
                    ) : <div></div>
                }
                

                <div className={styles.headerRight}>
                    <LogOutButton handleLogout={handleLogout}/>
                </div>
            </div>
        </div>
    );
}

export default Header;