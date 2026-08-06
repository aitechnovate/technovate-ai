import type { Metadata } from "next";
import { CaseStudiesPageContent } from "./CaseStudiesPageContent";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Measured outcomes from production AI engagements — the problem, the build, and the numbers that followed.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies — Technovate AI",
    description: "Measured outcomes from production AI engagements — the problem, the build, and the numbers that followed.",
    url: "/case-studies",
    type: "website",
  },
};

/**
 * /case-studies — server shell. A "use client" page cannot export metadata, so
 * this route had been shipping with no title, description, or canonical at all.
 * The interactive body (filter pills over the case-study index) stays in CaseStudiesPageContent.
 */
export default function Page() {
  return <CaseStudiesPageContent />;
}
