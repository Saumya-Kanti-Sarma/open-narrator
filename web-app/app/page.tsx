/**
 * Purpose: Main landing page — composes all sections
 * Used in: Next.js app router root route
 * Dependencies: All section components
 */
"use client";
import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import VideoSection from "@/components/VideoSection";
import PricingBlock from "@/components/PricingBlock";
import BetaSection from "@/components/BetaSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <VideoSection />
        <PricingBlock />
        <BetaSection />
        <CommunitySection />
      </main>
      <Footer />
    </>
  );
}
