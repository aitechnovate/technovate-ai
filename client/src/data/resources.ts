/**
 * Resource library — powers `/resources` (hub) and the format-specific
 * sub-routes: tutorials, whitepapers, webinars, docs, and news.
 */

import type { IconName } from "@/components/ui/Icon";

export type Tutorial = {
  slug: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  minutes: number;
  topics: string[];
  author: string;
};

export const tutorials: Tutorial[] = [
  {
    slug: "claude-tool-use",
    title: "Production-grade tool use with Claude",
    description:
      "Strict schemas, idempotency keys, structured errors, and the observability that makes tool calls debuggable six weeks later.",
    level: "Intermediate",
    minutes: 18,
    topics: ["Tool use", "Claude", "Reliability"],
    author: "Anand Subramanian",
  },
  {
    slug: "evaluating-rag",
    title: "How we evaluate RAG systems in production",
    description:
      "Build the labeled query set first, measure retrieval separately from generation, and gate deploys on the result.",
    level: "Intermediate",
    minutes: 22,
    topics: ["RAG", "Evaluation", "Retrieval"],
    author: "Sana Qureshi",
  },
  {
    slug: "prompt-evals",
    title: "Building a prompt regression test suite",
    description:
      "Turn prompt engineering from art into practice with CI-friendly evals you can run on every commit.",
    level: "Beginner",
    minutes: 15,
    topics: ["Evaluation", "CI", "Prompting"],
    author: "Sana Qureshi",
  },
  {
    slug: "hybrid-retrieval",
    title: "Hybrid retrieval from scratch",
    description:
      "Combining BM25 with dense embeddings and a cross-encoder reranker — and measuring whether it actually helped.",
    level: "Advanced",
    minutes: 26,
    topics: ["RAG", "Retrieval", "Search"],
    author: "David Okafor",
  },
  {
    slug: "agent-checkpoints",
    title: "Adding deterministic checkpoints to an agent",
    description:
      "Confidence gates, policy checks, and blast-radius limits implemented in code rather than left to the model.",
    level: "Advanced",
    minutes: 20,
    topics: ["Agents", "Safety", "Architecture"],
    author: "David Okafor",
  },
  {
    slug: "cost-telemetry",
    title: "Attributing LLM spend to features and teams",
    description:
      "Instrument token usage end-to-end so the month-end invoice stops being a surprise.",
    level: "Beginner",
    minutes: 12,
    topics: ["Observability", "Cost", "Platform"],
    author: "Mariana Costa",
  },
];

export type Whitepaper = {
  slug: string;
  title: string;
  description: string;
  pages: number;
  topics: string[];
  featured?: boolean;
};

export const whitepapers: Whitepaper[] = [
  {
    slug: "ai-roi-playbook",
    title: "The AI ROI Playbook",
    description:
      "Five dimensions to measure, three traps to avoid, and the one question we ask every prospective client before scoping an engagement.",
    pages: 38,
    topics: ["ROI", "Strategy", "Measurement"],
    featured: true,
  },
  {
    slug: "rag-architecture",
    title: "RAG architecture deep dive",
    description:
      "The reference architecture we ship for citation-grounded enterprise RAG, with diagrams, tradeoffs, and the failure modes each choice accepts.",
    pages: 26,
    topics: ["RAG", "Architecture", "Retrieval"],
  },
  {
    slug: "agents-reliability",
    title: "Reliability patterns for AI agents",
    description:
      "Deterministic checkpoints, replayable traces, and the boring infrastructure that makes autonomous agents trustworthy enough to authorize.",
    pages: 42,
    topics: ["Agents", "Reliability", "Governance"],
  },
  {
    slug: "model-risk-governance",
    title: "Model risk governance for LLM systems",
    description:
      "Mapping SR 11-7 expectations onto generative systems: validation evidence, monitoring plans, and the documentation your MRM function will ask for.",
    pages: 31,
    topics: ["Governance", "Compliance", "Finance"],
  },
];

export type Webinar = {
  slug: string;
  title: string;
  description: string;
  status: "Upcoming" | "On-demand";
  date: string;
  duration: string;
  speakers: { name: string; role: string }[];
};

export const webinars: Webinar[] = [
  {
    slug: "rag-eval-live",
    title: "Live: building a RAG evaluation harness",
    description:
      "A hands-on session — bring your laptop and leave with a working eval suite running against your own corpus.",
    status: "Upcoming",
    date: "August 14, 2026",
    duration: "90 minutes",
    speakers: [
      { name: "Sana Qureshi", role: "Staff ML Engineer" },
      { name: "Anand Subramanian", role: "Senior Engineer" },
    ],
  },
  {
    slug: "ai-maturity-2026",
    title: "AI Maturity in 2026: what we learned from 240 deployments",
    description:
      "The patterns we have seen across enterprise AI deployments this year — what separates the systems still running from the ones quietly switched off.",
    status: "On-demand",
    date: "June 3, 2026",
    duration: "45 minutes",
    speakers: [{ name: "Mariana Costa", role: "Engagement Lead" }],
  },
  {
    slug: "agents-in-production",
    title: "Agents in production: a post-mortem tour",
    description:
      "Four real incidents from agent deployments, what caused each one, and the controls that would have prevented them.",
    status: "On-demand",
    date: "April 22, 2026",
    duration: "60 minutes",
    speakers: [{ name: "David Okafor", role: "Head of Platform" }],
  },
];

