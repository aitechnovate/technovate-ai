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
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries — Technovate AI",
  description:
    "Domain-tuned AI for healthcare, finance, manufacturing, retail, logistics, education, and real estate.",
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Industries" }]}
            className="mb-6"
          />
          <Badge variant="default" size="sm" className="mb-4">
            Industries
          </Badge>
          <h1 className="font-display text-display-72 text-balance leading-[1.05]">
            Domain-tuned AI for{" "}
            <span className="text-gradient-brand">the sectors we know best.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-16 text-dark-600 text-pretty">
            We&apos;ve shipped production AI in regulated, high-stakes
            environments. The verticals below are where we have the deepest
            bench — and the longest reference list of compliance-cleared
            deployments.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Book an industry briefing
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/case-studies">See case studies</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Industries grid */}
      <Section spacing="md" tone="muted" containerSize="wide">
        <div className="grid gap-6 lg:grid-cols-2">
          {industries.map((ind) => (
            <article
              key={ind.slug}
              className="group flex flex-col rounded-2xl border border-dark/10 bg-white p-6 transition-all duration-350 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevation-md sm:p-8"
            >
              <div className="flex items-start justify-between">
                <span
                  aria-hidden="true"
                  className="inline-flex size-12 items-center justify-center rounded-md bg-gradient-blue-purple text-white shadow-elevation-sm transition-transform group-hover:scale-105"
                >
                  <Icon name={ind.icon} className="size-5" />
                </span>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="inline-flex items-center gap-1 text-small-14 font-semibold text-primary hover:underline"
                >
                  Industry brief
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>

              <h2 className="mt-5 font-display text-h2-36 text-dark">
                {ind.name}
              </h2>
              <p className="mt-2 text-body-16 text-dark-600 text-pretty">
                {ind.description}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-light-200 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                    Headline metric
                  </p>
                  <p className="font-display text-h4-24 text-primary">
                    {ind.metric.value}
                  </p>
                  <p className="mt-1 text-[13px] text-dark-600">
                    {ind.metric.label}
                  </p>
                </div>
                <div className="rounded-lg bg-light-200 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                    At scale
                  </p>
                  <p className="font-display text-h4-24 text-dark">
                    {ind.stat.value}
                  </p>
                  <p className="mt-1 text-[13px] text-dark-600">
                    {ind.stat.label}
                  </p>
                </div>
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-2 border-t border-dark/10 pt-5">
                {ind.useCases.map((uc) => (
                  <li
                    key={uc}
                    className="flex items-start gap-2 text-small-14 text-dark-700"
                  >
                    <Icon
                      name="CheckCircle2"
                      className="mt-0.5 size-4 shrink-0 text-success"
                    />
                    <span>{uc}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* Compliance strip */}
      <Section spacing="md" tone="default" containerSize="wide">
        <Card variant="flat" className="bg-light-200">
          <div className="grid gap-6 sm:grid-cols-[2fr_3fr] sm:items-center">
            <div>
              <Badge variant="success" size="sm" leadingDot>
                Compliance-ready
              </Badge>
              <h2 className="mt-3 font-display text-h2-36 text-dark text-balance">
                We work inside the rules you already operate under.
              </h2>
            </div>
            <p className="text-body-16 text-dark-600 text-pretty">
              Every industry engagement begins with a compliance review —
              SOC 2, ISO 27001, HIPAA, GDPR, PCI-DSS, FedRAMP. We&apos;ll
              work with your security and legal teams from day one and sign
              whatever addenda your procurement team needs.
            </p>
          </div>
        </Card>
      </Section>

      {/* CTA */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="Industry briefing"
          title="30 minutes with an industry lead."
          description="We'll bring case studies from your sector — with metrics, architecture, and the regulatory playbook we used to ship them."
          primaryLabel="Book a briefing"
          primaryHref="/contact"
          secondaryLabel="Browse solutions"
          secondaryHref="/solutions"
        />
      </Section>
    </>
  );
}
