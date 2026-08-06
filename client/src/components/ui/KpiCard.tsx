"use client";

import * as React from "react";
import { useInView, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type KpiCardProps = {
  /** Big displayed value (e.g. "240+", "4.6x", "98%"). */
  value: string;
  /** Short label (e.g. "Projects Delivered"). */
  label: string;
  /** Optional description that appears below the label. */
  description?: string;
  /** Optional icon node (renders inside a top-right circle). */
  icon?: React.ReactNode;
  /** Optional change pill (e.g. "+12% MoM"). */
  trend?: { label: string; direction: "up" | "down" | "flat" };
  /** Animate the numeric rolling on scroll into view. */
  animated?: boolean;
  /** Pre-computed numeric value used for the rolling animation. */
  numericValue?: number;
  className?: string;
};

/**
 * Animated metric tile. When `animated` is true and `numericValue` is set,
 * the displayed number rolls up from 0 on viewport entry.
 */
export function KpiCard({
  value,
  label,
  description,
  icon,
  trend,
  animated = false,
  numericValue,
  className,
}: KpiCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration: 1500,
    bounce: 0,
  });
  const display = useTransform(spring, (latest) => Math.round(latest).toString());

  React.useEffect(() => {
    if (animated && isInView && typeof numericValue === "number") {
      motionValue.set(numericValue);
    }
  }, [animated, isInView, numericValue, motionValue]);

  const trendColor =
    trend?.direction === "up"
      ? "text-success bg-success/10"
      : trend?.direction === "down"
        ? "text-error bg-error/10"
        : "text-dark-500 bg-dark/5";

  // Suffix = any non-numeric characters in the displayed value (e.g. "+", "%", "x").
  const suffix = value.replace(/[0-9.]/g, "");

  return (
    <div
      ref={ref}
      className={cn(
        "group relative flex flex-col gap-3 rounded-lg border border-dark/10 bg-white p-6 shadow-elevation-xs transition-all duration-350 hover:shadow-elevation-md hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-small-14 font-medium text-dark-500">{label}</div>
        {icon && (
          <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary [&_svg]:size-4">
            {icon}
          </div>
        )}
      </div>

      <div
        className="font-display text-h1-48 text-dark leading-none"
        aria-label={`${value} ${label}`}
      >
        {animated && typeof numericValue === "number" ? (
          <AnimatedNumber display={display} suffix={suffix} />
        ) : (
          value
        )}
      </div>

      {description && (
        <p className="text-small-14 text-dark-500">{description}</p>
      )}

      {trend && (
        <span
          className={cn(
            "inline-flex items-center gap-1 self-start rounded-full px-2 py-0.5 text-[11px] font-semibold",
            trendColor,
          )}
        >
          {trend.label}
        </span>
      )}
    </div>
  );
}

/** Small helper that renders a MotionValue<string> as React text. */
function AnimatedNumber({
  display,
  suffix,
}: {
  display: MotionValue<string>;
  suffix: string;
}) {
  const [text, setText] = React.useState("0");
  React.useEffect(() => {
    return display.on("change", (v) => setText(v));
  }, [display]);
  return (
    <span>
      {text}
      {suffix}
    </span>
  );
}
