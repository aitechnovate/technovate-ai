import * as React from "react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { caseStudies } from "@/data/content";

type CaseStudySectionProps = {
  className?: string;
};

export function CaseStudySection({ className }: CaseStudySectionProps) {
  const [primary] = caseStudies;
  if (!primary) return null;
  return (
    <Section
      spacing="lg"
      tone="default"
      className={className}
      containerSize="wide"
    >
      <div className="mb-12 max-w-2xl">
        <Badge variant="default" size="sm" className="mb-3">
          Case study
        </Badge>
        <h2 className="font-display text-h1-48 text-balance">
          A recent engagement in depth.
        </h2>
        <p className="mt-3 text-body-16 text-dark-600">
          How we partnered with Northwind Health to cut prior-authorization
          cycle time by 71% — and what the rollout looked like week by week.
        </p>
      </div>

      <CaseStudyCard item={primary} layout="media" />

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-dark/10 bg-light-200 p-6">
          <h3 className="font-display text-h4-24 text-dark">The problem</h3>
          <p className="mt-2 text-small-14 text-dark-600">{primary.problem}</p>
        </div>
        <div className="rounded-xl border border-dark/10 bg-light-200 p-6">
          <h3 className="font-display text-h4-24 text-dark">Our approach</h3>
          <p className="mt-2 text-small-14 text-dark-600">{primary.solution}</p>
        </div>
      </div>
    </Section>
  );
}