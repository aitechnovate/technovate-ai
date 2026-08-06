/**
 * Product catalogue — powers `/products` (index) and `/products/[slug]`
 * (detail). Mirrors the shape of `solutions.ts` so both detail templates
 * can share layout conventions.
 */

import type { IconName } from "@/components/ui/Icon";

export type Product = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: IconName;
  /** Short bullets shown on the index card. */
  features: string[];
  href: string;
  status: "GA" | "Beta" | "Early access";

  /* ---- detail-page content ---- */

  heroLead: string;
  heroHighlight: string;
  /** Who this is built for. */
  builtFor: string[];
  /** Deeper feature blocks. */
  featureDetails: { title: string; description: string; icon: IconName }[];
  /** Named modules or surfaces within the product. */
  modules: { name: string; description: string }[];
  /** Integrations the product ships with. */
  integrations: string[];
  /** Headline metrics from live deployments. */
  metrics: { label: string; value: string }[];
  /** Pricing summary (UI only — no billing wiring). */
  plans: { name: string; price: string; cadence: string; blurb: string }[];
  /** Product-specific FAQ. */
  faq: { question: string; answer: string }[];
  /** Slugs of sibling products to cross-link. */
  related: string[];
};

export const products: Product[] = [
  {
    slug: "ai-platform-suite",
    title: "AI Platform Suite",
    tagline: "Govern, deploy, and observe AI from one console.",
    description:
      "A single pane of glass for the AI lifecycle — model registry, evaluation harness, observability, cost controls, and policy enforcement. Built for teams running AI in production.",
    icon: "Server",
    features: [
      "Model registry & versioning",
      "Evaluation harness with regression alerts",
      "Live observability & tracing",
      "Policy guardrails (PII, toxicity, brand)",
      "Cost & latency telemetry",
    ],
    href: "/products/ai-platform-suite",
    status: "GA",
    heroLead: "One console for every model",
    heroHighlight: "you have in production.",
    builtFor: [
      "Platform teams supporting multiple AI product squads",
      "Organizations with model-risk or audit obligations",
      "Teams whose LLM spend has outgrown a spreadsheet",
    ],
    featureDetails: [
      {
        title: "Model registry & versioning",
        description:
          "Every model, prompt, and configuration versioned together with its evaluation results — so you always know exactly what is serving traffic.",
        icon: "Box",
      },
      {
        title: "Evaluation harness",
        description:
          "Run your eval suite on every change and block deploys that regress. Results are stored and diffable across versions.",
        icon: "TestTube",
      },
      {
        title: "Live observability",
        description:
          "Distributed tracing across prompts, retrievals, and tool calls, with full request replay for debugging weeks after the fact.",
        icon: "Activity",
      },
      {
        title: "Policy guardrails",
        description:
          "PII detection, toxicity screening, and brand-safety policies applied to both requests and responses, configurable per environment.",
        icon: "ShieldCheck",
      },
      {
        title: "Cost & latency telemetry",
        description:
          "Token and dollar attribution down to feature, team, and customer, with budget alerts that fire before invoices do.",
        icon: "DollarSign",
      },
      {
        title: "Access & audit",
        description:
          "SSO, role-based access, and an immutable audit log of every configuration change — exportable for your compliance review.",
        icon: "KeyRound",
      },
    ],
    modules: [
      {
        name: "Registry",
        description:
          "Version and promote models, prompts, and configs across dev, staging, and production.",
      },
      {
        name: "Evals",
        description:
          "Author, run, and gate on evaluation suites. CI-integrated with pass/fail thresholds.",
      },
      {
        name: "Traces",
        description:
          "Full-fidelity request tracing with replay, filtering, and saved investigations.",
      },
      {
        name: "Guard",
        description:
          "Policy engine for content safety, PII handling, and per-environment rules.",
      },
      {
        name: "Spend",
        description:
          "Cost attribution, budget enforcement, and forecast projections by team.",
      },
    ],
    integrations: [
      "Claude",
      "OpenAI",
      "Gemini",
      "AWS Bedrock",
      "Azure OpenAI",
      "Datadog",
      "Snowflake",
      "GitHub Actions",
    ],
    metrics: [
      { label: "Median deploy-to-production time", value: "12 min" },
      { label: "Regressions caught pre-deploy", value: "94%" },
      { label: "Average LLM spend reduction", value: "−38%" },
    ],
    plans: [
      {
        name: "Team",
        price: "$1,400",
        cadence: "per month",
        blurb: "Up to 10 seats, 3 environments, 30-day trace retention.",
      },
      {
        name: "Business",
        price: "$4,800",
        cadence: "per month",
        blurb: "Unlimited seats, SSO, 1-year retention, policy engine.",
      },
      {
        name: "Enterprise",
        price: "Custom",
        cadence: "annual",
        blurb: "Self-hosted or VPC deployment, custom SLAs, audit support.",
      },
    ],
    faq: [
      {
        question: "Can we self-host the platform?",
        answer:
          "Yes. Enterprise deployments run in your own VPC or on-premises, with the control plane fully isolated. We support AWS, Azure, and GCP.",
      },
      {
        question: "Does it work with models we host ourselves?",
        answer:
          "It does. Any endpoint that speaks a supported API shape can be registered, including self-hosted open-weight models behind vLLM or TGI.",
      },
      {
        question: "How does evaluation integrate with our CI?",
        answer:
          "Evals run as a step in your existing pipeline via CLI or GitHub Action, returning a pass/fail with a diff against the previous baseline.",
      },
      {
        question: "What data leaves our environment?",
        answer:
          "In self-hosted deployments, none. In managed deployments you control exactly which fields are captured in traces, with PII redaction applied before storage.",
      },
    ],
    related: ["automation-tools", "knowledge-assistant"],
  },
  {
    slug: "automation-tools",
    title: "Automation Tools",
    tagline: "Visual workflow builder for ops and revenue teams.",
    description:
      "Drag-and-drop automation that bridges your systems of record and your LLM of choice. Production-ready primitives, audited execution, and human-in-the-loop checkpoints baked in.",
    icon: "Wand2",
    features: [
      "Visual workflow editor",
      "200+ pre-built integrations",
      "Human-in-the-loop approvals",
      "Replayable execution traces",
      "Per-run audit trail",
    ],
    href: "/products/automation-tools",
    status: "GA",
    heroLead: "Build the workflow once,",
    heroHighlight: "run it ten thousand times.",
    builtFor: [
      "Operations teams whose volume outpaces their headcount",
      "Revenue teams stitching together CRM, billing, and support",
      "Anyone maintaining brittle scripts nobody wants to own",
    ],
    featureDetails: [
      {
        title: "Visual workflow editor",
        description:
          "Compose triggers, actions, branches, and model steps on a canvas — with the underlying definition stored as reviewable code.",
        icon: "LayoutGrid",
      },
      {
        title: "Durable execution",
        description:
          "Workflows survive restarts and outages, resuming exactly where they stopped. Retries are idempotent by construction.",
        icon: "RefreshCw",
      },
      {
        title: "Human-in-the-loop steps",
        description:
          "Pause for approval in Slack, email, or the web console, with full context attached and configurable SLA escalation.",
        icon: "UserCheck",
      },
      {
        title: "Replayable traces",
        description:
          "Every run recorded step-by-step and replayable against a new version, so you can prove a fix before shipping it.",
        icon: "Activity",
      },
      {
        title: "200+ integrations",
        description:
          "Salesforce, NetSuite, SAP, ServiceNow, Workday, Zendesk, Stripe, and the rest — plus a typed HTTP block for everything else.",
        icon: "Plug",
      },
      {
        title: "Per-run audit trail",
        description:
          "Immutable records of inputs, decisions, approvals, and outputs, retained for your audit window and exportable on demand.",
        icon: "FileCheck",
      },
    ],
    modules: [
      {
        name: "Canvas",
        description:
          "The visual builder — drag, connect, and configure steps with inline testing.",
      },
      {
        name: "Runs",
        description:
          "Execution history with filtering, replay, and side-by-side version comparison.",
      },
      {
        name: "Inbox",
        description:
          "The human-review queue: keyboard-first approvals with source evidence attached.",
      },
      {
        name: "Connectors",
        description:
          "Managed authentication and rate limiting for every integrated system.",
      },
    ],
    integrations: [
      "Salesforce",
      "NetSuite",
      "SAP",
      "ServiceNow",
      "Workday",
      "Zendesk",
      "Stripe",
      "Slack",
      "Microsoft Teams",
    ],
    metrics: [
      { label: "Median manual touches removed", value: "78%" },
      { label: "Straight-through processing rate", value: "62%" },
      { label: "Workflows in production per client", value: "34" },
    ],
    plans: [
      {
        name: "Starter",
        price: "$900",
        cadence: "per month",
        blurb: "10 active workflows, 25K runs/month, core connectors.",
      },
      {
        name: "Growth",
        price: "$3,200",
        cadence: "per month",
        blurb: "Unlimited workflows, 500K runs/month, approval inbox, SSO.",
      },
      {
        name: "Enterprise",
        price: "Custom",
        cadence: "annual",
        blurb: "Private deployment, custom connectors, dedicated support.",
      },
    ],
    faq: [
      {
        question: "Do we need engineers to build workflows?",
        answer:
          "No for standard automations — ops teams build most workflows themselves. Engineers get involved for custom connectors and complex branching logic.",
      },
      {
        question: "What happens when a workflow fails mid-run?",
        answer:
          "Execution is durable. The run pauses at the failed step, alerts the owner, and resumes from that exact point once the issue is resolved — no duplicate writes.",
      },
      {
        question: "Can we version and review workflow changes?",
        answer:
          "Yes. Every workflow has a code representation that can be diffed, reviewed, and promoted through environments like any other artifact.",
      },
      {
        question: "How are approvals routed?",
        answer:
          "By rule — role, amount, confidence score, or any field in the run context. Escalation paths and SLA timers are configurable per step.",
      },
    ],
    related: ["ai-platform-suite", "analytics-dashboard"],
  },
  {
    slug: "knowledge-assistant",
    title: "Knowledge Assistant",
    tagline: "Secure, multi-source AI for your internal teams.",
    description:
      "A chat experience grounded in your proprietary knowledge — wikis, tickets, code, contracts, filings. Citations on every answer, scoped to who is asking.",
    icon: "MessageSquareText",
    features: [
      "Citations on every answer",
      "Role-aware source scoping",
      "Slack, Teams, and web embed",
      "Multi-source connectors",
      "Granular access controls",
    ],
    href: "/products/knowledge-assistant",
    status: "GA",
    heroLead: "Every answer cited.",
    heroHighlight: "Every permission respected.",
    builtFor: [
      "Support teams answering from sprawling documentation",
      "Regulated organizations that need traceable answers",
      "Companies where onboarding means months of tribal knowledge",
    ],
    featureDetails: [
      {
        title: "Citations on every answer",
        description:
          "Span-level attribution back to the source document and page, so any claim is one click away from its evidence.",
        icon: "Quote",
      },
      {
        title: "Role-aware scoping",
        description:
          "Permissions enforced inside the retrieval query. A user's results are filtered before the model ever sees restricted content.",
        icon: "Lock",
      },
      {
        title: "Multi-source connectors",
        description:
          "Confluence, SharePoint, Notion, Google Drive, Jira, Zendesk, GitHub, and S3 — indexed incrementally and kept fresh.",
        icon: "Folder",
      },
      {
        title: "Surfaces where people work",
        description:
          "Slack and Teams bots, a browser extension, and an embeddable widget for your internal portal — one index behind all of them.",
        icon: "MessageCircle",
      },
      {
        title: "Answer quality monitoring",
        description:
          "Groundedness scoring on every response plus thumbs feedback routed into an eval set that drives measurable improvement.",
        icon: "ThumbsUp",
      },
      {
        title: "Knowledge gap reporting",
        description:
          "Questions the assistant could not answer, clustered by topic — a prioritized backlog for your documentation team.",
        icon: "HelpCircle",
      },
    ],
    modules: [
      {
        name: "Chat",
        description:
          "The assistant surface: threaded conversations with inline citations and source previews.",
      },
      {
        name: "Sources",
        description:
          "Connector configuration, sync status, and per-source access scoping.",
      },
      {
        name: "Insights",
        description:
          "Usage analytics, unanswered-question clusters, and answer-quality trends.",
      },
      {
        name: "Admin",
        description:
          "SSO, role mapping, retention policy, and audit log export.",
      },
    ],
    integrations: [
      "Confluence",
      "SharePoint",
      "Notion",
      "Google Drive",
      "Jira",
      "Zendesk",
      "GitHub",
      "Slack",
      "Microsoft Teams",
    ],
    metrics: [
      { label: "Answer grounding rate", value: "97%" },
      { label: "Support deflection", value: "44%" },
      { label: "New-hire ramp time", value: "−50%" },
    ],
    plans: [
      {
        name: "Team",
        price: "$18",
        cadence: "per user / month",
        blurb: "Up to 50 users, 5 sources, Slack and web surfaces.",
      },
      {
        name: "Business",
        price: "$32",
        cadence: "per user / month",
        blurb: "Unlimited sources, role-aware scoping, SSO, insights.",
      },
      {
        name: "Enterprise",
        price: "Custom",
        cadence: "annual",
        blurb: "VPC deployment, custom connectors, compliance review support.",
      },
    ],
    faq: [
      {
        question: "How do you prevent answers from restricted documents?",
        answer:
          "Access control is applied at retrieval time by mirroring the permissions from each source system. Restricted content is filtered out of the candidate set before generation, so it cannot influence an answer.",
      },
      {
        question: "How fresh is the index?",
        answer:
          "Connectors sync incrementally — most sources reflect changes within minutes. Sync status and staleness are visible per source in the admin console.",
      },
      {
        question: "What if the assistant does not know something?",
        answer:
          "It says so rather than guessing, and the question is logged into the knowledge-gap report so your documentation team can close the gap.",
      },
      {
        question: "Can we use our own model provider?",
        answer:
          "Yes. Claude, OpenAI, Gemini, Bedrock, Azure OpenAI, and self-hosted open-weight models are all supported.",
      },
    ],
    related: ["ai-platform-suite", "analytics-dashboard"],
  },
  {
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    tagline: "Live KPIs, anomaly alerts, and drill-down narratives.",
    description:
      "Dashboards that don't just show numbers — they explain them. Anomaly detection, drill-down narratives, and the SQL behind every chart.",
    icon: "BarChart3",
    features: [
      "Narrative anomaly detection",
      "Drill-down explanation",
      "Slack & email alerting",
      "Custom metric catalog",
      "Embed in any web app",
    ],
    href: "/products/analytics-dashboard",
    status: "Beta",
    heroLead: "Charts that tell you why,",
    heroHighlight: "not just what.",
    builtFor: [
      "Executive teams who want the driver, not just the delta",
      "Analytics teams drowning in ad-hoc 'why did this move' requests",
      "Product teams embedding reporting for their own customers",
    ],
    featureDetails: [
      {
        title: "Narrative explanations",
        description:
          "Every chart ships with a plain-language summary of what moved and why, generated from an automated driver decomposition.",
        icon: "MessageSquareText",
      },
      {
        title: "Anomaly detection",
        description:
          "Seasonality-aware detection tuned to suppress the noise that trains people to ignore alerts entirely.",
        icon: "AlertCircle",
      },
      {
        title: "Drill-down analysis",
        description:
          "Decompose any movement across dimensions, ranked by contribution — the analysis your analysts currently do by hand.",
        icon: "PieChartIcon",
      },
      {
        title: "Metric catalog",
        description:
          "Governed definitions with owners, lineage, and change history, so metric drift becomes a reviewable event.",
        icon: "Tag",
      },
      {
        title: "Alerting",
        description:
          "Threshold and anomaly alerts to Slack, email, or webhook — with the explanation included in the notification itself.",
        icon: "Bell",
      },
      {
        title: "Embedded reporting",
        description:
          "Drop dashboards into your own product with row-level security enforced at the query boundary and full theming control.",
        icon: "LayoutGrid",
      },
    ],
    modules: [
      {
        name: "Boards",
        description:
          "Dashboard authoring with narrative blocks and saved drill-down paths.",
      },
      {
        name: "Catalog",
        description:
          "The governed metric layer: definitions, owners, lineage, and change history.",
      },
      {
        name: "Signals",
        description:
          "Anomaly configuration, alert routing, and detection sensitivity tuning.",
      },
      {
        name: "Embed",
        description:
          "Tokenized embedding with row-level security and white-label theming.",
      },
    ],
    integrations: [
      "Snowflake",
      "BigQuery",
      "Databricks",
      "Postgres",
      "dbt",
      "Slack",
      "Looker",
    ],
    metrics: [
      { label: "Ad-hoc analyst requests removed", value: "−63%" },
      { label: "Time to detect an anomaly", value: "< 1 hr" },
      { label: "Metrics under governance per client", value: "340" },
    ],
    plans: [
      {
        name: "Team",
        price: "$700",
        cadence: "per month",
        blurb: "5 boards, 50 governed metrics, Slack alerting.",
      },
      {
        name: "Business",
        price: "$2,600",
        cadence: "per month",
        blurb: "Unlimited boards, driver analysis, embedding, SSO.",
      },
      {
        name: "Enterprise",
        price: "Custom",
        cadence: "annual",
        blurb: "Private deployment, custom semantic layer, dedicated support.",
      },
    ],
    faq: [
      {
        question: "Does this replace our BI tool?",
        answer:
          "It can, but most clients run it alongside Looker or Tableau at first — pointing both at the same governed metric layer so the numbers agree.",
      },
      {
        question: "How are narratives generated?",
        answer:
          "A statistical driver decomposition runs first, then a model writes the summary strictly from that output. The narrative never invents a cause the data does not support.",
      },
      {
        question: "Why is this in Beta?",
        answer:
          "The core is stable and running in production with design partners. Embedding and the semantic-layer import are still maturing, so we are onboarding deliberately.",
      },
      {
        question: "Can we see the SQL behind a chart?",
        answer:
          "Always. Every chart, narrative, and drill-down exposes the exact query that produced it.",
      },
    ],
    related: ["ai-platform-suite", "automation-tools"],
  },
];

/** Look up a single product by slug. */
export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Resolve the `related` slugs on a product into full records. */
export function getRelatedProducts(slug: string): Product[] {
  const product = getProduct(slug);
  if (!product) return [];
  return product.related
    .map((p) => getProduct(p))
    .filter((p): p is Product => Boolean(p));
}

export const productStatusMeta = {
  GA: { variant: "success" as const, label: "Generally available" },
  Beta: { variant: "secondary" as const, label: "Beta" },
  "Early access": { variant: "accent" as const, label: "Early access" },
};
