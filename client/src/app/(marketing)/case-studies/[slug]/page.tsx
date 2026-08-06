import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CTABanner } from "@/components/ui/CTABanner";
import { DetailHero } from "@/components/sections/shared/DetailHero";
import {
  ApproachSection,
  PullQuote,
  RelatedGrid,
  SectionHeading,
  TechStrip,
} from "@/components/sections/shared/DetailSections";
import { caseStudies, getCaseStudy } from "@/data/content";
import { getSolution } from "@/data/solutions";
import { getIndustry } from "@/data/industries";

type PageProps = { params: { slug: string } };

/** Statically prerender every case study route. */
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return { title: "Case study not found — Technovate AI" };

  return {
    title: `${study.title} — Technovate AI`,
    description: study.outcome,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: `${study.title} — Technovate AI`,
      description: study.outcome,
      url: `/case-studies/${study.slug}`,
      type: "article",
    },
  };
}

export default function CaseStudyDetailPage({ params }: PageProps) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const industry = study.industrySlug ? getIndustry(study.industrySlug) : undefined;
  const solutionsUsed = (study.solutionsUsed ?? [])
    .map((s) => getSolution(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const otherStudies = caseStudies.filter((c) => c.slug !== study.slug);

  return (
    <>
      <DetailHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
          { label: study.client },
        ]}
        eyebrow={study.industry}
        title={study.title}
        description={study.outcome}
        kpis={study.metrics}
        meta={study.profile}
        primaryCta={{ label: "Discuss a similar project", href: "/contact" }}
        secondaryCta={{ label: "More case studies", href: "/case-studies" }}
      />

      {/* Problem */}
      <Section spacing="md" tone="muted" containerSize="wide">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Badge variant="secondary" size="sm" className="mb-3">
              The problem
            </Badge>
            <h2 className="font-display text-h1-48 text-balance">
              {study.problem}
            </h2>
            {study.problemDetail && (
              <p className="mt-5 text-body-16 text-dark-600 text-pretty">
                {study.problemDetail}
              </p>
            )}
          </div>

          <Card variant="flat" size="lg" className="h-fit bg-white">
            <h3 className="font-display text-h4-24 text-dark">
              The engagement
            </h3>
            <dl className="mt-5 space-y-4">
              {(study.profile ?? []).map((p) => (
                <div
                  key={p.label}
                  className="flex items-baseline justify-between gap-4 border-b border-dark/5 pb-3 last:border-0 last:pb-0"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                    {p.label}
                  </dt>
                  <dd className="text-right text-small-14 font-medium text-dark">
                    {p.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </Section>

      {/* Solution summary */}
      <Section spacing="md" tone="default" containerSize="wide">
        <div className="max-w-3xl">
          <Badge variant="default" size="sm" className="mb-3">
            What we built
          </Badge>
          <h2 className="font-display text-h1-48 text-balance">
            {study.solution}
          </h2>
        </div>
      </Section>

      {study.approach && (
        <ApproachSection
          eyebrow="How we got there"
          title="Four phases, each with a written definition of done."
          steps={study.approach}
          tone="muted"
        />
      )}

      {/* Outcome */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <SectionHeading eyebrow="Outcome" title="What changed." />

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <p className="text-body-16 text-dark-600 text-pretty">
            {study.outcomeDetail ?? study.outcome}
          </p>
          <dl className="space-y-5 rounded-xl border border-dark/10 bg-light-200 p-6">
            {study.metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="block font-display text-h1-48 text-gradient-blue-cyan">
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
      </Section>

      {study.quote && (
        <PullQuote
          text={study.quote.text}
          author={study.quote.author}
          role={study.quote.role}
          tone="muted"
        />
      )}

      {study.stack && (
        <TechStrip
          eyebrow="Stack"
          title="What we built it with."
          items={study.stack}
        />
      )}

      <RelatedGrid
        eyebrow="Solutions applied"
        title="The capabilities behind this engagement."
        tone="muted"
        items={solutionsUsed.map((s) => ({
          title: s.title,
          description: s.description,
          href: s.href,
          icon: s.icon,
        }))}
      />

      {/* Industry cross-link */}
      {industry && (
        <Section spacing="md" tone="default" containerSize="wide">
          <Card variant="gradient" size="lg" className="bg-white">
            <div className="grid items-center gap-6 lg:grid-cols-[1.6fr_1fr]">
              <div>
                <Badge variant="accent" size="sm">
                  {industry.name}
                </Badge>
                <h2 className="mt-3 font-display text-h2-36 text-dark text-balance">
                  More of our work in {industry.name.toLowerCase()}.
                </h2>
                <p className="mt-3 text-body-16 text-dark-600 text-pretty">
                  {industry.description}
                </p>
              </div>
              <div className="lg:justify-self-end">
                <Button asChild variant="outline">
                  <Link href={`/industries/${industry.slug}`}>
                    See the industry brief
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </Section>
      )}

      <RelatedGrid
        eyebrow="More case studies"
        title="Other engagements worth reading."
        tone="muted"
        items={otherStudies.map((c) => ({
          title: c.title,
          description: c.outcome,
          href: `/case-studies/${c.slug}`,
        }))}
      />

      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="Similar problem?"
          title="Let's talk about what this would look like for you."
          description="Thirty minutes with the senior team. Bring the problem and we will give you an honest read on scope, timeline, and whether we are the right fit."
          primaryLabel="Book a call"
          primaryHref="/contact"
          secondaryLabel="See pricing"
          secondaryHref="/pricing"
        />
      </Section>
    </>
  );
}
