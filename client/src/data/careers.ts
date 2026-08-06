/**
 * Open roles — powers `/careers` (index) and `/careers/[slug]` (detail +
 * application form UI).
 */

export type Role = {
  slug: string;
  title: string;
  team: "Engineering" | "Strategy" | "Design" | "Operations";
  location: string;
  type: "Full-time" | "Contract" | "Internship";
  level: "Senior" | "Staff" | "Principal" | "Intern";

  /* ---- detail-page content ---- */

  salaryRange: string;
  summary: string;
  /** What the role owns day to day. */
  responsibilities: string[];
  /** Hard requirements. */
  requirements: string[];
  /** Nice-to-haves. */
  bonus: string[];
  /** What the first quarter looks like. */
  firstQuarter: { period: string; description: string }[];
};

export const roles: Role[] = [
  {
    slug: "staff-ml-engineer",
    title: "Staff ML Engineer, RAG & Agents",
    team: "Engineering",
    location: "Remote (US/EU)",
    type: "Full-time",
    level: "Staff",
    salaryRange: "$230,000 – $290,000 + equity",
    summary:
      "Own the technical direction of our retrieval and agent work across client engagements. You will be the person clients escalate to when a system needs to be right, not just impressive.",
    responsibilities: [
      "Lead architecture on retrieval and agent engagements from discovery through production",
      "Set the evaluation bar — design benchmarks before anyone writes retrieval code",
      "Review designs across the engineering org and raise the floor on reliability practice",
      "Work directly with client engineering leadership as the senior technical voice",
      "Contribute reference implementations back into our internal platform",
    ],
    requirements: [
      "8+ years engineering experience, with 3+ shipping ML or LLM systems to production",
      "Demonstrated depth in retrieval: hybrid search, reranking, and honest evaluation",
      "Experience owning a system through a compliance or security review",
      "Strong written communication — we write designs down before we build them",
    ],
    bonus: [
      "Consulting or client-facing delivery experience",
      "Published writing or conference talks on production ML",
      "Background in a regulated domain (healthcare, financial services)",
    ],
    firstQuarter: [
      {
        period: "Weeks 1–3",
        description:
          "Pair on an active engagement, read our reference architectures, and ship a meaningful change to an existing eval harness.",
      },
      {
        period: "Weeks 4–8",
        description:
          "Take technical ownership of one client engagement end to end, with a principal engineer available but not embedded.",
      },
      {
        period: "Weeks 9–13",
        description:
          "Lead a discovery for a new engagement and set the architecture direction. Begin reviewing designs across other squads.",
      },
    ],
  },
  {
    slug: "senior-platform-engineer",
    title: "Senior Platform Engineer",
    team: "Engineering",
    location: "San Francisco / Remote",
    type: "Full-time",
    level: "Senior",
    salaryRange: "$185,000 – $235,000 + equity",
    summary:
      "Build the internal platform every engagement depends on — eval infrastructure, observability, deployment tooling. The unglamorous work that makes everything else faster.",
    responsibilities: [
      "Own and extend the evaluation and observability infrastructure used across all engagements",
      "Build deployment tooling that gets a client system to production in days rather than weeks",
      "Reduce the operational burden on delivery squads through better defaults and automation",
      "Run incident response for platform services and drive the follow-up fixes",
      "Partner with delivery engineers to turn recurring engagement work into platform capability",
    ],
    requirements: [
      "5+ years in platform, infrastructure, or developer-experience engineering",
      "Strong Python or TypeScript, and comfort operating production systems on AWS or Azure",
      "Experience building tooling other engineers depend on daily",
      "A bias toward boring, reliable solutions over novel ones",
    ],
    bonus: [
      "Experience with LLM observability or evaluation tooling",
      "Kubernetes and infrastructure-as-code depth",
      "Prior work in a consulting or agency environment",
    ],
    firstQuarter: [
      {
        period: "Weeks 1–3",
        description:
          "Onboard onto the platform codebase and ship improvements to the deployment path — starting with whatever frustrated you during onboarding.",
      },
      {
        period: "Weeks 4–8",
        description:
          "Own a platform surface end to end. Join the on-call rotation with a buddy.",
      },
      {
        period: "Weeks 9–13",
        description:
          "Lead a platform initiative sourced from delivery-team pain, from proposal through rollout.",
      },
    ],
  },
  {
    slug: "principal-architect",
    title: "Principal AI Architect",
    team: "Engineering",
    location: "Remote (Global)",
    type: "Full-time",
    level: "Principal",
    salaryRange: "$280,000 – $340,000 + equity",
    summary:
      "Set the technical standard for the firm. You will shape how we approach engagements, what we refuse to build, and how we defend those calls to clients.",
    responsibilities: [
      "Define reference architectures and delivery standards used across every engagement",
      "Act as the senior technical authority in pre-sales discovery and scoping conversations",
      "Arbitrate difficult build-vs-buy and architecture decisions across concurrent engagements",
      "Mentor staff and senior engineers, and raise the bar in design review",
      "Represent the firm's technical point of view publicly through writing and speaking",
    ],
    requirements: [
      "12+ years engineering experience with significant time as a technical leader",
      "Deep production experience across multiple AI system classes — retrieval, agents, and predictive modeling",
      "Track record of saying no to work that should not be built, with the reasoning to back it",
      "Exceptional written and verbal communication with executive audiences",
    ],
    bonus: [
      "Experience scaling a consulting or product engineering organization",
      "Recognized public presence in the AI engineering community",
      "Depth in model risk governance or regulated deployment",
    ],
    firstQuarter: [
      {
        period: "Weeks 1–4",
        description:
          "Review every active engagement and our full body of reference architecture. Deliver a written assessment of where our standards are weakest.",
      },
      {
        period: "Weeks 5–9",
        description:
          "Drive resolution on the highest-leverage gap you identified, and begin joining discovery conversations as the technical authority.",
      },
      {
        period: "Weeks 10–13",
        description:
          "Own the technical standard end to end, including design review cadence and the architecture decision record practice.",
      },
    ],
  },
  {
    slug: "engagement-lead",
    title: "Engagement Lead, Financial Services",
    team: "Strategy",
    location: "New York / Remote",
    type: "Full-time",
    level: "Senior",
    salaryRange: "$175,000 – $220,000 + equity",
    summary:
      "Own client relationships and delivery outcomes for our financial services book. You are accountable for the engagement succeeding, not for hours billed.",
    responsibilities: [
      "Own the client relationship and the written definition of done for each engagement",
      "Run discovery and scoping, including honest recommendations to not proceed",
      "Coordinate delivery squads without becoming a message-passing layer between them and the client",
      "Navigate model risk, compliance, and procurement processes on the client side",
      "Grow accounts by earning the next engagement, not by upselling the current one",
    ],
    requirements: [
      "6+ years in consulting, delivery leadership, or technical program management",
      "Working fluency in financial services — model risk, compliance, and how decisions get approved",
      "Enough technical depth to challenge an architecture proposal credibly",
      "Comfort telling a client something they do not want to hear",
    ],
    bonus: [
      "Prior experience at a financial institution",
      "Background in data or ML delivery specifically",
      "Existing network in financial services technology leadership",
    ],
    firstQuarter: [
      {
        period: "Weeks 1–3",
        description:
          "Shadow two active engagements and meet every client in the financial services book.",
      },
      {
        period: "Weeks 4–8",
        description:
          "Take ownership of one existing engagement with the outgoing lead available for support.",
      },
      {
        period: "Weeks 9–13",
        description:
          "Run a discovery independently and own the resulting scope, pricing, and delivery plan.",
      },
    ],
  },
  {
    slug: "product-designer",
    title: "Senior Product Designer, AI Products",
    team: "Design",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salaryRange: "$165,000 – $205,000 + equity",
    summary:
      "Design the interfaces where people work alongside AI — review queues, agent approvals, citation surfaces. Interaction problems nobody has solved conventions for yet.",
    responsibilities: [
      "Design human-in-the-loop interfaces optimized for throughput, not first-impression polish",
      "Solve for uncertainty in the UI — confidence, provenance, and the option to disagree",
      "Own design across our product suite and contribute patterns to the design system",
      "Run research directly with the operators who will use what you design",
      "Partner closely with engineers from architecture through implementation",
    ],
    requirements: [
      "5+ years designing complex software, ideally internal tools or data-dense products",
      "Strong systems thinking and a portfolio showing depth over visual variety",
      "Experience designing for expert users doing repetitive, high-volume work",
      "Comfort working in code-adjacent detail with engineers",
    ],
    bonus: [
      "Prior work on AI or ML-facing interfaces",
      "Front-end implementation ability",
      "Experience in regulated or safety-critical domains",
    ],
    firstQuarter: [
      {
        period: "Weeks 1–3",
        description:
          "Audit the existing product surfaces and sit with real operators using our review queues.",
      },
      {
        period: "Weeks 4–8",
        description:
          "Own design for one product area end to end, shipping at least one meaningful interaction improvement.",
      },
      {
        period: "Weeks 9–13",
        description:
          "Lead the design direction on a new product surface and formalize the patterns into the design system.",
      },
    ],
  },
  {
    slug: "ml-engineer-intern",
    title: "ML Engineer Intern — Summer 2026",
    team: "Engineering",
    location: "San Francisco",
    type: "Internship",
    level: "Intern",
    salaryRange: "$9,500 / month + housing stipend",
    summary:
      "A twelve-week internship on a real engagement with a real deliverable. You will ship something to production, not build a demo that gets deleted in September.",
    responsibilities: [
      "Work on a scoped piece of a live client engagement alongside senior engineers",
      "Build and extend evaluation suites for production systems",
      "Present your work to the engineering team at the end of the internship",
      "Participate fully in design review — including reviewing other people's designs",
    ],
    requirements: [
      "Currently pursuing a degree in computer science, mathematics, or a related field",
      "Solid Python and a genuine understanding of how ML systems fail",
      "At least one substantial project you can walk through in technical detail",
      "Available for twelve weeks starting June 2026",
    ],
    bonus: [
      "Prior internship or research experience",
      "Open-source contributions",
      "Experience with LLM applications specifically",
    ],
    firstQuarter: [
      {
        period: "Weeks 1–2",
        description:
          "Onboarding, environment setup, and a first scoped contribution to an internal tool.",
      },
      {
        period: "Weeks 3–9",
        description:
          "Core project work on a live engagement with a named mentor and weekly check-ins.",
      },
      {
        period: "Weeks 10–12",
        description:
          "Ship your project, write it up, and present to the engineering team.",
      },
    ],
  },
];

/** Look up a single role by slug. */
export function getRole(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug);
}

/** Other open roles, excluding `slug`. */
export function getOtherRoles(slug: string, limit = 3): Role[] {
  return roles.filter((r) => r.slug !== slug).slice(0, limit);
}
