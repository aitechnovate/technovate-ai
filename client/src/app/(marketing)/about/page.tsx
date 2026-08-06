import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Timeline, type TimelineItem } from "@/components/ui/Timeline";
import { TeamCard, type TeamMember } from "@/components/ui/TeamCard";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/ui/CTABanner";

export const metadata: Metadata = {
  title: "About — Technovate AI",
  description:
    "We're a senior team of AI engineers, strategists, and designers helping ambitious organizations ship AI that pays for itself.",
};

const values: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Ship before you sell",
    description:
      "We deliver working software in week one. No 60-page discovery deck before we've written a line of code.",
    icon: "Rocket",
  },
  {
    title: "Outcomes, not artifacts",
    description:
      "We measure success in ROI, latency, denials averted, hours saved — never in slide count.",
    icon: "Target",
  },
  {
    title: "Own the architecture",
    description:
      "We design systems your team can run after we leave. No black boxes, no proprietary lock-in.",
    icon: "Layers",
  },
  {
    title: "Senior on every call",
    description:
      "Engineers and strategists do the work. No offshore bench, no junior staffing pyramid.",
    icon: "Users",
  },
  {
    title: "Security from day one",
    description:
      "SOC 2, ISO 27001, HIPAA, GDPR — controls baked in from architecture, not bolted on at audit.",
    icon: "ShieldCheck",
  },
  {
    title: "Honest about AI",
    description:
      "We'll tell you when AI is the wrong tool. We turn down work where automation can't earn its keep.",
    icon: "BadgeCheck",
  },
];

const milestones: TimelineItem[] = [
  {
    title: "Founded",
    description:
      "Two engineers, one designer, one strategist — set out to ship AI that pays for itself.",
    duration: "2022",
    icon: <Icon name="Sparkles" className="size-4" />,
  },
  {
    title: "First enterprise engagement",
    description:
      "Signed with Northwind Health to rebuild their prior-auth workflow from the ground up.",
    duration: "Q3 2022",
    icon: <Icon name="HeartPulse" className="size-4" />,
  },
  {
    title: "SOC 2 Type II",
    description:
      "Achieved SOC 2 Type II compliance within 12 months — audited controls across the engineering org.",
    duration: "Q2 2023",
    icon: <Icon name="ShieldCheck" className="size-4" />,
  },
  {
    title: "100th production system",
    description:
      "Shipped our 100th production AI system — across healthcare, finance, retail, and logistics.",
    duration: "Q1 2024",
    icon: <Icon name="Cpu" className="size-4" />,
  },
  {
    title: "Series A",
    description:
      "Raised a $14M Series A led by Founders Fund to scale engineering and platform investment.",
    duration: "Q3 2024",
    icon: <Icon name="TrendingUp" className="size-4" />,
  },
  {
    title: "AI Platform Suite GA",
    description:
      "Released our internal platform — governance, evaluation, and observability — to select clients.",
    duration: "Q2 2025",
    icon: <Icon name="Server" className="size-4" />,
  },
  {
    title: "Global expansion",
    description:
      "Engineering hubs in San Francisco, London, and Bengaluru — serving clients in 22 countries.",
    duration: "Q4 2025",
    icon: <Icon name="Globe" className="size-4" />,
  },
];

const team: TeamMember[] = [
  {
    name: "Imran Khaliq",
    role: "Co-founder & CEO",
    bio: "Previously led AI platform teams at two Fortune 500s. Obsessed with shipping.",
    initials: "IK",
  },
  {
    name: "Dr. Maya Anand",
    role: "Co-founder & CTO",
    bio: "PhD in ML, ex-research at a top lab. Architect on most of our RAG systems.",
    initials: "MA",
  },
  {
    name: "Sana Qureshi",
    role: "Staff ML Engineer",
    bio: "Builds the eval harness behind every production deployment.",
    initials: "SQ",
  },
  {
    name: "David Okafor",
    role: "Head of Platform",
    bio: "Owns the infrastructure that makes our agents reliable at scale.",
    initials: "DO",
  },
  {
    name: "Mariana Costa",
    role: "Engagement Lead",
    bio: "Translates business pain into technical specs — and back into outcomes.",
    initials: "MC",
  },
  {
    name: "Anand Subramanian",
    role: "Senior Engineer",
    bio: "Writes the code your team will maintain after we leave.",
    initials: "AS",
  },
];

