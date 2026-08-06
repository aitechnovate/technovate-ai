"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import {
  Icon,
  type IconName,
} from "@/components/ui/Icon";

type Pillar = {
  icon: IconName;
  title: string;
  description: string;
  highlight?: string;
};

const pillars: Pillar[] = [
  {
    icon: "Rocket",
    title: "Ship in weeks, not quarters",
    description:
      "Embedded squads that start delivering value from week one. Pilots in 4–8 weeks; production systems in 8–16.",
    highlight: "9 weeks avg to first pilot",
  },
  {
    icon: "Cpu",
    title: "Model-agnostic by design",
    description:
      "Claude, OpenAI, Gemini, Mistral, or fine-tuned open weights — chosen to fit your cost, latency, and compliance requirements.",
  },
  {
    icon: "Shield",
    title: "Enterprise-grade by default",
    description:
      "SOC 2 Type II and ISO 27001 certified. HIPAA, GDPR, and PCI-DSS-ready delivery from day one.",
  },
  {
    icon: "Wand2",
    title: "You own everything",
    description:
      "Every line of code, every prompt, every model weight assigned to you on delivery. No black-box dependencies.",
  },
  {
    icon: "Users",
    title: "Embedded with your team",
    description:
      "We pair with your engineers, train your staff, and leave you with a self-sufficient AI capability.",
  },
  {
    icon: "BarChart3",
    title: "Outcome-based pricing",
    description:
      "Fixed-scope, retainer, or KPI-tied engagements. Most clients start with a fixed-scope pilot.",
  },
];

type WhyUsProps = {
  className?: string;
};

export function WhyUs({ className }: WhyUsProps) {
  return (
    <Section spacing="lg" tone="muted" className={className} containerSize="wide">
      <div className="mb-12 max-w-2xl">
        <Badge variant="secondary" size="sm" className="mb-3">
          Why Technovate AI
        </Badge>
        <h2 className="font-display text-h1-48 text-balance">
          Built for teams who measure AI by{" "}
          <span className="text-gradient-blue-purple">shipped outcomes.</span>
        </h2>
        <p className="mt-3 text-body-16 text-dark-600">
          We&apos;re the partner ambitious teams call when AI has to actually
          work — in production, under real load, with real accountability.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar, index) => (
          <motion.article
            key={pillar.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{
              duration: 0.4,
              delay: index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative overflow-hidden rounded-xl border border-dark/10 bg-white p-6 shadow-elevation-xs transition-all duration-350 hover:-translate-y-1 hover:shadow-elevation-md sm:p-8"
          >
            <span
              aria-hidden="true"
              className="inline-flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white"
            >
              <Icon name={pillar.icon} className="size-5" />
            </span>
            <h3 className="mt-5 font-display text-h4-24 text-dark">
              {pillar.title}
            </h3>
            <p className="mt-2 text-small-14 text-dark-600">
              {pillar.description}
            </p>
            {pillar.highlight && (
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                {pillar.highlight}
              </span>
            )}
          </motion.article>
        ))}
      </div>
    </Section>
  );
}