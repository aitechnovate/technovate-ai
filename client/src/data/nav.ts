/**
 * Shared navigation model for header, footer, and mega menu.
 * Placeholder copy — replace with real CMS content in a later phase.
 */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  badge?: string;
};

export type NavGroup = {
  label: string;
  href: string;
  description?: string;
  children?: NavLink[];
  featured?: {
    title: string;
    description: string;
    href: string;
    cta: string;
  };
};

/* Primary navigation entries (top-level header). */
export const primaryNav: NavGroup[] = [
  {
    label: "Solutions",
    href: "/solutions",
    description:
      "End-to-end AI services — from strategy through deployment and optimization.",
    featured: {
      title: "AI Maturity Assessment",
      description:
        "Get a free 30-minute call with our strategists to map your AI roadmap.",
      href: "/contact",
      cta: "Book free call",
    },
    children: [
      {
        label: "AI Consulting",
        href: "/solutions/ai-consulting",
        description: "Roadmaps, feasibility, and ROI modeling.",
      },
      {
        label: "AI Automation",
        href: "/solutions/ai-automation",
        description: "Eliminate repetitive work with intelligent workflows.",
      },
      {
        label: "Custom AI Development",
        href: "/solutions/custom-ai-development",
        description: "Bespoke models engineered for your domain.",
      },
      {
        label: "AI Agents",
        href: "/solutions/ai-agents",
        description: "Autonomous agents that act, not just answer.",
      },
      {
        label: "RAG Systems",
        href: "/solutions/rag-systems",
        description: "Grounded LLM apps over your proprietary knowledge.",
      },
      {
        label: "LLM Integrations",
        href: "/solutions/llm-integrations",
        description: "Wire Claude, GPT, Gemini, and open models into your stack.",
      },
      {
        label: "Predictive Analytics",
        href: "/solutions/predictive-analytics",
        description: "Forecast demand, churn, and risk with confidence intervals.",
      },
      {
        label: "Intelligent Process Automation",
        href: "/solutions/intelligent-process-automation",
        description: "Combine RPA with AI for cognitive workflows.",
      },
      {
        label: "Data Analytics",
        href: "/solutions/data-analytics",
        description: "From raw data to executive-ready insight.",
      },
    ],
  },
  {
    label: "Products",
    href: "/products",
    description: "Production-ready platforms built by our engineering team.",
    children: [
      {
        label: "AI Platform Suite",
        href: "/products/ai-platform-suite",
        description: "Govern, deploy, and observe AI from one console.",
      },
      {
        label: "Automation Tools",
        href: "/products/automation-tools",
        description: "Visual workflow builder for ops and revenue teams.",
      },
      {
        label: "Knowledge Assistant",
        href: "/products/knowledge-assistant",
        description: "Secure, multi-source AI for your internal teams.",
      },
      {
        label: "Analytics Dashboard",
        href: "/products/analytics-dashboard",
        description: "Live KPIs, anomaly alerts, and drill-down narratives.",
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    description: "Domain-tuned AI for the sectors we know best.",
    children: [
      {
        label: "Healthcare",
        href: "/industries/healthcare",
        description: "Clinical documentation, triage, and prior auth.",
      },
      {
        label: "Finance",
        href: "/industries/finance",
        description: "Risk, fraud, AML, and advisor copilots.",
      },
      {
        label: "Manufacturing",
        href: "/industries/manufacturing",
        description: "Predictive maintenance and quality vision.",
      },
      {
        label: "Retail",
        href: "/industries/retail",
        description: "Demand sensing, personalization, and CX automation.",
      },
      {
        label: "Logistics",
        href: "/industries/logistics",
        description: "Route optimization and ETA prediction.",
      },
      {
        label: "Education",
        href: "/industries/education",
        description: "Adaptive tutoring and grading copilots.",
      },
      {
        label: "Real Estate",
        href: "/industries/real-estate",
        description: "Valuation, lead scoring, and document AI.",
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    description: "Learn, build, and stay current with the Technovate AI team.",
    children: [
      {
        label: "Blog",
        href: "/resources/blog",
        description: "Engineering notes and product updates.",
      },
      {
        label: "Tutorials",
        href: "/resources/tutorials",
        description: "Hands-on guides for builders.",
      },
      {
        label: "Whitepapers",
        href: "/resources/whitepapers",
        description: "Deep dives on architecture and ROI.",
      },
      {
        label: "Webinars",
        href: "/resources/webinars",
        description: "Live and on-demand sessions.",
      },
      {
        label: "Documentation",
        href: "/resources/docs",
        description: "Reference docs for our products.",
      },
      {
        label: "News",
        href: "/resources/news",
        description: "Company announcements and press.",
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About", href: "/about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Careers", href: "/careers" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/* Footer link columns. */
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "AI Consulting", href: "/solutions/ai-consulting" },
      { label: "AI Automation", href: "/solutions/ai-automation" },
      { label: "Custom AI Development", href: "/solutions/custom-ai-development" },
      { label: "AI Agents", href: "/solutions/ai-agents" },
      { label: "RAG Systems", href: "/solutions/rag-systems" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "AI Platform Suite", href: "/products/ai-platform-suite" },
      { label: "Automation Tools", href: "/products/automation-tools" },
      { label: "Knowledge Assistant", href: "/products/knowledge-assistant" },
      { label: "Analytics Dashboard", href: "/products/analytics-dashboard" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Finance", href: "/industries/finance" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Retail", href: "/industries/retail" },
      { label: "Logistics", href: "/industries/logistics" },
      { label: "Education", href: "/industries/education" },
      { label: "Real Estate", href: "/industries/real-estate" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Tutorials", href: "/resources/tutorials" },
      { label: "Whitepapers", href: "/resources/whitepapers" },
      { label: "Webinars", href: "/resources/webinars" },
      { label: "Documentation", href: "/resources/docs" },
      { label: "News", href: "/resources/news" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Security", href: "/security" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Status", href: "/status" },
    ],
  },
];

export const socialLinks: NavLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/technovate-ai" },
  { label: "X (Twitter)", href: "https://x.com/technovate_ai" },
  { label: "GitHub", href: "https://github.com/technovate-ai" },
  { label: "YouTube", href: "https://youtube.com/@technovate-ai" },
];

export const announcementBar = {
  text: "New: AI Maturity Assessment — book a free 30-min strategy call.",
  ctaLabel: "Book free call",
  ctaHref: "/contact",
};