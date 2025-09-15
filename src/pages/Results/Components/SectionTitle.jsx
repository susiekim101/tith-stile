import styles from "./SectionTitle.module.css";

const SectionTitle = ({title}) => {

    return (
        <div className={styles.titleContainer}>
            <div className={styles.title}>{title}</div>
        </div>
    );
}

export default SectionTitle;