const stats: { label: string; value: string }[] = [
  { label: "Production systems shipped", value: "240+" },
  { label: "Years of combined experience", value: "180+" },
  { label: "Countries we serve", value: "22" },
  { label: "Senior engineers & strategists", value: "62" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "About" }]}
            className="mb-6"
          />
          <Badge variant="default" size="sm" className="mb-4">
            About Technovate AI
          </Badge>
          <h1 className="font-display text-display-72 text-balance leading-[1.05]">
            We&apos;re building the AI partner{" "}
            <span className="text-gradient-blue-cyan">we wished existed.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-16 text-dark-600 text-pretty">
            Technovate AI was founded in 2022 by a senior team of AI engineers
            and strategists who had spent a decade inside consultancies,
            watching AI projects fail for predictable reasons. We built the
            firm we wished we could have hired: senior on every call, shipping
            in week one, and accountable for outcomes — not artifacts.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Start a conversation
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/case-studies">See our work</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Stats strip */}
      <Section spacing="md" tone="muted" containerSize="wide">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="space-y-1">
              <p className="font-display text-h1-48 text-dark">{s.value}</p>
              <p className="text-small-14 text-dark-500">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Mission + Vision */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Badge variant="secondary" size="sm" className="mb-3">
              Mission
            </Badge>
            <h2 className="font-display text-h1-48 text-balance">
              Ship AI that earns its place in your business.
            </h2>
            <p className="mt-4 text-body-16 text-dark-600 text-pretty">
              We exist to make AI a productive member of your team — not a
              slide deck, not a pilot purgatory. Every engagement starts with
              the outcome we&apos;re committing to, and every line of code is
              measured against that outcome.
            </p>
          </div>
          <div>
            <Badge variant="accent" size="sm" className="mb-3">
              Vision
            </Badge>
            <h2 className="font-display text-h1-48 text-balance">
              A world where AI ships the boring way.
            </h2>
            <p className="mt-4 text-body-16 text-dark-600 text-pretty">
              We imagine an industry where AI is delivered like any other
              critical infrastructure — with clear SLOs, observable behavior,
              rollback plans, and owners. Boring, in the best possible way.
              Reliable, audited, and quietly indispensable.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section spacing="lg" tone="muted" containerSize="wide">
        <div className="mb-12 max-w-2xl">
          <Badge variant="default" size="sm" className="mb-3">
            What we believe
          </Badge>
          <h2 className="font-display text-h1-48 text-balance">
            Six values that shape every engagement.
          </h2>
          <p className="mt-3 text-body-16 text-dark-600">
            These aren&apos;t posters on a wall. They&apos;re how we hire, how
            we scope, and how we make tradeoffs when the deadline is tight.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, idx) => (
            <Card
              key={v.title}
              variant="flat"
              size="lg"
              className="h-full bg-white"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-11 items-center justify-center rounded-md bg-gradient-blue-purple text-white shadow-elevation-sm"
              >
                <Icon name={v.icon} className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-h4-24 text-dark">
                <span className="text-small-14 font-medium text-dark-500">
                  0{idx + 1}.
                </span>{" "}
                {v.title}
              </h3>
              <p className="mt-3 text-small-14 text-dark-600 text-pretty">
                {v.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Leadership */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="mb-12 max-w-2xl">
          <Badge variant="secondary" size="sm" className="mb-3">
            Leadership
          </Badge>
          <h2 className="font-display text-h1-48 text-balance">
            The senior team behind every engagement.
          </h2>
          <p className="mt-3 text-body-16 text-dark-600">
            Engineers and strategists with a decade of production AI between
            them. You&apos;ll work with the people on this page — not the team
            they delegate to.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
      </Section>

      {/* Milestones */}
      <Section spacing="lg" tone="muted" containerSize="wide">
        <div className="mb-12 max-w-2xl">
          <Badge variant="default" size="sm" className="mb-3">
            Milestones
          </Badge>
          <h2 className="font-display text-h1-48 text-balance">
            Four years of compounding.
          </h2>
          <p className="mt-3 text-body-16 text-dark-600">
            A short history of the firm — what we&apos;ve shipped, who
            we&apos;ve shipped it with, and what we&apos;ve learned.
          </p>
        </div>

        <Timeline items={milestones} orientation="vertical" tone="brand" />
      </Section>

      {/* CTA */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="Want to work with us?"
          title="We're always hiring senior AI engineers and strategists."
          description="If you've shipped production AI and want to do it with a team that cares about outcomes over artifacts, we'd love to hear from you."
          primaryLabel="See open roles"
          primaryHref="/careers"
          secondaryLabel="Read our work"
          secondaryHref="/case-studies"
        />
      </Section>
    </>
  );
}
