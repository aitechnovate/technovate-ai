/**
 * Solution catalogue — powers `/solutions` (index) and `/solutions/[slug]`
 * (detail). Single source of truth so the hub cards and the detail template
 * can never drift apart.
 */

import type { IconName } from "@/components/ui/Icon";

export type SolutionDetail = {
  /** Numbered phase in the delivery approach. */
  step: string;
  title: string;
  description: string;
};

export type Solution = {
  slug: string;
  title: string;
  /** One-line summary used in nav + cards. */
  description: string;
  /** Longer positioning paragraph used on the hub grid. */
  longDescription: string;
  icon: IconName;
  /** Short capability chips shown on the hub card. */
  capabilities: string[];
  href: string;
  badge?: string;

  /* ---- detail-page content ---- */

  /** Hero headline fragment rendered in gradient after the plain lead-in. */
  heroHighlight: string;
  heroLead: string;
  /** The business pain this solution addresses. */
  problem: { title: string; body: string; symptoms: string[] };
  /** How we deliver it, as an ordered approach. */
  approach: SolutionDetail[];
  /** Deeper capability blocks (title + body + icon). */
  capabilityDetails: { title: string; description: string; icon: IconName }[];
  /** Technologies we typically reach for. */
  techUsed: string[];
  /** Slug of the case study to feature on this page. */
  caseStudySlug: string;
  /** Headline outcomes rendered as a KPI strip. */
  outcomes: { label: string; value: string }[];
  /** Slugs of two or three sibling solutions to cross-link. */
  related: string[];
  /** Typical engagement shape. */
  engagement: { duration: string; team: string; startingAt: string };
};

