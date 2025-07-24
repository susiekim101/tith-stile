import styles from "./Landing.module.css";
import HeroSection from "./HeroSection";
import OverviewSection from "./OverviewSection";
import SupportSection from "./SupportSection";
import StartSection from "./StartSection";
import FooterSection from "./FooterSection";

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
      <SupportSection />
      <StartSection />
      <FooterSection />
    </div>
  );
}

export default Landing;
