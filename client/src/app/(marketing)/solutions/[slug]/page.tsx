import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CTABanner } from "@/components/ui/CTABanner";
import { DetailHero } from "@/components/sections/shared/DetailHero";
import {
  ApproachSection,
  FeatureGrid,
  ProblemSection,
  RelatedGrid,
  SectionHeading,
  TechStrip,
} from "@/components/sections/shared/DetailSections";
import {
  getRelatedSolutions,
  getSolution,
  solutions,
} from "@/data/solutions";
import { getCaseStudy } from "@/data/content";

type PageProps = { params: { slug: string } };

/** Statically prerender all nine solution routes. */
export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const solution = getSolution(params.slug);
  if (!solution) return { title: "Solution not found — Technovate AI" };

  return {
    title: `${solution.title} — Technovate AI`,
    description: solution.description,
    alternates: { canonical: `/solutions/${solution.slug}` },
    openGraph: {
      title: `${solution.title} — Technovate AI`,
      description: solution.description,
      url: `/solutions/${solution.slug}`,
      type: "website",
    },
  };
}

export default function SolutionDetailPage({ params }: PageProps) {
  const solution = getSolution(params.slug);
  if (!solution) notFound();

  const related = getRelatedSolutions(solution.slug);
  const caseStudy = getCaseStudy(solution.caseStudySlug);

  return (
    <>
      <DetailHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: solution.title },
        ]}
        eyebrow={solution.badge ?? "Solution"}
        title={solution.heroLead}
        highlight={solution.heroHighlight}
        description={solution.longDescription}
        icon={solution.icon}
        kpis={solution.outcomes}
        meta={[
          { label: "Typical duration", value: solution.engagement.duration },
          { label: "Squad", value: solution.engagement.team },
          { label: "Starting at", value: solution.engagement.startingAt },
        ]}
        primaryCta={{ label: "Book a strategy call", href: "/contact" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />

      <ProblemSection
        title={solution.problem.title}
        body={solution.problem.body}
        symptoms={solution.problem.symptoms}
      />

      <ApproachSection
        title={`How we deliver ${solution.title.toLowerCase()}.`}
        description="Four phases, each with a written definition of done. You will always know which phase we are in and what has to be true to leave it."
        steps={solution.approach}
      />

      <FeatureGrid
        eyebrow="Capabilities"
        title="What is included."
        description="Every engagement is scoped to your problem, but these are the capabilities we bring to the table."
        items={solution.capabilityDetails}
      />

      <TechStrip
        title="Technology we typically reach for."
        description="Chosen per engagement against your constraints — never because it is the fashionable choice this quarter."
        items={solution.techUsed}
      />

      {/* Featured case study */}
      {caseStudy && (
        <Section spacing="lg" tone="muted" containerSize="wide">
          <SectionHeading
            eyebrow="Case study"
            title="What this looks like in production."
            tone="secondary"
          />

          <Card variant="flat" size="lg" className="bg-white">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
              <div>
                <Badge variant="neutral" size="sm">
                  {caseStudy.industry}
                </Badge>
                <h3 className="mt-4 font-display text-h2-36 text-dark text-balance">
                  {caseStudy.title}
                </h3>
                <p className="mt-2 text-small-14 font-medium text-dark-500">
                  {caseStudy.client}
                </p>

                <dl className="mt-6 space-y-4">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                      Problem
                    </dt>
                    <dd className="mt-1 text-small-14 text-dark-700 text-pretty">
                      {caseStudy.problem}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                      Solution
                    </dt>
                    <dd className="mt-1 text-small-14 text-dark-700 text-pretty">
                      {caseStudy.solution}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                      Outcome
                    </dt>
                    <dd className="mt-1 text-small-14 text-dark-700 text-pretty">
                      {caseStudy.outcome}
                    </dd>
                  </div>
                </dl>

                <Link
                  href={`/case-studies/${caseStudy.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-small-14 font-semibold text-primary hover:underline"
                >
                  Read the full case study
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>

              <dl className="space-y-4 self-start rounded-xl border border-dark/10 bg-light-200 p-6">
                {caseStudy.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="sr-only">{m.label}</dt>
                    <dd>
                      <span className="block font-display text-h2-36 text-gradient-blue-cyan">
                        {m.value}
                      </span>
                      <span className="mt-1 block text-small-14 text-dark-500">
                        {m.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Card>
        </Section>
      )}

      <RelatedGrid
        eyebrow="Related solutions"
        title="Capabilities that pair well with this one."
        tone="default"
        items={related.map((r) => ({
          title: r.title,
          description: r.description,
          href: r.href,
          icon: r.icon,
        }))}
      />

      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="Next step"
          title={`Tell us what you're trying to solve.`}
          description="A 30-minute call with a senior engineer — no SDRs, no discovery deck. You will leave with an honest read on whether this is the right capability and what it would take."
          primaryLabel="Book a strategy call"
          primaryHref="/contact"
          secondaryLabel="Browse case studies"
          secondaryHref="/case-studies"
        />
      </Section>
    </>
  );
}
