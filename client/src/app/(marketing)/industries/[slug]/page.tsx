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
  FeatureGrid,
  RelatedGrid,
  SectionHeading,
  TechStrip,
} from "@/components/sections/shared/DetailSections";
import {
  getIndustry,
  getRelatedIndustries,
  industries,
} from "@/data/industries";
import { getSolution } from "@/data/solutions";
import { getCaseStudy } from "@/data/content";

type PageProps = { params: { slug: string } };

/** Statically prerender all seven industry routes. */
export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const industry = getIndustry(params.slug);
  if (!industry) return { title: "Industry not found — Technovate AI" };

  return {
    title: `AI for ${industry.name} — Technovate AI`,
    description: industry.description,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: {
      title: `AI for ${industry.name} — Technovate AI`,
      description: industry.description,
      url: `/industries/${industry.slug}`,
      type: "website",
    },
  };
}

export default function IndustryDetailPage({ params }: PageProps) {
  const industry = getIndustry(params.slug);
  if (!industry) notFound();

  const related = getRelatedIndustries(industry.slug);
  const caseStudy = getCaseStudy(industry.caseStudySlug);
  const relatedSolutions = industry.relatedSolutions
    .map((s) => getSolution(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <DetailHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: industry.name },
        ]}
        eyebrow={industry.name}
        title={industry.heroLead}
        highlight={industry.heroHighlight}
        description={industry.description}
        icon={industry.icon}
        kpis={industry.kpis}
        primaryCta={{ label: "Book an industry briefing", href: "/contact" }}
        secondaryCta={{ label: "See case studies", href: "/case-studies" }}
      />

      {/* Sector context */}
      <Section spacing="md" tone="muted" containerSize="wide">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Badge variant="secondary" size="sm" className="mb-3">
              Context
            </Badge>
            <h2 className="font-display text-h1-48 text-balance">
              {industry.context.title}
            </h2>
            <p className="mt-5 text-body-16 text-dark-600 text-pretty">
              {industry.context.body}
            </p>
          </div>
          <dl className="h-fit space-y-5 rounded-xl border border-dark/10 bg-white p-6">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                {industry.metric.label}
              </dt>
              <dd className="mt-1 font-display text-h2-36 text-gradient-blue-cyan">
                {industry.metric.value}
              </dd>
            </div>
            <div className="border-t border-dark/10 pt-5">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                {industry.stat.label}
              </dt>
              <dd className="mt-1 font-display text-h2-36 text-dark">
                {industry.stat.value}
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      {/* Challenges → response */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <SectionHeading
          eyebrow="Constraints"
          title={`What makes ${industry.name.toLowerCase()} different.`}
          description="Every sector has constraints that decide whether a system reaches production. These are the ones we design around from day one."
        />

        <ul className="grid gap-5 lg:grid-cols-2">
          {industry.challenges.map((c) => (
            <li key={c.challenge}>
              <Card variant="flat" className="h-full bg-white">
                <h3 className="font-display text-h4-24 text-dark text-balance">
                  {c.challenge}
                </h3>
                <p className="mt-3 border-t border-dark/10 pt-3 text-small-14 text-dark-600 text-pretty">
                  <span className="font-semibold text-primary">
                    How we handle it:{" "}
                  </span>
                  {c.response}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <FeatureGrid
        eyebrow="Use cases"
        title="Where we typically start."
        description="Ranked by the ratio of value to time-to-first-deployment in this sector."
        items={industry.useCaseDetails}
        accent="purple"
      />

      <TechStrip
        eyebrow="Compliance"
        title="Frameworks we work within."
        description="We produce the control documentation and audit evidence as a delivery artifact, not as a follow-up project."
        items={industry.compliance}
      />

      {/* Featured case study */}
      {caseStudy && (
        <Section spacing="lg" tone="muted" containerSize="wide">
          <SectionHeading
            eyebrow="Case study"
            title="Proof from a comparable deployment."
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
                <p className="mt-5 text-small-14 text-dark-700 text-pretty">
                  {caseStudy.outcome}
                </p>
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
        eyebrow="Solutions"
        title={`Capabilities we apply most in ${industry.name.toLowerCase()}.`}
        tone="default"
        items={relatedSolutions.map((s) => ({
          title: s.title,
          description: s.description,
          href: s.href,
          icon: s.icon,
        }))}
      />

      <RelatedGrid
        eyebrow="Other industries"
        title="Adjacent sectors we serve."
        items={related.map((r) => ({
          title: r.name,
          description: r.description,
          href: `/industries/${r.slug}`,
          icon: r.icon,
        }))}
      />

      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow={`${industry.name} briefing`}
          title="Thirty minutes on what is working in your sector."
          description="A senior engineer and a strategist who have shipped in this domain. Bring your constraints — we will tell you honestly what is realistic."
          primaryLabel="Book an industry briefing"
          primaryHref="/contact"
          secondaryLabel="Browse case studies"
          secondaryHref="/case-studies"
        />
      </Section>
    </>
  );
}
