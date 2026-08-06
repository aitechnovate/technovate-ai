import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative rounded-lg bg-white transition-all duration-250 ease-out-expo",
  {
    variants: {
      variant: {
        flat: "border border-dark/10",
        elevated: "shadow-elevation-sm",
        bordered: "border border-primary/20",
        glass:
          "border border-white/40 bg-white/70 backdrop-blur-md shadow-elevation-sm",
        gradient: "gradient-border",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      interactive: {
        true: "hover:-translate-y-1 hover:shadow-elevation-lg cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "flat",
      size: "md",
      interactive: false,
    },
  },
);

type CardRootProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

export const Card = React.forwardRef<HTMLDivElement, CardRootProps>(
  ({ className, variant, size, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant, size, interactive, className }),
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

/* ----------- compound subcomponents ----------- */

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-display text-h4-24 text-dark", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-small-14 text-dark-500", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-4", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-6 flex items-center justify-between gap-3",
        className,
      )}
      {...props}
    />
  );
}

export { cardVariants };
