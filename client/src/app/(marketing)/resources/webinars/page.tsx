import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PlayCircle, CalendarPlus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CTABanner } from "@/components/ui/CTABanner";
import { ResourceHeader } from "@/components/sections/shared/ResourceHeader";
import { webinars } from "@/data/resources";

export const metadata: Metadata = {
  title: "Webinars — Technovate AI",
  description:
    "Live and on-demand sessions with our engineering team on RAG evaluation, AI maturity, and agent reliability in production.",
  alternates: { canonical: "/resources/webinars" },
};

export default function WebinarsPage() {
  const upcoming = webinars.filter((w) => w.status === "Upcoming");
  const onDemand = webinars.filter((w) => w.status === "On-demand");

  return (
    <>
      <ResourceHeader
        active="webinars"
        eyebrow="Webinars"
        title="Sessions with"
        highlight="the people who build it."
        description="No product pitches. Working sessions and post-mortems run by the engineers doing the delivery work, with time for real questions at the end."
      />

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <Section spacing="md" tone="muted" containerSize="wide">
          <div className="mb-8 max-w-2xl">
            <Badge variant="secondary" size="sm" className="mb-3">
              Upcoming
            </Badge>
            <h2 className="font-display text-h1-48 text-balance">
              Register for a live session.
            </h2>
          </div>

          <div className="space-y-5">
            {upcoming.map((w) => (
              <Card key={w.slug} variant="gradient" size="lg" className="bg-white">
                <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="accent" size="sm">
                        Live
                      </Badge>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                        {w.date} · {w.duration}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-h2-36 text-dark text-balance">
                      {w.title}
                    </h3>
                    <p className="mt-3 text-body-16 text-dark-600 text-pretty">
                      {w.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                      {w.speakers.map((s) => (
                        <li key={s.name} className="text-small-14">
                          <span className="font-medium text-dark">{s.name}</span>
                          <span className="text-dark-500"> · {s.role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:justify-self-end">
                    <Button asChild size="lg">
                      <Link href="/contact">
                        Save my seat
                        <CalendarPlus className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* On-demand */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="mb-10 max-w-2xl">
          <Badge variant="default" size="sm" className="mb-3">
            On-demand
          </Badge>
          <h2 className="font-display text-h1-48 text-balance">
            Watch a past session.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {onDemand.map((w) => (
            <Card key={w.slug} variant="flat" className="flex h-full flex-col bg-white">
              <div
                aria-hidden="true"
                className="mb-5 flex aspect-video items-center justify-center rounded-lg bg-gradient-blue-purple text-white"
              >
                <PlayCircle className="size-10" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                {w.date} · {w.duration}
              </span>
              <h3 className="mt-2 font-display text-h4-24 text-dark text-balance">
                {w.title}
              </h3>
              <p className="mt-2 text-small-14 text-dark-600 text-pretty">
                {w.description}
              </p>
              <ul className="mt-4 space-y-1">
                {w.speakers.map((s) => (
                  <li key={s.name} className="text-small-14 text-dark-500">
                    {s.name} · {s.role}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact">
                    Watch the recording
                    <PlayCircle className="size-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="Want a session for your team?"
          title="We run private workshops."
          description="A half-day working session with your engineers on retrieval evaluation, agent reliability, or whichever problem is actually blocking you."
          primaryLabel="Request a workshop"
          primaryHref="/contact"
          secondaryLabel="Read the whitepapers"
          secondaryHref="/resources/whitepapers"
        />
      </Section>
    </>
  );
}
