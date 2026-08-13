"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { LogoLockup } from "@/components/ui/Logo";
import type { NavGroup } from "@/data/nav";
import { siteInfo } from "@/data/site";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  navGroups: NavGroup[];
};

/**
 * Full-screen mobile drawer with collapsible groups.
 *
 * - Trap focus inside while open.
 * - Close on Escape.
 * - Each group with children renders as a disclosure; groups without
 *   children render as a single link.
 */
/** Focusable descendants, in DOM order, skipping anything hidden. */
function focusableWithin(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => el.offsetParent !== null);
}

export function MobileNav({ open, onClose, navGroups }: MobileNavProps) {
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const restoreFocusTo = React.useRef<HTMLElement | null>(null);

  // Lock scroll and reset expansion on open.
  React.useEffect(() => {
    if (open) setExpanded(null);
  }, [open]);

  /*
   * Focus management. The drawer is `aria-modal`, so focus has to move into it
   * on open, stay inside while it is open, and return to the hamburger on
   * close — otherwise a keyboard or screen-reader user tabs straight into the
   * page behind the overlay.
   */
  React.useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    // Wait a frame so the entry animation has mounted the drawer contents.
    const raf = requestAnimationFrame(() => {
      const first = drawerRef.current && focusableWithin(drawerRef.current)[0];
      first?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;

      const items = focusableWithin(drawerRef.current);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !drawerRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      restoreFocusTo.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-dark/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 flex h-[100dvh] w-full max-w-md flex-col bg-white shadow-elevation-xl"
          >
            <div className="flex items-center justify-between border-b border-dark/10 px-5 py-4">
              <Link
                href="/"
                onClick={onClose}
                className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                aria-label={`${siteInfo.name} home`}
              >
                <LogoLockup markClassName="h-8" />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                onClick={onClose}
              >
                <X className="size-5" />
              </Button>
            </div>

            <nav
              aria-label="Mobile primary"
              className="flex-1 overflow-y-auto px-5 py-4"
            >
              <ul className="space-y-1">
                {navGroups.map((group) => {
                  const hasChildren = !!group.children?.length;
                  if (!hasChildren) {
                    return (
                      <li key={group.label}>
                        <Link
                          href={group.href}
                          onClick={onClose}
                          className="flex items-center justify-between rounded-md px-3 py-3 text-body-16 font-medium text-dark transition-colors hover:bg-light-200"
                        >
                          {group.label}
                          <ArrowRight className="size-4 text-dark-400" />
                        </Link>
                      </li>
                    );
                  }

                  const isExpanded = expanded === group.label;
                  return (
                    <li key={group.label}>
                      <button
                        type="button"
                        onClick={() =>
                          setExpanded(isExpanded ? null : group.label)
                        }
                        aria-expanded={isExpanded}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md px-3 py-3 text-body-16 font-medium transition-colors hover:bg-light-200",
                          isExpanded && "bg-light-200 text-primary",
                        )}
                      >
                        {group.label}
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform duration-200",
                            isExpanded && "rotate-180",
                          )}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <li>
                              <Link
                                href={group.href}
                                onClick={onClose}
                                className="block rounded-md px-6 py-3 text-small-14 text-dark-500 hover:bg-light-200 hover:text-primary"
                              >
                                View all {group.label}
                              </Link>
                            </li>
                            {group.children!.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className="block rounded-md px-6 py-3 text-small-14 text-dark-700 hover:bg-light-200 hover:text-primary"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-dark/10 p-5 space-y-2">
              <Button
                asChild
                variant="outline"
                size="md"
                fullWidth
              >
                <Link href="/contact" onClick={onClose}>
                  Sign in
                </Link>
              </Button>
              <Button
                asChild
                variant="primary"
                size="md"
                fullWidth
              >
                <Link href="/contact" onClick={onClose}>
                  Book consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}