"use client";

import * as React from "react";
import { X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type AnnouncementBarProps = {
  /** Headline copy. */
  text: string;
  /** Optional CTA label + href. */
  cta?: { label: string; href: string };
  /** LocalStorage key for dismissed state. */
  storageKey?: string;
  /** Visual variant. */
  variant?: "default" | "gradient" | "dark";
  className?: string;
};

/**
 * Dismissible top-of-page announcement strip.
 *
 * Persists dismissal across reloads via localStorage. Renders nothing if the
 * user has already dismissed this announcement.
 */
export function AnnouncementBar({
  text,
  cta,
  storageKey = "technovate-announcement-dismissed",
  variant = "gradient",
  className,
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Avoid SSR mismatch — only read storage after mount.
  React.useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored === "true") setDismissed(true);
    } catch {
      /* localStorage unavailable */
    }
  }, [storageKey]);

  const onDismiss = React.useCallback(() => {
    setDismissed(true);
    try {
      window.localStorage.setItem(storageKey, "true");
    } catch {
      /* localStorage unavailable */
    }
  }, [storageKey]);

  if (!mounted || dismissed) return null;

  const variantClass = {
    default: "bg-dark text-light",
    gradient: "bg-gradient-blue-purple text-white",
    dark: "bg-dark-700 text-light",
  }[variant];

  return (
    <div
      role="region"
      aria-label="Site announcement"
      className={cn(
        "relative isolate flex w-full items-center justify-center gap-3 px-4 py-2.5 text-small-14",
        variantClass,
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.12),transparent_60%)]"
      />
      <span className="relative truncate font-medium text-center">{text}</span>
      {cta && (
        <a
          href={cta.href}
          className={cn(
            "relative inline-flex items-center gap-1 rounded-full px-3 py-1 text-small-14 font-semibold transition-colors",
            variant === "default" || variant === "dark"
              ? "bg-white/10 hover:bg-white/20 text-light"
              : "bg-white/20 hover:bg-white/30 text-white",
          )}
        >
          {cta.label}
          <ArrowRight className="size-3.5" />
        </a>
      )}
      <button
        type="button"
        onClick={onDismiss}
        className={cn(
          "relative inline-flex size-7 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
          variant === "default" || variant === "dark"
            ? "text-light/70 hover:bg-white/10 hover:text-light"
            : "text-white/80 hover:bg-white/20 hover:text-white",
        )}
        aria-label="Dismiss announcement"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}