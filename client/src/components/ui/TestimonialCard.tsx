"use client";

import * as React from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "./Avatar";
import type { Testimonial } from "@/data/social";

type TestimonialCardProps = {
  item: Testimonial;
  className?: string;
  /** Quote mark variant: decorative large icon, or inline. */
  variant?: "default" | "minimal";
};

/**
 * Testimonial card. Renders a quote mark, body text, avatar, and attribution.
 */
export function TestimonialCard({
  item,
  className,
  variant = "default",
}: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "group relative flex h-full flex-col rounded-xl border border-dark/10 bg-white p-6 shadow-elevation-xs transition-all duration-350 hover:-translate-y-1 hover:shadow-elevation-md sm:p-8",
        variant === "minimal" && "border-none bg-light-200 shadow-none",
        className,
      )}
    >
      {variant === "default" && (
        <Quote
          aria-hidden="true"
          className="mb-4 size-8 text-primary/30 transition-colors group-hover:text-primary/50"
        />
      )}
      <blockquote className="flex-1 text-body-16 text-dark-700 text-pretty leading-relaxed">
        “{item.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-dark/10 pt-4">
        <Avatar>
          <AvatarFallback>{item.avatarInitials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="font-semibold text-dark">{item.name}</div>
          <div className="text-small-14 text-dark-500">
            {item.role} · {item.company}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
