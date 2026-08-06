"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { KpiCard } from "@/components/ui/KpiCard";
import {
  Icon,
  type IconName,
} from "@/components/ui/Icon";
import { metrics } from "@/data/trust";

type MetricDisplay = {
  label: string;
  value: string;
  numericValue?: number;
  suffix?: string;
  description: string;
  icon: IconName;
};

const displayMetrics: MetricDisplay[] = [
  {
    label: "Projects Delivered",
    value: "240+",
    numericValue: 240,
    description: "Production AI systems shipped",
    icon: "Rocket",
  },
  {
    label: "Enterprise Clients",
    value: "85+",
    numericValue: 85,
    description: "Fortune 1000 & growth-stage",
    icon: "Building2",
  },
  {
    label: "Countries Served",
    value: "22",
    numericValue: 22,
    description: "Across 4 continents",
    icon: "Globe",
  },
  {
    label: "Average ROI",
    value: "4.6x",
    numericValue: 4.6,
    description: "Client-reported within 12 months",
    icon: "TrendingUp",
  },
  {
    label: "Client Satisfaction",
    value: "98%",
    numericValue: 98,
    description: "NPS-style score",
    icon: "Star",
  },
];

type MetricsCounterProps = {
  className?: string;
};

export function MetricsCounter({ className }: MetricsCounterProps) {
  // Use mock data for first 4 plus our own 5th; fall back to data file for any gap.
  const combined: MetricDisplay[] = displayMetrics.map((m, idx) => {
    const fromData = metrics[idx];
    if (!fromData) return m;
    return {
      ...m,
      description: fromData.description ?? m.description,
    };
  });

  return (
    <Section
      spacing="lg"
      tone="muted"
      className={className}
      containerSize="wide"
    >
      <div className="mb-12 max-w-2xl">
        <Badge variant="default" size="sm" className="mb-3">
          By the numbers
        </Badge>
        <h2 className="font-display text-h1-48 text-balance">
          Outcomes that pay for themselves.
        </h2>
        <p className="mt-3 text-body-16 text-dark-600">
          The high-water marks across our portfolio as of this quarter.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
      >
        {combined.map((m) => (
          <motion.div
            key={m.label}
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <KpiCard
              label={m.label}
              value={m.value}
              description={m.description}
              icon={<Icon name={m.icon} className="size-4" />}
              animated
              numericValue={m.numericValue}
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}