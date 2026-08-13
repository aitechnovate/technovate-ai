import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { CTABanner } from "@/components/ui/CTABanner";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedGrid } from "@/components/sections/shared/DetailSections";
import { blogPosts, getBlogPost, getRelatedPosts, type ContentBlock } from "@/data/content";
import { siteInfo } from "@/data/site";
import { formatDate } from "@/lib/utils";

type PageProps = { params: { slug: string } };

/** Statically prerender every post. */
export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return { title: "Post not found — Technovate AI" };

  return {
    title: `${post.title} — Technovate AI`,
    description: post.excerpt,
    alternates: { canonical: `/resources/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/resources/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);
  const initials = post.author.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  /** Article schema for rich results. */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@type": "Organization", name: siteInfo.name },
    mainEntityOfPage: `${siteInfo.url}/resources/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Header */}
      <Section spacing="lg" tone="default" containerSize="narrow">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: "Blog", href: "/resources/blog" },
            { label: post.title },
          ]}
          className="mb-6"
        />

        <Badge variant="default" size="sm" className="mb-4">
          {post.category}
        </Badge>

        <h1 className="text-balance font-display text-display-72">{post.title}</h1>

        <p className="mt-6 text-pretty text-body-16 text-dark-600">{post.excerpt}</p>

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-dark/10 pt-6">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="text-small-14">
            <p className="font-medium text-dark">{post.author.name}</p>
            <p className="text-dark-500">{post.author.role}</p>
          </div>
          <div className="ml-auto text-small-14 text-dark-500">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            {post.readingMinutes} min read
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <li key={t}>
                <Badge variant="neutral" size="sm">
                  {t}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Body */}
      <Section spacing="none" tone="default" containerSize="narrow">
        <article className="pb-20">
          {(post.body ?? []).map((block, idx) => (
            <BlockRenderer key={idx} block={block} />
          ))}
        </article>
      </Section>

      <RelatedGrid
        eyebrow="Keep reading"
        title="More from the blog."
        items={related.map((r) => ({
          title: r.title,
          description: r.excerpt,
          href: `/resources/blog/${r.slug}`,
        }))}
      />

      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="Working on something like this?"
          title="Talk to the engineers who wrote it."
          description="Thirty minutes with the senior team. Bring the problem — we will give you an honest read on what it would take."
          primaryLabel="Book a call"
          primaryHref="/contact"
          secondaryLabel="See our solutions"
          secondaryHref="/solutions"
        />
      </Section>

      <Section spacing="none" tone="default" containerSize="wide">
        <div className="flex justify-center pb-16">
          <Button asChild variant="ghost">
            <Link href="/resources/blog">
              <ArrowLeft className="size-4" />
              Back to the blog
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

/**
 * Renders one long-form content block. Blocks are a closed union rather
 * than raw HTML, so there is no dangerouslySetInnerHTML in the body path.
 */
function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-12 text-balance font-display text-h2-36 text-dark first:mt-0">
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p className="mt-5 text-pretty text-body-16 leading-relaxed text-dark-700">{block.text}</p>
      );

    case "list":
      return (
        <ul className="mt-5 space-y-2.5">
          {block.items.map((i) => (
            <li key={i} className="flex gap-3 text-body-16 text-dark-700">
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
              />
              <span className="text-pretty">{i}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <figure className="mt-10 border-l-4 border-primary/40 pl-6">
          <blockquote className="text-balance font-display text-h4-24 text-dark">
            {block.text}
          </blockquote>
          {block.attribution && (
            <figcaption className="mt-2 text-small-14 text-dark-500">
              — {block.attribution}
            </figcaption>
          )}
        </figure>
      );

    case "code":
      return (
        <pre className="mt-6 overflow-x-auto rounded-xl border border-dark/10 bg-dark p-5 text-small-14 leading-relaxed text-light">
          <code>{block.code}</code>
        </pre>
      );
  }
}
