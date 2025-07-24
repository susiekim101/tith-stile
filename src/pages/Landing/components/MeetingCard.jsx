import styles from "./MeetingCard.module.css";

const MeetingCard = ({ number, picture, title, description }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.meetingTag}>Meeting {number}</h3>
      <img className={styles.image} src={picture} alt={picture} />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default MeetingCard;
