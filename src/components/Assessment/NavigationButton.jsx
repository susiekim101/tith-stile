import styles from "../../css/Assessment.module.css";
const NavigationButton = ({index, setIndex, total}) => {
    let prev = <button
                type="button"
                onClick={() => setIndex(prev => Math.max(0, prev - 1))}
                disabled={index === 0}
                className={styles.prev} >
                ←
            </button>;
    let next = <button
                type="button"
                onClick={() => setIndex(prev => Math.min(total, prev + 1))}
                disabled={index === total - 1}
                className={styles.next}>
                →
            </button>;

    let submit = <button
                type="submit"
                className={styles.submit}
                >
                Submit
                </button>;

    if (index === 0) {
        prev = <p> </p>;
    } else if (index === total - 1) {
        next = submit;
    }

    return (
        <>
        <div className={styles.footerButtons}>
            {prev}
            {next}
        </div>
        </>
    );
}

export default NavigationButton;