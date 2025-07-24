import styles from "./FooterSection.module.css";
import GetStartedButton from "../components/GetStartedButton";

const FooterSection = () => {
  return (
    <section className={styles.footer}>
      <h1>Ready to Transform Your Space?</h1>
      <p className={styles.p}>
        At Tori in the House, we do our best to practice ethical storytelling
        and honor your dignity. We will never use your real name or any
        identifying details without your permission.{" "}
      </p>
      <p className={styles.p}>
        If there’s a name or nickname you’d like us to use in any future
        storytelling (such as in photos, videos, or captions), feel free to
        share it in the quiz.
      </p>
      <GetStartedButton textColor="text-light" bgColor="bgMaroon" />
    </section>
  );
};

export default FooterSection;
