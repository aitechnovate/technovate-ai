/**
 * Homepage metric counters and trust signal logos.
 * Placeholder entries — replace with real partner agreements before launch.
 */

export type Metric = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
};

export const metrics: Metric[] = [
  { label: "Projects Delivered", value: 240, suffix: "+", description: "Production AI systems shipped" },
  { label: "Enterprise Clients", value: 85, suffix: "+", description: "Fortune 1000 and growth-stage" },
  { label: "Countries Served", value: 22, description: "Across 4 continents" },
  { label: "Average ROI", value: 4.6, suffix: "x", description: "Client-reported within 12 months" },
  { label: "Client Satisfaction", value: 98, suffix: "%", description: "NPS-style score" },
];

/* Logo entries — name-only placeholders. We will render stylized wordmarks
   in the UI rather than licensing real third-party logos. */
export type Logo = {
  name: string;
  category?: "client" | "partner" | "certification";
};

export const trustLogos: Logo[] = [
  { name: "Northwind Health", category: "client" },
  { name: "Atlas Capital", category: "client" },
  { name: "Vertex Manufacturing", category: "client" },
  { name: "Lumen Retail", category: "client" },
  { name: "Helios Logistics", category: "client" },
  { name: "Meridian Education", category: "client" },
];

export const partnerLogos: Logo[] = [
  { name: "AWS", category: "partner" },
  { name: "Microsoft Azure", category: "partner" },
  { name: "OpenAI", category: "partner" },
  { name: "Anthropic", category: "partner" },
  { name: "Google Cloud", category: "partner" },
  { name: "Snowflake", category: "partner" },
];

export const certifications: Logo[] = [
  { name: "SOC 2 Type II", category: "certification" },
  { name: "ISO 27001", category: "certification" },
  { name: "GDPR", category: "certification" },
  { name: "HIPAA", category: "certification" },
];

/* Tech stack shown on the homepage marquee. */
export const techStack: string[] = [
  "OpenAI",
  "Claude",
  "Gemini",
  "LangChain",
  "LangGraph",
  "Python",
  "Next.js",
  "Node.js",
  "Docker",
  "AWS",
  "Azure",
  "Supabase",
  "MongoDB",
];