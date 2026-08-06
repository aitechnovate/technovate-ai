import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import type { CaseStudy } from "@/data/content";

type CaseStudyCardProps = {
  item: CaseStudy;
  /** Render as a horizontal media card (image left, content right). */
  layout?: "stacked" | "media";
  className?: string;
};

/**
 * Case study preview tile. Layouts:
 *  - stacked: title, problem/solution/outcome stack.
 *  - media: aside with a hero cover; used in homepage hero case study.
 */
export function CaseStudyCard({
  item,
  layout = "stacked",
  className,
}: CaseStudyCardProps) {
  const href = `/case-studies/${item.slug}`;

  if (layout === "media") {
    return (
      <a
        href={href}
        className={cn(
          "group grid gap-0 overflow-hidden rounded-xl border border-dark/10 bg-white shadow-elevation-sm transition-all duration-350 hover:shadow-elevation-md lg:grid-cols-[1.1fr_1fr]",
          className,
        )}
      >
        <div
          aria-hidden="true"
          className="aspect-[16/10] bg-gradient-blue-purple lg:aspect-auto lg:min-h-[280px]"
        />
        <div className="flex flex-col gap-4 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="default" size="sm">
              {item.industry}
            </Badge>
            <ArrowUpRight className="size-5 text-dark-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>
          <h3 className="font-display text-h2-36 text-dark text-balance group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-small-14 text-dark-500">{item.client}</p>
          <p className="text-body-16 text-dark-600 line-clamp-3">{item.outcome}</p>
          <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-dark/10 pt-4">
            {item.metrics.map((m) => (
              <div key={m.label} className="space-y-0.5">
                <dt className="text-[11px] uppercase tracking-wider text-dark-500">
                  {m.label}
                </dt>
                <dd className="font-display text-h4-24 text-dark">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-lg border border-dark/10 bg-white p-6 transition-all duration-350 hover:-translate-y-1 hover:shadow-elevation-md",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <Badge variant="default" size="sm">
          {item.industry}
        </Badge>
        <ArrowUpRight className="size-4 text-dark-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>

      <h3 className="mt-4 font-display text-h3-30 text-dark text-balance group-hover:text-primary transition-colors">
        {item.title}
      </h3>

      <p className="text-small-14 text-dark-500">{item.client}</p>

      <p className="mt-3 text-small-14 text-dark-600 line-clamp-3">
        {item.problem}
      </p>

      <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-dark/10 pt-4">
        {item.metrics.map((m) => (
          <div key={m.label} className="space-y-0.5">
            <dt className="text-[11px] uppercase tracking-wider text-dark-500">
              {m.label}
            </dt>
            <dd className="font-display text-body-16 text-dark">{m.value}</dd>
          </div>
        ))}
      </dl>
    </a>
  );
}
