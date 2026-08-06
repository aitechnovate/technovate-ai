import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium transition-colors duration-150",
  {
    variants: {
      /*
       * Tinted variants use a 10% wash behind a 700-weight label so the text
       * clears 4.5:1 against the tint, not just against white.
       */
      variant: {
        default: "border border-primary/20 bg-primary/10 text-primary-700",
        secondary: "border border-secondary/20 bg-secondary/10 text-secondary-700",
        accent: "border border-accent/20 bg-accent/10 text-accent-700",
        success: "border border-success/20 bg-success/10 text-success",
        warning: "border border-warning/20 bg-warning/10 text-warning",
        error: "border border-error/20 bg-error/10 text-error",
        neutral: "border border-dark/10 bg-dark/[0.04] text-dark-600",
        outline: "border border-dark/20 bg-transparent text-dark-600",
        glass:
          "border border-white/30 bg-white/15 text-white backdrop-blur-md",
        gradient: "border border-transparent bg-gradient-brand text-white",
        outlineGradient: "gradient-border bg-transparent text-dark",
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
