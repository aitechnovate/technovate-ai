/**
 * Portfolio, case study, and blog placeholders used by home + listing pages.
 * Real CMS-backed content will replace these in a later phase.
 */

export type PortfolioItem = {
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  tags: string[];

  /* ---- detail-page content (`/portfolio/[slug]`) ---- */

  /** Engagement year, shown in the detail meta strip. */
  year?: string;
  /** Delivery duration, e.g. "12 weeks". */
  duration?: string;
  /** Squad shape, e.g. "4 engineers, 1 designer". */
  team?: string;
  /** Long-form narrative for the detail page. */
  overview?: string;
  /** What we were asked to solve. */
  brief?: string;
  /** Notable engineering decisions, as title + body blocks. */
  highlights?: { title: string; description: string }[];
  /** Result bullets. */
  results?: string[];
  /** Technologies used on the engagement. */
  stack?: string[];
  /** Optional pull-quote from the client. */
  quote?: { text: string; author: string; role: string };
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "northwind-clinical-copilot",
    title: "Clinical Documentation Copilot",
    client: "Northwind Health",
    category: "Healthcare",
    summary:
      "Ambient AI scribe that drafts structured notes, ICD-10 codes, and prior-auth letters in real time.",
    tags: ["Healthcare", "LLM", "HIPAA"],
    year: "2025",
    duration: "14 weeks",
    team: "4 engineers, 1 designer, 1 clinical SME",
    overview:
      "Northwind Health runs 31 ambulatory clinics where clinicians were spending close to two hours on documentation for every hour of patient care. We built an ambient copilot that listens to the encounter, drafts a structured note against Northwind's own templates, proposes ICD-10 codes with supporting chart evidence, and assembles prior-authorization packets — all inside Epic, with nothing auto-filed without a clinician signature.",
    brief:
      "Reduce documentation burden without introducing a second system, a second login, or any pathway for PHI to leave the compliance boundary.",
    highlights: [
      {
        title: "Deployed inside the EHR, not beside it",
        description:
          "The entire experience renders in an Epic SMART on FHIR panel. Clinicians never leave the chart, which is why adoption held above 80% past the six-month mark instead of collapsing after the pilot.",
      },
      {
        title: "Nothing files without a signature",
        description:
          "Every artifact is a draft. Confidence thresholds route uncertain extractions into a review queue, and the sign-off action is a single keystroke from the note body.",
      },
      {
        title: "Payer rules as versioned configuration",
        description:
          "Prior-auth requirements differ per payer and change often. We modeled them as versioned config rather than code, so the revenue-cycle team updates rules without a release.",
      },
      {
        title: "PHI never left the boundary",
        description:
          "Inference runs inside Northwind's VPC under a signed BAA. Trace capture redacts PHI before storage, and the audit log is exportable for their annual HITRUST assessment.",
      },
    ],
    results: [
      "Documentation time per encounter down from 16 minutes to 5",
      "14 clinician hours reclaimed per week, per provider",
      "Prior-auth cycle time reduced 71%",
      "Coding accuracy up 12 points against the internal audit sample",
    ],
    stack: ["Claude", "Python", "FHIR", "Postgres", "AWS", "Next.js"],
    quote: {
      text: "The first tool we've deployed where clinicians asked us to expand it faster, not slow it down. That has never happened here before.",
      author: "Dr. Elena Marsh",
      role: "Chief Medical Information Officer, Northwind Health",
    },
  },
  {
    slug: "atlas-research-terminal",
    title: "Equity Research Terminal",
    client: "Atlas Capital",
    category: "Finance",
    summary:
      "Multi-modal RAG over 10 years of filings, transcripts, and broker research with citation-grounded answers.",
    tags: ["Finance", "RAG", "Citations"],
    year: "2025",
    duration: "12 weeks",
    team: "3 engineers, 1 strategist",
    overview:
      "Atlas Capital's equity analysts were spending roughly 60% of their day searching rather than analyzing. We built a research terminal over a decade of filings, earnings transcripts, and licensed broker research — with span-level citations on every claim and information-barrier rules enforced inside the retrieval query rather than after generation.",
    brief:
      "Give analysts a single research surface that compliance would approve, where every answer is traceable to the document and page it came from.",
    highlights: [
      {
        title: "The benchmark came before the system",
        description:
          "We built a 1,200-question labeled benchmark with Atlas analysts before writing retrieval code. Every subsequent decision was justified by whether it moved recall@10 on that set.",
      },
      {
        title: "Hybrid retrieval, because vectors miss tickers",
        description:
          "Pure dense retrieval reliably failed on exact identifiers, CUSIPs, and line-item labels. Combining BM25 with embeddings and a cross-encoder reranker lifted recall@10 from 71% to 94%.",
      },
      {
        title: "Information barriers enforced at query time",
        description:
          "Wall assignments filter the candidate set before generation, so restricted material cannot influence an answer even indirectly. This was the condition compliance set for approval.",
      },
      {
        title: "Groundedness checked on every answer",
        description:
          "A verification pass confirms each claim is supported by a retrieved span. Unsupported statements are suppressed rather than shown with a weak citation.",
      },
    ],
    results: [
      "Analyst throughput doubled on coverage tasks",
      "Answer grounding rate of 97% on the held-out benchmark",
      "New-analyst onboarding time cut in half",
      "Zero information-barrier exceptions across the first year",
    ],
    stack: ["Claude", "pgvector", "Elasticsearch", "Python", "LangChain", "Next.js"],
    quote: {
      text: "Compliance approved it in one review cycle. In this firm, that is the strongest endorsement a system can get.",
      author: "Priya Raman",
      role: "Head of Research Technology, Atlas Capital",
    },
  },
  {
    slug: "vertex-predictive-maintenance",
    title: "Predictive Maintenance Platform",
    client: "Vertex Manufacturing",
    category: "Manufacturing",
    summary:
      "Time-series + vision models predicting equipment failure 72 hours in advance across 14 plants.",
    tags: ["Manufacturing", "Forecasting", "Vision"],
    year: "2024",
    duration: "16 weeks",
    team: "5 engineers, 1 reliability SME",
    overview:
      "Vertex was losing an estimated $42M a year to unplanned downtime across 14 plants. The telemetry to predict most of those failures already existed in their historian — it had simply never been modeled, because labels were sparse and an earlier vendor pilot had produced so many false alarms that the floor stopped trusting alerts entirely.",
    brief:
      "Predict equipment failure with enough lead time to schedule maintenance, at a false-positive rate low enough that operators will actually act on the alert.",
    highlights: [
      {
        title: "Precision was the product requirement",
        description:
          "We tuned explicitly against false positives after learning the previous pilot ran near 40% and had been muted plant-wide. Landing at 9% is what made the system credible on the floor.",
      },
      {
        title: "Labels reconstructed from maintenance records",
        description:
          "Failure labels did not exist in usable form. We derived them from work orders and operator logs, then had Vertex's reliability engineers validate every label before training.",
      },
      {
        title: "Multimodal beat any single signal",
        description:
          "SCADA telemetry alone plateaued. Adding vibration spectra and floor-camera vision pushed the usable lead time out to 72 hours across the main asset classes.",
      },
      {
        title: "Inference at the edge, inside the OT boundary",
        description:
          "Vertex's OT network is air-gapped from IT. Models run on edge hardware inside the plant, with only aggregated predictions crossing the boundary.",
      },
    ],
    results: [
      "Unplanned downtime reduced 34% across the monitored lines",
      "False-positive rate held at 9% through the first full year",
      "OEE improved by 6 percentage points",
      "47 production lines instrumented across 14 plants",
    ],
    stack: ["PyTorch", "Python", "Kafka", "TimescaleDB", "Docker", "Azure"],
    quote: {
      text: "The last vendor gave us a model. This team gave us something the floor supervisors actually check before they schedule a shutdown.",
      author: "Marcus Feld",
      role: "VP Reliability Engineering, Vertex Manufacturing",
    },
  },
  {
    slug: "lumen-concierge",
    title: "AI Concierge for Retail",
    client: "Lumen Retail",
    category: "Retail",
    summary:
      "End-to-end conversational agent resolving 62% of post-purchase requests without human escalation.",
    tags: ["Retail", "Agents", "CX"],
    year: "2025",
    duration: "10 weeks",
    team: "3 engineers, 1 designer",
    overview:
      "Lumen Retail's contact volume multiplied roughly five-fold during peak weeks, and their answer had been seasonal hiring — which put their least experienced agents on the highest-stakes conversations of the year. We built an agent that resolves routine post-purchase requests end-to-end in their order and fulfilment systems, rather than deflecting customers into a form.",
    brief:
      "Absorb the peak-season volume spike on routine post-purchase requests without diluting brand voice or hiding the path to a human.",
    highlights: [
      {
        title: "Resolution, not deflection",
        description:
          "The agent writes to the order system: it issues refunds, generates return labels, and reschedules deliveries. Deflection metrics look good and customers hate them, so we measured resolution instead.",
      },
      {
        title: "Every write is reversible and idempotent",
        description:
          "Refunds and cancellations run through tools with idempotency keys and a defined rollback path, so a retry can never double-refund an order.",
      },
      {
        title: "Brand voice enforced, then sampled",
        description:
          "Tone and policy guardrails run on every response, and a daily random sample is surfaced to Lumen's brand team for review.",
      },
      {
        title: "Escalation is never hidden",
        description:
          "A request for a human is honored immediately, with full conversation context handed to the agent. Trust in the automated path depends on that exit being obvious.",
      },
    ],
    results: [
      "62% of post-purchase requests resolved without escalation",
      "Median resolution time down from 9 hours to 4 minutes",
      "Peak-season seasonal hiring reduced by 40%",
      "CSAT on automated resolutions 4 points above the human baseline",
    ],
    stack: ["Claude", "LangGraph", "TypeScript", "Node.js", "Redis", "Shopify"],
    quote: {
      text: "We went into peak with 40% fewer seasonal agents and better CSAT than the year before. That combination is not supposed to happen.",
      author: "Tomas Lindqvist",
      role: "VP Customer Experience, Lumen Retail",
    },
  },
  {
    slug: "helios-route-optimizer",
    title: "Dynamic Route Optimizer",
    client: "Helios Logistics",
    category: "Logistics",
    summary:
      "Reinforcement learning route planner that adapts to live traffic, weather, and SLA tiers.",
    tags: ["Logistics", "RL", "Optimization"],
    year: "2024",
    duration: "14 weeks",
    team: "4 engineers, 1 operations research specialist",
    overview:
      "Helios dispatchers were building routes at 6am that were materially wrong by 9am. A previous optimizer had been switched off because dispatchers could not tell why it was proposing what it proposed. We rebuilt it around continuous replanning with explainable recommendations, and dispatcher trust is what made it stick.",
    brief:
      "Replan routes continuously against live conditions, honoring hard constraints, in a way dispatchers will leave running rather than override.",
    highlights: [
      {
        title: "Explainability was the adoption blocker",
        description:
          "Every recommendation shows the constraints it honored and what it traded off. Dispatchers audit a suggestion in seconds instead of guessing, which is why override rates fell rather than climbed.",
      },
      {
        title: "Hard constraints stay hard",
        description:
          "Hours-of-service, vehicle capability, hazmat restrictions, and SLA tiers are modeled as constraints the optimizer cannot violate — not as penalty terms it can trade away.",
      },
      {
        title: "Calibrated ETAs, not optimistic ones",
        description:
          "Arrival windows carry validated confidence intervals. An 80% window contains the actual arrival 80% of the time, which is what made customer-facing ETAs safe to publish.",
      },
      {
        title: "Offline-first driver application",
        description:
          "Coverage gaps are routine on long-haul lanes. The driver app works fully offline and reconciles on reconnect, so a dead zone never loses a proof of delivery.",
      },
    ],
    results: [
      "1.4M routes optimized in the first year",
      "8,200 vehicles orchestrated daily at steady state",
      "ETA accuracy improved 22 percentage points",
      "Dispatcher override rate down from 34% to 7%",
    ],
    stack: ["Python", "PyTorch", "OR-Tools", "Kafka", "Postgres", "React Native"],
    quote: {
      text: "The difference from the last system is that our dispatchers can see the reasoning. That is the entire reason this one is still switched on.",
      author: "Grace Adeyemi",
      role: "Director of Network Operations, Helios Logistics",
    },
  },
  {
    slug: "meridian-tutor",
    title: "Adaptive Tutoring Copilot",
    client: "Meridian Education",
    category: "Education",
    summary:
      "Personalized K-12 tutoring agent grounded in district curricula with assessment-aware feedback.",
    tags: ["Education", "Tutoring", "RAG"],
    year: "2025",
    duration: "12 weeks",
    team: "3 engineers, 1 designer, 1 curriculum specialist",
    overview:
      "Meridian serves 32 districts and had watched generic AI tutors confuse students by teaching methods that contradicted the classroom. We built a Socratic tutoring agent scoped strictly to district-approved instructional materials, integrated into the existing LMS, with student privacy constraints designed in from the first architecture review.",
    brief:
      "Deliver one-to-one tutoring at scale that reinforces what the teacher taught, withholds answers, and never trains on student work.",
    highlights: [
      {
        title: "Scoped to the district's own curriculum",
        description:
          "Retrieval is restricted to approved instructional materials per district, so explanations match the method students were actually taught rather than a plausible alternative.",
      },
      {
        title: "Socratic by construction",
        description:
          "The agent is constrained to scaffolding and cannot produce a final answer. Persistent gaps escalate to the teacher's dashboard instead of being papered over.",
      },
      {
        title: "Privacy designed in, not bolted on",
        description:
          "FERPA and COPPA-aligned from day one: strict data minimization, no training on student-generated content, and district-level data isolation.",
      },
      {
        title: "Zero-friction teacher setup",
        description:
          "It lives inside the existing LMS with no separate gradebook and no new login. Setup takes minutes, which is the only budget teachers actually have.",
      },
    ],
    results: [
      "180K students reached across 32 districts",
      "Mastery gains of 0.4 standard deviations on unit assessments",
      "6 teacher hours reclaimed per week on average",
      "Zero student-data incidents across the first academic year",
    ],
    stack: ["Claude", "pgvector", "Python", "Next.js", "Postgres", "LTI 1.3"],
    quote: {
      text: "The first AI tutor our teachers stopped treating as a threat, because it teaches the way they taught it.",
      author: "Dana Whitfield",
      role: "Chief Academic Officer, Meridian Education",
    },
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string }[];

  /* ---- detail-page content (`/case-studies/[slug]`) ---- */

  /** Client profile strip on the detail page. */
  profile?: { label: string; value: string }[];
  /** Expanded problem narrative. */
  problemDetail?: string;
  /** Ordered delivery approach. */
  approach?: { step: string; title: string; description: string }[];
  /** Expanded outcome narrative. */
  outcomeDetail?: string;
  /** Technologies used. */
  stack?: string[];
  /** Client pull-quote. */
  quote?: { text: string; author: string; role: string };
  /** Solution slugs applied on this engagement. */
  solutionsUsed?: string[];
  /** Industry slug, for cross-linking to the industry page. */
  industrySlug?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "northwind-prior-auth",
    title: "Cutting prior-auth cycle time by 71%",
    client: "Northwind Health",
    industry: "Healthcare",
    problem:
      "Manual prior authorization consumed 6+ hours per case and delayed care for thousands of patients.",
    solution:
      "We built a HIPAA-compliant agent that drafts letters, attaches evidence, and routes to payers via existing APIs.",
    outcome:
      "Average cycle time fell from 4.2 days to 1.2 days. Denials dropped 38% in the first quarter post-launch.",
    metrics: [
      { label: "Cycle time reduction", value: "71%" },
      { label: "Denial reduction", value: "38%" },
      { label: "Hours saved / clinician / week", value: "14" },
    ],
    profile: [
      { label: "Industry", value: "Healthcare" },
      { label: "Size", value: "31 ambulatory clinics" },
      { label: "Engagement", value: "14 weeks" },
      { label: "Team", value: "4 engineers, 1 designer, 1 clinical SME" },
    ],
    problemDetail:
      "Prior authorization at Northwind consumed more than six hours of staff time per case and delayed care for thousands of patients each quarter. The work itself was mechanical — pull evidence from the chart, match it against a payer's current criteria, assemble a packet, submit, track. But payer criteria differ by plan and change frequently, so an earlier rules-engine attempt had been abandoned after the maintenance burden exceeded the savings.",
    approach: [
      {
        step: "01",
        title: "Shadow the real process",
        description:
          "Three weeks with the revenue-cycle team timing every step of an actual prior-auth case. The documented process and the real one diverged significantly, and the gap was where the volume sat.",
      },
      {
        step: "02",
        title: "Model payer rules as configuration",
        description:
          "Rather than encoding criteria in code, we made payer policy versioned configuration owned by the revenue-cycle team — so a criteria change is an update, not a release.",
      },
      {
        step: "03",
        title: "Build inside Epic",
        description:
          "The entire experience ships as a SMART on FHIR panel. Evidence assembly, letter drafting, and submission tracking all happen without leaving the chart.",
      },
      {
        step: "04",
        title: "Gate on confidence",
        description:
          "Nothing files without a clinician signature, and low-confidence evidence matches route to a human reviewer with the source passages attached.",
      },
    ],
    outcomeDetail:
      "Average cycle time fell from 4.2 days to 1.2 days within the first quarter, and denials dropped 38% — largely because packets now consistently include the evidence payers were rejecting cases for omitting. The revenue-cycle team has updated payer criteria 40+ times without engineering involvement, which is the result that made the system sustainable rather than merely impressive.",
    stack: ["Claude", "Python", "FHIR", "Postgres", "AWS", "Next.js"],
    quote: {
      text: "The first tool we've deployed where clinicians asked us to expand it faster, not slow it down. That has never happened here before.",
      author: "Dr. Elena Marsh",
      role: "Chief Medical Information Officer, Northwind Health",
    },
    solutionsUsed: ["ai-automation", "ai-agents", "rag-systems"],
    industrySlug: "healthcare",
  },
  {
    slug: "atlas-rag-research",
    title: "Grounding an AI research analyst on a decade of data",
    client: "Atlas Capital",
    industry: "Finance",
    problem:
      "Analysts spent 60% of their day searching filings, transcripts, and broker notes for context.",
    solution:
      "A citation-grounded RAG system with role-aware controls, evaluated against a 1,200-question benchmark.",
    outcome:
      "Analyst throughput doubled on coverage tasks and onboarding time for new hires dropped by half.",
    metrics: [
      { label: "Analyst throughput", value: "2x" },
      { label: "Onboarding time", value: "−50%" },
      { label: "Answer grounding", value: "97%" },
    ],
    profile: [
      { label: "Industry", value: "Financial services" },
      { label: "Size", value: "$18B AUM, 140 analysts" },
      { label: "Engagement", value: "12 weeks" },
      { label: "Team", value: "3 engineers, 1 strategist" },
    ],
    problemDetail:
      "Atlas analysts estimated they spent 60% of their day searching rather than analyzing — across a decade of filings, earnings transcripts, and licensed broker research spread over four separate systems. Two prior vendor pilots had failed compliance review: neither could demonstrate where an answer came from, and neither enforced the firm's information barriers at retrieval time.",
    approach: [
      {
        step: "01",
        title: "Build the benchmark first",
        description:
          "Before any retrieval code, we worked with Atlas analysts to build a 1,200-question labeled benchmark. Every subsequent decision had to move recall@10 on that set or it did not ship.",
      },
      {
        step: "02",
        title: "Fix ingestion before retrieval",
        description:
          "Most early failures traced back to parsing, not search. Structure-aware chunking of tables and financial statements moved the number more than any embedding change.",
      },
      {
        step: "03",
        title: "Hybrid retrieval with reranking",
        description:
          "Dense embeddings plus BM25 with a cross-encoder reranker lifted recall@10 from 71% to 94%. Pure vector search consistently missed exact tickers and line-item labels.",
      },
      {
        step: "04",
        title: "Enforce barriers at query time",
        description:
          "Wall assignments filter the candidate set before generation, so restricted material cannot influence an answer. This was compliance's condition for approval.",
      },
    ],
    outcomeDetail:
      "Analyst throughput doubled on coverage tasks and onboarding time for new hires dropped by half — new analysts could answer questions on unfamiliar names without first learning where everything lived. Compliance approved the system in a single review cycle, and the firm has recorded no information-barrier exceptions in the year since launch.",
    stack: [
      "Claude",
      "pgvector",
      "Elasticsearch",
      "Python",
      "LangChain",
      "Next.js",
    ],
    quote: {
      text: "Compliance approved it in one review cycle. In this firm, that is the strongest endorsement a system can get.",
      author: "Priya Raman",
      role: "Head of Research Technology, Atlas Capital",
    },
    solutionsUsed: ["rag-systems", "llm-integrations", "data-analytics"],
    industrySlug: "finance",
  },
  {
    slug: "vertex-failure-forecast",
    title: "Predicting equipment failure 72 hours out",
    client: "Vertex Manufacturing",
    industry: "Manufacturing",
    problem:
      "Unplanned downtime cost the company an estimated $42M annually across 14 production lines.",
    solution:
      "A multimodal model combining SCADA telemetry, vibration sensors, and floor-camera vision to forecast failures.",
    outcome:
      "False-positive rate dropped to 9%, downtime reduced 34%, and OEE improved by 6 percentage points.",
    metrics: [
      { label: "False-positive rate", value: "9%" },
      { label: "Downtime reduction", value: "34%" },
      { label: "OEE lift", value: "+6 pts" },
    ],
    profile: [
      { label: "Industry", value: "Industrial manufacturing" },
      { label: "Size", value: "14 plants, 47 production lines" },
      { label: "Engagement", value: "16 weeks" },
      { label: "Team", value: "5 engineers, 1 reliability SME" },
    ],
    problemDetail:
      "Unplanned downtime cost Vertex an estimated $42M annually across 14 plants. The telemetry needed to predict most of those failures already sat in their historian, unused. A previous vendor pilot had produced alerts at roughly a 40% false-positive rate, and the floor had responded the way any team would — they muted it, and were sceptical of anything that followed.",
    approach: [
      {
        step: "01",
        title: "Reconstruct the labels",
        description:
          "Usable failure labels did not exist. We derived them from work orders and operator logs, then had Vertex's reliability engineers validate every one before it entered a training set.",
      },
      {
        step: "02",
        title: "Optimize for precision, explicitly",
        description:
          "Given the history, recall was worth less than credibility. We tuned against false positives first and accepted a shorter lead time on marginal asset classes to get there.",
      },
      {
        step: "03",
        title: "Go multimodal",
        description:
          "SCADA telemetry alone plateaued well short of a useful lead time. Adding vibration spectra and floor-camera vision extended it to 72 hours across the main asset classes.",
      },
      {
        step: "04",
        title: "Deploy at the edge",
        description:
          "The OT network is air-gapped from IT. Inference runs on edge hardware inside the plant boundary, with only aggregated predictions crossing into corporate systems.",
      },
    ],
    outcomeDetail:
      "The false-positive rate settled at 9% and has held there through a full year of operation, which is what earned the system a standing place in shutdown planning. Downtime on monitored lines fell 34% and OEE improved by six percentage points. Vertex has since extended coverage to three additional asset classes using the same pipeline.",
    stack: ["PyTorch", "Python", "Kafka", "TimescaleDB", "Docker", "Azure"],
    quote: {
      text: "The last vendor gave us a model. This team gave us something the floor supervisors actually check before they schedule a shutdown.",
      author: "Marcus Feld",
      role: "VP Reliability Engineering, Vertex Manufacturing",
    },
    solutionsUsed: [
      "predictive-analytics",
      "custom-ai-development",
      "data-analytics",
    ],
    industrySlug: "manufacturing",
  },
];

