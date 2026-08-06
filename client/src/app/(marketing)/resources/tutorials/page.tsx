import * as React from "react";
import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CTABanner } from "@/components/ui/CTABanner";
import { Icon } from "@/components/ui/Icon";
import { ResourceHeader } from "@/components/sections/shared/ResourceHeader";
import { tutorials } from "@/data/resources";

export const metadata: Metadata = {
  title: "Tutorials — Technovate AI",
  description:
    "Hands-on guides for builders shipping production AI: tool use, retrieval evaluation, prompt regression suites, and agent checkpoints.",
  alternates: { canonical: "/resources/tutorials" },
};

const levelVariant = {
  Beginner: "success",
  Intermediate: "secondary",
  Advanced: "accent",
} as const;

export default function TutorialsPage() {
  return (
    <>
      <ResourceHeader
        active="tutorials"
        eyebrow="Tutorials"
        title="Hands-on guides"
        highlight="for people who ship."
        description="Every tutorial here comes out of work we actually did. They assume you are building something real and skip the parts that only work in a notebook."
      />

      <Section spacing="md" tone="muted" containerSize="wide">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((t) => (
            <Card key={t.slug} variant="flat" className="flex h-full flex-col bg-white">
              <div className="flex items-center justify-between gap-3">
                <Badge variant={levelVariant[t.level]} size="sm">
                  {t.level}
                </Badge>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                  <Icon name="Clock" className="size-3.5" />
                  {t.minutes} min
                </span>
              </div>

              <h2 className="mt-4 font-display text-h4-24 text-dark text-balance">
                {t.title}
              </h2>
              <p className="mt-2 text-small-14 text-dark-600 text-pretty">
                {t.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {t.topics.map((topic) => (
                  <li key={topic}>
                    <Badge variant="neutral" size="sm">
                      {topic}
                    </Badge>
                  </li>
                ))}
              </ul>

              <p className="mt-auto border-t border-dark/10 pt-4 text-small-14 text-dark-500">
                By {t.author}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="Want this run against your stack?"
          title="We will build the eval harness with your team."
          description="A fixed-scope engagement that leaves you with a working evaluation suite, running in your CI, against your own data."
          primaryLabel="Book a call"
          primaryHref="/contact"
          secondaryLabel="Read the whitepapers"
          secondaryHref="/resources/whitepapers"
        />
      </Section>
    </>
  );
}
