import * as React from "react";
import { Hero } from "@/components/sections/home/Hero";
import { TrustBar } from "@/components/sections/home/TrustBar";
import { ProblemSolution } from "@/components/sections/home/ProblemSolution";
import { WhyUs } from "@/components/sections/home/WhyUs";
import { CoreSolutions } from "@/components/sections/home/CoreSolutions";
import { Industries } from "@/components/sections/home/Industries";
import { AIDemo } from "@/components/sections/home/AIDemo";
import { Process } from "@/components/sections/home/Process";
import { TechStack } from "@/components/sections/home/TechStack";
import { PortfolioHighlights } from "@/components/sections/home/PortfolioHighlights";
import { CaseStudySection } from "@/components/sections/home/CaseStudySection";
import { MetricsCounter } from "@/components/sections/home/MetricsCounter";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { Faq } from "@/components/sections/home/Faq";
import { FinalCta } from "@/components/sections/home/FinalCta";

/**
 * Homepage composition, in the order called out in spec §3.
 * The marketing layout (in `(marketing)/layout.tsx`) renders the
 * AnnouncementBar, Header, and Footer around this page.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProblemSolution />
      <WhyUs />
      <CoreSolutions />
      <Industries />
      <AIDemo />
      <Process />
      <TechStack />
      <PortfolioHighlights />
      <CaseStudySection />
      <MetricsCounter />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
