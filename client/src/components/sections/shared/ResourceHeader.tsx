import * as React from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { resourceFormats } from "@/data/resources";
import { cn } from "@/lib/utils";

type ResourceHeaderProps = {
  /** Slug of the active format, used to mark the current pill. */
  active: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
};

/**
 * Shared header for the `/resources/*` sub-routes. Renders breadcrumbs,
 * the page title, and a format switcher so all six formats stay one click
 * apart from each other.
 */
export function ResourceHeader({
  active,
  eyebrow,
  title,
  highlight,
  description,
}: ResourceHeaderProps) {
  const current = resourceFormats.find((f) => f.slug === active);

  return (
    <Section spacing="lg" tone="default" containerSize="wide">
      <div className="max-w-3xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: current?.label ?? eyebrow },
          ]}
          className="mb-6"
        />
        <Badge variant="default" size="sm" className="mb-4">
          {eyebrow}
        </Badge>
        <h1 className="font-display text-display-72 text-balance leading-[1.05]">
          {title}{" "}
          <span className="text-gradient-blue-cyan">{highlight}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-body-16 text-dark-600 text-pretty">
          {description}
        </p>
      </div>

      {/* Format switcher */}
      <nav aria-label="Resource formats" className="mt-10">
        <ul className="flex flex-wrap gap-2">
          {resourceFormats.map((f) => {
            const isActive = f.slug === active;
            return (
              <li key={f.slug}>
                <Link
                  href={f.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 items-center rounded-full border px-4 text-small-14 font-medium transition-all",
                    isActive
                      ? "border-transparent bg-gradient-blue-cyan text-white shadow-elevation-sm"
                      : "border-dark/10 bg-white text-dark-700 hover:border-primary/40 hover:text-primary",
                  )}
                >
                  {f.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Section>
  );
}
