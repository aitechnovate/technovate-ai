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
  CheckList,
  PullQuote,
  RelatedGrid,
  SectionHeading,
  TechStrip,
} from "@/components/sections/shared/DetailSections";
import { getPortfolioItem, portfolioItems } from "@/data/content";

type PageProps = { params: { slug: string } };

/** Statically prerender every portfolio route. */
export function generateStaticParams() {
  return portfolioItems.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const item = getPortfolioItem(params.slug);
  if (!item) return { title: "Project not found — Technovate AI" };

  return {
    title: `${item.title} — ${item.client} — Technovate AI`,
    description: item.summary,
    alternates: { canonical: `/portfolio/${item.slug}` },
    openGraph: {
      title: `${item.title} — Technovate AI`,
      description: item.summary,
      url: `/portfolio/${item.slug}`,
      type: "article",
    },
  };
}

export default function PortfolioDetailPage({ params }: PageProps) {
  const item = getPortfolioItem(params.slug);
  if (!item) notFound();

  const others = portfolioItems.filter((p) => p.slug !== item.slug).slice(0, 3);

  const meta = [
    { label: "Client", value: item.client },
    ...(item.year ? [{ label: "Year", value: item.year }] : []),
    ...(item.duration ? [{ label: "Duration", value: item.duration }] : []),
    ...(item.team ? [{ label: "Team", value: item.team }] : []),
  ];

  return (
    <>
      <DetailHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: item.title },
        ]}
        eyebrow={item.category}
        title={item.title}
        description={item.summary}
        meta={meta}
        primaryCta={{ label: "Discuss a similar project", href: "/contact" }}
        secondaryCta={{ label: "See all work", href: "/portfolio" }}
      />

      {/* Overview + brief */}
      <Section spacing="md" tone="muted" containerSize="wide">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <Badge variant="secondary" size="sm" className="mb-3">
              Overview
            </Badge>
            <p className="text-body-16 text-dark-600 text-pretty">
              {item.overview ?? item.summary}
            </p>
          </div>

          {item.brief && (
            <Card variant="flat" size="lg" className="h-fit bg-white">
              <h2 className="font-display text-h4-24 text-dark">The brief</h2>
              <p className="mt-3 text-small-14 text-dark-600 text-pretty">
                {item.brief}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2 border-t border-dark/10 pt-5">
                {item.tags.map((t) => (
                  <li key={t}>
                    <Badge variant="neutral" size="sm">
                      {t}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </Section>

      {/* Engineering highlights */}
      {item.highlights && item.highlights.length > 0 && (
        <Section spacing="lg" tone="default" containerSize="wide">
          <SectionHeading
            eyebrow="Highlights"
            title="The decisions that mattered."
            description="Every engagement turns on a handful of calls. These are the ones that decided whether this system reached production."
          />

          <ul className="grid gap-5 lg:grid-cols-2">
            {item.highlights.map((h, idx) => (
              <li key={h.title}>
                <Card variant="flat" className="h-full bg-white">
                  <span
                    aria-hidden="true"
                    className="font-display text-h2-36 text-gradient-brand"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-h4-24 text-dark text-balance">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-small-14 text-dark-600 text-pretty">
                    {h.description}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Results */}
      {item.results && item.results.length > 0 && (
        <Section spacing="md" tone="muted" containerSize="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <Badge variant="secondary" size="sm" className="mb-3">
                Results
              </Badge>
              <h2 className="font-display text-h1-48 text-balance">
                What shipped, and what changed.
              </h2>
            </div>
            <Card variant="flat" size="lg" className="h-fit bg-white">
              <CheckList title="Outcomes" items={item.results} />
            </Card>
          </div>
        </Section>
      )}

      {item.quote && (
        <PullQuote
          text={item.quote.text}
          author={item.quote.author}
          role={item.quote.role}
        />
      )}

      {item.stack && (
        <TechStrip
          eyebrow="Stack"
          title="What we built it with."
          items={item.stack}
          tone="muted"
        />
      )}

      <RelatedGrid
        eyebrow="More work"
        title="Other projects from the shelf."
        tone="default"
        items={others.map((o) => ({
          title: o.title,
          description: o.summary,
          href: `/portfolio/${o.slug}`,
        }))}
      />

      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="Have something similar in mind?"
          title="Tell us about the problem."
          description="A 30-minute call with the senior team. We will tell you what is realistic, what it would cost, and whether we are the right people for it."
          primaryLabel="Book a call"
          primaryHref="/contact"
          secondaryLabel="Read case studies"
          secondaryHref="/case-studies"
        />
      </Section>

      <Section spacing="none" tone="default" containerSize="wide">
        <div className="flex justify-center pb-16">
          <Button asChild variant="ghost">
            <Link href="/portfolio">
              Back to portfolio
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
