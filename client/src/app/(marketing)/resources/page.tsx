"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { BlogCard } from "@/components/ui/BlogCard";
import { Icon } from "@/components/ui/Icon";
import { blogPosts } from "@/data/content";
import { resourceFormats } from "@/data/resources";
import { cn } from "@/lib/utils";

type ResourceItem = {
  slug: string;
  title: string;
  description: string;
  meta: string;
  href: string;
  badge?: string;
};

const tutorials: ResourceItem[] = [
  {
    slug: "claude-tool-use",
    title: "Production-grade tool use with Claude",
    description:
      "A walkthrough of error handling, schema validation, and observability patterns that survive contact with users.",
    meta: "Tutorial · 18 min",
    href: "/resources/tutorials",
  },
  {
    slug: "evaluating-rag",
    title: "How we evaluate RAG systems in production",
    description:
      "A practical framework for measuring retrieval quality, answer grounding, and user trust at scale.",
    meta: "Tutorial · 22 min",
    href: "/resources/tutorials",
  },
  {
    slug: "prompt-evals",
    title: "Building a prompt regression test suite",
    description:
      "Turn prompt engineering from art into practice. CI-friendly evals you can run on every commit.",
    meta: "Tutorial · 15 min",
    href: "/resources/tutorials",
  },
];

const whitepapers: ResourceItem[] = [
  {
    slug: "ai-roi-playbook",
    title: "The AI ROI playbook",
    description:
      "Five dimensions to measure, three traps to avoid, and the one question we ask every prospective client.",
    meta: "Whitepaper · 38 pages",
    href: "/resources/whitepapers",
    badge: "Lead magnet",
  },
  {
    slug: "rag-architecture",
    title: "RAG architecture deep dive",
    description:
      "The reference architecture we ship for citation-grounded enterprise RAG — with diagrams and tradeoffs.",
    meta: "Whitepaper · 26 pages",
    href: "/resources/whitepapers",
  },
  {
    slug: "agents-reliability",
    title: "Reliability patterns for AI agents",
    description:
      "Deterministic checkpoints, replayable traces, and the boring infrastructure that makes agents trustworthy.",
    meta: "Whitepaper · 42 pages",
    href: "/resources/whitepapers",
  },
];

const webinars: ResourceItem[] = [
  {
    slug: "ai-maturity-2026",
    title: "AI Maturity in 2026: what we learned from 240 deployments",
    description:
      "A 45-minute webinar on the patterns we've seen across enterprise AI deployments this year.",
    meta: "Webinar · On-demand",
    href: "/resources/webinars",
  },
  {
    slug: "rag-eval-live",
    title: "Live: building a RAG evaluation harness",
    description:
      "Hands-on session — bring your laptop, leave with a working eval suite against your own corpus.",
    meta: "Webinar · Live · Aug 14",
    href: "/resources/webinars",
    badge: "Upcoming",
  },
];

const docs: ResourceItem[] = [
  {
    slug: "platform-getting-started",
    title: "AI Platform Suite — Getting started",
    description:
      "Spin up your first model deployment, wire up an evaluation, and ship a guarded endpoint.",
    meta: "Docs · 12 min read",
    href: "/resources/docs",
  },
  {
    slug: "automation-runtime",
    title: "Automation Tools — Runtime API",
    description:
      "Reference for the workflow runtime: triggers, actions, human-in-the-loop checkpoints, audit hooks.",
    meta: "Docs · Reference",
    href: "/resources/docs",
  },
  {
    slug: "knowledge-assistant-scopes",
    title: "Knowledge Assistant — Source scopes & ACLs",
    description:
      "How to configure role-aware retrieval, source connectors, and access control for your team.",
    meta: "Docs · 18 min read",
    href: "/resources/docs",
  },
];

const news: ResourceItem[] = [
  {
    slug: "series-a",
    title: "Technovate AI raises $14M Series A",
    description:
      "Led by Founders Fund. We'll use the capital to scale engineering and accelerate platform investment.",
    meta: "Press · July 2024",
    href: "/resources/news",
    badge: "Press",
  },
  {
    slug: "soc2-iso",
    title: "Now SOC 2 Type II and ISO 27001 certified",
    description:
      "Two years of audited controls across our engineering org and delivery practice.",
    meta: "News · May 2024",
    href: "/resources/news",
  },
  {
    slug: "platform-ga",
    title: "AI Platform Suite reaches general availability",
    description:
      "After a year of internal use and six months of beta, our platform is now GA for enterprise customers.",
    meta: "News · March 2025",
    href: "/resources/news",
  },
];

