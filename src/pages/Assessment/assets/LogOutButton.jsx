import { Link } from "react-router-dom";
import styles from "./LogOutButton.module.css";
import { LogOut, LogIn } from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../firebase/auth";

const LogOutButton = ({handleLogout}) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if(user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    })

    return (
        <div>
            {loggedIn ? (
                <button type="button"
                    onClick={handleLogout}
                    className={styles.logOut}>
                    Log Out
                    <LogOut className={styles.logoutIcon}/>
                </button>
            ) : (
                <Link to="/landing">
                    <button type="button"
                        className={styles.logOut}>
                        Sign In
                        <LogIn className={styles.logoutIcon}/>
                    </button>
                </Link>
            )}  
        </div>
    );
}

export default LogOutButton;