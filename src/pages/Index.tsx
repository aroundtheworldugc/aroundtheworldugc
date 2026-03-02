import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import RealWork from "@/components/RealWork";
import Services from "@/components/Services";
import Benefits from "@/components/Benefits";
import WhyChooseUs from "@/components/WhyChooseUs";
import PartnershipModel from "@/components/PartnershipModel";
import Process from "@/components/Process";
import BonusPositioning from "@/components/BonusPositioning";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutUs />
      <RealWork />
      <Services />
      <Benefits />
      <WhyChooseUs />
      <PartnershipModel />
      <Process />
      <BonusPositioning />
      <CallToAction />
      <Footer />
    </main>
  );
};

export default Index;
