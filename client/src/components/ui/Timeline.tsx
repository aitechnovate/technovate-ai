"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TimelineItem = {
  /** Short step label (e.g. "Discovery"). */
  title: string;
  /** Description of the stage. */
  description: string;
  /** Optional icon. */
  icon?: React.ReactNode;
  /** Optional duration label (e.g. "2 weeks"). */
  duration?: string;
};

type TimelineProps = {
  items: TimelineItem[];
  /** Layout direction. */
  orientation?: "vertical" | "horizontal";
  /** Tone of the spine + bullets. */
  tone?: "brand" | "muted";
  className?: string;
};

/**
 * Step-by-step process visualizer.
 * Vertical orientation stacks items; horizontal renders as a scrollable row.
 */
export function Timeline({
  items,
  orientation = "vertical",
  tone = "brand",
  className,
}: TimelineProps) {
  const isHorizontal = orientation === "horizontal";
  const accent = tone === "brand" ? "bg-primary" : "bg-dark-300";

  return (
    <ol
      className={cn(
        "relative",
        isHorizontal
          ? "flex flex-row gap-6 overflow-x-auto pb-4 no-scrollbar"
          : "flex flex-col gap-0",
        className,
      )}
    >
      {/* Spine */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute pointer-events-none",
          isHorizontal
            ? "left-0 right-0 top-5 h-0.5 bg-dark/10"
            : "left-5 top-0 bottom-0 w-0.5 bg-dark/10",
        )}
      />
      {items.map((item, index) => (
        <motion.li
          key={item.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "relative flex",
            isHorizontal
              ? "flex-col min-w-[220px] items-start text-left"
              : "flex-row gap-4 pb-8 last:pb-0",
          )}
        >
          <span
            className={cn(
              "z-10 flex shrink-0 items-center justify-center rounded-full border-4 border-light text-white",
              isHorizontal ? "size-10" : "size-10",
              accent,
            )}
            aria-hidden="true"
          >
            {item.icon ?? (
              <span className="text-small-14 font-bold">{index + 1}</span>
            )}
          </span>
          <div
            className={cn(
              isHorizontal ? "mt-3" : "pt-1",
              "flex flex-col gap-1",
            )}
          >
            <div className="flex items-baseline gap-2">
              <h3 className="font-display text-h4-24 text-dark">
                {item.title}
              </h3>
              {item.duration && (
                <span className="text-[11px] font-medium uppercase tracking-wider text-dark-500">
                  {item.duration}
                </span>
              )}
            </div>
            <p className="text-small-14 text-dark-500">{item.description}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
