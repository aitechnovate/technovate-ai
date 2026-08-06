"use client";

import * as React from "react";

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

/**
 * Decides whether the device can afford a heavy, purely decorative enhancement
 * (the WebGL hero scene). Returns false until the check passes, so callers
 * render nothing rather than speculatively downloading.
 *
 * The gate is deliberately conservative — the scene is ~600KB of JS to parse on
 * the main thread and contributes nothing to comprehension, so anything that
 * hints at a constrained device or an unwilling user opts out permanently:
 *
 *   - `prefers-reduced-motion` — an explicit accessibility request.
 *   - Viewport under `minWidth` — on phones the canvas is mostly hidden behind
 *     the vignette and the text, while costing the most relative to the budget.
 *   - Save-Data / 2g-3g — the user is paying for bytes.
 *   - ≤4 logical cores or ≤4GB RAM — parse cost would eat the interaction budget.
 *
 * When it does pass, loading is deferred to an idle callback so the decoration
 * never competes with hydration or the LCP paint.
 */
export function useEnhancementBudget({
  minWidth = 1024,
  /** Hard ceiling on how long to wait for idle time, in ms. */
  timeout = 2500,
}: { minWidth?: number; timeout?: number } = {}): boolean {
  const [affordable, setAffordable] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const nav = navigator as NavigatorWithHints;

    const motionReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (motionReduced) return;

    if (window.innerWidth < minWidth) return;

    const connection = nav.connection;
    if (connection?.saveData) return;
    if (
      connection?.effectiveType &&
      /(^|-)(slow-)?2g$|^3g$/.test(connection.effectiveType)
    ) {
      return;
    }

    if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) {
      return;
    }
    if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) return;

    // Wait for the main thread to go quiet before pulling in the payload.
    const idle = window.requestIdleCallback;
    if (typeof idle === "function") {
      const handle = idle(() => setAffordable(true), { timeout });
      return () => window.cancelIdleCallback?.(handle);
    }

    const handle = window.setTimeout(() => setAffordable(true), 1200);
    return () => window.clearTimeout(handle);
  }, [minWidth, timeout]);

  return affordable;
}
