import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Timeline, type TimelineItem } from "@/components/ui/Timeline";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  CheckList,
  RelatedGrid,
  SectionHeading,
} from "@/components/sections/shared/DetailSections";
import { getOtherRoles, getRole, roles } from "@/data/careers";
import { siteInfo } from "@/data/site";
import { ApplicationForm } from "./ApplicationForm";

type PageProps = { params: { slug: string } };

/** Statically prerender every open role. */
export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const role = getRole(params.slug);
  if (!role) return { title: "Role not found — Technovate AI" };

  return {
    title: `${role.title} — Careers at Technovate AI`,
    description: role.summary,
    alternates: { canonical: `/careers/${role.slug}` },
    openGraph: {
      title: `${role.title} — Technovate AI`,
      description: role.summary,
      url: `/careers/${role.slug}`,
      type: "website",
    },
  };
}

export default function RoleDetailPage({ params }: PageProps) {
  const role = getRole(params.slug);
  if (!role) notFound();

  const others = getOtherRoles(role.slug);

  const firstQuarter: TimelineItem[] = role.firstQuarter.map((q) => ({
    title: q.period,
    description: q.description,
    icon: <Icon name="Rocket" className="size-4" />,
  }));

  /** JobPosting schema so the role is eligible for job-search surfaces. */
  const jobJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.summary,
    employmentType: role.type.toUpperCase().replace("-", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: siteInfo.name,
      sameAs: siteInfo.url,
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: role.location },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobJsonLd) }}
      />

      {/* Hero */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Careers", href: "/careers" },
              { label: role.title },
            ]}
            className="mb-6"
          />

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default" size="sm">
              {role.team}
            </Badge>
            <Badge variant="neutral" size="sm">
              {role.level}
            </Badge>
            <Badge variant="outline" size="sm">
              {role.type}
            </Badge>
          </div>

          <h1 className="mt-5 text-balance font-display text-display-72">{role.title}</h1>

          <p className="mt-6 max-w-2xl text-pretty text-body-16 text-dark-600">{role.summary}</p>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                Location
              </dt>
              <dd className="mt-1 text-small-14 font-medium text-dark">{role.location}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                Compensation
              </dt>
              <dd className="mt-1 text-small-14 font-medium text-dark">{role.salaryRange}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                Employment type
              </dt>
              <dd className="mt-1 text-small-14 font-medium text-dark">{role.type}</dd>
            </div>
          </dl>

          <div className="mt-8">
            <Button asChild size="lg">
              <a href="#apply">Apply for this role</a>
            </Button>
          </div>
        </div>
      </Section>

      {/* Responsibilities / requirements */}
      <Section spacing="md" tone="muted" containerSize="wide">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card variant="flat" size="lg" className="bg-white">
            <CheckList title="What you'll own" items={role.responsibilities} tone="primary" />
          </Card>
          <Card variant="flat" size="lg" className="bg-white">
            <CheckList title="What we're looking for" items={role.requirements} />
          </Card>
          <Card variant="flat" size="lg" className="bg-white">
            <CheckList title="Nice to have" items={role.bonus} tone="primary" />
          </Card>
        </div>
      </Section>

      {/* First quarter */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <SectionHeading
          eyebrow="Your first quarter"
          title="What the first three months look like."
          description="We write this down for every role so expectations are explicit on both sides from day one."
        />
        <Timeline items={firstQuarter} orientation="vertical" tone="brand" />
      </Section>

      {/* Application form */}
      <Section spacing="lg" tone="muted" containerSize="wide" id="apply">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <ApplicationForm roleTitle={role.title} />

          <div className="space-y-4">
            <Card variant="flat" size="lg" className="bg-white">
              <h3 className="font-display text-h4-24 text-dark">Our hiring process</h3>
              <ol className="mt-4 space-y-3">
                {[
                  "Intro call — 30 minutes with a hiring lead",
                  "Technical screen — 60-minute paired session",
                  "System design — 90 minutes with two senior engineers",
                  "Team conversations — three 30-minute chats",
                  "Offer — written, within 48 hours",
                ].map((step, idx) => (
                  <li key={step} className="flex gap-3 text-small-14 text-dark-700">
                    <span
                      aria-hidden="true"
                      className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary"
                    >
                      {idx + 1}
                    </span>
                    <span className="text-pretty">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 border-t border-dark/10 pt-4 text-small-14 text-dark-500">
                Fifteen days end to end. You will know where you stand at every step.
              </p>
            </Card>

            <Card variant="flat" size="lg" className="bg-white">
              <h3 className="font-display text-h4-24 text-dark">Questions first?</h3>
              <p className="mt-2 text-pretty text-small-14 text-dark-600">
                Email us before you apply if anything is unclear. A hiring lead will answer — not a
                recruiting inbox.
              </p>
              <a
                href={`mailto:careers@technovateai.com?subject=${encodeURIComponent(
                  `Question about ${role.title}`
                )}`}
                className="mt-4 inline-flex text-small-14 font-semibold text-primary hover:underline"
              >
                careers@technovateai.com
              </a>
            </Card>
          </div>
        </div>
      </Section>

      <RelatedGrid
        eyebrow="Other roles"
        title="Also hiring for these."
        tone="default"
        items={others.map((r) => ({
          title: r.title,
          description: `${r.team} · ${r.location} · ${r.type}`,
          href: `/careers/${r.slug}`,
        }))}
      />

      <Section spacing="none" tone="default" containerSize="wide">
        <div className="flex justify-center pb-16">
          <Button asChild variant="ghost">
            <Link href="/careers">
              <ArrowLeft className="size-4" />
              Back to all roles
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
