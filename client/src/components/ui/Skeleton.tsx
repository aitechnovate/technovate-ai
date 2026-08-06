import * as React from "react";
import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Pre-built shape variants. */
  variant?: "text" | "circular" | "rectangular" | "rounded";
};

/**
 * Animated shimmer placeholder. Color is theme-controlled via `shimmer` utility.
 */
export function Skeleton({ className, variant = "text", ...props }: SkeletonProps) {
  const variantClass = {
    text: "h-3 rounded-sm",
    circular: "rounded-full",
    rectangular: "rounded-none",
    rounded: "rounded-md",
  }[variant];

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-live="polite"
      className={cn(
        "shimmer w-full bg-light-200",
        variantClass,
        className,
      )}
      {...props}
    />
  );
}

/** Composite skeleton block — text lines + optional avatar. */
export function SkeletonCard({
  withAvatar = false,
  className,
}: {
  withAvatar?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {withAvatar && (
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" className="size-10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-2 w-1/3" />
          </div>
        </div>
      )}
      <Skeleton className="h-32 w-full" variant="rounded" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
