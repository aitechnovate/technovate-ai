import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import type { PortfolioItem } from "@/data/content";

type PortfolioCardProps = {
  item: PortfolioItem;
  className?: string;
  variant?: "default" | "compact" | "overlay";
};

/**
 * Showcase card for portfolio items. Three variants:
 *  - default: title above, summary below, tags at bottom.
 *  - compact: smaller padding for tight grids.
 *  - overlay: gradient overlay with text over a placeholder cover.
 */
export function PortfolioCard({
  item,
  className,
  variant = "default",
}: PortfolioCardProps) {
  if (variant === "overlay") {
    return (
      <a
        href={`/portfolio/${item.slug}`}
        className={cn(
          "group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-lg bg-gradient-blue-purple p-6 text-white transition-all duration-350 hover:-translate-y-1 hover:shadow-elevation-lg",
          className,
        )}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)]"
        />
        <span
          aria-hidden="true"
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-all group-hover:bg-white/25"
        >
          <ArrowUpRight className="size-4" />
        </span>
        <div className="relative space-y-2">
          <Badge variant="glass" className="bg-white/15 text-white border-white/30">
            {item.category}
          </Badge>
          <h3 className="font-display text-h3-30 text-balance">{item.title}</h3>
          <p className="text-small-14 text-white/80 line-clamp-2">
            {item.summary}
          </p>
        </div>
      </a>
    );
  }

  const isCompact = variant === "compact";

  return (
    <a
      href={`/portfolio/${item.slug}`}
      className={cn(
        "group flex flex-col rounded-lg border border-dark/10 bg-white p-6 transition-all duration-350 hover:-translate-y-1 hover:shadow-elevation-md",
        isCompact && "p-4",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "mb-4 overflow-hidden rounded-md bg-gradient-blue-cyan",
          isCompact ? "aspect-[16/10]" : "aspect-[16/9]",
        )}
      />

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <Badge variant="default" size="sm">
            {item.category}
          </Badge>
          <ArrowUpRight
            className="size-4 shrink-0 text-dark-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
          />
        </div>

        <div>
          <h3 className="font-display text-h4-24 text-dark group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="mt-1 text-small-14 text-dark-500">{item.client}</p>
        </div>

        <p
          className={cn(
            "text-small-14 text-dark-600 line-clamp-2",
            isCompact && "line-clamp-2",
          )}
        >
          {item.summary}
        </p>

        <ul className="mt-auto flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map((tag) => (
            <li key={tag}>
              <Badge variant="neutral" size="sm">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}
