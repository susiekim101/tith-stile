import OverviewBullet from "../components/OverviewBullet";
import styles from "./OverviewSection.module.css";

const OverviewSection = () => {
  return (
    <>
      <section className={styles.overview}>
        <h2 className={styles.heading}>Here’s What to Expect</h2>
        <div className={styles.stepList}>
          <div className={styles.step}>
            <span className={styles.badge}>1</span>
            <div>
              <h3>
                <b>Your Stile Quiz</b>
              </h3>
              <p>
                We get to know your needs, preferences, and what helps you feel
                safe.
              </p>
            </div>
          </div>
          <div className={styles.step}>
            <span className={styles.badge}>2</span>
            <div>
              <h3>
                <b>Home Walk-Through</b>
              </h3>
              <p>We’ll visit your new space to plan the perfect setup.</p>
            </div>
          </div>
          <div className={styles.step}>
            <span className={styles.badge}>3</span>
            <div>
              <h3>
                <b>Move-In Day</b>
              </h3>
              <p>We’ll help set up your space exactly how you want it.</p>
            </div>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#DDEEE2"
            fillOpacity="1"
            d="M0,192L80,208C160,224,320,256,480,250.7C640,245,800,203,960,170.7C1120,139,1280,117,1360,106.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </section>
    </>
  );
};

export default OverviewSection;
