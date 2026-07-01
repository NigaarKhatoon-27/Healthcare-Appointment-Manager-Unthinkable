import Hero from "../../components/home/Hero";
import Features from "../../components/home/Features";
import Statistics from "../../components/home/Statistics";
import Services from "../../components/home/Services";
import DoctorsPreview from "../../components/home/DoctorsPreview";
import AISection from "../../components/home/AISection";
import HowItWorks from "../../components/home/HowItWorks";
import Testimonials from "../../components/home/Testimonials";
import FAQ from "../../components/home/FAQ";
import CTA from "../../components/home/CTA";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Features */}
      <Features />

      {/* Statistics */}
      <Statistics />

      {/* Services */}
      <Services />

      {/* Doctors */}
      <DoctorsPreview />

      {/* AI */}
      <AISection />

      {/* Process */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <CTA />
    </>
  );
}