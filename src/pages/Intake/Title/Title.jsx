import styles from "./Title.module.css";

const Title = () => {
    return (
        <div className={styles.titleContainer}>
            <span className={styles.title}>Let's Get Started</span>

            <span className={styles.sub}>Help us create a personalized home assessment that considers your unique needs and preferences.</span>
        </div>
    );
}

export default Title;