import LogOutButton from "../../Assessment/assets/LogOutButton";
import styles from "./Header.module.css";
import { RotateCcw, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../firebase/auth";
import axios from "axios";
import { useState } from "react";

const Header = ({text}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    // const [audio, setAudio] = useState("");

    const handleLogout = async () => {
        try {
            console.log("Logging out.");
            await logout(navigate);
        } catch (err) {
            console.error("Logout failed: ", err);
        }
    }

    const handleAudio = async () => {
        console.log("Playing text-to-speech");
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/api/tts', {
                text: text
            })

            const url = "data:audio/mp3;base64," + response.data.audioContent;
            const audioObj = new Audio(url);
            audioObj.play();
        } catch (error) {
            console.error("Frontend tts eerror: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <Link className={styles.left} to="/assessment">
                Retake Stile Assessment
                <RotateCcw className={styles.redoIcon}/>
            </Link>

            {isLoading ? (
                <div className={styles.loader}/>
            ) : (
                <Volume2 onClick={handleAudio} className={styles.ttsIcon}/>
            )}
            <div className={styles.right}>
                <LogOutButton handleLogout={handleLogout}/>
            </div>
        </div>
    );
}

export default Header;