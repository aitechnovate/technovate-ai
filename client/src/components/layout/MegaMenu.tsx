"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavGroup } from "@/data/nav";

type MegaMenuProps = {
  /** The nav group this menu represents. */
  group: NavGroup;
  /** Whether the menu is currently open. */
  open: boolean;
  /** Close callback. */
  onClose: () => void;
  /** Callback to open a different group (sets active id). */
  onOpenGroup?: (label: string) => void;
  /** Currently open group label. */
  activeGroup?: string | null;
};

/**
 * Multi-column dropdown rendered absolutely below the header.
 *
 * - Left column lists primary children.
 * - Right column renders a featured spotlight pulled from `group.featured`.
 * - Closes on Escape, on outside click, and on link selection.
 * - Keyboard navigable (Tab cycles focus inside the panel).
 */
export function MegaMenu({ group, open, onClose, onOpenGroup, activeGroup }: MegaMenuProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Close on Escape.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Close on outside click.
  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (panelRef.current.contains(e.target as Node)) return;
      // Don't close if click was on a nav trigger (parent handles state).
      const target = e.target as HTMLElement;
      if (target.closest("[data-nav-trigger]")) return;
      onClose();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, onClose]);

  if (!group.children || group.children.length === 0) return null;

  const isActive = activeGroup === group.label;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          role="menu"
          aria-label={`${group.label} menu`}
          className={cn(
            /*
             * Desktop surface only — the mobile drawer covers <lg. Gating it
             * here means a stale `open` state can never paint over a phone.
             * It also scrolls rather than overflowing short laptop viewports.
             */
            "absolute left-0 right-0 top-full z-40 hidden lg:block",
            "max-h-[calc(100dvh-var(--header-height))] overflow-y-auto",
            "border-b border-dark/10 bg-white/95 shadow-elevation-lg backdrop-blur-md"
          )}
          onMouseEnter={() => onOpenGroup?.(group.label)}
          onMouseLeave={() => onOpenGroup?.(null as unknown as string)}
        >
          <div className="mx-auto grid w-full max-w-container gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8 lg:py-10">
            <div>
              <div className="mb-2 flex items-baseline justify-between">
                <h2 className="font-display text-h4-24 text-dark">{group.label}</h2>
                <Link
                  href={group.href}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-small-14 font-medium text-primary hover:underline"
                >
                  View all
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
              {group.description && (
                <p className="mb-6 text-small-14 text-dark-500">{group.description}</p>
              )}
              <ul
                className={cn(
                  "grid gap-1",
                  group.children.length <= 4 && "grid-cols-1 sm:grid-cols-2",
                  group.children.length > 4 && group.children.length <= 6 && "grid-cols-2",
                  group.children.length > 6 && "grid-cols-2 lg:grid-cols-3",
                  isActive && "ring-1 ring-primary/20"
                )}
              >
                {group.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={onClose}
                      className="group block rounded-md px-3 py-2.5 transition-colors hover:bg-light-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-medium text-dark-800 group-hover:text-primary">
                          {child.label}
                        </span>
                        <ArrowUpRight
                          className="size-3.5 shrink-0 text-dark-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      {child.description && (
                        <p className="mt-0.5 text-[13px] leading-snug text-dark-500">
                          {child.description}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {group.featured && (
              <aside className="overflow-hidden rounded-xl bg-gradient-blue-purple p-6 text-white shadow-elevation-md">
                <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider">
                  Featured
                </span>
                <h3 className="mt-4 text-balance font-display text-h3-30">
                  {group.featured.title}
                </h3>
                <p className="mt-2 text-pretty text-small-14 text-white/80">
                  {group.featured.description}
                </p>
                <Link
                  href={group.featured.href}
                  onClick={onClose}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-small-14 font-semibold text-primary transition-all hover:gap-2 hover:bg-white/90"
                >
                  {group.featured.cta}
                  <ArrowRight className="size-3.5" />
                </Link>
              </aside>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
