import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

/**
 * Breadcrumb trail with embedded JSON-LD schema for SEO.
 * The last item is rendered as the current page (non-link) and gets
 * aria-current="page".
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={cn("flex items-center text-small-14", className)}
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li className="flex items-center gap-1.5">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-dark-500 transition-colors hover:text-primary"
            >
              <Home className="size-3.5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                <ChevronRight
                  className="size-3.5 text-dark-400"
                  aria-hidden="true"
                />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-dark-500 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="font-medium text-dark"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}