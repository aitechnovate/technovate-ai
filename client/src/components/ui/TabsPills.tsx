"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

/**
 * Variant of Tabs that renders triggers as pills with a gradient active state.
 * Used for visual category selectors (case study filters, resource hub).
 */
export const TabsPills = TabsPrimitive.Root;

export const TabsPillsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-2",
      className,
    )}
    {...props}
  />
));
TabsPillsList.displayName = "TabsPillsList";

export const TabsPillsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-full border border-dark/10 px-4 py-2 text-small-14 font-medium " +
        "transition-all duration-250 ease-out-expo " +
        "hover:border-primary/40 hover:text-primary " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 " +
        "disabled:pointer-events-none disabled:opacity-50 " +
        "data-[state=active]:bg-gradient-blue-cyan data-[state=active]:text-white data-[state=active]:border-transparent data-[state=active]:shadow-elevation-sm",
      className,
    )}
    {...props}
  />
));
TabsPillsTrigger.displayName = "TabsPillsTrigger";
