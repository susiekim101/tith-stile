import "./Landing.css";
import HeroSection from "./HeroSection";
import OverviewSection from "./OverviewSection";
import SupportSection from "./SupportSection";
import StartSection from "./StartSection";

/*
 * Section - Tagline Mapping
 * Hero - Hero
 * Overview - What to Expect
 * Mission - Support our Mission
 * Start - Let's Get Started
 */

function Landing() {
  return (
    <div className="landingWrapper">
      <HeroSection />
      <OverviewSection />
      <SupportSection />
      <StartSection />
    </div>
  );
}

export default Landing;
