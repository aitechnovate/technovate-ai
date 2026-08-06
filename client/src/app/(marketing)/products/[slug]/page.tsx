import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CTABanner } from "@/components/ui/CTABanner";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { DetailHero } from "@/components/sections/shared/DetailHero";
import {
  CheckList,
  FeatureGrid,
  RelatedGrid,
  SectionHeading,
  TechStrip,
} from "@/components/sections/shared/DetailSections";
import {
  getProduct,
  getRelatedProducts,
  productStatusMeta,
  products,
} from "@/data/products";

type PageProps = { params: { slug: string } };

/** Statically prerender all four product routes. */
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product not found — Technovate AI" };

  return {
    title: `${product.title} — Technovate AI`,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.title} — Technovate AI`,
      description: product.description,
      url: `/products/${product.slug}`,
      type: "website",
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug);
  const status = productStatusMeta[product.status];

  /** FAQPage schema so product questions are eligible for rich results. */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <DetailHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.title },
        ]}
        eyebrow={status.label}
        title={product.heroLead}
        highlight={product.heroHighlight}
        description={product.description}
        icon={product.icon}
        kpis={product.metrics}
        primaryCta={{ label: "Request a demo", href: "/contact" }}
        secondaryCta={{ label: "Read the docs", href: "/resources/docs" }}
      />

      {/* Built for */}
      <Section spacing="md" tone="muted" containerSize="wide">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <Badge variant="secondary" size="sm" className="mb-3">
              Built for
            </Badge>
            <h2 className="font-display text-h1-48 text-balance">
              {product.tagline}
            </h2>
          </div>
          <Card variant="flat" size="lg" className="h-fit bg-white">
            <CheckList
              title="Who gets the most out of it"
              items={product.builtFor}
              tone="primary"
            />
          </Card>
        </div>
      </Section>

      <FeatureGrid
        eyebrow="Features"
        title="What ships in the box."
        items={product.featureDetails}
        tone="default"
      />

      {/* Modules */}
      <Section spacing="lg" tone="muted" containerSize="wide">
        <SectionHeading
          eyebrow="Modules"
          title="How the product is organized."
          description="Each module is usable on its own and better alongside the others."
          tone="secondary"
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {product.modules.map((m, idx) => (
            <li key={m.name}>
              <Card variant="flat" className="h-full bg-white">
                <span
                  aria-hidden="true"
                  className="text-[11px] font-semibold uppercase tracking-wider text-dark-400"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-h4-24 text-dark">
                  {m.name}
                </h3>
                <p className="mt-2 text-small-14 text-dark-600 text-pretty">
                  {m.description}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <TechStrip
        eyebrow="Integrations"
        title="Works with what you already run."
        description="Managed authentication and rate limiting for every connected system. Anything missing can be added with a typed HTTP block."
        items={product.integrations}
      />

      {/* Plans */}
      <Section spacing="lg" tone="muted" containerSize="wide">
        <SectionHeading
          eyebrow="Plans"
          title="Straightforward pricing."
          description="All plans include support from the engineers who built the product. Prices in USD."
          tone="secondary"
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {product.plans.map((plan, idx) => (
            <Card
              key={plan.name}
              variant={idx === 1 ? "bordered" : "flat"}
              size="lg"
              className="flex h-full flex-col bg-white"
            >
              {idx === 1 && (
                <Badge variant="default" size="sm" className="mb-3 self-start">
                  Most popular
                </Badge>
              )}
              <h3 className="font-display text-h4-24 text-dark">{plan.name}</h3>
              <p className="mt-4">
                <span className="font-display text-h1-48 text-dark">
                  {plan.price}
                </span>
                <span className="ml-2 text-small-14 text-dark-500">
                  {plan.cadence}
                </span>
              </p>
              <p className="mt-3 text-small-14 text-dark-600 text-pretty">
                {plan.blurb}
              </p>
              <Button
                asChild
                variant={idx === 1 ? "primary" : "outline"}
                className="mt-6 w-full"
              >
                <Link href="/contact">
                  {plan.price === "Custom" ? "Talk to sales" : "Get started"}
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-center text-small-14 text-dark-500">
          Need something between tiers?{" "}
          <Link href="/contact" className="text-primary hover:underline">
            Tell us what you need
          </Link>{" "}
          — we price to the shape of the deployment.
        </p>
      </Section>

      {/* FAQ */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <SectionHeading
          eyebrow="FAQ"
          title={`Common questions about ${product.title}.`}
        />
        <div className="rounded-xl border border-dark/10 bg-white px-4 sm:px-6">
          <Accordion type="multiple" className="w-full">
            {product.faq.map((f, idx) => (
              <AccordionItem key={f.question} value={`faq-${idx}`}>
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <RelatedGrid
        eyebrow="Other products"
        title="The rest of the suite."
        items={related.map((r) => ({
          title: r.title,
          description: r.tagline,
          href: r.href,
          icon: r.icon,
        }))}
      />

      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="See it on your data"
          title={`A working ${product.title} demo, not a slide deck.`}
          description="Thirty minutes with an engineer who built it. Bring a real use case and we will show you how it would actually be configured."
          primaryLabel="Request a demo"
          primaryHref="/contact"
          secondaryLabel="See full pricing"
          secondaryHref="/pricing"
        />
      </Section>

      <Section spacing="none" tone="default" containerSize="wide">
        <div className="flex justify-center pb-16">
          <Button asChild variant="ghost">
            <Link href="/products">
              Back to all products
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
