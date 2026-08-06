"use client";

import * as React from "react";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./ThemeProvider";
import { TooltipProvider } from "@/components/ui/Tooltip";
import { Toaster } from "@/components/ui/Toaster";

/**
 * App-wide client providers. Mounted once from the root layout.
 *
 * - MotionConfig respects `prefers-reduced-motion` site-wide.
 * - TooltipProvider supplies the Radix context for any <Tooltip> in the tree.
 * - Toaster mounts Sonner's renderer so `toast()` works from anywhere.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light">
      <MotionConfig reducedMotion="user">
        <TooltipProvider delayDuration={120} skipDelayDuration={300}>
          {children}
          <Toaster />
        </TooltipProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
