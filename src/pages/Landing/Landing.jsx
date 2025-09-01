import styles from "./Landing.module.css";
import HeroSection from "./sections/HeroSection";
import OverviewSection from "./sections/OverviewSection";
import SupportSection from "./sections/SupportSection";
import StartSection from "./sections/StartSection";
import FooterSection from "./sections/FooterSection";

/*
 * Section - Tagline Mapping
 * Hero - Hero
 * Overview - What to Expect
 * Mission - Support our Mission
 * Start - Let's Get Started
 * Footer - Footer
 */

function Landing() {
  return (
    <div>
      <HeroSection />
      <OverviewSection />
      <StartSection />
      <FooterSection />
    </div>
  );
}

export default Landing;
