import MeetingCard from "./MeetingCard";
import styles from "./OverviewSection.module.css";

const OverviewSection = () => {
  return (
    <>
      <section id="overview">
        <h1 className={styles.h1}>What to Expect</h1>
        <h3>We'll meet with you three times before your move-in day.</h3>
        <div className={styles.cardContainer}>
          <MeetingCard
            number="1"
            picture=""
            title="Title"
            description="Your “Stile” quiz and intake – so we can get to know your needs, preferences, and what helps you feel safe"
          />
          <MeetingCard
            number="2"
            picture=""
            title="Title"
            description="A walk-through of your new home"
          />
          <MeetingCard
            number="3"
            picture=""
            title="Title"
            description="Your move-in and installation day"
          />
        </div>
      </section>
    </>
  );
};

export default OverviewSection;
