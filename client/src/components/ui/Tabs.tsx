"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      /*
       * Triggers are `whitespace-nowrap`, so a three-up list overflows below
       * ~400px. `max-w-full` + horizontal scroll keeps the pill row intact and
       * swipeable instead of pushing the page sideways.
       */
      "no-scrollbar inline-flex h-11 max-w-full items-center justify-start overflow-x-auto rounded-md bg-light-200 p-1 text-dark-500",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-small-14 font-medium sm:px-4 " +
        "transition-all duration-250 ease-out-expo " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 " +
        "disabled:pointer-events-none disabled:opacity-50 " +
        "data-[state=active]:bg-white data-[state=active]:text-dark data-[state=active]:shadow-elevation-xs",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-none",
      "data-[state=active]:animate-fade-in",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";
