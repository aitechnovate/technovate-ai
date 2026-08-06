"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Timeline, type TimelineItem } from "@/components/ui/Timeline";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/ui/CTABanner";
import { roles } from "@/data/careers";

type Benefit = {
  title: string;
  description: string;
  icon: IconName;
};

const benefits: Benefit[] = [
  {
    title: "Top-of-market comp",
    description:
      "Salary benchmarked to top-quartile for every role. Equity for full-time. Profit-share for senior staff.",
    icon: "Wallet",
  },
  {
    title: "Health, dental & vision",
    description:
      "Premium plans for you and your dependents. Mental health support included. No premium tiers.",
    icon: "HeartPulse",
  },
  {
    title: "Remote-first",
    description:
      "Work where you do your best work. Hubs in SF, London, Bengaluru for those who want them.",
    icon: "Plane",
  },
  {
    title: "Learning budget",
    description:
      "$3,000/year for conferences, courses, books. Plus paid time to write and speak.",
    icon: "GraduationCap",
  },
  {
    title: "Sabbatical at year 4",
    description:
      "Six weeks paid, plus a $10K travel stipend. We want you to come back refreshed, not burned out.",
    icon: "Plane",
  },
  {
    title: "Parental leave",
    description:
      "20 weeks fully paid for primary, 12 weeks for secondary. Ramp-back schedule, not cliff return.",
    icon: "HeartPulse",
  },
];

const hiringProcess: TimelineItem[] = [
  {
    title: "Intro call",
    description:
      "30 minutes with a hiring lead. We talk about your background, what you're looking for, and how the role fits.",
    duration: "Day 1–3",
    icon: <Icon name="MessageCircle" className="size-4" />,
  },
  {
    title: "Technical screen",
    description:
      "60-minute paired session with an engineer. Real problems, no trick questions, no live coding under pressure.",
    duration: "Day 5–7",
    icon: <Icon name="Terminal" className="size-4" />,
  },
  {
    title: "System design",
    description:
      "90 minutes with two senior engineers. Design a system you'd actually be proud to build.",
    duration: "Day 8–10",
    icon: <Icon name="Cpu" className="size-4" />,
  },
  {
    title: "Team conversations",
    description:
      "Three 30-minute conversations with people you'd work with day-to-day. Cultural fit is bidirectional.",
    duration: "Day 11–14",
    icon: <Icon name="Users" className="size-4" />,
  },
  {
    title: "Offer",
    description:
      "Written offer within 48 hours. Reference checks only after you've accepted in principle.",
    duration: "Day 15",
    icon: <Icon name="BadgeCheck" className="size-4" />,
  },
];

const teamFilter = ["All", "Engineering", "Strategy", "Design", "Operations"] as const;
type TeamFilter = (typeof teamFilter)[number];

/**
 * Client body for /careers — extracted so page.tsx can remain a server
 * component and export page-specific metadata.
 */
