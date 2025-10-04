import styles from "./ProgressBar.module.css";

const ProgressBar = ({index, total}) => {
    // console.log(index);
    // console.log(total);
    const current = index + 1;
    const percentage = Math.round((current/total) * 100);

    return (
        <div className={styles.progressContainer}>
            <div className={styles.barContainer}>
                <div className={styles.fillBar}
                    style={{width: `${percentage}%`}}>
                </div>
            </div>

            <div className={styles.textContainer}>
                <p className={styles.completeText}>{percentage}% complete</p>
            </div>
        </div>
    );
}

export default ProgressBar