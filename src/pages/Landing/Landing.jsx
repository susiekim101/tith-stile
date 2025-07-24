import "./Landing.css";
import HeroSection from "./HeroSection";
import OverviewSection from "./OverviewSection";
/*import Support from "./SupportSection";
import Start from "./StartSection";*/

/*
 * Section - Tagline Mapping
 * Hero - Hero
 * Overview - What to Expect
 * Mission - Support our Mission
 * Start - Let's Get Started
 */

function Landing() {
  return (
    <>
      <HeroSection />
      <OverviewSection />
      {/*
      <SupportSection />
      <StartSection />
      */}
    </>
  );
}

export default Landing;
