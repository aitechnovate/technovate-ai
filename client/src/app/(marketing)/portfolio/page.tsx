"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import {
  TabsPills,
  TabsPillsList,
  TabsPillsTrigger,
} from "@/components/ui/TabsPills";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { portfolioItems } from "@/data/content";

export default function PortfolioPage() {
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    portfolioItems.forEach((p) => set.add(p.category));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const [active, setActive] = React.useState<string>("All");
  const filtered =
    active === "All"
      ? portfolioItems
      : portfolioItems.filter((p) => p.category === active);

  return (
    <>
      {/* Hero */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="max-w-3xl">
          <Badge variant="default" size="sm" className="mb-4">
            Portfolio
          </Badge>
          <h1 className="font-display text-display-72 text-balance leading-[1.05]">
            Selected work,{" "}
            <span className="text-gradient-blue-cyan">shipped to production.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-16 text-dark-600 text-pretty">
            A sample of recent engagements — the systems, the stacks, and the
            outcomes they drove. Filter by category to see work in your sector.
          </p>
        </div>
      </Section>

      {/* Grid */}
      <Section spacing="md" tone="muted" containerSize="wide">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-h2-36 text-dark">All projects</h2>
            <p className="mt-2 text-body-16 text-dark-500">
              {filtered.length} of {portfolioItems.length} projects
            </p>
          </div>
        </div>

        <TabsPills value={active} onValueChange={setActive}>
          <TabsPillsList className="mb-8">
            {categories.map((c) => (
              <TabsPillsTrigger key={c} value={c}>
                {c}
              </TabsPillsTrigger>
            ))}
          </TabsPillsList>
        </TabsPills>

        {filtered.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PortfolioCard key={p.slug} item={p} variant="default" />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-dark/15 bg-white p-12 text-center">
            <p className="text-body-16 text-dark-500">
              No projects in this category yet.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