export const solutions: Solution[] = [
  {
    slug: "ai-consulting",
    title: "AI Consulting",
    description:
      "Roadmaps, feasibility studies, and ROI modeling grounded in your data.",
    longDescription:
      "We help leadership teams decide where to invest, what to build, and what to defer. Strategy work that's grounded in your data and ready to ship.",
    icon: "Compass",
    capabilities: [
      "AI Maturity Assessment",
      "Roadmap & build-vs-buy",
      "ROI modeling",
      "Vendor selection",
    ],
    href: "/solutions/ai-consulting",
    badge: "Strategic",
    heroHighlight: "before you write a line of code.",
    heroLead: "Know what AI is worth to your business",
    problem: {
      title: "Most AI strategy decks never survive contact with production.",
      body: "The gap between an AI roadmap and a shipped system is where budgets die. Slideware built by people who have never deployed a model underestimates data readiness, overestimates model capability, and ignores the compliance work entirely. You end up with a mandate, a number, and no path.",
      symptoms: [
        "A board mandate for AI with no defensible business case",
        "Pilots that demo well and never reach production",
        "Vendor quotes that vary by 10x with no way to compare them",
        "No shared definition of what 'done' or 'working' means",
      ],
    },
    approach: [
      {
        step: "01",
        title: "Assess",
        description:
          "Two weeks inside your data, systems, and workflows. We interview operators, read the schemas, and score readiness across data, tooling, talent, and governance.",
      },
      {
        step: "02",
        title: "Prioritize",
        description:
          "Every candidate use case scored on value, feasibility, and time-to-first-value. We kill the ones that won't work and tell you why.",
      },
      {
        step: "03",
        title: "Model",
        description:
          "A defensible ROI model per initiative — with the assumptions written down, the sensitivity ranges visible, and the break-even date named.",
      },
      {
        step: "04",
        title: "Sequence",
        description:
          "A quarter-by-quarter roadmap with build-vs-buy calls, staffing shape, and the platform investments that unlock everything downstream.",
      },
    ],
    capabilityDetails: [
      {
        title: "AI Maturity Assessment",
        description:
          "A scored readiness baseline across data quality, platform tooling, in-house talent, and governance — benchmarked against peers in your sector.",
        icon: "Gauge",
      },
      {
        title: "Use-case portfolio scoring",
        description:
          "Every candidate initiative ranked on expected value, technical feasibility, and dependency depth, so sequencing arguments end with evidence.",
        icon: "ListChecks",
      },
      {
        title: "Build-vs-buy analysis",
        description:
          "Honest total-cost-of-ownership comparisons, including the maintenance burden vendors leave out of their proposals.",
        icon: "Scale",
      },
      {
        title: "ROI & sensitivity modeling",
        description:
          "Financial models your CFO will accept — assumptions itemized, ranges stated, and the downside case modeled alongside the upside.",
        icon: "Calculator",
      },
      {
        title: "Vendor selection",
        description:
          "Structured RFP support: evaluation rubrics, reference-call scripts, and technical due diligence on the claims in the deck.",
        icon: "FileCheck",
      },
      {
        title: "Governance design",
        description:
          "Model risk policy, approval gates, and audit posture designed to satisfy your regulator before the first deployment, not after.",
        icon: "ShieldCheck",
      },
    ],
    techUsed: ["Python", "dbt", "Snowflake", "Claude", "OpenAI", "Metabase"],
    caseStudySlug: "atlas-rag-research",
    outcomes: [
      { label: "Time to a funded roadmap", value: "6 weeks" },
      { label: "Use cases screened per engagement", value: "30+" },
      { label: "Client-reported ROI within 12mo", value: "4.6x" },
    ],
    related: ["custom-ai-development", "predictive-analytics", "data-analytics"],
    engagement: {
      duration: "4–8 weeks",
      team: "1 strategist, 1 senior engineer",
      startingAt: "$18,000 fixed scope",
    },
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    description:
      "Eliminate repetitive work with intelligent workflows that integrate cleanly.",
    longDescription:
      "Replace brittle scripts and manual handoffs with intelligent workflows that read, decide, and write into your systems of record.",
    icon: "Wand2",
    capabilities: [
      "Document processing",
      "Workflow orchestration",
      "Human-in-the-loop UX",
      "Exception handling",
    ],
    href: "/solutions/ai-automation",
    heroHighlight: "so your team stops doing them.",
    heroLead: "Automate the workflows that scale linearly with headcount",
    problem: {
      title: "The work that scales with headcount is the work AI should absorb.",
      body: "Every growing operation accumulates workflows where a human reads a document, makes a routine judgment, and types the result into another system. RPA breaks the moment a form changes. Pure LLM automation is unpredictable. The answer is a hybrid — deterministic where it can be, model-driven where it must be, and audited throughout.",
      symptoms: [
        "Ops headcount rising in lockstep with transaction volume",
        "RPA bots that break every time a vendor changes a PDF layout",
        "Backlogs measured in days for work that takes minutes",
        "No audit trail explaining why a decision was made",
      ],
    },
    approach: [
      {
        step: "01",
        title: "Map",
        description:
          "We shadow the actual process — not the documented one — and time every step. The map shows where volume concentrates and where judgment is genuinely required.",
      },
      {
        step: "02",
        title: "Split",
        description:
          "Deterministic steps get code. Judgment steps get models. Ambiguous steps get a human checkpoint. The split is explicit and reviewable.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Extraction pipelines, orchestration, and the review UX your operators will live in daily — designed with them, not for them.",
      },
      {
        step: "04",
        title: "Harden",
        description:
          "Exception routing, confidence thresholds, replayable traces, and the dashboards that prove the system is behaving before you scale volume onto it.",
      },
    ],
    capabilityDetails: [
      {
        title: "Document processing",
        description:
          "Extraction from PDFs, scans, emails, and forms with confidence scores per field — so low-certainty extractions route to a human instead of downstream.",
        icon: "FileText",
      },
      {
        title: "Workflow orchestration",
        description:
          "Durable, resumable workflows that survive restarts, retry intelligently, and never double-write into your system of record.",
        icon: "Network",
      },
      {
        title: "Human-in-the-loop review",
        description:
          "Review queues designed for throughput: keyboard-first, side-by-side source evidence, and one-keystroke approve or correct.",
        icon: "UserCheck",
      },
      {
        title: "Exception handling",
        description:
          "Explicit policies for what happens when the model is unsure, the source is malformed, or a downstream system rejects the write.",
        icon: "AlertTriangle",
      },
      {
        title: "Systems integration",
        description:
          "Clean writes into Salesforce, NetSuite, SAP, ServiceNow, or whatever else runs your business — idempotent and reconciled.",
        icon: "Plug",
      },
      {
        title: "Audit & reporting",
        description:
          "Every automated decision recorded with its inputs, model version, and confidence — queryable for the quarter-end review.",
        icon: "FileCheck",
      },
    ],
    techUsed: [
      "Claude",
      "OpenAI",
      "LangGraph",
      "Temporal",
      "Python",
      "Postgres",
    ],
    caseStudySlug: "northwind-prior-auth",
    outcomes: [
      { label: "Manual touches removed", value: "78%" },
      { label: "Cycle time reduction", value: "71%" },
      { label: "Straight-through processing", value: "62%" },
    ],
    related: [
      "intelligent-process-automation",
      "ai-agents",
      "custom-ai-development",
    ],
    engagement: {
      duration: "8–12 weeks",
      team: "3–4 senior engineers, 1 designer",
      startingAt: "$32,000 / month",
    },
  },
  {
    slug: "custom-ai-development",
    title: "Custom AI Development",
    description: "Bespoke models and applications engineered for your domain.",
    longDescription:
      "When off-the-shelf models aren't enough, we design and train domain-tuned systems — and the platform that supports them.",
    icon: "Cpu",
    capabilities: [
      "Domain fine-tuning",
      "Custom architectures",
      "Evaluation harnesses",
      "Production hardening",
    ],
    href: "/solutions/custom-ai-development",
    heroHighlight: "when the general-purpose model isn't enough.",
    heroLead: "Domain-tuned systems built for your data",
    problem: {
      title: "General models are a floor, not a ceiling.",
      body: "Frontier models are extraordinary generalists and mediocre specialists. On your vocabulary, your edge cases, and your accuracy bar, the gap between 'impressive demo' and 'safe to deploy' is where custom work lives. That work is mostly evaluation infrastructure — not architecture.",
      symptoms: [
        "Accuracy plateaus below the bar your business requires",
        "Domain vocabulary the base model consistently misreads",
        "Latency or unit-cost that breaks the business case at scale",
        "No way to prove a model change made things better",
      ],
    },
    approach: [
      {
        step: "01",
        title: "Benchmark",
        description:
          "Before anything is trained, we build the eval set. A few hundred labeled examples that encode what 'correct' means for your business, reviewed by your experts.",
      },
      {
        step: "02",
        title: "Baseline",
        description:
          "Frontier models, prompted well, measured honestly. Often this clears the bar and the custom work stops here — which we will tell you.",
      },
      {
        step: "03",
        title: "Specialize",
        description:
          "Fine-tuning, retrieval augmentation, distillation, or a purpose-built architecture — chosen by what the benchmark says will move the number.",
      },
      {
        step: "04",
        title: "Harden",
        description:
          "Serving infrastructure, drift monitoring, regression gates in CI, and rollback paths. The model is a fraction of what ships.",
      },
    ],
    capabilityDetails: [
      {
        title: "Domain fine-tuning",
        description:
          "Supervised and preference-based tuning on your data, with strict train/eval separation and documented dataset provenance.",
        icon: "FlaskConical",
      },
      {
        title: "Custom architectures",
        description:
          "Multimodal, time-series, and graph models when the problem genuinely isn't a language problem — designed to the constraint, not the trend.",
        icon: "Layers",
      },
      {
        title: "Evaluation harnesses",
        description:
          "CI-runnable eval suites that block a regression before it reaches your users. The single highest-leverage artifact we build.",
        icon: "TestTube",
      },
      {
        title: "Distillation & cost tuning",
        description:
          "Smaller, faster models trained against a frontier teacher — often 10x cheaper per call at equivalent task accuracy.",
        icon: "Zap",
      },
      {
        title: "Production hardening",
        description:
          "Autoscaling inference, request shaping, graceful degradation, and the observability to debug a bad answer six weeks later.",
        icon: "Server",
      },
      {
        title: "Drift & retraining",
        description:
          "Monitors on input distribution and output quality, plus a documented retraining trigger so decay is caught by a dashboard, not a customer.",
        icon: "RefreshCw",
      },
    ],
    techUsed: [
      "PyTorch",
      "Python",
      "Claude",
      "OpenAI",
      "Hugging Face",
      "AWS",
      "Docker",
    ],
    caseStudySlug: "vertex-failure-forecast",
    outcomes: [
      { label: "Task accuracy lift over baseline", value: "+23 pts" },
      { label: "Inference cost reduction", value: "−68%" },
      { label: "Eval coverage at handover", value: "1,200 cases" },
    ],
    related: ["ai-agents", "rag-systems", "predictive-analytics"],
    engagement: {
      duration: "12–16 weeks",
      team: "4–6 senior engineers",
      startingAt: "$32,000 / month",
    },
  },
  {
    slug: "ai-agents",
    title: "AI Agents",
    description:
      "Autonomous agents that act, not just answer — with deterministic guardrails.",
    longDescription:
      "Multi-step agents that read your tools, call them safely, and roll back when they're unsure. Reliability is the product.",
    icon: "Bot",
    capabilities: [
      "Tool-use protocols",
      "Deterministic checkpoints",
      "Replayable traces",
      "Guardrails & policies",
    ],
    href: "/solutions/ai-agents",
    badge: "Hot",
    heroHighlight: "and know when to stop.",
    heroLead: "Agents that take real action in your systems",
    problem: {
      title: "An agent that acts is only as good as its ability to not act.",
      body: "Demo agents chain tool calls impressively and fail silently in production. The engineering that matters is the unglamorous part: knowing when confidence is too low to proceed, making every side effect reversible, and leaving a trace an auditor can replay. Autonomy without those three things is a liability.",
      symptoms: [
        "Agent prototypes nobody will authorize to touch production systems",
        "Failures that can't be reproduced or explained after the fact",
        "No policy layer between the model and a destructive action",
        "Cost and latency that spiral on multi-step tasks",
      ],
    },
    approach: [
      {
        step: "01",
        title: "Scope the authority",
        description:
          "We write down exactly what the agent may do, what requires approval, and what it must never attempt. This document precedes the code.",
      },
      {
        step: "02",
        title: "Build the tool layer",
        description:
          "Every tool gets a strict schema, idempotency guarantees, and a dry-run mode. The agent is only ever as safe as its worst tool.",
      },
      {
        step: "03",
        title: "Add checkpoints",
        description:
          "Deterministic gates between reasoning steps — confidence thresholds, policy checks, and human approval where the blast radius warrants it.",
      },
      {
        step: "04",
        title: "Instrument & evaluate",
        description:
          "Full replayable traces plus a task-level eval suite, so behavioral regressions surface in CI rather than in a customer escalation.",
      },
    ],
    capabilityDetails: [
      {
        title: "Tool-use protocols",
        description:
          "Strictly typed tool schemas with validation, retries, and idempotency keys — so a repeated call never double-charges or double-writes.",
        icon: "Wrench",
      },
      {
        title: "Deterministic checkpoints",
        description:
          "Policy gates between steps that halt the agent on low confidence, out-of-policy actions, or anything above a configured blast radius.",
        icon: "ShieldCheck",
      },
      {
        title: "Replayable traces",
        description:
          "Every run recorded end-to-end — prompts, tool calls, intermediate state — and replayable against a new model version to compare behavior.",
        icon: "Activity",
      },
      {
        title: "Multi-agent orchestration",
        description:
          "Planner/worker topologies with explicit handoffs and shared state, used only where a single agent genuinely cannot hold the task.",
        icon: "Users2",
      },
      {
        title: "Approval workflows",
        description:
          "Human sign-off surfaces in Slack, email, or your own console — with the agent's reasoning and evidence attached to the request.",
        icon: "UserCheck",
      },
      {
        title: "Cost & latency governance",
        description:
          "Per-run budgets, step caps, and model routing that spends frontier-model tokens only on the steps that need them.",
        icon: "Gauge",
      },
    ],
    techUsed: [
      "Claude",
      "LangGraph",
      "OpenAI",
      "Temporal",
      "Python",
      "TypeScript",
    ],
    caseStudySlug: "northwind-prior-auth",
    outcomes: [
      { label: "Tasks completed without escalation", value: "62%" },
      { label: "Reversible action coverage", value: "100%" },
      { label: "Mean steps per completed task", value: "7.4" },
    ],
    related: ["ai-automation", "rag-systems", "llm-integrations"],
    engagement: {
      duration: "10–16 weeks",
      team: "3–5 senior engineers",
      startingAt: "$32,000 / month",
    },
  },
  {
    slug: "rag-systems",
    title: "RAG Systems",
    description:
      "Grounded LLM apps over your proprietary knowledge with citation-grade answers.",
    longDescription:
      "Retrieval-augmented systems tuned to your data, your latency budget, and your compliance posture — with citations your auditors can trace.",
    icon: "Database",
    capabilities: [
      "Hybrid retrieval",
      "Citation grounding",
      "Evaluation harness",
      "Document pipelines",
    ],
    href: "/solutions/rag-systems",
    heroHighlight: "with citations your auditors can follow.",
    heroLead: "Answers grounded in your own knowledge",
    problem: {
      title: "Retrieval quality is the whole game — and it's usually the part nobody measures.",
      body: "A weekend RAG prototype is trivial. A RAG system your compliance team will sign off on is not. The difference is measured retrieval: hybrid search tuned on real queries, chunking that respects document structure, permissions enforced at retrieval time, and a citation for every claim the model makes.",
      symptoms: [
        "Confident answers sourced from the wrong document",
        "Retrieval that works in the demo corpus and fails on the real one",
        "No way for a user to verify where an answer came from",
        "Permission leakage — users seeing content they shouldn't",
      ],
    },
    approach: [
      {
        step: "01",
        title: "Build the query set",
        description:
          "We collect real questions from real users and label the correct source passages. Without this, every retrieval decision downstream is a guess.",
      },
      {
        step: "02",
        title: "Engineer the corpus",
        description:
          "Parsing, structure-aware chunking, metadata enrichment, and de-duplication. Most retrieval failures are actually ingestion failures.",
      },
      {
        step: "03",
        title: "Tune retrieval",
        description:
          "Hybrid dense + lexical search with reranking, tuned against the labeled set until recall@k clears the bar the task requires.",
      },
      {
        step: "04",
        title: "Ground & verify",
        description:
          "Span-level citations, a groundedness check on every answer, and permission filters applied at query time rather than after generation.",
      },
    ],
    capabilityDetails: [
      {
        title: "Hybrid retrieval",
        description:
          "Dense embeddings plus BM25 with a cross-encoder reranker — because pure vector search reliably misses exact identifiers and codes.",
        icon: "Search",
      },
      {
        title: "Citation grounding",
        description:
          "Span-level attribution back to the source document and page, so every claim is one click from its evidence.",
        icon: "Quote",
      },
      {
        title: "Document pipelines",
        description:
          "Robust ingestion for PDFs, tables, slides, wikis, and ticket systems — with structure-aware chunking and incremental re-indexing.",
        icon: "Folder",
      },
      {
        title: "Permission-aware search",
        description:
          "ACLs enforced inside the retrieval query, so a user's results are filtered before the model ever sees the content.",
        icon: "Lock",
      },
      {
        title: "Evaluation harness",
        description:
          "Recall@k, groundedness, and answer-quality scored on every change — the regression gate that keeps quality from quietly decaying.",
        icon: "TestTube",
      },
      {
        title: "Freshness & re-indexing",
        description:
          "Change-data-capture pipelines that keep the index current without full rebuilds, with staleness visible on a dashboard.",
        icon: "RefreshCw",
      },
    ],
    techUsed: [
      "Claude",
      "OpenAI",
      "LangChain",
      "pgvector",
      "Elasticsearch",
      "Python",
    ],
    caseStudySlug: "atlas-rag-research",
    outcomes: [
      { label: "Answer grounding rate", value: "97%" },
      { label: "Analyst throughput", value: "2x" },
      { label: "Benchmark questions evaluated", value: "1,200" },
    ],
    related: ["ai-agents", "llm-integrations", "custom-ai-development"],
    engagement: {
      duration: "8–14 weeks",
      team: "3–4 senior engineers",
      startingAt: "$32,000 / month",
    },
  },
  {
    slug: "llm-integrations",
    title: "LLM Integrations",
    description:
      "Wire Claude, GPT, Gemini, and open models into your existing stack.",
    longDescription:
      "Production integrations with the major LLM providers — routing, failover, observability, and cost controls included.",
    icon: "Plug",
    capabilities: [
      "Provider routing",
      "Streaming & function calls",
      "Cost telemetry",
      "Provider failover",
    ],
    href: "/solutions/llm-integrations",
    heroHighlight: "without betting the company on one provider.",
    heroLead: "Production LLM plumbing",
    problem: {
      title: "Calling an API is easy. Depending on one in production is not.",
      body: "The first integration takes an afternoon. Then comes rate limiting, streaming edge cases, provider outages at the worst possible hour, cost that nobody can attribute to a feature, and a model deprecation notice with sixty days' warning. The integration layer is where that operational reality gets absorbed.",
      symptoms: [
        "A provider outage that takes your product down with it",
        "LLM spend that can't be attributed to a team or feature",
        "Model deprecations that force emergency rewrites",
        "Streaming and tool-call handling reimplemented in five services",
      ],
    },
    approach: [
      {
        step: "01",
        title: "Abstract",
        description:
          "One internal interface across providers — so swapping a model is a config change rather than a refactor of every calling service.",
      },
      {
        step: "02",
        title: "Route",
        description:
          "Per-task model routing on cost, latency, and capability, with automatic failover when a provider degrades.",
      },
      {
        step: "03",
        title: "Observe",
        description:
          "Every call traced with prompt version, token counts, latency, and cost attributed down to the feature and the team.",
      },
      {
        step: "04",
        title: "Govern",
        description:
          "Budgets, rate limits, PII redaction, and prompt-version control — enforced centrally so no service can bypass them.",
      },
    ],
    capabilityDetails: [
      {
        title: "Provider routing",
        description:
          "Task-aware routing across Claude, GPT, Gemini, and open-weight models — cheap models for cheap steps, frontier models where it counts.",
        icon: "Network",
      },
      {
        title: "Failover & resilience",
        description:
          "Automatic cross-provider failover, circuit breakers, and backpressure so an upstream incident degrades rather than destroys.",
        icon: "Shield",
      },
      {
        title: "Streaming & tool calls",
        description:
          "One correct implementation of streaming, partial tool-call assembly, and cancellation — reused everywhere instead of rewritten.",
        icon: "Signal",
      },
      {
        title: "Cost telemetry",
        description:
          "Token and dollar attribution per feature, per team, and per customer, with alerts before the month-end invoice surprises anyone.",
        icon: "DollarSign",
      },
      {
        title: "Prompt versioning",
        description:
          "Prompts as versioned, reviewable artifacts with A/B rollout and one-click rollback when a change regresses quality.",
        icon: "Code2",
      },
      {
        title: "Safety & redaction",
        description:
          "PII detection and redaction before egress, plus configurable content policies enforced on both the request and the response.",
        icon: "EyeOff",
      },
    ],
    techUsed: [
      "Claude",
      "OpenAI",
      "Gemini",
      "TypeScript",
      "Node.js",
      "Redis",
      "OpenTelemetry",
    ],
    caseStudySlug: "atlas-rag-research",
    outcomes: [
      { label: "Provider-outage downtime absorbed", value: "100%" },
      { label: "LLM spend reduction via routing", value: "−41%" },
      { label: "P95 first-token latency", value: "380ms" },
    ],
    related: ["ai-agents", "rag-systems", "custom-ai-development"],
    engagement: {
      duration: "6–10 weeks",
      team: "2–3 senior engineers",
      startingAt: "$18,000 fixed scope",
    },
  },
  {
    slug: "predictive-analytics",
    title: "Predictive Analytics",
    description:
      "Forecast demand, churn, and risk with calibrated confidence intervals.",
    longDescription:
      "Time-series and tabular models that don't just predict — they tell you how sure they are, and when you should ignore them.",
    icon: "TrendingUp",
    capabilities: [
      "Demand forecasting",
      "Churn modeling",
      "Risk scoring",
      "Calibration & drift",
    ],
    href: "/solutions/predictive-analytics",
    heroHighlight: "and honest about their uncertainty.",
    heroLead: "Forecasts your operators actually trust",
    problem: {
      title: "An uncalibrated forecast is worse than no forecast.",
      body: "A point estimate with no uncertainty invites false confidence. Operators learn quickly whether a model deserves trust, and once they stop believing it they route around it permanently. Calibration — knowing how often an 80% prediction is actually right — is what earns and keeps that trust.",
      symptoms: [
        "Forecasts the planning team quietly overrides every cycle",
        "Models that were accurate at launch and silently decayed",
        "No confidence intervals, so no way to size a buffer",
        "Accuracy reported on the training window, not on live data",
      ],
    },
    approach: [
      {
        step: "01",
        title: "Frame the decision",
        description:
          "We start from the decision the forecast informs, because that determines the horizon, the granularity, and the cost of being wrong in each direction.",
      },
      {
        step: "02",
        title: "Backtest honestly",
        description:
          "Rolling-origin evaluation against naive and seasonal baselines. If we can't beat the baseline, we say so rather than ship complexity.",
      },
      {
        step: "03",
        title: "Calibrate",
        description:
          "Prediction intervals validated against realized coverage — an 80% interval that contains the truth 80% of the time, not 55%.",
      },
      {
        step: "04",
        title: "Monitor drift",
        description:
          "Input distribution and accuracy monitors with a documented retraining trigger, so decay is caught by a dashboard and not by a stockout.",
      },
    ],
    capabilityDetails: [
      {
        title: "Demand forecasting",
        description:
          "Hierarchical, seasonality-aware forecasts that reconcile across SKU, region, and channel so the numbers add up at every level.",
        icon: "BarChart3",
      },
      {
        title: "Churn & retention modeling",
        description:
          "Survival and uplift models that separate customers who will leave from customers an intervention can actually save.",
        icon: "Users",
      },
      {
        title: "Risk scoring",
        description:
          "Calibrated probability outputs with reason codes, built to satisfy model-risk review in regulated environments.",
        icon: "AlertTriangle",
      },
      {
        title: "Uncertainty quantification",
        description:
          "Conformal prediction intervals with validated empirical coverage, so downstream buffers and thresholds are sized on evidence.",
        icon: "Target",
      },
      {
        title: "Feature & data pipelines",
        description:
          "Point-in-time-correct feature stores that eliminate leakage — the single most common cause of models that look great and fail live.",
        icon: "Database",
      },
      {
        title: "Drift detection",
        description:
          "Population stability, accuracy decay, and concept-drift monitors wired to alerts and a written retraining policy.",
        icon: "Activity",
      },
    ],
    techUsed: [
      "Python",
      "PyTorch",
      "scikit-learn",
      "Snowflake",
      "dbt",
      "Airflow",
    ],
    caseStudySlug: "vertex-failure-forecast",
    outcomes: [
      { label: "False-positive rate", value: "9%" },
      { label: "Forecast horizon", value: "72 hrs" },
      { label: "Interval coverage accuracy", value: "±2 pts" },
    ],
    related: ["data-analytics", "custom-ai-development", "ai-consulting"],
    engagement: {
      duration: "8–12 weeks",
      team: "2–4 senior engineers",
      startingAt: "$32,000 / month",
    },
  },
  {
    slug: "intelligent-process-automation",
    title: "Intelligent Process Automation",
    description:
      "Combine RPA with AI for cognitive workflows that adapt to exceptions.",
    longDescription:
      "When the happy path is mechanical but the exceptions need judgment, we bridge RPA with LLM reasoning — and audit every decision.",
    icon: "Settings",
    capabilities: [
      "RPA + LLM bridging",
      "Exception routing",
      "Decision audit trails",
      "Approval workflows",
    ],
    href: "/solutions/intelligent-process-automation",
    heroHighlight: "where the exceptions need judgment.",
    heroLead: "Cognitive automation for processes",
    problem: {
      title: "Your RPA estate automated the easy 60%. The rest needs judgment.",
      body: "Classic RPA excels at deterministic, stable processes and collapses on variation. That's why most estates plateau: the remaining volume is exactly the work that requires reading context and making a call. Bridging existing bots with model-driven reasoning unlocks that tail without rebuilding what already works.",
      symptoms: [
        "An RPA program whose automation rate stopped climbing",
        "Bot maintenance costs approaching the savings they generate",
        "Exception queues growing faster than the automated path",
        "Compliance unable to explain why a bot did what it did",
      ],
    },
    approach: [
      {
        step: "01",
        title: "Audit the estate",
        description:
          "We inventory existing bots, measure where they break, and quantify the exception volume that never gets automated.",
      },
      {
        step: "02",
        title: "Bridge",
        description:
          "A reasoning layer that sits alongside your bots — invoked precisely when the deterministic path hits variation it can't handle.",
      },
      {
        step: "03",
        title: "Route exceptions",
        description:
          "Confidence-tiered routing: high-confidence cases proceed, mid-confidence cases get a fast human check, low-confidence cases escalate.",
      },
      {
        step: "04",
        title: "Prove it",
        description:
          "Decision audit trails, per-policy reporting, and a control framework your internal audit function can actually test.",
      },
    ],
    capabilityDetails: [
      {
        title: "RPA + LLM bridging",
        description:
          "Reasoning services callable from UiPath, Blue Prism, or Power Automate — so existing investment is extended rather than replaced.",
        icon: "Puzzle",
      },
      {
        title: "Exception routing",
        description:
          "Confidence-tiered handling that sends only genuinely ambiguous cases to people, with the evidence pre-assembled for them.",
        icon: "Filter",
      },
      {
        title: "Decision audit trails",
        description:
          "Immutable records of inputs, policy version, model version, and rationale for every automated decision — retained for your audit window.",
        icon: "FileCheck",
      },
      {
        title: "Approval workflows",
        description:
          "Configurable multi-tier approvals with delegation, SLA timers, and escalation paths that mirror your existing authority matrix.",
        icon: "BadgeCheck",
      },
      {
        title: "Process mining",
        description:
          "Event-log analysis that finds the true bottleneck rather than the one everyone assumes, before a line of automation is written.",
        icon: "Scan",
      },
      {
        title: "Control framework",
        description:
          "Documented controls mapped to SOX, SOC 2, or your internal framework — written so an auditor can test them without a walkthrough.",
        icon: "ShieldCheck",
      },
    ],
    techUsed: [
      "Claude",
      "UiPath",
      "Power Automate",
      "Python",
      "Temporal",
      "Postgres",
    ],
    caseStudySlug: "northwind-prior-auth",
    outcomes: [
      { label: "Automation rate lift", value: "+31 pts" },
      { label: "Exception queue reduction", value: "−54%" },
      { label: "Decisions with full audit trail", value: "100%" },
    ],
    related: ["ai-automation", "ai-agents", "data-analytics"],
    engagement: {
      duration: "10–16 weeks",
      team: "3–5 senior engineers",
      startingAt: "$32,000 / month",
    },
  },
  {
    slug: "data-analytics",
    title: "Data Analytics",
    description:
      "From raw data to executive-ready insight, with narrative explanations.",
    longDescription:
      "Dashboards that don't just show numbers — they explain them. Anomaly detection, drill-down narratives, and the SQL behind the slide.",
    icon: "BarChart3",
    capabilities: [
      "Narrative dashboards",
      "Anomaly detection",
      "Self-serve analytics",
      "Metric catalog",
    ],
    href: "/solutions/data-analytics",
    heroHighlight: "not just what moved.",
    heroLead: "Analytics that explain why",
    problem: {
      title: "Dashboards show what changed. Nobody has time to work out why.",
      body: "Most analytics investment produces charts that raise questions rather than answer them. The expensive part is the human hours spent afterwards, slicing dimensions to find the driver behind a number. That investigation is mechanical enough to automate — and doing so is what turns a dashboard into a decision tool.",
      symptoms: [
        "Metrics that disagree between teams because definitions drifted",
        "Analysts spending most of their week on ad-hoc 'why' requests",
        "Anomalies discovered in the monthly review, weeks late",
        "Dashboards built, launched, and quietly abandoned",
      ],
    },
    approach: [
      {
        step: "01",
        title: "Define the metrics",
        description:
          "A governed metric catalog with one owner and one definition per metric, so 'revenue' means the same thing in every conversation.",
      },
      {
        step: "02",
        title: "Model the data",
        description:
          "Tested, documented transformation layers with lineage — so a number on a slide can be traced back to the source row that produced it.",
      },
      {
        step: "03",
        title: "Detect & explain",
        description:
          "Automated anomaly detection paired with driver analysis that decomposes a movement into its contributing dimensions.",
      },
      {
        step: "04",
        title: "Narrate",
        description:
          "Written explanations attached to every chart — plain-language summaries with the SQL one click away for anyone who wants to check.",
      },
    ],
    capabilityDetails: [
      {
        title: "Narrative dashboards",
        description:
          "Every chart ships with a written explanation of what moved and why, generated from the underlying driver decomposition.",
        icon: "MessageSquareText",
      },
      {
        title: "Anomaly detection",
        description:
          "Seasonality-aware detection tuned to suppress the noise that trains people to ignore alerts entirely.",
        icon: "AlertCircle",
      },
      {
        title: "Driver analysis",
        description:
          "Automatic decomposition of a metric movement across dimensions, ranked by contribution — the analysis analysts do by hand today.",
        icon: "PieChartIcon",
      },
      {
        title: "Metric catalog",
        description:
          "Governed definitions with owners, lineage, and change history, so metric drift becomes a reviewable event rather than a surprise.",
        icon: "Tag",
      },
      {
        title: "Self-serve analytics",
        description:
          "Natural-language querying over the governed semantic layer — answers stay consistent with the catalog rather than inventing new logic.",
        icon: "Search",
      },
      {
        title: "Embedded reporting",
        description:
          "Analytics embedded directly in your product or internal tools, with row-level security enforced at the query boundary.",
        icon: "LayoutGrid",
      },
    ],
    techUsed: ["dbt", "Snowflake", "Python", "Claude", "Airflow", "Next.js"],
    caseStudySlug: "vertex-failure-forecast",
    outcomes: [
      { label: "Ad-hoc analyst requests removed", value: "−63%" },
      { label: "Time to detect an anomaly", value: "< 1 hr" },
      { label: "Metrics under governance", value: "340" },
    ],
    related: ["predictive-analytics", "ai-consulting", "ai-automation"],
    engagement: {
      duration: "8–12 weeks",
      team: "2–4 senior engineers",
      startingAt: "$32,000 / month",
    },
  },
];

/** Look up a single solution by slug. */
export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

/** Resolve the `related` slugs on a solution into full records. */
export function getRelatedSolutions(slug: string): Solution[] {
  const solution = getSolution(slug);
  if (!solution) return [];
  return solution.related
    .map((s) => getSolution(s))
    .filter((s): s is Solution => Boolean(s));
}
