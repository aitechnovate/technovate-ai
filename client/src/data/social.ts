/**
 * Social proof — testimonials and FAQ content used across the site.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatarInitials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Technovate AI rebuilt our prior-auth workflow in 9 weeks. We saved 14 hours per clinician per week and reduced denials by 38%.",
    name: "Dr. Lena Park",
    role: "Chief Medical Officer",
    company: "Northwind Health",
    avatarInitials: "LP",
  },
  {
    quote:
      "Their AI agents handle 62% of inbound customer requests end-to-end. Our CSAT went up while our headcount stayed flat.",
    name: "Marcus Wei",
    role: "VP, Customer Experience",
    company: "Lumen Retail",
    avatarInitials: "MW",
  },
  {
    quote:
      "The RAG system they shipped lets our analysts query a decade of filings in plain English. It's a force multiplier.",
    name: "Priya Iyer",
    role: "Head of Research Engineering",
    company: "Atlas Capital",
    avatarInitials: "PI",
  },
  {
    quote:
      "We went from a six-month AI roadmap to a working pilot in three weeks. The team feels like an extension of ours.",
    name: "Jonas Reuter",
    role: "Director of Operations",
    company: "Vertex Manufacturing",
    avatarInitials: "JR",
  },
  {
    quote:
      "Honest, technical, and obsessed with measurable outcomes. I'd hire them again before any of the big consultancies.",
    name: "Aisha Bello",
    role: "CTO",
    company: "Helios Logistics",
    avatarInitials: "AB",
  },
];

export type FaqItem = {
  question: string;
  answer: string;
  category?: "general" | "engagement" | "security" | "pricing";
};

export const faqItems: FaqItem[] = [
  {
    question: "What does Technovate AI actually do?",
    answer:
      "We design, build, and deploy production AI systems — from strategy workshops to custom LLM applications, automation workflows, and analytics platforms. Most engagements blend consulting, prototyping, and engineering.",
    category: "general",
  },
  {
    question: "How long does a typical engagement take?",
    answer:
      "Discovery and roadmaps run 2–4 weeks. Pilots ship in 4–8 weeks. Production systems are typically live within 8–16 weeks depending on data, integration, and compliance scope.",
    category: "engagement",
  },
  {
    question: "Which AI models and platforms do you support?",
    answer:
      "We're model-agnostic. We routinely work with OpenAI, Anthropic Claude, Google Gemini, Mistral, and a number of fine-tuned open models — chosen to fit cost, latency, and compliance requirements.",
    category: "general",
  },
  {
    question: "Can you work with our existing data infrastructure?",
    answer:
      "Yes. We integrate with Snowflake, BigQuery, Databricks, Postgres, MongoDB, and most cloud object stores. We'll never lock you into a proprietary data layer.",
    category: "engagement",
  },
  {
    question: "How do you handle security and compliance?",
    answer:
      "We are SOC 2 Type II and ISO 27001 certified. All code is reviewed, deployed through auditable pipelines, and we sign DPAs, BAAs, and custom security addenda where required.",
    category: "security",
  },
  {
    question: "What about HIPAA, GDPR, or regulated data?",
    answer:
      "We routinely build in HIPAA, GDPR, PCI-DSS, and FedRAMP-aligned environments. We'll work with your security and legal teams from day one.",
    category: "security",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Three models: fixed-scope project, monthly retainer for ongoing engineering, and outcome-based pricing tied to KPIs. Most clients start with a fixed-scope pilot.",
    category: "pricing",
  },
  {
    question: "Do you offer a free AI assessment?",
    answer:
      "Yes. We run a complimentary 30-minute AI Maturity Assessment that benchmarks your readiness, identifies quick wins, and produces a one-page recommendation.",
    category: "pricing",
  },
  {
    question: "Who owns the IP and code?",
    answer:
      "You do. Every line of code, model weight, and prompt we produce is assigned to your company on delivery. No black-box dependencies.",
    category: "engagement",
  },
  {
    question: "Can you train our internal team?",
    answer:
      "Yes. We pair with your engineers during the engagement and run hands-on workshops on prompt engineering, evaluation, and MLOps at the end of every project.",
    category: "engagement",
  },
  {
    question: "Where is your team based?",
    answer:
      "San Francisco HQ with engineering staff across North America, Europe, and South Asia. We work fully remote-first and overlap at least four hours with your timezone.",
    category: "general",
  },
  {
    question: "What happens after launch?",
    answer:
      "We offer tiered support — from monitoring and incident response to a fractional AI engineering team that keeps shipping improvements month over month.",
    category: "engagement",
  },
];