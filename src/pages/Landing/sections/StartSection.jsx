import styles from "./StartSection.module.css";
import StartChecklist from "../components/StartChecklist";

const StartSection = () => {
  return (
    <>
      <h1>Let's Get Started</h1>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <StartChecklist
            title="Help us get to know you"
            description="This quiz is a way for us to get to know you—your needs, your preferences, your story, and what helps you feel grounded and safe in your space."
          />
          <StartChecklist
            title="A space that reflects YOU"
            description="The more you feel comfortable sharing, the better we can collaborate to create a home that reflects who you are and supports your healing, stability, growth & gets you on the path to thriving."
          />
          <StartChecklist
            title="Collaboration is key"
            description="Your collaboration and voice in this process is essential—and your space should reflect it."
          />
        </div>
        <div className={styles.right}>
          <img className={styles.img} src="" alt="" />
        </div>
      </div>
    </>
  );
};

export default StartSection;
