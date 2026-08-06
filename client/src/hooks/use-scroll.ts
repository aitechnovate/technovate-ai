"use client";

import { useEffect, useState } from "react";

/**
 * Returns the current vertical scroll position in pixels.
 * Uses rAF-throttled passive listeners for performance.
 */
export function useScroll(): number {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollY;
}

/**
 * Returns true once the page has scrolled past `threshold` pixels.
 * Useful for sticky header shadow transitions.
 */
export function useScrolledPast(threshold = 8): boolean {
  const scrollY = useScroll();
  return scrollY > threshold;
}