const tabs = [
  { id: "blog", label: "Blog" },
  { id: "tutorials", label: "Tutorials" },
  { id: "whitepapers", label: "Whitepapers" },
  { id: "webinars", label: "Webinars" },
  { id: "docs", label: "Documentation" },
  { id: "news", label: "News" },
];

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="max-w-3xl">
          <Badge variant="default" size="sm" className="mb-4">
            Resources
          </Badge>
          <h1 className="font-display text-display-72 text-balance leading-[1.05]">
            Engineering notes, deep dives,{" "}
            <span className="text-gradient-blue-cyan">and the playbook behind our work.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-16 text-dark-600 text-pretty">
            We publish what we learn. Browse by format below — or grab the AI
            ROI playbook, the whitepaper most requested by our enterprise
            buyers.
          </p>
        </div>
      </Section>

      {/* Format navigation — links into the six dedicated sub-routes */}
      <Section spacing="sm" tone="default" containerSize="wide">
        <nav aria-label="Resource formats">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resourceFormats.map((f) => (
              <li key={f.slug}>
                <Link
                  href={f.href}
                  className="group flex h-full items-start gap-4 rounded-xl border border-dark/10 bg-white p-5 transition-all duration-350 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevation-md"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
                  >
                    <Icon name={f.icon} className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-h4-24 text-dark transition-colors group-hover:text-primary">
                      {f.label}
                    </span>
                    <span className="mt-1 block text-small-14 text-dark-600 text-pretty">
                      {f.description}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="ml-auto size-4 shrink-0 text-dark-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      {/* Lead magnet strip */}
      <Section spacing="md" tone="muted" containerSize="wide">
        <Card variant="gradient" size="lg" className="bg-white">
          <div className="grid items-center gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <Badge variant="accent" size="sm">
                Lead magnet
              </Badge>
              <h2 className="mt-3 font-display text-h2-36 text-dark text-balance">
                The AI ROI Playbook — 38 pages, no email gate.
              </h2>
              <p className="mt-3 text-body-16 text-dark-600 text-pretty">
                Five dimensions to measure AI ROI, three traps to avoid, and
                the one question we ask every prospective client before
                scoping.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/resources/whitepapers"
                className="inline-flex items-center gap-1.5 text-small-14 font-semibold text-primary hover:underline"
              >
                Download the playbook
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </Card>
      </Section>

      {/* Tabbed resource lists */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <Tabs defaultValue="blog">
          <TabsList>
            {tabs.map((t) => (
              <TabsTrigger key={t.id} value={t.id}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="blog">
            <ResourceSection
              title="Latest from the blog"
              description="Engineering notes and product updates from our team."
            >
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            </ResourceSection>
          </TabsContent>

          <TabsContent value="tutorials">
            <ResourceSection
              title="Hands-on tutorials"
              description="Step-by-step guides for builders shipping production AI."
            >
              <ResourceList items={tutorials} />
            </ResourceSection>
          </TabsContent>

          <TabsContent value="whitepapers">
            <ResourceSection
              title="Whitepapers"
              description="Deep dives on architecture, ROI, and reference designs."
            >
              <ResourceList items={whitepapers} />
            </ResourceSection>
          </TabsContent>

          <TabsContent value="webinars">
            <ResourceSection
              title="Webinars"
              description="Live and on-demand sessions with our engineering team."
            >
              <ResourceList items={webinars} />
            </ResourceSection>
          </TabsContent>

          <TabsContent value="docs">
            <ResourceSection
              title="Documentation"
              description="Reference docs for our products. Updated each release."
            >
              <ResourceList items={docs} />
            </ResourceSection>
          </TabsContent>

          <TabsContent value="news">
            <ResourceSection
              title="News & press"
              description="Company announcements, milestones, and press releases."
            >
              <ResourceList items={news} />
            </ResourceSection>
          </TabsContent>
        </Tabs>
      </Section>

      {/* CTA */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="rounded-3xl bg-dark p-10 text-light sm:p-14 lg:p-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Badge variant="glass" size="sm">
                Stay in the loop
              </Badge>
              <h2 className="mt-4 font-display text-h1-48 text-balance text-light">
                One email a month with our best engineering notes.
              </h2>
              <p className="mt-3 max-w-xl text-body-16 text-light/75">
                No spam, no drip campaigns. Production AI patterns, the
                occasional deep dive, and a single CTA at the bottom.
              </p>
            </div>
            <form
              className="flex flex-col gap-2 sm:flex-row"
              aria-label="Newsletter signup"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@company.com"
                aria-label="Email address"
                className="h-12 flex-1 rounded-md border border-white/15 bg-white/10 px-4 text-body-16 text-white placeholder:text-white/50 focus-visible:border-white/40 focus-visible:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-secondary px-6 text-body-16 font-semibold text-dark transition-colors hover:bg-secondary-600"
              >
                Subscribe
                <ArrowRight className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ----------------- local helpers ----------------- */

function ResourceSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-h2-36 text-dark">{title}</h2>
        <p className="mt-2 text-body-16 text-dark-500">{description}</p>
      </div>
      {children}
    </div>
  );
}

function ResourceList({ items }: { items: ResourceItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={item.href}
          className={cn(
            "group flex h-full flex-col rounded-xl border border-dark/10 bg-white p-6 transition-all duration-350 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevation-md",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
              {item.meta}
            </span>
            {item.badge && (
              <Badge variant="accent" size="sm">
                {item.badge}
              </Badge>
            )}
          </div>
          <h3 className="mt-3 font-display text-h4-24 text-dark group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="mt-2 text-small-14 text-dark-600 text-pretty">
            {item.description}
          </p>
          <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-small-14 font-semibold text-primary">
            Read more
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}
