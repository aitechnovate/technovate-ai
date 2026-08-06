import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { CTABanner } from "@/components/ui/CTABanner";
import { ResourceHeader } from "@/components/sections/shared/ResourceHeader";
import { newsItems } from "@/data/resources";
import { siteInfo } from "@/data/site";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News & Press — Technovate AI",
  description:
    "Company announcements, product milestones, and press releases from Technovate AI.",
  alternates: { canonical: "/resources/news" },
};

const kindVariant = {
  Press: "accent",
  Product: "default",
  Company: "secondary",
} as const;

export default function NewsPage() {
  const sorted = [...newsItems].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <ResourceHeader
        active="news"
        eyebrow="News"
        title="Announcements,"
        highlight="milestones, and press."
        description="What we have shipped, where we are growing, and the milestones worth writing down. For press enquiries, reach us directly."
      />

      {/* Timeline */}
      <Section spacing="md" tone="muted" containerSize="wide">
        <ol className="relative border-l border-dark/10 pl-6 sm:pl-8">
          {sorted.map((n) => (
            <li key={n.slug} className="relative pb-10 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-light bg-gradient-blue-cyan sm:-left-[39px]"
              />
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant={kindVariant[n.kind]} size="sm">
                  {n.kind}
                </Badge>
                <time
                  dateTime={n.date}
                  className="text-[11px] font-semibold uppercase tracking-wider text-dark-500"
                >
                  {formatDate(n.date)}
                </time>
              </div>
              <h2 className="mt-3 font-display text-h2-36 text-dark text-balance">
                {n.title}
              </h2>
              <p className="mt-2 max-w-2xl text-body-16 text-dark-600 text-pretty">
                {n.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Press contact */}
      <Section spacing="md" tone="default" containerSize="wide">
        <div className="rounded-2xl border border-dark/10 bg-white p-8 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <Badge variant="default" size="sm" className="mb-3">
                Press enquiries
              </Badge>
              <h2 className="font-display text-h2-36 text-balance">
                Working on a story? Talk to us directly.
              </h2>
              <p className="mt-3 text-body-16 text-dark-600 text-pretty">
                We respond to press within one business day. Logos, executive
                bios, and product screenshots are available on request.
              </p>
            </div>
            <div className="space-y-2 lg:justify-self-end">
              <Link
                href={`mailto:${siteInfo.email}`}
                className="inline-flex items-center gap-1.5 text-small-14 font-semibold text-primary hover:underline"
              >
                {siteInfo.email}
                <ArrowUpRight className="size-4" />
              </Link>
              <p className="text-small-14 text-dark-500">{siteInfo.phone}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="Following our work?"
          title="The blog is where the detail lives."
          description="Engineering notes from live engagements — considerably more substantial than a press release."
          primaryLabel="Read the blog"
          primaryHref="/resources/blog"
          secondaryLabel="See case studies"
          secondaryHref="/case-studies"
        />
      </Section>
    </>
  );
}
