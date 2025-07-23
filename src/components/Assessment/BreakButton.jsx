import {useRef, useEffect, useState} from "react";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import styles from "../../css/Assessment/BreakButton.module.css";

const BreakButton = () => {
    const dialogRef = useRef(null);
    const timeoutRef = useRef(null);
    const TIMER = 1; // MINUTES
    const [coffeeIcon, setCoffeeURL] = useState(null);

    useEffect(() => {
        const storage = getStorage();
        const coffeeRef = ref(storage, "icons/coffee.png");

        getDownloadURL(coffeeRef)
            .then(url => setCoffeeURL(url))
            .catch(error => console.error("Failed to fetch coffee icon, ", error));

        timeoutRef.current = setTimeout(openDialog, TIMER * 60 * 1000);

        return () => {clearTimeout(timeoutRef.current)};
    }, []);

    const openDialog = () => {
        dialogRef.current?.showModal();
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            console.log("Clearing timeout in openDialog");
        }
    }

    const closeDialog = () => {
        dialogRef.current?.close();
        timeoutRef.current = setTimeout(openDialog, TIMER * 60 * 1000);
        
    }

    return (
        <>
            <button type="button" 
                    onClick={openDialog}
                    className={styles.button}>
                        Break Time
            </button>

            <dialog ref={dialogRef}>
                <div className={styles.dialogContainer}>
                    <div className={styles.iconContainer}>
                        <img src={coffeeIcon} className={styles.dialogIcon}></img>
                    </div>

                    <div className={styles.dialogTitle}>Break Time!</div>
                    <div className={styles.dialogText}>Take a moment to rest and recharge. When you're ready, click the button below to continue with your design assessment.</div>
                    <button type="button" 
                            onClick={closeDialog}
                            className={styles.dialogClose}>Close</button>
                </div>
            </dialog>
        </>
    )
}

export default BreakButton;