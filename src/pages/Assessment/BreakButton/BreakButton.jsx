import {useRef, useEffect, useState} from "react";
// import {getDownloadURL, getStorage, ref} from "firebase/storage";
import styles from "../../Assessment//BreakButton/BreakButton.module.css";
import coffee from "../../../assets/icons/coffee.svg";
import { Coffee } from "lucide-react";

const BreakButton = () => {
    const dialogRef = useRef(null);
    const timeoutRef = useRef(null);
    const TIMER = 1; // MINUTES

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
                    <div className={styles.upperContainer}>
                        <Coffee className={styles.dialogIcon}/>

                        <div className={styles.dialogTitle}>Break Time!</div>
                        <div className={styles.dialogText}>Take a moment to rest and recharge. When you're ready, click the button below to continue with your design assessment.</div>
                    </div>
                    <button type="button" 
                            onClick={closeDialog}
                            className={styles.dialogClose}>Close</button>
                </div>
            </dialog>
        </>
    )
}

export default BreakButton;