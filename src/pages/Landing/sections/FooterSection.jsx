import styles from "./FooterSection.module.css";

const FooterSection = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>
          TORI IN THE HOUSE
          <br />
          Los Angeles, CA
        </p>
        <a href="mailto:info@torinthehouse.org">info@torinthehouse.org</a>
        <p>Tax ID: 99-4846300</p>
      </div>
      <div className={styles.socials}>
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
        <a href="#">YouTube</a>
      </div>
      <p className={styles.small}>© Tori in the House</p>
    </footer>
  );
};

export default FooterSection;
