"use client";

import * as React from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/Toaster";

/** Pragmatic address check — real verification happens server-side. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type NewsletterFormProps = {
  /** `onDark` styles the control for placement on a dark band. */
  tone?: "onLight" | "onDark";
  className?: string;
  /** Distinguishes the input when more than one form is on a page. */
  id?: string;
};

/**
 * Newsletter capture as a self-contained client island.
 *
 * Extracted so the pages embedding it stay server components — a single inline
 * `onSubmit` previously forced an entire route across the client boundary
 * (and, on /resources, broke the production build outright).
 *
 * UI-only per the current project scope: there is no subscribe endpoint, so a
 * valid address resolves optimistically. The submit is guarded against
 * double-fire and the input is length-capped before it would reach a backend.
 */
export function NewsletterForm({
  tone = "onLight",
  className,
  id = "newsletter-email",
}: NewsletterFormProps) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Don't set state after unmount if the user navigates mid-submit.
  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError("Enter a valid email address.");
      return;
    }

    setError(null);
    setSubmitting(true);
    timer.current = setTimeout(() => {
      setSubmitting(false);
      setEmail("");
      toast.success("Subscribed — welcome aboard.");
    }, 500);
  };

  const onDark = tone === "onDark";
  const errorId = `${id}-error`;

  return (
    <form
      onSubmit={onSubmit}
      className={cn("w-full", className)}
      aria-label="Newsletter signup"
      noValidate
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "h-12 flex-1 rounded-md border px-4 text-body-16 transition-colors focus-visible:outline-none",
            onDark
              ? "border-white/20 bg-white/10 text-white placeholder:text-white/60 focus-visible:border-white/60"
              : "border-dark/15 bg-white text-dark placeholder:text-dark-300 focus-visible:border-primary",
            error && (onDark ? "border-red-300" : "border-error"),
          )}
        />
        <button
          type="submit"
          disabled={submitting}
          className={cn(
            "inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-body-16 font-semibold transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-60",
            onDark
              ? "bg-white text-dark hover:bg-light-200 focus-visible:ring-white focus-visible:ring-offset-dark"
              : "bg-primary text-white hover:bg-primary-600 focus-visible:ring-primary",
          )}
        >
          {submitting ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : null}
          {submitting ? "Subscribing…" : "Subscribe"}
          {!submitting && <ArrowRight className="size-4" aria-hidden="true" />}
        </button>
      </div>

      {/* Announced on change so screen readers hear the validation result. */}
      <p
        id={errorId}
        role="alert"
        aria-live="polite"
        className={cn(
          "mt-2 min-h-[1.25rem] text-small-14",
          onDark ? "text-red-200" : "text-error",
        )}
      >
        {error}
      </p>
    </form>
  );
}
