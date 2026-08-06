import type { Metadata } from "next";
import { ContactPageContent } from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a 30-minute call with a senior engineer. No SDRs, no discovery deck — an honest read on your problem.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Technovate AI",
    description: "Book a 30-minute call with a senior engineer. No SDRs, no discovery deck — an honest read on your problem.",
    url: "/contact",
    type: "website",
  },
};

/**
 * /contact — server shell. A "use client" page cannot export metadata, so
 * this route had been shipping with no title, description, or canonical at all.
 * The interactive body (the contact form and its client-side validation) stays in ContactPageContent.
 */
export default function Page() {
  return <ContactPageContent />;
}
