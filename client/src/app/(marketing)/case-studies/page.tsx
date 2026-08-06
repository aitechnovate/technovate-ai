"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import {
  TabsPills,
  TabsPillsList,
  TabsPillsTrigger,
} from "@/components/ui/TabsPills";
import { caseStudies } from "@/data/content";

export default function CaseStudiesPage() {
  const industries = React.useMemo(() => {
    const set = new Set<string>();
    caseStudies.forEach((c) => set.add(c.industry));
    return Array.from(set).sort();
  }, []);

  const [active, setActive] = React.useState<string>("All");
  const filtered =
    active === "All"
      ? caseStudies
      : caseStudies.filter((c) => c.industry === active);

  const featured = caseStudies[0];

  return (
    <>
      {/* Hero */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="max-w-3xl">
          <Badge variant="default" size="sm" className="mb-4">
            Case studies
          </Badge>
          <h1 className="font-display text-display-72 text-balance leading-[1.05]">
            Real production systems.{" "}
            <span className="text-gradient-blue-cyan">Real outcomes.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-16 text-dark-600 text-pretty">
            How we&apos;ve helped healthcare, finance, manufacturing, and
            retail teams ship AI that pays for itself — with the metrics to
            prove it.
          </p>
        </div>
      </Section>

      {/* Featured */}
      {featured ? (
        <Section spacing="md" tone="muted" containerSize="wide">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-h2-36 text-dark">
              Featured engagement
            </h2>
            <Link
              href={`/case-studies/${featured.slug}`}
              className="inline-flex items-center gap-1.5 text-small-14 font-semibold text-primary hover:underline"
            >
              Read full story
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <CaseStudyCard item={featured} layout="media" />
        </Section>
      ) : null}

      {/* Filterable grid */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-h2-36 text-dark">
              All case studies
            </h2>
            <p className="mt-2 text-body-16 text-dark-500">
              Filter by industry to narrow down.
            </p>
          </div>
          <Badge variant="neutral" size="sm">
            {filtered.length} of {caseStudies.length}
          </Badge>
        </div>

        <TabsPills value={active} onValueChange={setActive}>
          <TabsPillsList className="mb-8">
            <TabsPillsTrigger value="All">All industries</TabsPillsTrigger>
            {industries.map((i) => (
              <TabsPillsTrigger key={i} value={i}>
                {i}
              </TabsPillsTrigger>
            ))}
          </TabsPillsList>
        </TabsPills>

        {filtered.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CaseStudyCard key={c.slug} item={c} layout="stacked" />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-dark/15 bg-light-200 p-12 text-center">
            <p className="text-body-16 text-dark-500">
              No case studies in this industry yet — check back soon.
            </p>
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="rounded-3xl bg-gradient-blue-purple p-10 text-light sm:p-14 lg:p-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Badge variant="glass" size="sm">
                Your story next
              </Badge>
              <h2 className="mt-4 font-display text-h1-48 text-balance text-light">
                What would your case study look like?
              </h2>
              <p className="mt-3 max-w-xl text-body-16 text-light/85">
                Bring us a problem worth solving. We&apos;ll bring senior
                engineers, an honest read of feasibility, and a delivery plan
                with milestones you can defend in your steering committee.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">
                  Start a conversation
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-light hover:bg-white/10"
              >
                <Link href="/portfolio">See more work</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
