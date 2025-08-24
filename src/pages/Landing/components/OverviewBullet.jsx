import styles from "./OverviewBullet.module.css";

const OverviewBullet = ({ number, title, description }) => {
  return (
    <div className={styles.overviewBullet}>
      <h1>{number}</h1>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default OverviewBullet;
