"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEnhancementBudget } from "@/hooks/use-enhancement-budget";
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
 * Homepage hero — "Innovate. Automate. Elevate." over a layered CSS backdrop,
 * with an optional WebGL scene and dual CTAs.
 *
 * The hero renders complete without JavaScript: the gradient, aura, and grid
 * are pure CSS, so LCP does not wait on hydration. The Three.js scene is a
 * capability-gated enhancement loaded during idle time — see
 * `useEnhancementBudget`.
 */
export function Hero({ className }: HeroProps) {
  const reduced = useReducedMotion();
  const canAffordScene = useEnhancementBudget();

  return (
    <section
      className={cn(
        "on-dark relative isolate overflow-hidden bg-dark text-white",
        /* Fluid height: never taller than the viewport on short phones. */
        "min-h-[min(34rem,100svh)] sm:min-h-[40rem] lg:min-h-[45rem]",
        className,
      )}
    >
      {/* Layered backdrop: ink base → brand aura → grid texture. */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-ink" />
      <div
        aria-hidden="true"
        className={cn(
          "brand-aura absolute inset-0",
          !reduced && "motion-safe:animate-aurora",
        )}
      />
      <div
        aria-hidden="true"
        className="grid-texture absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      {/*
        3D canvas — progressive enhancement only. The layered CSS backdrop above
        is the real design; this refines it on devices that can spare the budget.
      */}
      {canAffordScene && (
        <div aria-hidden="true" className="absolute inset-0 z-0 opacity-90">
          <HeroScene reducedMotion={!!reduced} />
        </div>
      )}

      {/* Subtle vignette to keep text readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_60%,transparent_28%,rgba(11,21,51,0.78)_100%)]"
      />

      <Container className="relative z-[2] flex min-h-[min(34rem,100svh)] flex-col items-center justify-center py-20 text-center sm:min-h-[40rem] sm:py-24 lg:min-h-[45rem] lg:py-32">
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

          {/*
            `display-72` is fluid (36px → 72px between 320px and ~1000px), so
            the breakpoint ladder this heading used to carry is no longer
            needed — the token itself scales.
          */}
          <h1 className="font-display text-display-72 text-balance text-white">
            {/* On-dark gradient stops — the light-surface pair renders near-black here. */}
            <span className="text-gradient-on-dark">Innovate.</span>{" "}
            <span className="text-gradient-on-dark">Automate.</span>{" "}
            <span>Elevate.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-body-16 text-white/85 text-pretty sm:text-h4-24 sm:leading-relaxed">
            Enterprise AI consulting, automation, and custom development. We
            help ambitious teams ship AI that pays for itself.
          </p>

          <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Button
              asChild
              variant="onDark"
              size="lg"
              rightIcon={<ArrowRight className="size-4" />}
            >
              <Link href="/contact">Book free consultation</Link>
            </Button>
            <Button asChild variant="onDarkOutline" size="lg">
              <Link href="#solutions">Explore solutions</Link>
            </Button>
          </div>

          {/* 4.2:1 at white/60 — lifted to white/75 (6.3:1 on the ink base). */}
          <p className="pt-6 text-small-14 text-white/75">
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
          <div className="flex flex-col items-center gap-2 text-white/70">
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