import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/ui/CTABanner";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solutions — Technovate AI",
  description:
    "Nine capabilities, one accountable team: AI consulting, automation, custom development, agents, RAG, integrations, predictive analytics, IPA, and data analytics.",
};

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
            className="mb-6"
          />
          <Badge variant="default" size="sm" className="mb-4">
            Solutions
          </Badge>
          <h1 className="font-display text-display-72 text-balance leading-[1.05]">
            Nine capabilities.{" "}
            <span className="text-gradient-brand">One accountable team.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-16 text-dark-600 text-pretty">
            Strategy, build, deploy, and optimize — under one roof. Pick a
            single capability or compose them into a multi-quarter engagement.
            We&apos;ll bring the same senior engineers to both.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Book a 30-min assessment
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/case-studies">See case studies</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Solutions grid */}
      <Section spacing="md" tone="muted" containerSize="wide">
        <div className="grid gap-5 lg:grid-cols-2">
          {solutions.map((sol) => (
            <Link
              key={sol.slug}
              href={sol.href}
              className="group relative flex flex-col rounded-2xl border border-dark/10 bg-white p-6 transition-all duration-350 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevation-md sm:p-8"
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
              <h2 className="mt-5 font-display text-h2-36 text-dark group-hover:text-primary transition-colors">
                {sol.title}
              </h2>
              <p className="mt-2 text-body-16 text-dark-600 text-pretty">
                {sol.longDescription}
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-2 border-t border-dark/10 pt-5 xs:grid-cols-2">
                {sol.capabilities.map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-2 text-small-14 text-dark-700"
                  >
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 rounded-full bg-primary"
                    />
                    {c}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1.5 self-start text-small-14 font-semibold text-primary">
                Explore {sol.title}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* How we work */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Badge variant="secondary" size="sm" className="mb-3">
              How we engage
            </Badge>
            <h2 className="font-display text-h1-48 text-balance">
              Three engagement models. One standard of work.
            </h2>
            <p className="mt-3 text-body-16 text-dark-600">
              We&apos;ll help you pick the right shape for the problem —
              sometimes the right answer is a 2-week pilot, sometimes it&apos;s
              a 12-month retainer.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Fixed-scope pilot",
                duration: "4–8 weeks",
                description:
                  "Best for validating one capability. Fixed price, fixed outcome, fixed date.",
              },
              {
                title: "Production engagement",
                duration: "8–16 weeks",
                description:
                  "Best for shipping a real system into production. Squad embedded with your team.",
              },
              {
                title: "Fractional AI team",
                duration: "Ongoing",
                description:
                  "Best for continuous improvement. Senior engineers, monthly cadence, month-to-month.",
              },
            ].map((m) => (
              <Card
                key={m.title}
                variant="flat"
                className="flex items-start gap-4 bg-white"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-h4-24 text-dark">
                      {m.title}
                    </h3>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-dark-500">
                      {m.duration}
                    </span>
                  </div>
                  <p className="text-small-14 text-dark-600">
                    {m.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="Not sure which one fits?"
          title="Tell us about the problem. We'll recommend the shape."
          description="A 30-minute call with a strategist — we'll give you an honest read on which capability, which engagement model, and what budget envelope makes sense."
          primaryLabel="Book a strategy call"
          primaryHref="/contact"
          secondaryLabel="Browse case studies"
          secondaryHref="/case-studies"
        />
      </Section>
    </>
  );
}
