import LandingPageAbout from "./About";
import LandingPageFeatures from "./Features";
import LandingPageFooter from "./Footer";
import LandingPageHero from "./Hero";
import HowItWorks from "./HowItWorks";
import Navbar from "./Navbar";
import LandingPagePricing from "./Pricing";
import LandingPageRating from "./Rating";
import LandingPgaeReady from "./Ready";

export default function LandingPage() {
  return (
    <div className="bg-[#f8fafc]">
      <Navbar />
      <LandingPageHero />
      <LandingPageAbout />
      <LandingPageFeatures />
      {/* <HowItWorks /> */}
      <LandingPagePricing />
      <LandingPageRating />
      <LandingPgaeReady />
      <LandingPageFooter />
    </div>
  );
}