export function CareersPageContent() {
  const [activeTeam, setActiveTeam] = React.useState<TeamFilter>("All");

  const filteredRoles =
    activeTeam === "All" ? roles : roles.filter((r) => r.team === activeTeam);

  return (
    <>
      {/* Hero */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Careers" }]}
            className="mb-6"
          />
          <Badge variant="default" size="sm" className="mb-4">
            Careers
          </Badge>
          <h1 className="font-display text-display-72 text-balance leading-[1.05]">
            Build the firm{" "}
            <span className="text-gradient-brand">you wished you worked at.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-16 text-dark-600 text-pretty">
            Senior, accountable, and obsessed with outcomes. We hire engineers
            and strategists with a decade of production AI between them —
            because our clients can&apos;t afford to learn on the job.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#open-roles">
                See open roles
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">Meet the team</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Culture */}
      <Section spacing="md" tone="muted" containerSize="wide">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Badge variant="secondary" size="sm" className="mb-3">
              Culture
            </Badge>
            <h2 className="font-display text-h1-48 text-balance">
              Three things we get right that most firms don&apos;t.
            </h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-h4-24 text-dark">
                Senior on every call
              </h3>
              <p className="mt-2 text-small-14 text-dark-600 text-pretty">
                No offshore bench, no junior pyramid. The person in the
                kickoff is the person doing the work. We hire slow and we
                pay well, so we don&apos;t have to staff down.
              </p>
            </div>
            <div>
              <h3 className="font-display text-h4-24 text-dark">
                Outcomes, not artifacts
              </h3>
              <p className="mt-2 text-small-14 text-dark-600 text-pretty">
                We&apos;re measured on shipped systems and client-reported
                ROI, not slide count or hours billed. Every engagement has a
                written definition of done — and we&apos;re accountable for it.
              </p>
            </div>
            <div>
              <h3 className="font-display text-h4-24 text-dark">
                Boring infrastructure, big leverage
              </h3>
              <p className="mt-2 text-small-14 text-dark-600 text-pretty">
                Eval harnesses, observability, audit hooks, replayable traces
                — the unsexy work that makes AI trustworthy. We invest heavily
                in it because it makes everything else easier.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="mb-12 max-w-2xl">
          <Badge variant="default" size="sm" className="mb-3">
            Benefits
          </Badge>
          <h2 className="font-display text-h1-48 text-balance">
            Designed to keep senior people for a decade.
          </h2>
          <p className="mt-3 text-body-16 text-dark-600">
            We&apos;d rather pay for the best benefits than rehire. Here&apos;s
            what every full-time team member gets.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <Card key={b.title} variant="flat" className="h-full bg-white">
              <span
                aria-hidden="true"
                className="inline-flex size-10 items-center justify-center rounded-md bg-gradient-blue-cyan text-white shadow-elevation-sm"
              >
                <Icon name={b.icon} className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-h4-24 text-dark">
                {b.title}
              </h3>
              <p className="mt-2 text-small-14 text-dark-600 text-pretty">
                {b.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Hiring process */}
      <Section spacing="lg" tone="muted" containerSize="wide">
        <div className="mb-12 max-w-2xl">
          <Badge variant="secondary" size="sm" className="mb-3">
            Hiring process
          </Badge>
          <h2 className="font-display text-h1-48 text-balance">
            Five steps, fifteen days, no surprises.
          </h2>
          <p className="mt-3 text-body-16 text-dark-600">
            We move fast and keep you informed. You&apos;ll know where you stand
            at every step.
          </p>
        </div>

        <Timeline items={hiringProcess} orientation="vertical" tone="brand" />
      </Section>

      {/* Open roles */}
      <Section
        spacing="lg"
        tone="default"
        containerSize="wide"
        id="open-roles"
      >
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="default" size="sm" className="mb-3">
              Open roles
            </Badge>
            <h2 className="font-display text-h1-48 text-balance">
              {filteredRoles.length} open role
              {filteredRoles.length === 1 ? "" : "s"} on the team.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {teamFilter.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTeam(t)}
                aria-pressed={activeTeam === t}
                className={
                  "inline-flex h-9 items-center rounded-full border px-4 text-small-14 font-medium transition-all " +
                  (activeTeam === t
                    ? "border-transparent bg-gradient-blue-cyan text-white shadow-elevation-sm"
                    : "border-dark/10 bg-white text-dark-700 hover:border-primary/40 hover:text-primary")
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {filteredRoles.length > 0 ? (
          <ul className="divide-y divide-dark/10 overflow-hidden rounded-xl border border-dark/10 bg-white">
            {filteredRoles.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/careers/${r.slug}`}
                  className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-light-200 sm:px-8"
                >
                  <div className="min-w-0">
                    <h3 className="font-display text-h4-24 text-dark group-hover:text-primary transition-colors">
                      {r.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-small-14 text-dark-500">
                      <span>{r.team}</span>
                      <span aria-hidden="true">·</span>
                      <span>{r.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>{r.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="neutral" size="sm">
                      {r.level}
                    </Badge>
                    <ArrowRight className="size-4 text-dark-400 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed border-dark/15 bg-light-200 p-12 text-center">
            <p className="text-body-16 text-dark-500">
              No open roles in this team right now. Check back soon — or send
              a speculative application to careers@technovate.ai.
            </p>
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="Don&apos;t see your role?"
          title="Send us a speculative application."
          description="If you've shipped production AI and want to do it with a team that cares about outcomes, tell us what you'd want to work on. We hire opportunistically when great people show up."
          primaryLabel="Email careers@technovate.ai"
          primaryHref="mailto:careers@technovate.ai"
          secondaryLabel="Meet the team"
          secondaryHref="/about"
        />
      </Section>
    </>
  );
}
