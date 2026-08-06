import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/layout/Breadcrumbs";

type DetailHeroProps = {
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  /** Plain lead-in text of the headline. */
  title: string;
  /** Gradient-highlighted continuation of the headline. */
  highlight?: string;
  description: string;
  icon?: IconName;
  /** Optional KPI strip rendered beneath the copy. */
  kpis?: { label: string; value: string }[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Optional pill row (e.g. engagement shape, status). */
  meta?: { label: string; value: string }[];
};

/**
 * Shared hero for every Phase 6 detail template. Keeps breadcrumb schema,
 * heading hierarchy, and CTA placement identical across page families.
 */
export function DetailHero({
  breadcrumbs,
  eyebrow,
  title,
  highlight,
  description,
  icon,
  kpis,
  primaryCta,
  secondaryCta,
  meta,
}: DetailHeroProps) {
  return (
    <Section spacing="lg" tone="default" containerSize="wide">
      <div className="max-w-3xl">
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        <div className="flex items-center gap-3">
          {icon && (
            <span
              aria-hidden="true"
              className="inline-flex size-12 items-center justify-center rounded-md bg-gradient-blue-cyan text-white shadow-elevation-sm"
            >
              <Icon name={icon} className="size-5" />
            </span>
          )}
          <Badge variant="default" size="sm">
            {eyebrow}
          </Badge>
        </div>

        <h1 className="mt-5 font-display text-display-72 text-balance leading-[1.05]">
          {title}
          {highlight && (
            <>
              {" "}
              <span className="text-gradient-blue-cyan">{highlight}</span>
            </>
          )}
        </h1>

        <p className="mt-6 max-w-2xl text-body-16 text-dark-600 text-pretty">
          {description}
        </p>

        {meta && meta.length > 0 && (
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                  {m.label}
                </dt>
                <dd className="mt-1 text-small-14 font-medium text-dark">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryCta && (
              <Button asChild size="lg">
                <Link href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            )}
            {secondaryCta && (
              <Button asChild size="lg" variant="outline">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        )}
      </div>

      {kpis && kpis.length > 0 && (
        <dl className="mt-14 grid gap-4 border-t border-dark/10 pt-10 sm:grid-cols-3">
          {kpis.map((k) => (
            <div key={k.label}>
              <dt className="sr-only">{k.label}</dt>
              <dd>
                <span className="block font-display text-h1-48 text-gradient-blue-cyan">
                  {k.value}
                </span>
                <span className="mt-1 block text-small-14 text-dark-500">
                  {k.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      )}
    </Section>
  );
}
