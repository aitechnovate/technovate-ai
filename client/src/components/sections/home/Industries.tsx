"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Icon, type IconName } from "@/components/ui/Icon";

type Industry = {
  slug: string;
  name: string;
  description: string;
  icon: IconName;
  metric: { label: string; value: string };
};

const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    description:
      "Clinical documentation, triage, prior auth, and HIPAA-compliant copilots.",
    icon: "HeartPulse",
    metric: { label: "Clinician hours saved", value: "14 / wk" },
  },
  {
    slug: "finance",
    name: "Finance",
    description:
      "Risk, fraud, AML, and advisor copilots grounded in regulatory frameworks.",
    icon: "Scale",
    metric: { label: "Analyst throughput", value: "2x" },
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    description:
      "Predictive maintenance, quality vision, and OEE-lifting systems on the line.",
    icon: "Factory",
    metric: { label: "Downtime reduction", value: "34%" },
  },
  {
    slug: "retail",
    name: "Retail",
    description:
      "Demand sensing, personalization, and CX automation that scales with the season.",
    icon: "ShoppingBag",
    metric: { label: "Tickets resolved by AI", value: "62%" },
  },
  {
    slug: "logistics",
    name: "Logistics",
    description:
      "Route optimization, ETA prediction, and reinforcement-learning dispatch.",
    icon: "Truck",
    metric: { label: "Routes optimized", value: "1.4M" },
  },
  {
    slug: "education",
    name: "Education",
    description:
      "Adaptive tutoring, grading copilots, and district-curriculum-grounded agents.",
    icon: "GraduationCap",
    metric: { label: "Students reached", value: "180K" },
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    description:
      "Valuation models, lead scoring, and document AI for transactions at scale.",
    icon: "Building2",
    metric: { label: "Faster cycle time", value: "−41%" },
  },
];

type IndustriesProps = {
  className?: string;
};

export function Industries({ className }: IndustriesProps) {
  return (
    <Section
      spacing="lg"
      tone="muted"
      className={className}
      containerSize="wide"
    >
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <Badge variant="secondary" size="sm" className="mb-3">
            Industries
          </Badge>
          <h2 className="font-display text-h1-48 text-balance">
            Domain-tuned AI for the sectors we know best.
          </h2>
          <p className="mt-3 text-body-16 text-dark-600">
            We&apos;ve shipped production AI in regulated, high-stakes
            environments. Here are the verticals where we have the deepest
            bench.
          </p>
        </div>
        <Link
          href="/industries"
          className="inline-flex items-center gap-1.5 self-start text-small-14 font-semibold text-primary hover:underline"
        >
          All industries
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-8">
          {industries.map((ind, index) => (
            <motion.div
              key={ind.slug}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-[280px] shrink-0 snap-start sm:w-[320px]"
            >
              <Link
                href={`/industries/${ind.slug}`}
                className="group flex h-full flex-col rounded-xl border border-dark/10 bg-white p-6 transition-all duration-350 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevation-md"
              >
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-12 items-center justify-center rounded-md bg-gradient-blue-purple text-white shadow-elevation-sm transition-transform group-hover:scale-105"
                  >
                    <Icon name={ind.icon} className="size-5" />
                  </span>
                  <ArrowUpRight className="size-4 text-dark-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <h3 className="mt-5 font-display text-h3-30 text-dark group-hover:text-primary transition-colors">
                  {ind.name}
                </h3>
                <p className="mt-2 text-small-14 text-dark-600">
                  {ind.description}
                </p>
                <div className="mt-auto pt-5 border-t border-dark/10">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                    {ind.metric.label}
                  </p>
                  <p className="font-display text-h4-24 text-primary">
                    {ind.metric.value}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}