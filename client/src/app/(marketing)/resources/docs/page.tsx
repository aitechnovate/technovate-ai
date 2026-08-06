import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CTABanner } from "@/components/ui/CTABanner";
import { Icon } from "@/components/ui/Icon";
import { ResourceHeader } from "@/components/sections/shared/ResourceHeader";
import { docSections } from "@/data/resources";

export const metadata: Metadata = {
  title: "Documentation — Technovate AI",
  description:
    "Reference documentation for the AI Platform Suite, Automation Tools, Knowledge Assistant, and Analytics Dashboard.",
  alternates: { canonical: "/resources/docs" },
};

export default function DocsPage() {
  return (
    <>
      <ResourceHeader
        active="docs"
        eyebrow="Documentation"
        title="Reference docs"
        highlight="for every product."
        description="Guides to get you running and reference material for when you need the exact parameter. Updated with each release."
      />

      {/* Product doc sections */}
      <Section spacing="md" tone="muted" containerSize="wide">
        <div className="grid gap-6 lg:grid-cols-2">
          {docSections.map((section) => (
            <Card key={section.slug} variant="flat" size="lg" className="bg-white">
              <div className="flex items-start justify-between gap-4">
                <span
                  aria-hidden="true"
                  className="inline-flex size-11 items-center justify-center rounded-md bg-gradient-blue-cyan text-white shadow-elevation-sm"
                >
                  <Icon name={section.icon} className="size-5" />
                </span>
                <Link
                  href={`/products/${section.slug}`}
                  className="inline-flex items-center gap-1 text-small-14 font-semibold text-primary hover:underline"
                >
                  Product page
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>

              <h2 className="mt-5 font-display text-h2-36 text-dark">
                {section.title}
              </h2>
              <p className="mt-2 text-small-14 text-dark-600 text-pretty">
                {section.description}
              </p>

              <ul className="mt-6 divide-y divide-dark/5 border-t border-dark/10">
                {section.articles.map((a) => (
                  <li key={a.title}>
                    <Link
                      href="/contact"
                      className="group flex items-center justify-between gap-4 py-3 transition-colors hover:text-primary"
                    >
                      <span className="text-small-14 text-dark-700 transition-colors group-hover:text-primary">
                        {a.title}
                      </span>
                      <span className="flex shrink-0 items-center gap-3">
                        <Badge
                          variant={a.kind === "Guide" ? "neutral" : "outline"}
                          size="sm"
                        >
                          {a.kind}
                        </Badge>
                        {a.minutes > 0 && (
                          <span className="text-[11px] text-dark-500">
                            {a.minutes} min
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="Cannot find what you need?"
          title="Our engineers answer support directly."
          description="No tiered support queue and no bot triage. Questions go to the people who built the product."
          primaryLabel="Contact support"
          primaryHref="/contact"
          secondaryLabel="Browse tutorials"
          secondaryHref="/resources/tutorials"
        />
      </Section>
    </>
  );
}
