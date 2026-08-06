import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { portfolioItems } from "@/data/content";

type PortfolioHighlightsProps = {
  className?: string;
};

export function PortfolioHighlights({ className }: PortfolioHighlightsProps) {
  const featured = portfolioItems.slice(0, 3);
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
            Featured work
          </Badge>
          <h2 className="font-display text-h1-48 text-balance">
            Production AI, shipped.
          </h2>
          <p className="mt-3 text-body-16 text-dark-600">
            A selection of recent engagements. Each one ties back to measurable
            business outcomes — not just demos.
          </p>
        </div>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 self-start text-small-14 font-semibold text-primary hover:underline"
        >
          View full portfolio
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((item) => (
          <PortfolioCard key={item.slug} item={item} />
        ))}
      </div>
    </Section>
  );
}