/**
 * A block of long-form body content. Kept as a small discriminated union
 * rather than raw markdown so the post template can style each block with
 * design-system components and stay XSS-free.
 */
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "code"; language: string; code: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string; // ISO date
  readingMinutes: number;
  author: { name: string; role: string };

  /* ---- detail-page content (`/resources/blog/[slug]`) ---- */

  /** Long-form body, rendered block by block. */
  body?: ContentBlock[];
  /** Topic tags shown under the post header. */
  tags?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "evaluating-rag-systems",
    title: "How we evaluate RAG systems in production",
    excerpt:
      "A practical framework for measuring retrieval quality, answer grounding, and user trust at scale.",
    category: "AI",
    publishedAt: "2026-07-14",
    readingMinutes: 9,
    author: { name: "Sana Qureshi", role: "Staff ML Engineer" },
    tags: ["RAG", "Evaluation", "Retrieval"],
    body: [
      {
        type: "paragraph",
        text: "Every RAG system we have inherited from another team had the same gap: nobody could say how good retrieval actually was. There were vibes, there were cherry-picked demos, and there was a growing backlog of complaints about wrong answers. What there was not was a number.",
      },
      {
        type: "paragraph",
        text: "This is the framework we use on every engagement. It is not sophisticated. Its value comes entirely from being done at all, and from being done before any retrieval code is written.",
      },
      { type: "heading", text: "Start with a labeled query set" },
      {
        type: "paragraph",
        text: "Collect real questions from real users — two hundred is plenty to start. For each one, have a domain expert identify the passages that genuinely answer it. This is tedious and there is no way around it. Every retrieval decision you make afterwards is either justified by this set or it is a guess.",
      },
      {
        type: "paragraph",
        text: "Two rules matter here. Questions must come from users, not from the team building the system, because engineers write questions their system can already answer. And the labeling must be done by someone who knows the domain, because the difference between a passage that mentions a topic and one that answers a question is exactly the difference you are trying to measure.",
      },
      { type: "heading", text: "Measure retrieval separately from generation" },
      {
        type: "paragraph",
        text: "The single most common mistake is evaluating end-to-end answer quality and drawing conclusions about retrieval. When an answer is wrong, you need to know whether the right passage was never retrieved or whether it was retrieved and the model ignored it. Those failures have completely different fixes.",
      },
      {
        type: "list",
        items: [
          "Recall@k — is the correct passage anywhere in the top k results?",
          "MRR — how high up does the first correct passage appear?",
          "Groundedness — is every claim in the answer supported by a retrieved span?",
          "Answer correctness — judged against the labeled answer, only after the above",
        ],
      },
      {
        type: "paragraph",
        text: "Recall@k is where we spend most of our time. If the correct passage is not in the candidate set, no amount of prompt engineering downstream will save the answer.",
      },
      { type: "heading", text: "Fix ingestion before you touch embeddings" },
      {
        type: "paragraph",
        text: "On most engagements the biggest single jump in retrieval quality came from parsing and chunking, not from a better embedding model. Tables flattened into unreadable text, headers detached from the sections they label, PDFs whose reading order is scrambled — these produce chunks that no retriever can rescue.",
      },
      {
        type: "quote",
        text: "If your recall is below 70%, the problem is almost certainly in your ingestion pipeline, not your retriever.",
      },
      { type: "heading", text: "Use hybrid retrieval" },
      {
        type: "paragraph",
        text: "Pure dense retrieval fails reliably and predictably on exact identifiers: ticker symbols, part numbers, error codes, statute references. Combining BM25 with embeddings and reranking the union with a cross-encoder is close to a free win. On one financial-services engagement this moved recall@10 from 71% to 94%.",
      },
      { type: "heading", text: "Put it in CI" },
      {
        type: "paragraph",
        text: "An evaluation you run manually is an evaluation you stop running. Wire the suite into your pipeline with a threshold that fails the build on regression. This is the artifact that keeps quality from decaying silently over the six months after launch, which is when decay actually happens.",
      },
      {
        type: "code",
        language: "bash",
        code: "# fails the build if recall@10 drops below the committed baseline\n$ evals run --suite retrieval --min-recall-at-10 0.90\n\n  retrieval/recall@10   0.94  (baseline 0.90)  PASS\n  retrieval/mrr         0.81  (baseline 0.78)  PASS\n  answers/groundedness  0.97  (baseline 0.95)  PASS",
      },
      { type: "heading", text: "What this costs" },
      {
        type: "paragraph",
        text: "Building the labeled set takes a domain expert two or three days. The harness itself is perhaps a week of engineering. Against a system you intend to run for years, that is nothing — and it is the difference between improving retrieval deliberately and changing things hopefully.",
      },
    ],
  },
  {
    slug: "agent-reliability-patterns",
    title: "Reliability patterns for AI agents",
    excerpt:
      "Deterministic checkpoints, replayable traces, and the boring infrastructure that makes agents trustworthy.",
    category: "Engineering",
    publishedAt: "2026-06-30",
    readingMinutes: 12,
    author: { name: "David Okafor", role: "Head of Platform" },
    tags: ["Agents", "Reliability", "Platform"],
    body: [
      {
        type: "paragraph",
        text: "Agent demos are easy to build and easy to believe. An agent chains six tool calls, completes a task that would have taken a person twenty minutes, and everyone in the room concludes the hard part is done. The hard part has not started.",
      },
      {
        type: "paragraph",
        text: "The engineering that separates a demo from something you would authorize to touch production is unglamorous. It is three things, and none of them involve the model.",
      },
      { type: "heading", text: "1. Knowing when not to act" },
      {
        type: "paragraph",
        text: "An agent that always acts is a liability. The valuable capability is recognizing that confidence is too low to proceed and stopping. That means explicit thresholds, checked deterministically between reasoning steps rather than left to the model's own judgment about its own certainty.",
      },
      {
        type: "list",
        items: [
          "Confidence gates before any state-changing action",
          "Policy checks that a step cannot bypass, evaluated in code",
          "Blast-radius limits — number of records, dollar amounts, irreversibility",
          "Explicit human approval above configured thresholds",
        ],
      },
      { type: "heading", text: "2. Making every side effect reversible" },
      {
        type: "paragraph",
        text: "Before an agent gets a tool, that tool needs an idempotency key and a defined rollback path. This is a constraint on your tool layer, not on the agent, and it is the constraint that determines how much autonomy you can safely grant.",
      },
      {
        type: "paragraph",
        text: "In practice this means every tool accepts a request identifier and returns the same result if called twice with it. It means writes go through an interface that records a compensating action. And it means a dry-run mode, because the most valuable thing an agent can do during rollout is tell you what it would have done.",
      },
      {
        type: "quote",
        text: "The agent is only ever as safe as its worst tool. Audit the tools, not the prompt.",
      },
      { type: "heading", text: "3. Leaving a trace someone can replay" },
      {
        type: "paragraph",
        text: "When an agent does something wrong — and it will — you need to reconstruct exactly why. That means capturing prompts, tool calls, intermediate state, and model versions for every run, and being able to replay that run against a new configuration to verify a fix.",
      },
      {
        type: "paragraph",
        text: "Replay is what turns agent debugging from archaeology into engineering. Without it, every incident review ends in a plausible theory that nobody can test.",
      },
      { type: "heading", text: "Write the authority document first" },
      {
        type: "paragraph",
        text: "Before any code, we write down what the agent may do unsupervised, what requires approval, and what it must never attempt. It is usually a single page. It is also the artifact that gets an agent approved for production, because it turns an open-ended capability into a bounded one that a risk function can evaluate.",
      },
      {
        type: "paragraph",
        text: "Teams that skip this end up negotiating scope during the security review, which is the most expensive possible moment to discover you and your stakeholders disagreed about what the agent was for.",
      },
    ],
  },
  {
    slug: "automation-roi-cheatsheet",
    title: "A cheatsheet for AI automation ROI",
    excerpt:
      "Five dimensions to measure, three traps to avoid, and the one question we ask every prospective client.",
    category: "Automation",
    publishedAt: "2026-06-12",
    readingMinutes: 6,
    author: { name: "Mariana Costa", role: "Engagement Lead" },
    tags: ["ROI", "Strategy", "Automation"],
    body: [
      {
        type: "paragraph",
        text: "Most AI business cases we are shown measure one thing: labor hours removed. It is the easiest number to produce and the least likely to survive a finance review, because it assumes the hours convert to cost savings and they usually do not.",
      },
      { type: "heading", text: "Five dimensions worth measuring" },
      {
        type: "list",
        items: [
          "Cycle time — elapsed time from request to resolution, not hands-on time",
          "Throughput per person — output at constant headcount, which is what usually happens",
          "Error and rework rate — often the largest hidden cost in the current process",
          "Coverage — work that was previously not done at all because nobody had capacity",
          "Variance — consistency of outcome, which matters enormously in regulated settings",
        ],
      },
      {
        type: "paragraph",
        text: "Cycle time is the one we push hardest on. It is measurable before and after with no modeling assumptions, and in most businesses it maps directly onto revenue recognition or customer satisfaction.",
      },
      { type: "heading", text: "Three traps" },
      {
        type: "paragraph",
        text: "The first is counting hours saved as dollars saved. Unless you are actually reducing headcount — and you probably are not — those hours get reallocated. The honest framing is capacity gained, and the business case should say what you intend to do with it.",
      },
      {
        type: "paragraph",
        text: "The second is ignoring the maintenance tail. Models drift, sources change, and someone owns the eval suite. Budget 15–25% of build cost annually and put a name against it, or the system quietly decays until it is switched off.",
      },
      {
        type: "paragraph",
        text: "The third is measuring against an idealized baseline. Compare against what the process actually does today, including its error rate and its backlog — not against the documented process that nobody follows.",
      },
      {
        type: "quote",
        text: "If your business case cannot survive being wrong by 40% in either direction, it is not a business case — it is a hope with a spreadsheet attached.",
      },
      { type: "heading", text: "The question we ask every client" },
      {
        type: "paragraph",
        text: "Before scoping anything, we ask: if this works exactly as specified, what decision changes? If the honest answer is that a report gets produced faster but nobody acts differently, the ROI is zero regardless of how good the model is. That question has killed more of our own proposals than any technical constraint.",
      },
    ],
  },
  {
    slug: "tutorial-claude-tool-use",
    title: "Tutorial: production-grade tool use with Claude",
    excerpt:
      "A walkthrough of error handling, schema validation, and observability patterns that survive contact with users.",
    category: "Tutorials",
    publishedAt: "2026-05-28",
    readingMinutes: 18,
    author: { name: "Anand Subramanian", role: "Senior Engineer" },
    tags: ["Tutorials", "Tool use", "Claude"],
    body: [
      {
        type: "paragraph",
        text: "Tool use is the feature that turns a language model into something that can do work. It is also where most production incidents originate, because the failure modes only appear at volume and none of them show up in a tutorial.",
      },
      {
        type: "paragraph",
        text: "This walkthrough covers the four patterns we apply on every engagement: strict schemas, idempotency, graceful degradation, and observability.",
      },
      { type: "heading", text: "Define tools with strict schemas" },
      {
        type: "paragraph",
        text: "Every parameter gets a type, a constraint, and a description written for a reader who has no other context. Validate the arguments before execution and return a structured error the model can act on, rather than raising and losing the turn.",
      },
      {
        type: "code",
        language: "python",
        code: 'tools = [{\n    "name": "issue_refund",\n    "description": (\n        "Refund a completed order. Requires an idempotency key. "\n        "Amount may not exceed the original order total."\n    ),\n    "input_schema": {\n        "type": "object",\n        "properties": {\n            "order_id": {"type": "string", "pattern": "^ord_[a-z0-9]{12}$"},\n            "amount_cents": {"type": "integer", "minimum": 1},\n            "idempotency_key": {"type": "string"},\n            "reason": {"type": "string", "maxLength": 500},\n        },\n        "required": ["order_id", "amount_cents", "idempotency_key"],\n    },\n}]',
      },
      {
        type: "paragraph",
        text: "The description field is doing real work here. Constraints stated in prose are respected far more consistently than constraints that only exist in the schema, so state them in both places.",
      },
      { type: "heading", text: "Make retries safe" },
      {
        type: "paragraph",
        text: "Networks fail, requests time out, and your orchestration layer will retry. If your tool is not idempotent, a retry becomes a double refund. Require an idempotency key on every state-changing tool and enforce it in the handler, not in the prompt.",
      },
      {
        type: "code",
        language: "python",
        code: 'def issue_refund(order_id, amount_cents, idempotency_key, reason=""):\n    existing = refunds.get(idempotency_key)\n    if existing:\n        return {"status": "ok", "refund_id": existing.id, "replayed": True}\n\n    order = orders.get(order_id)\n    if order is None:\n        return {"status": "error", "code": "order_not_found"}\n    if amount_cents > order.total_cents:\n        return {"status": "error", "code": "amount_exceeds_total",\n                "max_cents": order.total_cents}\n\n    refund = payments.refund(order, amount_cents, key=idempotency_key)\n    return {"status": "ok", "refund_id": refund.id, "replayed": False}',
      },
      { type: "heading", text: "Return errors the model can use" },
      {
        type: "paragraph",
        text: "Notice that the failure paths return structured results rather than raising. A model that receives amount_exceeds_total with a max_cents field can correct itself on the next turn. A model that receives a stack trace, or nothing at all, cannot.",
      },
      {
        type: "quote",
        text: "Every error your tool returns is a prompt. Write it for the model that has to recover from it.",
      },
      { type: "heading", text: "Instrument everything" },
      {
        type: "paragraph",
        text: "Log the tool name, arguments, result, latency, and the model version for every call. When a customer reports a wrong outcome six weeks later, this is the only thing standing between you and a theory you cannot test.",
      },
      {
        type: "list",
        items: [
          "Trace ID linking the full turn: prompt, tool calls, and final response",
          "Argument capture with PII redaction applied before storage",
          "Latency and error rate per tool, alerted independently",
          "Model and prompt version stamped on every record",
        ],
      },
      { type: "heading", text: "Add a dry-run mode" },
      {
        type: "paragraph",
        text: "During rollout, the most useful thing a system can do is tell you what it would have done without doing it. A dry-run flag on every state-changing tool lets you run against production traffic for a week and review the decisions before granting write access. We have never regretted the week.",
      },
    ],
  },
];

/** Look up a single portfolio item by slug. */
export function getPortfolioItem(slug: string): PortfolioItem | undefined {
  return portfolioItems.find((p) => p.slug === slug);
}

/** Look up a single case study by slug. */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/** Look up a single blog post by slug. */
export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((b) => b.slug === slug);
}

/** Posts other than `slug`, most recent first, capped at `limit`. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}