"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, Minus, X as XIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  PricingCard,
  type PricingTier,
} from "@/components/ui/PricingCard";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { faqItems } from "@/data/social";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "annual";

const tiers: PricingTier[] = [
  {
    name: "Pilot",
    tagline: "Validate one capability in 4–8 weeks.",
    price: 18000,
    cadence: "fixed-scope",
    description:
      "A single, well-scoped AI capability delivered end-to-end. Perfect for proving ROI before a larger commitment.",
    features: [
      "Senior 2–3 person squad",
      "4–8 week delivery",
      "Fixed scope, fixed price",
      "Production-ready system",
      "Handover docs + recording",
      "30-day post-launch support",
    ],
    ctaLabel: "Start a pilot",
    ctaHref: "/contact",
  },
  {
    name: "Engagement",
    tagline: "Ship a real system in 8–16 weeks.",
    price: 32000,
    cadence: "per month",
    description:
      "A senior cross-functional squad embedded with your team — engineered for production rollout, not a prototype.",
    features: [
      "Senior 4–6 person squad",
      "8–16 week delivery",
      "Production-grade platform",
      "SOC 2 / ISO controls baked in",
      "Embedded with your team",
      "Quarterly business review",
    ],
    ctaLabel: "Book a discovery call",
    ctaHref: "/contact",
    annualDiscount: "Save 15% on annual commitments",
    highlighted: true,
    badge: "Most common",
  },
  {
    name: "Fractional",
    tagline: "Continuous improvement, month-to-month.",
    price: 24000,
    cadence: "per month",
    description:
      "Senior engineers pair with your team month-over-month to ship improvements, run evaluations, and maintain reliability.",
    features: [
      "Dedicated senior engineer",
      "Monthly cadence",
      "Continuous evaluation",
      "Drift detection & alerts",
      "Monthly roadmap review",
      "Month-to-month flexibility",
    ],
    ctaLabel: "Talk to sales",
    ctaHref: "/contact",
  },
];

const comparisonFeatures: {
  category: string;
  features: { name: string; pilot: string | boolean; engagement: string | boolean; fractional: string | boolean }[];
}[] = [
  {
    category: "Team",
    features: [
      { name: "Senior engineers", pilot: "2–3", engagement: "4–6", fractional: "1 dedicated" },
      { name: "Strategist", pilot: "Part-time", engagement: "Full-time", fractional: "—" },
      { name: "Designer", pilot: "Part-time", engagement: "Full-time", fractional: "—" },
      { name: "Project lead", pilot: true, engagement: true, fractional: true },
    ],
  },
  {
    category: "Delivery",
    features: [
      { name: "Production deployment", pilot: true, engagement: true, fractional: true },
      { name: "Eval harness", pilot: true, engagement: true, fractional: true },
      { name: "Observability dashboard", pilot: "—", engagement: true, fractional: true },
      { name: "On-call rotation", pilot: "—", engagement: true, fractional: true },
    ],
  },
  {
    category: "Compliance",
    features: [
      { name: "SOC 2 / ISO controls", pilot: true, engagement: true, fractional: true },
      { name: "HIPAA-ready", pilot: "Optional", engagement: true, fractional: true },
      { name: "Custom security addenda", pilot: "—", engagement: true, fractional: true },
      { name: "Audit log retention", pilot: "30 days", engagement: "1 year", fractional: "1 year" },
    ],
  },
  {
    category: "Support",
    features: [
      { name: "Post-launch support", pilot: "30 days", engagement: "Continuous", fractional: "Continuous" },
      { name: "Incident response SLA", pilot: "—", engagement: "4-hour", fractional: "1-hour" },
      { name: "Quarterly review", pilot: false, engagement: true, fractional: true },
      { name: "Dedicated Slack channel", pilot: false, engagement: true, fractional: true },
    ],
  },
];

const pricingFaq = faqItems.filter((f) => f.category === "pricing");

