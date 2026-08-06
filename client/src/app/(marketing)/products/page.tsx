import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/ui/CTABanner";
import { products, productStatusMeta as statusVariant } from "@/data/products";

export const metadata: Metadata = {
  title: "Products — Technovate AI",
  description:
    "Production-ready platforms built by our engineering team: AI Platform Suite, Automation Tools, Knowledge Assistant, and Analytics Dashboard.",
};

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Products" }]}
            className="mb-6"
          />
          <Badge variant="default" size="sm" className="mb-4">
            Products
          </Badge>
          <h1 className="font-display text-display-72 text-balance leading-[1.05]">
            Platforms we&apos;ve built —{" "}
            <span className="text-gradient-blue-cyan">battle-tested by our work.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-16 text-dark-600 text-pretty">
            Every product in this section started as an internal tool to make
            our own client engagements faster and more reliable. Now available
            to your team with the same standard of support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Request product demo
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Products grid */}
      <Section spacing="md" tone="muted" containerSize="wide">
        <div className="grid gap-6 lg:grid-cols-2">
          {products.map((p) => {
            const status = statusVariant[p.status];
            return (
              <Card
                key={p.slug}
                variant="flat"
                size="lg"
                className="flex flex-col bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-12 items-center justify-center rounded-md bg-gradient-blue-purple text-white shadow-elevation-sm"
                  >
                    <Icon name={p.icon} className="size-5" />
                  </span>
                  <Badge variant={status.variant} size="sm" leadingDot>
                    {status.label}
                  </Badge>
                </div>
                <h2 className="mt-5 font-display text-h2-36 text-dark">
                  {p.title}
                </h2>
                <p className="mt-1 text-body-16 font-medium text-primary">
                  {p.tagline}
                </p>
                <p className="mt-3 text-body-16 text-dark-600 text-pretty">
                  {p.description}
                </p>
                <ul className="mt-6 space-y-2 border-t border-dark/10 pt-5">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-small-14 text-dark-700"
                    >
                      <Icon
                        name="CheckCircle2"
                        className="mt-0.5 size-4 shrink-0 text-success"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-1.5 text-small-14 font-semibold text-primary hover:underline"
                  >
                    Explore {p.title}
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Platform principles */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="mb-12 max-w-2xl">
          <Badge variant="secondary" size="sm" className="mb-3">
            Platform principles
          </Badge>
          <h2 className="font-display text-h1-48 text-balance">
            Built the way we&apos;d want to buy software.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              {
                title: "Your data never leaves your perimeter",
                description:
                  "Bring your own VPC, BYO-cloud, on-prem option. We don't see your data — neither do our models.",
                icon: "ShieldCheck",
              },
              {
                title: "Open by default",
                description:
                  "Every model swap, every workflow export, every audit log is yours to keep. No proprietary lock-in.",
                icon: "Unlock",
              },
              {
                title: "Observable end-to-end",
                description:
                  "Every request traced, every decision explained, every cost attributed. Built-in, not bolted on.",
                icon: "Activity",
              },
              {
                title: "Built for compliance",
                description:
                  "SOC 2, ISO 27001, HIPAA, GDPR-ready. Audit logs and policy controls from day one.",
                icon: "FileCheck",
              },
              {
                title: "Senior support",
                description:
                  "Tickets answered by engineers who wrote the code — not a tier-1 offshore desk.",
                icon: "Users",
              },
              {
                title: "Honest pricing",
                description:
                  "Per-seat or per-run, published rates, no surprise overages. Procurement loves us.",
                icon: "DollarSign",
              },
            ] satisfies { title: string; description: string; icon: IconName }[]
          ).map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-dark/10 bg-white p-6"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary"
              >
                <Icon name={p.icon} className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-h4-24 text-dark">
                {p.title}
              </h3>
              <p className="mt-2 text-small-14 text-dark-600 text-pretty">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="See it in your environment"
          title="Request a product demo."
          description="A 30-minute walkthrough with one of our engineers — bring your stack, your data shape, and your security constraints. We'll show you exactly how it fits."
          primaryLabel="Request demo"
          primaryHref="/contact"
          secondaryLabel="Read pricing"
          secondaryHref="/pricing"
        />
      </Section>
    </>
  );
}
