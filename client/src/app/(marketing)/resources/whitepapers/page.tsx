import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CTABanner } from "@/components/ui/CTABanner";
import { ResourceHeader } from "@/components/sections/shared/ResourceHeader";
import { whitepapers } from "@/data/resources";

export const metadata: Metadata = {
  title: "Whitepapers — Technovate AI",
  description:
    "Deep dives on AI ROI measurement, RAG reference architecture, agent reliability patterns, and model risk governance.",
  alternates: { canonical: "/resources/whitepapers" },
};

export default function WhitepapersPage() {
  const featured = whitepapers.find((w) => w.featured);
  const rest = whitepapers.filter((w) => !w.featured);

  return (
    <>
      <ResourceHeader
        active="whitepapers"
        eyebrow="Whitepapers"
        title="Deep dives,"
        highlight="no email gate."
        description="Long-form writing on the architecture and measurement problems that decide whether an AI programme delivers. Download them directly — we do not gate our best thinking behind a form."
      />

      {/* Featured lead magnet */}
      {featured && (
        <Section spacing="md" tone="muted" containerSize="wide">
          <Card variant="gradient" size="lg" className="bg-white">
            <div className="grid items-center gap-8 lg:grid-cols-[1.6fr_1fr]">
              <div>
                <Badge variant="accent" size="sm">
                  Most requested
                </Badge>
                <h2 className="mt-3 font-display text-h1-48 text-dark text-balance">
                  {featured.title}
                </h2>
                <p className="mt-3 text-body-16 text-dark-600 text-pretty">
                  {featured.description}
                </p>
                <p className="mt-4 text-small-14 text-dark-500">
                  {featured.pages} pages · PDF
                </p>
              </div>
              <div className="lg:justify-self-end">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Download the playbook
                    <Download className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </Section>
      )}

      {/* All whitepapers */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="mb-10 max-w-2xl">
          <Badge variant="default" size="sm" className="mb-3">
            Library
          </Badge>
          <h2 className="font-display text-h1-48 text-balance">
            Everything else we have published.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((w) => (
            <Card key={w.slug} variant="flat" className="flex h-full flex-col bg-white">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                Whitepaper · {w.pages} pages
              </span>
              <h3 className="mt-3 font-display text-h4-24 text-dark text-balance">
                {w.title}
              </h3>
              <p className="mt-2 text-small-14 text-dark-600 text-pretty">
                {w.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {w.topics.map((t) => (
                  <li key={t}>
                    <Badge variant="neutral" size="sm">
                      {t}
                    </Badge>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact">
                    Download PDF
                    <Download className="size-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="Prefer a conversation?"
          title="We will walk you through any of these."
          description="Thirty minutes with the person who wrote it, applied to your situation rather than the general case."
          primaryLabel="Book a call"
          primaryHref="/contact"
          secondaryLabel="Watch a webinar"
          secondaryHref="/resources/webinars"
        />
      </Section>
    </>
  );
}
