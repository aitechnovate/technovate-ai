import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Check } from "lucide-react";

export type PricingTier = {
  name: string;
  tagline?: string;
  /** Monthly price as a number (formatted with currency). */
  price: number;
  /** Annual discount displayed under the price. */
  annualDiscount?: string;
  /** Billing cadence label. */
  cadence?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  /** Highlight this tier ("Most popular" ribbon). */
  highlighted?: boolean;
  /** Badge text shown when highlighted. */
  badge?: string;
};

type PricingCardProps = {
  tier: PricingTier;
  className?: string;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/**
 * Pricing plan tile. Visually emphasizes a "highlighted" tier with a gradient border + ribbon.
 */
export function PricingCard({ tier, className }: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-xl p-8 transition-all duration-350",
        tier.highlighted
          ? "gradient-border bg-white shadow-elevation-lg scale-[1.02]"
          : "border border-dark/10 bg-white shadow-elevation-xs hover:shadow-elevation-md",
        className,
      )}
    >
      {tier.highlighted && tier.badge && (
        <Badge
          variant="gradient"
          className="absolute -top-3 left-1/2 -translate-x-1/2"
        >
          {tier.badge}
        </Badge>
      )}

      <div className="space-y-2">
        <h3 className="font-display text-h3-30 text-dark">{tier.name}</h3>
        {tier.tagline && (
          <p className="text-small-14 text-dark-500">{tier.tagline}</p>
        )}
      </div>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-display-72 text-dark leading-none">
          {currencyFormatter.format(tier.price)}
        </span>
        <span className="text-small-14 text-dark-500">
          {tier.cadence ?? "/ month"}
        </span>
      </div>
      {tier.annualDiscount && (
        <p className="mt-1 text-[13px] text-success font-medium">
          {tier.annualDiscount}
        </p>
      )}

      <p className="mt-4 text-body-16 text-dark-600">{tier.description}</p>

      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-small-14 text-dark-700"
          >
            <Check
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-success"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        variant={tier.highlighted ? "primary" : "outline"}
        size="lg"
        fullWidth
        className="mt-8"
      >
        <a href={tier.ctaHref}>{tier.ctaLabel}</a>
      </Button>
    </div>
  );
}
