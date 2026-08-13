/**
 * Site-wide contact info, metadata, and barrel re-exports for the
 * split mock-data modules. The split exists to keep each module focused —
 * components should import from `@/data/site` for the canonical entrypoint.
 */

export const siteInfo = {
  name: "Technovate AI",
  legalName: "Technovate AI Inc.",
  tagline: "Innovate. Automate. Elevate.",
  description:
    "Enterprise AI consulting, automation, and custom development. We help ambitious teams ship AI that pays for itself.",
  url: "https://technovate.ai",
  email: "hello@technovate.ai",
  phone: "+92 324 9717097",
  /** wa.me requires digits only — no "+", spaces, or punctuation. */
  whatsapp: "923249717097",
  address: {
    street: "Mustafa Town",
    city: "Lahore",
    country: "Pakistan",
    /** Single-line form for map links and anywhere the parts would read oddly. */
    formatted: "Mustafa Town, Lahore, Pakistan",
  },
  founded: "2022",
  social: {
    linkedin: "https://www.linkedin.com/company/technovate-ai",
    twitter: "https://x.com/technovate_ai",
    github: "https://github.com/technovate-ai",
    youtube: "https://youtube.com/@technovate-ai",
  },
} as const;

/* Re-export split modules so consumers can use a single import path. */
export * from "./nav";
export * from "./social";
export * from "./content";
export * from "./trust";