import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const AboutUs = lazy(() => import("@/components/AboutUs"));
const RealWork = lazy(() => import("@/components/RealWork"));
const Services = lazy(() => import("@/components/Services"));
const Benefits = lazy(() => import("@/components/Benefits"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const PartnershipModel = lazy(() => import("@/components/PartnershipModel"));
const Process = lazy(() => import("@/components/Process"));
const BonusPositioning = lazy(() => import("@/components/BonusPositioning"));
const CallToAction = lazy(() => import("@/components/CallToAction"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <AboutUs />
        <RealWork />
        <Services />
        <Benefits />
        <WhyChooseUs />
        <Process />
        <PartnershipModel />
        <BonusPositioning />
        <CallToAction />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
