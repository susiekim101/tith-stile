import styles from "./FooterSection.module.css";

const FooterSection = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.logo}>TORI IN THE HOUSE</p>
      <p className={styles.location}>Los Angeles, CA</p>
      <a className={styles.email} href="mailto:info@torinthehouse.org">
        info@torinthehouse.org
      </a>
      <p className={styles.npo}>
        Tori in the House is a registered 501(C)(3) nonprofit organization.{" "}
      </p>
      <p className={styles.taxId}> Tax ID: 99-4846300</p>

      {/*
      <div className={styles.socials}>
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
        <a href="#">YouTube</a>
      </div>
      */}

      <p className={styles.small}>© Tori in the House</p>
    </footer>
  );
};

export default FooterSection;