export default function PricingPage() {
  const [billing, setBilling] = React.useState<Billing>("monthly");

  return (
    <>
      {/* Hero */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="default" size="sm" className="mb-4">
            Pricing
          </Badge>
          <h1 className="font-display text-display-72 text-balance leading-[1.05]">
            Three ways to work together.{" "}
            <span className="text-gradient-blue-cyan">One standard of work.</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-body-16 text-dark-600 text-pretty">
            Pricing that maps to the shape of the engagement. No junior staffing
            pyramid, no surprise overages, no &ldquo;contact us for a quote&rdquo;
            on the most common tier.
          </p>

          <div className="mt-10 inline-flex items-center gap-1 rounded-full border border-dark/10 bg-white p-1 shadow-elevation-xs">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
              className={cn(
                "inline-flex h-9 items-center rounded-full px-5 text-small-14 font-medium transition-all",
                billing === "monthly"
                  ? "bg-primary text-white shadow-elevation-xs"
                  : "text-dark-600 hover:text-dark",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              aria-pressed={billing === "annual"}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-full px-5 text-small-14 font-medium transition-all",
                billing === "annual"
                  ? "bg-primary text-white shadow-elevation-xs"
                  : "text-dark-600 hover:text-dark",
              )}
            >
              Annual
              <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
                −15%
              </span>
            </button>
          </div>
        </div>
      </Section>

      {/* Pricing tiers */}
      <Section spacing="md" tone="muted" containerSize="wide">
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <PricingCard
              key={t.name}
              tier={{
                ...t,
                price:
                  billing === "annual" && t.cadence === "per month"
                    ? Math.round(t.price * 0.85)
                    : t.price,
              }}
            />
          ))}
        </div>
        <p className="mt-6 text-center text-small-14 text-dark-500">
          All prices in USD. Annual pricing reflects a 15% discount on the
          Engagement and Fractional tiers.
        </p>
      </Section>

      {/* What's included */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="mb-12 grid items-end gap-6 lg:grid-cols-[2fr_1fr]">
          <div>
            <Badge variant="secondary" size="sm" className="mb-3">
              What&apos;s included
            </Badge>
            <h2 className="font-display text-h1-48 text-balance">
              Compare every tier side-by-side.
            </h2>
          </div>
          <p className="text-body-16 text-dark-500 lg:text-right">
            {billing === "annual" ? "Annual" : "Monthly"} pricing shown.
          </p>
        </div>

        <Card variant="flat" className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="border-b border-dark/10 bg-light-200">
                  <th
                    scope="col"
                    className="w-1/3 px-6 py-4 text-left text-small-14 font-semibold text-dark"
                  >
                    Feature
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center text-small-14 font-semibold text-dark"
                  >
                    Pilot
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center text-small-14 font-semibold text-primary"
                  >
                    Engagement
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center text-small-14 font-semibold text-dark"
                  >
                    Fractional
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((cat) => (
                  <React.Fragment key={cat.category}>
                    <tr className="bg-light-200/50">
                      <td
                        colSpan={4}
                        className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-dark-500"
                      >
                        {cat.category}
                      </td>
                    </tr>
                    {cat.features.map((f) => (
                      <tr
                        key={f.name}
                        className="border-b border-dark/5 last:border-0"
                      >
                        <td className="px-6 py-3 text-small-14 text-dark-700">
                          {f.name}
                        </td>
                        <td className="px-6 py-3 text-center text-small-14 text-dark-700">
                          <FeatureValue value={f.pilot} />
                        </td>
                        <td className="px-6 py-3 text-center text-small-14 text-dark-700">
                          <FeatureValue value={f.engagement} />
                        </td>
                        <td className="px-6 py-3 text-center text-small-14 text-dark-700">
                          <FeatureValue value={f.fractional} />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Section>

      {/* Pricing FAQ */}
      <Section spacing="lg" tone="muted" containerSize="wide">
        <div className="mb-12 max-w-2xl">
          <Badge variant="default" size="sm" className="mb-3">
            Pricing FAQ
          </Badge>
          <h2 className="font-display text-h1-48 text-balance">
            Common questions about pricing.
          </h2>
        </div>

        <div className="rounded-xl border border-dark/10 bg-white px-4 sm:px-6">
          <Accordion type="multiple" className="w-full">
            {pricingFaq.map((q, idx) => (
              <AccordionItem key={q.question} value={`pricing-${idx}`}>
                <AccordionTrigger>{q.question}</AccordionTrigger>
                <AccordionContent>{q.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CTA */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="rounded-3xl bg-gradient-brand p-10 text-light sm:p-14 lg:p-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Badge variant="glass" size="sm">
                Not sure which tier fits?
              </Badge>
              <h2 className="mt-4 font-display text-h1-48 text-balance text-light">
                A 30-minute call with sales — no SDRs.
              </h2>
              <p className="mt-3 max-w-xl text-body-16 text-light/85">
                Bring the problem, walk away with an honest recommendation —
                and a fixed-scope quote if there&apos;s a fit.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">
                  Book a call
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-light hover:bg-white/10"
              >
                <Link href="/case-studies">See case studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function FeatureValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span aria-label="Included">
        <Check className="mx-auto size-4 text-success" aria-hidden="true" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span aria-label="Not included">
        <XIcon className="mx-auto size-4 text-dark-400" aria-hidden="true" />
      </span>
    );
  }
  if (value === "—") {
    return (
      <Minus className="mx-auto size-4 text-dark-300" aria-hidden="true" />
    );
  }
  return <span>{value}</span>;
}
