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

/* Logo entries — stylized in-house lockups rather than licensed third-party
   artwork. `mark` is the monogram drawn in the badge, `glyph` picks the shape
   the badge renders, and `from`/`to` are the badge gradient stops. */
export type Logo = {
  name: string;
  category?: "client" | "partner" | "certification";
  /** Monogram shown inside the logo badge. 1–2 characters. */
  mark?: string;
  /** Badge silhouette — keeps the six client marks visually distinct. */
  glyph?: "shield" | "diamond" | "hex" | "circle" | "square" | "book";
  /** Badge gradient stops (any valid CSS color). */
  from?: string;
  to?: string;
};

export const trustLogos: Logo[] = [
  { name: "Northwind Health", category: "client", mark: "NW", glyph: "shield", from: "#0EA5A4", to: "#0F766E" },
  { name: "Atlas Capital", category: "client", mark: "AC", glyph: "diamond", from: "#1B62F0", to: "#3730A3" },
  { name: "Vertex Manufacturing", category: "client", mark: "VX", glyph: "hex", from: "#F97316", to: "#B45309" },
  { name: "Lumen Retail", category: "client", mark: "LR", glyph: "circle", from: "#DB2777", to: "#7E22CE" },
  { name: "Helios Logistics", category: "client", mark: "HL", glyph: "square", from: "#EAB308", to: "#CA8A04" },
  { name: "Meridian Education", category: "client", mark: "ME", glyph: "book", from: "#6D28D9", to: "#4338CA" },
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