import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { BlogCard } from "@/components/ui/BlogCard";
import { CTABanner } from "@/components/ui/CTABanner";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { blogPosts } from "@/data/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — Technovate AI",
  description:
    "Engineering notes on production AI: retrieval evaluation, agent reliability, automation ROI, and the patterns we apply on every engagement.",
  alternates: { canonical: "/resources/blog" },
};

/** Categories from the spec's §16 blog taxonomy, present in our data. */
const categories = Array.from(new Set(blogPosts.map((p) => p.category)));

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  const [featured, ...rest] = sorted;

  return (
    <>
      {/* Hero */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Resources", href: "/resources" },
              { label: "Blog" },
            ]}
            className="mb-6"
          />
          <Badge variant="default" size="sm" className="mb-4">
            Blog
          </Badge>
          <h1 className="font-display text-display-72 text-balance leading-[1.05]">
            Engineering notes from{" "}
            <span className="text-gradient-brand">
              the work itself.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-16 text-dark-600 text-pretty">
            We publish what we learn on engagements — the patterns that hold up
            in production and the ones that quietly do not. No thought
            leadership, no predictions.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c}>
                <Badge variant="neutral" size="sm">
                  {c}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Featured post */}
      {featured && (
        <Section spacing="md" tone="muted" containerSize="wide">
          <Card variant="gradient" size="lg" className="bg-white">
            <Link href={`/resources/blog/${featured.slug}`} className="group block">
              <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="accent" size="sm">
                      Latest
                    </Badge>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                      {featured.category} · {featured.readingMinutes} min read
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-h1-48 text-dark text-balance transition-colors group-hover:text-primary">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-body-16 text-dark-600 text-pretty">
                    {featured.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-small-14 font-semibold text-primary">
                    Read the post
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>

                <dl className="space-y-4 rounded-xl border border-dark/10 bg-light-200 p-6 lg:justify-self-end">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                      Author
                    </dt>
                    <dd className="mt-1 text-small-14 font-medium text-dark">
                      {featured.author.name}
                    </dd>
                    <dd className="text-small-14 text-dark-500">
                      {featured.author.role}
                    </dd>
                  </div>
                  <div className="border-t border-dark/10 pt-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-dark-500">
                      Published
                    </dt>
                    <dd className="mt-1 text-small-14 font-medium text-dark">
                      <time dateTime={featured.publishedAt}>
                        {formatDate(featured.publishedAt)}
                      </time>
                    </dd>
                  </div>
                </dl>
              </div>
            </Link>
          </Card>
        </Section>
      )}

      {/* All posts */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="mb-10 max-w-2xl">
          <Badge variant="default" size="sm" className="mb-3">
            All posts
          </Badge>
          <h2 className="font-display text-h1-48 text-balance">
            {sorted.length} posts and counting.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>

      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="Stay in the loop"
          title="One email a month with our best engineering notes."
          description="No spam, no drip campaigns. Production AI patterns, the occasional deep dive, and a single CTA at the bottom."
          primaryLabel="See all resources"
          primaryHref="/resources"
          secondaryLabel="Book a call"
          secondaryHref="/contact"
        />
      </Section>
    </>
  );
}