export type DocSection = {
  slug: string;
  title: string;
  description: string;
  icon: IconName;
  articles: { title: string; minutes: number; kind: "Guide" | "Reference" }[];
};

export const docSections: DocSection[] = [
  {
    slug: "ai-platform-suite",
    title: "AI Platform Suite",
    description:
      "Deploy models, run evaluations, and ship guarded endpoints from one console.",
    icon: "Server",
    articles: [
      { title: "Getting started", minutes: 12, kind: "Guide" },
      { title: "Model registry & promotion", minutes: 9, kind: "Guide" },
      { title: "Writing an evaluation suite", minutes: 16, kind: "Guide" },
      { title: "Policy engine reference", minutes: 0, kind: "Reference" },
      { title: "Traces API", minutes: 0, kind: "Reference" },
    ],
  },
  {
    slug: "automation-tools",
    title: "Automation Tools",
    description:
      "Triggers, actions, human-in-the-loop checkpoints, and audit hooks for the workflow runtime.",
    icon: "Wand2",
    articles: [
      { title: "Your first workflow", minutes: 10, kind: "Guide" },
      { title: "Approval steps & escalation", minutes: 8, kind: "Guide" },
      { title: "Building a custom connector", minutes: 21, kind: "Guide" },
      { title: "Runtime API", minutes: 0, kind: "Reference" },
      { title: "Webhook events", minutes: 0, kind: "Reference" },
    ],
  },
  {
    slug: "knowledge-assistant",
    title: "Knowledge Assistant",
    description:
      "Source connectors, role-aware retrieval, and access control configuration.",
    icon: "MessageSquareText",
    articles: [
      { title: "Connecting your first source", minutes: 7, kind: "Guide" },
      { title: "Source scopes & ACLs", minutes: 18, kind: "Guide" },
      { title: "Embedding the widget", minutes: 11, kind: "Guide" },
      { title: "Admin API", minutes: 0, kind: "Reference" },
    ],
  },
  {
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    description:
      "Metric catalog, anomaly configuration, and embedded reporting.",
    icon: "BarChart3",
    articles: [
      { title: "Defining your first metric", minutes: 9, kind: "Guide" },
      { title: "Tuning anomaly sensitivity", minutes: 14, kind: "Guide" },
      { title: "Embedding with row-level security", minutes: 17, kind: "Guide" },
      { title: "Semantic layer reference", minutes: 0, kind: "Reference" },
    ],
  },
];

export type NewsItem = {
  slug: string;
  title: string;
  description: string;
  kind: "Press" | "Product" | "Company";
  date: string; // ISO
};

export const newsItems: NewsItem[] = [
  {
    slug: "platform-ga",
    title: "AI Platform Suite reaches general availability",
    description:
      "After a year of internal use and six months of beta with design partners, our platform is now generally available for enterprise customers.",
    kind: "Product",
    date: "2026-03-11",
  },
  {
    slug: "analytics-beta",
    title: "Analytics Dashboard enters public beta",
    description:
      "Narrative anomaly detection and driver analysis are now open to all customers, with embedding still rolling out deliberately.",
    kind: "Product",
    date: "2026-01-28",
  },
  {
    slug: "series-a",
    title: "Technovate AI raises $14M Series A",
    description:
      "Led by Founders Fund. The capital goes toward scaling engineering and accelerating platform investment.",
    kind: "Press",
    date: "2025-07-09",
  },
  {
    slug: "soc2-iso",
    title: "Now SOC 2 Type II and ISO 27001 certified",
    description:
      "Two years of audited controls across our engineering organization and delivery practice.",
    kind: "Company",
    date: "2025-05-14",
  },
  {
    slug: "london-office",
    title: "Opening our London engineering hub",
    description:
      "A second engineering hub to support European clients within their own data-residency requirements.",
    kind: "Company",
    date: "2024-11-05",
  },
];

/** Format-level metadata used by the resources hub and sub-route headers. */
export const resourceFormats = [
  {
    slug: "blog",
    label: "Blog",
    href: "/resources/blog",
    description: "Engineering notes and product updates from our team.",
    icon: "Newspaper" as IconName,
  },
  {
    slug: "tutorials",
    label: "Tutorials",
    href: "/resources/tutorials",
    description: "Hands-on guides for builders shipping production AI.",
    icon: "Terminal" as IconName,
  },
  {
    slug: "whitepapers",
    label: "Whitepapers",
    href: "/resources/whitepapers",
    description: "Deep dives on architecture, ROI, and reference designs.",
    icon: "FileText" as IconName,
  },
  {
    slug: "webinars",
    label: "Webinars",
    href: "/resources/webinars",
    description: "Live and on-demand sessions with our engineering team.",
    icon: "Video" as IconName,
  },
  {
    slug: "docs",
    label: "Documentation",
    href: "/resources/docs",
    description: "Reference docs for our products, updated each release.",
    icon: "Code2" as IconName,
  },
  {
    slug: "news",
    label: "News",
    href: "/resources/news",
    description: "Company announcements, milestones, and press releases.",
    icon: "Bell" as IconName,
  },
];
