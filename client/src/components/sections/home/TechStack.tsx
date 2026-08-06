"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { techStack } from "@/data/trust";

type TechStackProps = {
  className?: string;
};

/**
 * Continuously scrolling marquee of technology logos (rendered as wordmarks).
 * Pauses on hover via Tailwind's `hover:[animation-play-state:paused]`.
 * The animation keyframes (`marquee`) are defined in tailwind.config.ts.
 */
export function TechStack({ className }: TechStackProps) {
  return (
    <Section
      spacing="md"
      tone="default"
      className={className}
      container={false}
    >
      <div className="mx-auto mb-10 max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <Badge variant="neutral" size="sm" className="mb-3">
          Powered by best-in-class tooling
        </Badge>
        <h2 className="font-display text-h2-36 text-balance">
          The stack behind every system we ship.
        </h2>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
        }}
      >
        {/* Two duplicate tracks for seamless looping */}
        <div className="flex w-max animate-marquee gap-12 py-4 hover:[animation-play-state:paused]">
          {[...techStack, ...techStack].map((tech, idx) => (
            <span
              key={`${tech}-${idx}`}
              className="font-display text-h3-30 font-semibold tracking-tight text-dark-400 transition-colors duration-300 hover:text-dark whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}