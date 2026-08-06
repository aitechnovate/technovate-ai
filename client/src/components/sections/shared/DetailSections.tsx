import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Section heading
 * ------------------------------------------------------------------ */

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Badge tone — alternate between sections for visual rhythm. */
  tone?: "default" | "secondary";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "default",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 max-w-2xl", className)}>
      <Badge variant={tone} size="sm" className="mb-3">
        {eyebrow}
      </Badge>
      <h2 className="font-display text-h1-48 text-balance">{title}</h2>
      {description && (
        <p className="mt-3 text-body-16 text-dark-600 text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Problem statement — narrative + symptom checklist
 * ------------------------------------------------------------------ */

type ProblemSectionProps = {
  eyebrow?: string;
  title: string;
  body: string;
  /** Rendered as a "sound familiar?" checklist. */
  symptoms?: string[];
  symptomsLabel?: string;
};

export function ProblemSection({
  eyebrow = "The problem",
  title,
  body,
  symptoms,
  symptomsLabel = "Sound familiar?",
}: ProblemSectionProps) {
  return (
    <Section spacing="md" tone="muted" containerSize="wide">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <Badge variant="secondary" size="sm" className="mb-3">
            {eyebrow}
          </Badge>
          <h2 className="font-display text-h1-48 text-balance">{title}</h2>
          <p className="mt-5 text-body-16 text-dark-600 text-pretty">{body}</p>
        </div>

        {symptoms && symptoms.length > 0 && (
          <Card variant="flat" size="lg" className="h-fit bg-white">
            <h3 className="font-display text-h4-24 text-dark">
              {symptomsLabel}
            </h3>
            <ul className="mt-5 space-y-3">
              {symptoms.map((s) => (
                <li key={s} className="flex gap-3 text-small-14 text-dark-700">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="text-pretty">{s}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Numbered approach steps
 * ------------------------------------------------------------------ */

export type ApproachStep = {
  step: string;
  title: string;
  description: string;
};

type ApproachSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  steps: ApproachStep[];
  tone?: "default" | "muted";
};

export function ApproachSection({
  eyebrow = "Our approach",
  title,
  description,
  steps,
  tone = "default",
}: ApproachSectionProps) {
  return (
    <Section spacing="lg" tone={tone} containerSize="wide">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <ol className="grid gap-5 sm:grid-cols-2">
        {steps.map((s) => (
          <li key={s.step}>
            <Card variant="flat" className="h-full bg-white">
              <span
                aria-hidden="true"
                className="font-display text-h2-36 text-gradient-blue-cyan"
              >
                {s.step}
              </span>
              <h3 className="mt-3 font-display text-h4-24 text-dark">
                {s.title}
              </h3>
              <p className="mt-2 text-small-14 text-dark-600 text-pretty">
                {s.description}
              </p>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Icon feature grid
 * ------------------------------------------------------------------ */

export type FeatureItem = {
  title: string;
  description: string;
  icon: IconName;
};

type FeatureGridProps = {
  eyebrow: string;
  title: string;
  description?: string;
  items: FeatureItem[];
  tone?: "default" | "muted";
  /** Icon chip gradient. */
  accent?: "cyan" | "purple";
};

export function FeatureGrid({
  eyebrow,
  title,
  description,
  items,
  tone = "muted",
  accent = "cyan",
}: FeatureGridProps) {
  return (
    <Section spacing="lg" tone={tone} containerSize="wide">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        tone={tone === "muted" ? "secondary" : "default"}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f) => (
          <Card key={f.title} variant="flat" className="h-full bg-white">
            <span
              aria-hidden="true"
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-md text-white shadow-elevation-sm",
                accent === "cyan"
                  ? "bg-gradient-blue-cyan"
                  : "bg-gradient-blue-purple",
              )}
            >
              <Icon name={f.icon} className="size-5" />
            </span>
            <h3 className="mt-4 font-display text-h4-24 text-dark">
              {f.title}
            </h3>
            <p className="mt-2 text-small-14 text-dark-600 text-pretty">
              {f.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Tech / integration chip strip
 * ------------------------------------------------------------------ */

type TechStripProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: string[];
  tone?: "default" | "muted";
};

export function TechStrip({
  eyebrow = "Technology",
  title,
  description,
  items,
  tone = "default",
}: TechStripProps) {
  return (
    <Section spacing="md" tone={tone} containerSize="wide">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-16">
        <div>
          <Badge variant="default" size="sm" className="mb-3">
            {eyebrow}
          </Badge>
          <h2 className="font-display text-h2-36 text-balance">{title}</h2>
          {description && (
            <p className="mt-3 text-small-14 text-dark-600 text-pretty">
              {description}
            </p>
          )}
        </div>
        <ul className="flex flex-wrap gap-2.5">
          {items.map((t) => (
            <li key={t}>
              <span className="inline-flex items-center rounded-full border border-dark/10 bg-white px-4 py-2 text-small-14 font-medium text-dark-700">
                {t}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Checklist panel (results, requirements, built-for)
 * ------------------------------------------------------------------ */

type CheckListProps = {
  title: string;
  items: string[];
  className?: string;
  /** Icon colour. */
  tone?: "success" | "primary";
};

export function CheckList({
  title,
  items,
  className,
  tone = "success",
}: CheckListProps) {
  return (
    <div className={className}>
      <h3 className="font-display text-h4-24 text-dark">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((i) => (
          <li key={i} className="flex gap-3 text-small-14 text-dark-700">
            <Check
              aria-hidden="true"
              className={cn(
                "mt-0.5 size-4 shrink-0",
                tone === "success" ? "text-success" : "text-primary",
              )}
            />
            <span className="text-pretty">{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Related-item card grid
 * ------------------------------------------------------------------ */

export type RelatedItem = {
  title: string;
  description: string;
  href: string;
  icon?: IconName;
};

type RelatedGridProps = {
  eyebrow?: string;
  title: string;
  items: RelatedItem[];
  tone?: "default" | "muted";
};

export function RelatedGrid({
  eyebrow = "Related",
  title,
  items,
  tone = "muted",
}: RelatedGridProps) {
  if (items.length === 0) return null;

  return (
    <Section spacing="lg" tone={tone} containerSize="wide">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        tone={tone === "muted" ? "secondary" : "default"}
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="group flex h-full flex-col rounded-xl border border-dark/10 bg-white p-6 transition-all duration-350 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevation-md"
          >
            {r.icon && (
              <span
                aria-hidden="true"
                className="inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary"
              >
                <Icon name={r.icon} className="size-5" />
              </span>
            )}
            <h3 className="mt-4 font-display text-h4-24 text-dark transition-colors group-hover:text-primary">
              {r.title}
            </h3>
            <p className="mt-2 text-small-14 text-dark-600 text-pretty">
              {r.description}
            </p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-small-14 font-semibold text-primary">
              Read more
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Client pull-quote
 * ------------------------------------------------------------------ */

type PullQuoteProps = {
  text: string;
  author: string;
  role: string;
  tone?: "default" | "muted";
};

export function PullQuote({
  text,
  author,
  role,
  tone = "default",
}: PullQuoteProps) {
  return (
    <Section spacing="md" tone={tone} containerSize="wide">
      <figure className="mx-auto max-w-3xl text-center">
        <Icon
          name="Quote"
          className="mx-auto size-8 text-primary/30"
          aria-hidden="true"
        />
        <blockquote className="mt-6 font-display text-h2-36 text-balance text-dark">
          &ldquo;{text}&rdquo;
        </blockquote>
        <figcaption className="mt-6 text-small-14 text-dark-500">
          <span className="font-semibold text-dark">{author}</span>
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          {role}
        </figcaption>
      </figure>
    </Section>
  );
}
