"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => null,
  },
);

type HeroProps = {
  className?: string;
};

/**
 * Homepage hero — "Innovate. Automate. Elevate." with brand-gradient backdrop,
 * animated geometric 3D background, and dual CTAs.
 *
 * The 3D scene is loaded dynamically with `ssr: false` to keep initial
 * bundle size small and to respect `prefers-reduced-motion`.
 */
export function Hero({ className }: HeroProps) {
  const reduced = useReducedMotion();

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-dark text-light",
        "min-h-[640px] lg:min-h-[720px]",
        className,
      )}
    >
      {/* Background gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#0a1438] via-dark to-[#1b0a3a]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(0,245,255,0.18),transparent_60%),radial-gradient(circle_at_20%_70%,rgba(106,13,173,0.22),transparent_55%)]"
      />

      {/* 3D canvas */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-90"
      >
        <HeroScene reducedMotion={!!reduced} />
      </div>

      {/* Subtle vignette to keep text readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_60%,transparent_30%,rgba(15,23,42,0.7)_100%)]"
      />

      <Container className="relative z-[2] flex min-h-[640px] flex-col items-center justify-center py-24 text-center lg:min-h-[720px] lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-6"
        >
          <Badge
            variant="glass"
            className="mx-auto bg-white/10 text-white border-white/20"
          >
            <Sparkles className="size-3" />
            <span>Innovate. Automate. Elevate.</span>
          </Badge>

          <h1 className="font-display text-display-72 text-balance sm:text-h1-48 lg:text-display-72">
            <span className="text-gradient-blue-cyan">Innovate.</span>{" "}
            <span className="text-gradient-blue-purple">Automate.</span>{" "}
            <span>Elevate.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-body-16 text-white/80 text-pretty sm:text-h4-24">
            Enterprise AI consulting, automation, and custom development. We
            help ambitious teams ship AI that pays for itself.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              asChild
              variant="secondary"
              size="lg"
              rightIcon={<ArrowRight className="size-4" />}
            >
              <a href="/contact">Book free consultation</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <a href="#solutions">Explore solutions</a>
            </Button>
          </div>

          <p className="pt-6 text-small-14 text-white/60">
            Trusted by Fortune 1000 and growth-stage teams in 22 countries.
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-[11px] uppercase tracking-widest">
              Scroll
            </span>
            <span className="block h-8 w-px bg-gradient-to-b from-white/60 to-transparent" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}