import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import MobileBottomBar from "@/components/MobileBottomBar";

// Bundle related components into 2 chunks instead of 10
const ContentBundle = lazy(() =>
  import("@/components/bundles/ContentBundle").then((m) => ({
    default: () => (
      <>
        <m.AboutUs />
        <m.RealWork />
        <m.TrustedBy />
        <m.Services />
        <m.Benefits />
        <m.WhyChooseUs />
      </>
    ),
  }))
);

const ClosingBundle = lazy(() =>
  import("@/components/bundles/ClosingBundle").then((m) => ({
    default: () => (
      <>
        <m.Process />
        <m.PartnershipModel />
        <m.CallToAction />
        <m.Footer />
      </>
    ),
  }))
);

const Index = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsBar />
      <Suspense fallback={null}>
        <ContentBundle />
        <ClosingBundle />
      </Suspense>
    </main>
  );
};

export default Index;
