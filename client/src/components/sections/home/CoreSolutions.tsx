import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Solution = {
  slug: string;
  title: string;
  description: string;
  icon: IconName;
  href: string;
  badge?: string;
};

const solutions: Solution[] = [
  {
    slug: "ai-consulting",
    title: "AI Consulting",
    description: "Roadmaps, feasibility studies, and ROI modeling grounded in your data.",
    icon: "Compass",
    href: "/solutions/ai-consulting",
    badge: "Strategic",
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    description: "Eliminate repetitive work with intelligent workflows that integrate cleanly.",
    icon: "Wand2",
    href: "/solutions/ai-automation",
  },
  {
    slug: "custom-ai-development",
    title: "Custom AI Development",
    description: "Bespoke models and applications engineered for your domain.",
    icon: "Cpu",
    href: "/solutions/custom-ai-development",
  },
  {
    slug: "ai-agents",
    title: "AI Agents",
    description: "Autonomous agents that act, not just answer. With deterministic guardrails.",
    icon: "Bot",
    href: "/solutions/ai-agents",
    badge: "Hot",
  },
  {
    slug: "rag-systems",
    title: "RAG Systems",
    description: "Grounded LLM apps over your proprietary knowledge with citation-grade answers.",
    icon: "Database",
    href: "/solutions/rag-systems",
  },
  {
    slug: "llm-integrations",
    title: "LLM Integrations",
    description: "Wire Claude, GPT, Gemini, and open models into your existing stack.",
    icon: "Plug",
    href: "/solutions/llm-integrations",
  },
  {
    slug: "predictive-analytics",
    title: "Predictive Analytics",
    description: "Forecast demand, churn, and risk with calibrated confidence intervals.",
    icon: "TrendingUp",
    href: "/solutions/predictive-analytics",
  },
  {
    slug: "intelligent-process-automation",
    title: "Intelligent Process Automation",
    description: "Combine RPA with AI for cognitive workflows that adapt to exceptions.",
    icon: "Settings",
    href: "/solutions/intelligent-process-automation",
  },
  {
    slug: "data-analytics",
    title: "Data Analytics",
    description: "From raw data to executive-ready insight, with narrative explanations.",
    icon: "BarChart3",
    href: "/solutions/data-analytics",
  },
];

type CoreSolutionsProps = {
  className?: string;
};

export function CoreSolutions({ className }: CoreSolutionsProps) {
  return (
    <Section
      id="solutions"
      spacing="lg"
      tone="default"
      className={className}
      containerSize="wide"
    >
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <Badge variant="default" size="sm" className="mb-3">
            Core solutions
          </Badge>
          <h2 className="font-display text-h1-48 text-balance">
            Nine capabilities.{" "}
            <span className="text-gradient-brand">One accountable team.</span>
          </h2>
          <p className="mt-3 text-body-16 text-dark-600">
            Pick a single service or compose them — strategy, build, deploy,
            and optimize under one roof.
          </p>
        </div>
        <Link
          href="/solutions"
          className="inline-flex items-center gap-1.5 self-start text-small-14 font-semibold text-primary hover:underline"
        >
          Browse all
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((sol, index) => (
          <Reveal key={sol.slug} delay={index * 50}>
            <Link
              href={sol.href}
              className={cn(
                "group relative flex h-full flex-col rounded-xl border border-dark/10 bg-white p-6 shadow-elevation-xs transition-all duration-350 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevation-md sm:p-8",
              )}
            >
              <div className="flex items-start justify-between">
                <span
                  aria-hidden="true"
                  className="inline-flex size-12 items-center justify-center rounded-md bg-gradient-blue-cyan text-white shadow-elevation-sm transition-transform group-hover:scale-105"
                >
                  <Icon name={sol.icon} className="size-5" />
                </span>
                {sol.badge && (
                  <Badge variant="accent" size="sm">
                    {sol.badge}
                  </Badge>
                )}
              </div>
              <h3 className="mt-5 font-display text-h3-30 text-dark group-hover:text-primary transition-colors">
                {sol.title}
              </h3>
              <p className="mt-2 text-small-14 text-dark-600">
                {sol.description}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 pt-6 text-small-14 font-semibold text-primary">
                Learn more
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}