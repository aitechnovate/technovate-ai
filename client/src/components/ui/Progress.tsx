"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Value between 0 and 100. */
  value: number;
  /** Visual variant. */
  variant?: "default" | "gradient" | "striped";
  /** Height in Tailwind units. */
  size?: "sm" | "md" | "lg";
};

/**
 * Simple progress bar. Animates fill changes via CSS transitions.
 */
export function Progress({
  value,
  variant = "gradient",
  size = "md",
  className,
  ...props
}: ProgressProps) {
  const safeValue = Math.min(100, Math.max(0, value));
  const sizeClass = { sm: "h-1.5", md: "h-2.5", lg: "h-3.5" }[size];
  const fillClass = {
    default: "bg-primary",
    gradient: "bg-gradient-blue-cyan",
    striped:
      "bg-gradient-blue-cyan bg-[length:1rem_1rem] [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_0.25rem,transparent_0.25rem,transparent_0.5rem)]",
  }[variant];

  return (
    <div
      role="progressbar"
      aria-valuenow={safeValue}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "w-full overflow-hidden rounded-full bg-dark/10",
        sizeClass,
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500 ease-out-expo",
          fillClass,
        )}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
