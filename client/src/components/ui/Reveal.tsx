"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  /** Element to render. Defaults to a plain <div>. */
  as?: "div" | "section" | "li" | "article" | "span";
  /** Stagger offset in ms, applied as a transition-delay. Capped at 400ms. */
  delay?: number;
  /** Direction the element travels in from. */
  from?: "up" | "down" | "none";
  className?: string;
};

/**
 * Scroll-reveal wrapper.
 *
 * Replaces the `motion.div` + `whileInView` pattern that previously forced
 * every home section to be a client component. Because `children` are passed in
 * from a server parent, they stay server-rendered — only this ~700B observer
 * crosses the client boundary, instead of framer-motion plus the section's
 * entire markup and data.
 *
 * Degradation is handled in CSS: the server emits `data-reveal="pending"`, and
 * a <noscript> rule in the root layout forces content visible when JS never
 * runs, so nothing can be permanently hidden.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  from = "up",
  className,
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    // Honour the OS setting and skip straight to the resting state.
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    // Without IntersectionObserver, reveal immediately rather than never.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    // Already in view on load (above the fold) — don't wait for a scroll event.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal={shown ? "shown" : "pending"}
      data-reveal-from={from}
      style={delay ? { transitionDelay: `${Math.min(delay, 400)}ms` } : undefined}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}

/**
 * Convenience wrapper for staggered lists — indexes children into delays
 * without every call site repeating the arithmetic.
 */
export function RevealGroup({
  children,
  step = 60,
  className,
  itemClassName,
  as = "div",
}: {
  children: React.ReactNode;
  /** Delay added per item, in ms. */
  step?: number;
  className?: string;
  itemClassName?: string;
  as?: RevealProps["as"];
}) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, i) => (
        <Reveal as={as} delay={i * step} className={itemClassName}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
