import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names with conflict resolution.
 *
 * @example
 *   cn("p-4", isActive && "bg-primary", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number for display (e.g. 1234 → "1.2K").
 */
export function formatCompactNumber(value: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  return formatter.format(value);
}

/**
 * Compose a class name only when a condition is truthy.
 */
export function when(
  condition: boolean,
  ...classes: ClassValue[]
): ClassValue[] {
  return condition ? classes : [];
}

/**
 * Build a stable, accessible id from arbitrary input. Useful for aria-describedby.
 */
export function makeId(prefix: string, value: string): string {
  const safe = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${prefix}-${safe}`;
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Format an ISO date string to a human-readable label (e.g. "Jul 14, 2026").
 */
export function formatDate(iso: string, locale = "en-US"): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}