"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

type CTABannerProps = {
  /** Eyebrow label (e.g. "Ready to start"). */
  eyebrow?: string;
  /** Headline. */
  title: string;
  /** Optional supporting copy. */
  description?: string;
  /** Primary CTA copy. */
  primaryLabel: string;
  primaryHref: string;
  /** Optional secondary CTA. */
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Visual style. */
  variant?: "gradient" | "dark" | "muted";
  /** Optional decorative element (e.g. an icon or illustration). */
  decoration?: React.ReactNode;
  className?: string;
};

/**
 * Full-width call-to-action block. Variants cover hero/footer usages.
 */
export function CTABanner({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = "gradient",
  decoration,
  className,
}: CTABannerProps) {
  const variantClass = {
    gradient:
      "bg-gradient-blue-purple text-white",
    dark: "bg-dark text-light",
    muted: "bg-light-200 text-dark",
  }[variant];

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-8 sm:p-12 lg:p-16",
        variantClass,
        className,
      )}
    >
      {/* Decorative blur orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-secondary/20 blur-3xl"
      />

      <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          {eyebrow && (
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-small-14 font-medium uppercase tracking-wider",
                variant === "gradient"
                  ? "border-white/30 bg-white/10"
                  : variant === "dark"
                    ? "border-white/20 bg-white/10"
                    : "border-dark/15 bg-dark/5",
              )}
            >
              {eyebrow}
            </span>
          )}
          <h2 className="font-display text-h1-48 text-balance">
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "max-w-2xl text-body-16 text-pretty",
                variant === "dark" || variant === "gradient"
                  ? "text-white/80"
                  : "text-dark-600",
              )}
            >
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            asChild
            variant={variant === "gradient" || variant === "dark" ? "secondary" : "primary"}
            size="lg"
          >
            <a href={primaryHref}>{primaryLabel}</a>
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className={cn(
                variant === "gradient" || variant === "dark"
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "",
              )}
            >
              <a href={secondaryHref}>{secondaryLabel}</a>
            </Button>
          )}
        </div>
      </div>

      {decoration && (
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-12 lg:flex">
          {decoration}
        </div>
      )}
    </motion.section>
  );
}
