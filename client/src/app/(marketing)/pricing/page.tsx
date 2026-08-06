import type { Metadata } from "next";
import { PricingPageContent } from "./PricingPageContent";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent engagement models — retainer, project, and embedded squad. One standard of work at every tier.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — Technovate AI",
    description: "Transparent engagement models — retainer, project, and embedded squad. One standard of work at every tier.",
    url: "/pricing",
    type: "website",
  },
};

/**
 * /pricing — server shell. A "use client" page cannot export metadata, so
 * this route had been shipping with no title, description, or canonical at all.
 * The interactive body (the billing-period toggle) stays in PricingPageContent.
 */
export default function Page() {
  return <PricingPageContent />;
}
