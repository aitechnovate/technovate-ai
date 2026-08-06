"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

type ProblemSolutionProps = {
  className?: string;
};

const pains = [
  "AI pilots that never make it to production",
  "Bloated consultancies with slow, opaque delivery",
  "Generic models with no grounding in your domain",
  "Compliance gaps that block regulated use cases",
  "Vendor lock-in to proprietary data layers",
];

const outcomes = [
  "Production AI shipped in 8–16 weeks, not 8–16 months",
  "Cross-functional squad embedded with your team",
  "Grounded RAG systems tuned to your data",
  "SOC 2, ISO 27001, HIPAA & GDPR-ready delivery",
  "You own 100% of the code, prompts, and model weights",
];

/**
 * Two-column pain → outcome storytelling section. Pairs friction with the
 * AI outcome that resolves it.
 */
export function ProblemSolution({ className }: ProblemSolutionProps) {
  return (
    <Section
      spacing="lg"
      tone="default"
      className={className}
      containerSize="wide"
    >
      <div className="mb-12 max-w-2xl">
        <Badge variant="default" size="sm" className="mb-3">
          Why teams switch to us
        </Badge>
        <h2 className="font-display text-h1-48 text-balance">
          The friction is real.{" "}
          <span className="text-gradient-blue-cyan">So is the fix.</span>
        </h2>
        <p className="mt-3 text-body-16 text-dark-600">
          Most teams we meet have tried AI before — and hit the same walls.
          Here&apos;s how we&apos;re different.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Problem column */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "relative overflow-hidden rounded-xl border border-error/20 bg-error/[0.04] p-6 sm:p-8",
          )}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-error/10 blur-3xl"
          />
          <div className="relative">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-error/10 text-error">
                <AlertCircle className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-h3-30 text-dark">
                What usually goes wrong
              </h3>
            </div>
            <ul className="space-y-3">
              {pains.map((pain) => (
                <li
                  key={pain}
                  className="flex items-start gap-3 text-body-16 text-dark-700"
                >
                  <AlertCircle
                    className="mt-1 size-4 shrink-0 text-error"
                    aria-hidden="true"
                  />
                  <span>{pain}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Outcome column */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className={cn(
            "relative overflow-hidden rounded-xl border border-success/20 bg-success/[0.04] p-6 sm:p-8",
          )}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-success/10 blur-3xl"
          />
          <div className="relative">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-success/10 text-success">
                <CheckCircle2 className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-h3-30 text-dark">
                How we ship
              </h3>
            </div>
            <ul className="space-y-3">
              {outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-3 text-body-16 text-dark-700"
                >
                  <CheckCircle2
                    className="mt-1 size-4 shrink-0 text-success"
                    aria-hidden="true"
                  />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}