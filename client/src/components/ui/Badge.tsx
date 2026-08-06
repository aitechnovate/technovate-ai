import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium transition-colors duration-150",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border border-primary/20",
        secondary: "bg-secondary/10 text-secondary-700 border border-secondary/20",
        accent: "bg-accent/10 text-accent border border-accent/20",
        success: "bg-success/10 text-success border border-success/20",
        warning: "bg-warning/10 text-warning border border-warning/20",
        error: "bg-error/10 text-error border border-error/20",
        neutral: "bg-dark/5 text-dark-700 border border-dark/10",
        outline: "bg-transparent text-dark border border-dark/20",
        glass:
          "bg-white/15 text-white border border-white/30 backdrop-blur-md",
        gradient: "bg-gradient-blue-cyan text-white border border-transparent",
        outlineGradient: "bg-transparent text-dark gradient-border",
      },
      size: {
        sm: "text-[11px] px-2 py-0.5",
        md: "text-small-14 px-3 py-1",
        lg: "text-body-16 px-4 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    leadingDot?: boolean;
  };

/**
 * Tag/pill/chip used for status, industry, and category markers.
 * Optional `leadingDot` adds a small dot before the label.
 */
export function Badge({
  className,
  variant,
  size,
  leadingDot,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {leadingDot && (
        <span
          aria-hidden="true"
          className={cn(
            "size-1.5 rounded-full",
            variant === "success" && "bg-success",
            variant === "warning" && "bg-warning",
            variant === "error" && "bg-error",
            (!variant || variant === "default") && "bg-primary",
            variant === "secondary" && "bg-secondary",
            variant === "accent" && "bg-accent",
            variant === "neutral" && "bg-dark-500",
          )}
        />
      )}
      {children}
    </span>
  );
}

export { badgeVariants };
