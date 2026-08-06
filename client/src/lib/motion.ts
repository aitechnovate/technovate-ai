/**
 * Shared Framer Motion variants and transitions.
 *
 * Designed to respect `prefers-reduced-motion` via the global CSS reset in
 * globals.css — Framer's `MotionConfig` will additionally disable transitions
 * when wrapped in <MotionConfig reducedMotion="user"> at the app root.
 */

import type { Variants, Transition } from "framer-motion";

export const easeOutExpo: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
};

export const easeInOutExpo: Transition = {
  duration: 0.5,
  ease: [0.87, 0, 0.13, 1],
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: easeOutExpo },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: easeOutExpo },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  show: { opacity: 1, y: 0, transition: easeOutExpo },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: easeOutExpo },
};

export const staggerParent: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: easeOutExpo },
};

/** Reveal-on-scroll viewport config — single use, soft threshold. */
export const inViewOnce = {
  once: true,
  margin: "0px 0px -10% 0px",
} as const;
