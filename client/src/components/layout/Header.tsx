"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolledPast } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/Button";
import { LogoLockup } from "@/components/ui/Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { primaryNav } from "@/data/nav";
import { siteInfo } from "@/data/site";

type HeaderProps = {
  /** Optional override — default uses primaryNav from @/data/nav. */
  navGroups?: typeof primaryNav;
  className?: string;
};

/**
 * Site-wide header.
 *
 * - Sticky with transparent → solid transition on scroll.
 * - MegaMenu on hover/focus for groups with children.
 * - Mobile drawer for screens below `lg` breakpoint.
 * - CTA cluster on the right.
 */
export function Header({ navGroups = primaryNav, className }: HeaderProps) {
  const scrolled = useScrolledPast(12);
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const onOpenGroup = React.useCallback((label: string | null) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (label === null) {
      // Delayed close so the menu doesn't flicker when crossing the trigger.
      closeTimer.current = setTimeout(() => setOpenGroup(null), 120);
    } else {
      setOpenGroup(label);
    }
  }, []);

  // Lock body scroll while mobile drawer is open.
  React.useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-250 ease-out-expo",
          scrolled
            ? "border-b border-dark/10 bg-white/90 shadow-elevation-sm backdrop-blur-md"
            : "border-b border-transparent bg-white/60 backdrop-blur-sm",
          className,
        )}
      >
        {/*
          `min-h` rather than a fixed `h`: at a fixed height the CTA cluster
          overflowed the bar (and got visually clipped by the bottom border)
          whenever the row's intrinsic content was taller than 4rem.
        */}
        <div className="mx-auto flex min-h-16 w-full max-w-container items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:min-h-20 lg:gap-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group shrink-0 rounded-md transition-transform duration-250 ease-out-expo hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            aria-label={`${siteInfo.name} home`}
          >
            <LogoLockup priority markClassName="h-8 lg:h-9" />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden flex-1 items-center justify-center gap-1 lg:flex"
          >
            {navGroups.map((group) => {
              const hasChildren = !!group.children?.length;
              const isOpen = openGroup === group.label;
              return (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => hasChildren && onOpenGroup(group.label)}
                  onMouseLeave={() => hasChildren && onOpenGroup(null)}
                >
                  {hasChildren ? (
                    <button
                      type="button"
                      data-nav-trigger
                      aria-expanded={isOpen}
                      aria-haspopup="menu"
                      onClick={() => onOpenGroup(isOpen ? null : group.label)}
                      onFocus={() => onOpenGroup(group.label)}
                      className={cn(
                        "inline-flex h-11 items-center gap-1 rounded-md px-3 text-small-14 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                        isOpen
                          ? "text-primary"
                          : "text-dark-700 hover:text-dark",
                      )}
                    >
                      {group.label}
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <Link
                      href={group.href}
                      className="inline-flex h-11 items-center rounded-md px-3 text-small-14 font-medium text-dark-700 transition-colors hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      {group.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/*
            CTA cluster. `shrink-0` so the nav can never squeeze the primary
            action out of the bar, and the CTA itself appears from `sm` up —
            it used to be `lg`-only, which hid the site's main conversion
            action on every tablet and large phone.
          */}
          <div className="flex shrink-0 items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden lg:inline-flex"
            >
              <Link href="/contact">Sign in</Link>
            </Button>
            <Button
              asChild
              variant="gradient"
              size="md"
              className="hidden sm:inline-flex"
            >
              <Link href="/contact">
                <span className="lg:hidden">Book a call</span>
                <span className="hidden lg:inline">Book free consultation</span>
              </Link>
            </Button>

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mega menus — render one per group; visibility controlled internally. */}
        {navGroups.map((group) =>
          group.children?.length ? (
            <MegaMenu
              key={group.label}
              group={group}
              open={openGroup === group.label}
              onClose={() => onOpenGroup(null)}
              onOpenGroup={(label) => onOpenGroup(label)}
              activeGroup={openGroup}
            />
          ) : null,
        )}
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navGroups={navGroups}
      />
    </>
  );
}