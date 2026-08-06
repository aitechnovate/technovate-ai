/**
 * Industry catalogue — powers `/industries` (index) and `/industries/[slug]`
 * (detail).
 */

import type { IconName } from "@/components/ui/Icon";

export type Industry = {
  slug: string;
  name: string;
  description: string;
  /** Short bullets shown on the index tile. */
  useCases: string[];
  metric: { label: string; value: string };
  stat: { label: string; value: string };
  icon: IconName;

  /* ---- detail-page content ---- */

  heroLead: string;
  heroHighlight: string;
  /** The sector-specific pressure driving AI adoption. */
  context: { title: string; body: string };
  /** Named challenges with our corresponding response. */
  challenges: { challenge: string; response: string }[];
  /** Deeper use-case blocks. */
  useCaseDetails: { title: string; description: string; icon: IconName }[];
  /** Regulatory and compliance frameworks we work within. */
  compliance: string[];
  /** KPI strip for the detail hero. */
  kpis: { label: string; value: string }[];
  /** Slug of the case study to feature. */
  caseStudySlug: string;
  /** Solution slugs most relevant to this sector. */
  relatedSolutions: string[];
  /** Sibling industry slugs to cross-link. */
  related: string[];
};

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    description:
      "Clinical documentation, triage, prior auth, and HIPAA-compliant copilots. We work inside your EHR — not around it.",
    useCases: [
      "Ambient documentation copilots",
      "Prior authorization automation",
      "Triage & intake agents",
      "Coding & billing assistance",
    ],
    metric: { label: "Clinician hours saved", value: "14 / wk" },
    stat: { label: "EHR systems integrated", value: "11" },
    icon: "HeartPulse",
    heroLead: "AI that gives clinicians",
    heroHighlight: "their evenings back.",
    context: {
      title: "The administrative load is the burnout.",
      body: "Clinicians spend nearly two hours on documentation and administration for every hour of direct patient care. That ratio is the single largest driver of burnout in the profession, and it is almost entirely composed of work that AI can absorb — if it is deployed inside the clinical workflow rather than beside it.",
    },
    challenges: [
      {
        challenge: "PHI cannot leave your compliance boundary",
        response:
          "We deploy inside your VPC or on-premises under a signed BAA, with PHI never transiting a third-party endpoint you have not approved.",
      },
      {
        challenge: "Clinicians will not adopt a second system",
        response:
          "Everything ships inside Epic, Cerner, or your existing EHR surface. If it requires a separate login, adoption dies in week two.",
      },
      {
        challenge: "Errors carry clinical risk",
        response:
          "Every generated artifact is drafted for review, never auto-filed. Confidence thresholds route uncertain cases to a human by default.",
      },
      {
        challenge: "Payer rules change constantly",
        response:
          "Payer policy is treated as versioned configuration, not hardcoded logic, so a rule change is a config update rather than a release.",
      },
    ],
    useCaseDetails: [
      {
        title: "Ambient documentation",
        description:
          "Structured clinical notes drafted from the encounter in real time, formatted to your templates and queued for clinician sign-off.",
        icon: "Mic2",
      },
      {
        title: "Prior authorization",
        description:
          "Automated letter drafting with evidence attached from the chart, routed to payers through existing integrations.",
        icon: "FileCheck",
      },
      {
        title: "Triage & intake",
        description:
          "Symptom intake and routing agents that follow your protocols and escalate anything outside their configured scope.",
        icon: "Stethoscope",
      },
      {
        title: "Coding & billing",
        description:
          "ICD-10 and CPT suggestion with the supporting chart evidence surfaced alongside each code for coder review.",
        icon: "Tag",
      },
      {
        title: "Referral management",
        description:
          "Automated referral packet assembly and status tracking, closing the loop that today runs on fax and phone tag.",
        icon: "Send",
      },
      {
        title: "Clinical knowledge search",
        description:
          "Citation-grounded search across protocols, formularies, and guidelines, scoped to the clinician's role and site.",
        icon: "Search",
      },
    ],
    compliance: ["HIPAA", "HITRUST", "SOC 2 Type II", "21 CFR Part 11", "GDPR"],
    kpis: [
      { label: "Prior-auth cycle time reduction", value: "71%" },
      { label: "Clinician hours saved weekly", value: "14" },
      { label: "EHR systems integrated", value: "11" },
    ],
    caseStudySlug: "northwind-prior-auth",
    relatedSolutions: ["ai-automation", "rag-systems", "ai-agents"],
    related: ["finance", "education"],
  },
  {
    slug: "finance",
    name: "Finance",
    description:
      "Risk, fraud, AML, and advisor copilots grounded in regulatory frameworks and the documents that drive them.",
    useCases: [
      "Citation-grounded research terminals",
      "AML alert triage",
      "Advisor copilots",
      "Document extraction for compliance",
    ],
    metric: { label: "Analyst throughput", value: "2x" },
    stat: { label: "Documents processed monthly", value: "8.4M" },
    icon: "Scale",
    heroLead: "AI your model-risk committee",
    heroHighlight: "will actually approve.",
    context: {
      title: "In finance, an unexplainable model is an unusable model.",
      body: "Every model that touches a customer decision has to survive model-risk review, and every answer an analyst acts on has to be traceable to a source. That constraint rules out most consumer-grade AI tooling outright — and it is precisely the constraint our systems are designed around.",
    },
    challenges: [
      {
        challenge: "Model risk governance blocks deployment",
        response:
          "We produce the model documentation, validation evidence, and monitoring plan your MRM function requires as a delivery artifact, not an afterthought.",
      },
      {
        challenge: "Answers must be auditable",
        response:
          "Span-level citations on every generated answer, with the retrieved evidence retained for the full audit window.",
      },
      {
        challenge: "Material non-public information must stay siloed",
        response:
          "Retrieval enforces information-barrier rules at query time, so a user's results respect their wall assignment before generation.",
      },
      {
        challenge: "False positives overwhelm analysts",
        response:
          "Calibrated scoring with reason codes lets you tune the precision/recall tradeoff explicitly rather than accept a vendor default.",
      },
    ],
    useCaseDetails: [
      {
        title: "Research terminals",
        description:
          "Citation-grounded search across filings, transcripts, and broker research with permissioning that respects information barriers.",
        icon: "Search",
      },
      {
        title: "AML alert triage",
        description:
          "Automated evidence assembly and narrative drafting for alerts, cutting investigation time while preserving the audit trail.",
        icon: "ShieldCheck",
      },
      {
        title: "Advisor copilots",
        description:
          "Meeting prep, suitability checks, and follow-up drafting grounded in client holdings and current compliance policy.",
        icon: "Briefcase",
      },
      {
        title: "Document extraction",
        description:
          "Structured extraction from credit agreements, prospectuses, and KYC packets with per-field confidence scores.",
        icon: "FileText",
      },
      {
        title: "Risk scoring",
        description:
          "Calibrated probability models with reason codes, documented to satisfy model-risk validation on day one.",
        icon: "Gauge",
      },
      {
        title: "Regulatory change tracking",
        description:
          "Monitoring of rule changes across jurisdictions, mapped automatically to the internal policies they affect.",
        icon: "Gavel",
      },
    ],
    compliance: [
      "SOC 2 Type II",
      "ISO 27001",
      "SR 11-7 model risk",
      "GDPR",
      "FINRA recordkeeping",
    ],
    kpis: [
      { label: "Analyst throughput", value: "2x" },
      { label: "Answer grounding rate", value: "97%" },
      { label: "Documents processed monthly", value: "8.4M" },
    ],
    caseStudySlug: "atlas-rag-research",
    relatedSolutions: ["rag-systems", "predictive-analytics", "data-analytics"],
    related: ["real-estate", "healthcare"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    description:
      "Predictive maintenance, quality vision, and OEE-lifting systems that live on the line, not in the dashboard.",
    useCases: [
      "Predictive maintenance",
      "Quality vision systems",
      "OEE analytics",
      "Field service copilots",
    ],
    metric: { label: "Downtime reduction", value: "34%" },
    stat: { label: "Production lines monitored", value: "47" },
    icon: "Factory",
    heroLead: "Systems that live on the line,",
    heroHighlight: "not in a dashboard.",
    context: {
      title: "Unplanned downtime is the most expensive number on the floor.",
      body: "A single hour of unplanned downtime on a high-throughput line can cost six figures. The telemetry to predict most of those failures already exists in your historian — it is simply never modeled, because the data is messy, the labels are sparse, and the plant team has no reason to trust a model that cries wolf.",
    },
    challenges: [
      {
        challenge: "Operators ignore alerts that are usually wrong",
        response:
          "We tune explicitly for precision on the floor. A model with a 9% false-positive rate gets acted on; one at 40% gets muted within a month.",
      },
      {
        challenge: "OT networks are air-gapped",
        response:
          "Inference runs at the edge inside the OT boundary, with only aggregated telemetry crossing into IT.",
      },
      {
        challenge: "Failure labels are sparse and inconsistent",
        response:
          "We reconstruct labels from maintenance records and operator logs, then validate them with the reliability team before training.",
      },
      {
        challenge: "Every plant is configured differently",
        response:
          "Models are trained per asset class with plant-level calibration, so a rollout to line twelve does not need a rebuild.",
      },
    ],
    useCaseDetails: [
      {
        title: "Predictive maintenance",
        description:
          "Multimodal failure forecasting from SCADA telemetry, vibration sensors, and floor cameras with a usable lead time.",
        icon: "Wrench",
      },
      {
        title: "Quality vision",
        description:
          "Inline defect detection with severity classification and automatic sampling of uncertain cases for human grading.",
        icon: "Camera",
      },
      {
        title: "OEE analytics",
        description:
          "Availability, performance, and quality decomposed automatically, with the driver behind each shift-over-shift change named.",
        icon: "Gauge",
      },
      {
        title: "Field service copilots",
        description:
          "Technicians get procedure retrieval, parts lookup, and guided diagnostics on a tablet, grounded in your service manuals.",
        icon: "Smartphone",
      },
      {
        title: "Supply & inventory forecasting",
        description:
          "Component demand forecasting that reconciles across plant, SKU, and supplier lead-time constraints.",
        icon: "Package",
      },
      {
        title: "Energy optimization",
        description:
          "Load-shifting recommendations that respect production schedules and tariff structures across sites.",
        icon: "Zap",
      },
    ],
    compliance: ["ISO 27001", "IEC 62443", "SOC 2 Type II", "ITAR-ready"],
    kpis: [
      { label: "Downtime reduction", value: "34%" },
      { label: "False-positive rate", value: "9%" },
      { label: "Production lines monitored", value: "47" },
    ],
    caseStudySlug: "vertex-failure-forecast",
    relatedSolutions: [
      "predictive-analytics",
      "custom-ai-development",
      "data-analytics",
    ],
    related: ["logistics", "retail"],
  },
  {
    slug: "retail",
    name: "Retail",
    description:
      "Demand sensing, personalization, and CX automation that scales with the season — and learns from every interaction.",
    useCases: [
      "AI concierges",
      "Demand forecasting",
      "Personalized merchandising",
      "Returns & exchanges automation",
    ],
    metric: { label: "Tickets resolved by AI", value: "62%" },
    stat: { label: "Customer interactions / month", value: "21M" },
    icon: "ShoppingBag",
    heroLead: "Handle peak season",
    heroHighlight: "without tripling the support floor.",
    context: {
      title: "Retail demand is spiky, and headcount is not.",
      body: "Contact volume in retail can multiply five-fold in a peak week, and the traditional answer — seasonal hiring — delivers the least experienced agents at the highest-stakes moment. Automation that resolves the routine tail end-to-end is what lets your experienced agents handle the cases that actually need them.",
    },
    challenges: [
      {
        challenge: "Peak volume overwhelms support",
        response:
          "Agents resolve routine post-purchase requests end-to-end, absorbing the volume spike without a proportional hiring cycle.",
      },
      {
        challenge: "Brand voice must stay consistent",
        response:
          "Tone and policy guardrails are enforced on every response, with a review sample surfaced daily to your brand team.",
      },
      {
        challenge: "Promotions break demand models",
        response:
          "Promotional calendars are modeled as explicit features, so a planned uplift is anticipated rather than flagged as an anomaly.",
      },
      {
        challenge: "Personalization risks feeling invasive",
        response:
          "Recommendation scope is configurable and consent-aware, with a clear boundary on which signals may inform an experience.",
      },
    ],
    useCaseDetails: [
      {
        title: "AI concierge",
        description:
          "Conversational agents that resolve order status, returns, and exchanges directly in your systems rather than deflecting to a form.",
        icon: "MessageCircle",
      },
      {
        title: "Demand sensing",
        description:
          "Short-horizon forecasts reconciled across SKU, store, and channel, with promotional and weather signals modeled explicitly.",
        icon: "TrendingUp",
      },
      {
        title: "Personalized merchandising",
        description:
          "Ranking and recommendation tuned to margin as well as conversion, with guardrails on inventory and category exposure.",
        icon: "Store",
      },
      {
        title: "Returns automation",
        description:
          "Policy-aware returns adjudication with fraud signals, resolving the routine majority without an agent touch.",
        icon: "RefreshCw",
      },
      {
        title: "Catalog enrichment",
        description:
          "Attribute extraction and description generation across large catalogs, with brand-voice validation before publication.",
        icon: "Tag",
      },
      {
        title: "Store operations",
        description:
          "Task generation, labor forecasting, and planogram compliance checks from store camera and POS signals.",
        icon: "ShoppingCart",
      },
    ],
    compliance: ["SOC 2 Type II", "PCI DSS", "GDPR", "CCPA"],
    kpis: [
      { label: "Tickets resolved by AI", value: "62%" },
      { label: "Customer interactions monthly", value: "21M" },
      { label: "Forecast error reduction", value: "−28%" },
    ],
    caseStudySlug: "atlas-rag-research",
    relatedSolutions: ["ai-agents", "predictive-analytics", "ai-automation"],
    related: ["logistics", "manufacturing"],
  },
  {
    slug: "logistics",
    name: "Logistics",
    description:
      "Route optimization, ETA prediction, and reinforcement-learning dispatch for fleets of every shape.",
    useCases: [
      "Dynamic route optimization",
      "ETA prediction",
      "Dispatch & load balancing",
      "Driver copilot apps",
    ],
    metric: { label: "Routes optimized", value: "1.4M" },
    stat: { label: "Vehicles orchestrated daily", value: "8,200" },
    icon: "Truck",
    heroLead: "Plans that survive",
    heroHighlight: "contact with the road.",
    context: {
      title: "The optimal route at 6am is wrong by 9am.",
      body: "Static route planning assumes a world that does not move. Traffic, weather, dock congestion, and same-day insertions invalidate the morning plan within hours. The value is not in a better initial plan — it is in continuous replanning that dispatchers trust enough to leave running.",
    },
    challenges: [
      {
        challenge: "Dispatchers override the optimizer",
        response:
          "Every recommendation carries its reasoning and the constraints it honored, so dispatchers can audit a suggestion instead of guessing at it.",
      },
      {
        challenge: "ETAs erode customer trust",
        response:
          "Probabilistic ETAs with calibrated intervals, so a promised window reflects real uncertainty rather than optimistic arithmetic.",
      },
      {
        challenge: "Constraints are numerous and hard",
        response:
          "Hours-of-service, vehicle capability, hazmat, and SLA tiers are modeled as hard constraints the optimizer cannot violate.",
      },
      {
        challenge: "Connectivity is intermittent in the field",
        response:
          "Driver applications work offline-first and reconcile on reconnect, so a dead zone never loses a proof of delivery.",
      },
    ],
    useCaseDetails: [
      {
        title: "Dynamic route optimization",
        description:
          "Continuous replanning against live traffic, weather, and dock availability, with hard constraints respected at every step.",
        icon: "Map",
      },
      {
        title: "ETA prediction",
        description:
          "Calibrated arrival windows with confidence intervals, updated en route and pushed to customer-facing surfaces.",
        icon: "Timer",
      },
      {
        title: "Dispatch & load balancing",
        description:
          "Assignment that balances cost, service level, and driver equity, with explainable reasoning for every allocation.",
        icon: "Network",
      },
      {
        title: "Driver copilots",
        description:
          "Offline-capable mobile applications for navigation, documentation capture, and exception reporting from the cab.",
        icon: "Smartphone",
      },
      {
        title: "Freight document AI",
        description:
          "Extraction from bills of lading, customs forms, and proofs of delivery with confidence-routed human review.",
        icon: "FileText",
      },
      {
        title: "Network design",
        description:
          "Scenario modeling for facility placement and lane strategy, with sensitivity analysis on demand and fuel assumptions.",
        icon: "Globe",
      },
    ],
    compliance: ["SOC 2 Type II", "ISO 27001", "GDPR", "C-TPAT-aligned"],
    kpis: [
      { label: "Routes optimized", value: "1.4M" },
      { label: "Vehicles orchestrated daily", value: "8,200" },
      { label: "ETA accuracy improvement", value: "+22 pts" },
    ],
    caseStudySlug: "vertex-failure-forecast",
    relatedSolutions: [
      "predictive-analytics",
      "custom-ai-development",
      "ai-automation",
    ],
    related: ["manufacturing", "retail"],
  },
  {
    slug: "education",
    name: "Education",
    description:
      "Adaptive tutoring, grading copilots, and district-curriculum-grounded agents that respect student privacy.",
    useCases: [
      "Adaptive tutoring agents",
      "Grading copilots",
      "Curriculum-aligned RAG",
      "Teacher operations automation",
    ],
    metric: { label: "Students reached", value: "180K" },
    stat: { label: "Districts served", value: "32" },
    icon: "GraduationCap",
    heroLead: "Tutoring that scales",
    heroHighlight: "without replacing teachers.",
    context: {
      title: "One-to-one tutoring works. It has never been affordable.",
      body: "Individual tutoring is among the most robust interventions in education research, and also the least scalable. AI closes that gap only if it is grounded in the district's own curriculum and assessment framework — a generic chatbot that contradicts the lesson plan makes a teacher's job harder, not easier.",
    },
    challenges: [
      {
        challenge: "Student data privacy is non-negotiable",
        response:
          "FERPA and COPPA-aligned deployments with strict data minimization and no training on student-generated content.",
      },
      {
        challenge: "Generic AI contradicts the curriculum",
        response:
          "Retrieval is scoped to district-approved materials, so explanations match the method the student was actually taught.",
      },
      {
        challenge: "Students will try to get answers handed to them",
        response:
          "Tutoring agents are constrained to Socratic scaffolding, withholding final answers and escalating persistent gaps to the teacher.",
      },
      {
        challenge: "Teachers have no time for new tools",
        response:
          "Everything integrates into the existing LMS. Setup is measured in minutes and requires no separate gradebook.",
      },
    ],
    useCaseDetails: [
      {
        title: "Adaptive tutoring",
        description:
          "Socratic tutoring agents grounded in district curricula, adapting pace and scaffolding to demonstrated mastery.",
        icon: "School",
      },
      {
        title: "Grading copilots",
        description:
          "Rubric-aligned draft feedback on written work, always surfaced for teacher review before it reaches a student.",
        icon: "Pencil",
      },
      {
        title: "Curriculum-aligned search",
        description:
          "Retrieval scoped to approved instructional materials, so answers reinforce rather than contradict classroom instruction.",
        icon: "Search",
      },
      {
        title: "Teacher operations",
        description:
          "Lesson planning, differentiation, and family communication drafting that reclaims hours from administrative work.",
        icon: "Briefcase",
      },
      {
        title: "Early-warning analytics",
        description:
          "Engagement and mastery signals surfaced early enough for intervention, with equity auditing built into the model review.",
        icon: "AlertCircle",
      },
      {
        title: "Accessibility support",
        description:
          "Reading-level adaptation, translation, and alternative-format generation aligned to individual learning plans.",
        icon: "Users",
      },
    ],
    compliance: ["FERPA", "COPPA", "SOC 2 Type II", "GDPR", "WCAG 2.2 AA"],
    kpis: [
      { label: "Students reached", value: "180K" },
      { label: "Districts served", value: "32" },
      { label: "Teacher hours reclaimed weekly", value: "6" },
    ],
    caseStudySlug: "atlas-rag-research",
    relatedSolutions: ["rag-systems", "ai-agents", "data-analytics"],
    related: ["healthcare", "real-estate"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    description:
      "Valuation models, lead scoring, and document AI for transactions at scale — across residential and commercial.",
    useCases: [
      "Automated valuation models",
      "Lead scoring & routing",
      "Transaction document AI",
      "Market intelligence reports",
    ],
    metric: { label: "Faster cycle time", value: "−41%" },
    stat: { label: "Transactions processed monthly", value: "11K" },
    icon: "Building2",
    heroLead: "Close transactions faster",
    heroHighlight: "with the paperwork handled.",
    context: {
      title: "The transaction is mostly document handling.",
      body: "Between offer and close sits a stack of leases, disclosures, title documents, and inspection reports that someone reads line by line. That reading is high-volume, low-variance work — exactly the profile where extraction with confidence routing removes days from a cycle without removing the human judgment that matters.",
    },
    challenges: [
      {
        challenge: "Valuations must be defensible",
        response:
          "Models expose comparable selection and adjustment reasoning, so an appraiser can audit rather than accept a number.",
      },
      {
        challenge: "Fair-housing risk in any scoring model",
        response:
          "Protected-class proxies are audited out of feature sets, with disparate-impact testing as a standing part of model review.",
      },
      {
        challenge: "Documents are inconsistent and often scanned",
        response:
          "Extraction pipelines handle poor scans and non-standard layouts, with per-field confidence routing anything uncertain to review.",
      },
      {
        challenge: "Lead response time decides the deal",
        response:
          "Scoring and routing run in seconds, so the highest-intent leads reach an agent while intent is still live.",
      },
    ],
    useCaseDetails: [
      {
        title: "Automated valuation",
        description:
          "Comparable-based valuation with transparent adjustment reasoning and confidence intervals on every estimate.",
        icon: "Calculator",
      },
      {
        title: "Lead scoring & routing",
        description:
          "Intent scoring from behavioral signals with instant routing, audited for fair-housing compliance.",
        icon: "Target",
      },
      {
        title: "Transaction document AI",
        description:
          "Extraction and obligation tracking across leases, disclosures, and title documents with confidence-routed review.",
        icon: "FileText",
      },
      {
        title: "Market intelligence",
        description:
          "Automated market reports combining transaction data, permits, and demographic signals with written narratives.",
        icon: "BarChart3",
      },
      {
        title: "Lease abstraction",
        description:
          "Commercial lease terms extracted into structured records — critical dates, escalations, and options tracked automatically.",
        icon: "Building",
      },
      {
        title: "Property operations",
        description:
          "Maintenance triage, vendor dispatch, and tenant communication automation across portfolios.",
        icon: "Wrench",
      },
    ],
    compliance: [
      "SOC 2 Type II",
      "Fair Housing Act",
      "GDPR",
      "CCPA",
      "ISO 27001",
    ],
    kpis: [
      { label: "Transaction cycle time", value: "−41%" },
      { label: "Transactions processed monthly", value: "11K" },
      { label: "Document fields auto-extracted", value: "94%" },
    ],
    caseStudySlug: "northwind-prior-auth",
    relatedSolutions: ["ai-automation", "predictive-analytics", "rag-systems"],
    related: ["finance", "education"],
  },
];

/** Look up a single industry by slug. */
export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

/** Resolve the `related` slugs on an industry into full records. */
export function getRelatedIndustries(slug: string): Industry[] {
  const industry = getIndustry(slug);
  if (!industry) return [];
  return industry.related
    .map((i) => getIndustry(i))
    .filter((i): i is Industry => Boolean(i));
}
