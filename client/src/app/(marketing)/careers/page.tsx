import type { Metadata } from "next";
import { CareersPageContent } from "./CareersPageContent";

export const metadata: Metadata = {
  title: "Careers — Technovate AI",
  description:
    "Join a senior team of AI engineers, strategists, and designers. Remote-first with hubs in San Francisco, London, and Bengaluru.",
};

/**
 * /careers — server component shell that exports page-specific metadata.
 * The interactive body (team filter pills) lives in CareersPageContent.
 */
export default function CareersPage() {
  return <CareersPageContent />;
}
