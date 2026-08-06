import type { Metadata } from "next";
import { PortfolioPageContent } from "./PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected AI systems we have shipped to production, across healthcare, finance, logistics, and retail.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio — Technovate AI",
    description: "Selected AI systems we have shipped to production, across healthcare, finance, logistics, and retail.",
    url: "/portfolio",
    type: "website",
  },
};

/**
 * /portfolio — server shell. A "use client" page cannot export metadata, so
 * this route had been shipping with no title, description, or canonical at all.
 * The interactive body (category filtering over the portfolio grid) stays in PortfolioPageContent.
 */
export default function Page() {
  return <PortfolioPageContent />;
}
