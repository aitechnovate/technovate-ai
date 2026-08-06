import * as React from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import type { BlogPost } from "@/data/content";
import { formatDate } from "@/lib/utils";

type BlogCardProps = {
  post: BlogPost;
  layout?: "default" | "featured" | "compact";
  className?: string;
};

/**
 * Blog post preview card. Variants:
 *  - default: image + meta + title + excerpt.
 *  - featured: 16/9 cover, larger title, used for hero posts.
 *  - compact: horizontal layout, smaller padding.
 */
export function BlogCard({
  post,
  layout = "default",
  className,
}: BlogCardProps) {
  const href = `/resources/blog/${post.slug}`;

  if (layout === "compact") {
    return (
      <a
        href={href}
        className={cn(
          "group flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-light-200",
          className,
        )}
      >
        <div
          aria-hidden="true"
          className="size-16 shrink-0 rounded-md bg-gradient-blue-cyan"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-dark-500">
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" aria-hidden="true" />
              {post.readingMinutes} min
            </span>
          </div>
          <h3 className="mt-1 truncate font-display text-body-16 text-dark group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <Badge variant="neutral" size="sm" className="mt-2">
            {post.category}
          </Badge>
        </div>
      </a>
    );
  }

  const isFeatured = layout === "featured";

  return (
    <a
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-dark/10 bg-white transition-all duration-350 hover:-translate-y-1 hover:shadow-elevation-md",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "bg-gradient-blue-purple",
          isFeatured ? "aspect-[16/8]" : "aspect-[16/9]",
        )}
      />

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <Badge variant="default" size="sm">
            {post.category}
          </Badge>
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-dark-500">
            <Clock className="size-3" aria-hidden="true" />
            {post.readingMinutes} min
          </span>
        </div>

        <h3
          className={cn(
            "font-display text-dark text-balance group-hover:text-primary transition-colors",
            isFeatured ? "text-h2-36" : "text-h4-24",
          )}
        >
          {post.title}
        </h3>

        <p className="text-small-14 text-dark-600 line-clamp-3">{post.excerpt}</p>

        <div className="mt-auto flex items-center justify-between border-t border-dark/10 pt-4">
          <div className="flex items-center gap-2 text-[11px] text-dark-500">
            <span>{post.author.name}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <ArrowUpRight className="size-4 text-dark-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </div>
    </a>
  );
}
