import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteInfo } from "@/data/site";

/** Single source of truth for the brand asset path. */
export const LOGO_SRC = "/logos/technovate_ai_logo.jpeg";
export const LOGO_INTRINSIC = 1254;

/**
 * Normalised crop of the "TA" monogram within the square lockup, expressed as
 * fractions of the source image. Deliberately a little generous so the mark is
 * never clipped; adjust here and every mark on the site follows.
 */
const MARK_CROP = { x: 0.17, y: 0.185, w: 0.63, h: 0.43 } as const;

const MARK_STYLE: React.CSSProperties = {
  width: `${100 / MARK_CROP.w}%`,
  height: "auto",
  maxWidth: "none",
  left: `${-(MARK_CROP.x / MARK_CROP.w) * 100}%`,
  top: `${-(MARK_CROP.y / MARK_CROP.h) * 100}%`,
};

type LogoProps = {
  /**
   * `mark` crops to the monogram — use where height is constrained (header).
   * `lockup` renders the full logo including wordmark and tagline.
   */
  variant?: "mark" | "lockup";
  /**
   * `onDark` seats the mark on a white tile. The source asset is a JPEG with a
   * baked-in white background, so it cannot sit directly on a dark surface.
   */
  tone?: "onLight" | "onDark";
  /** Rendered at high priority in the header; lazy elsewhere. */
  priority?: boolean;
  className?: string;
};

/**
 * Brand mark rendered from the master logo asset.
 *
 * Decorative by default: every current call site pairs the mark with a visible
 * wordmark or an `aria-label` on the wrapping link, so the image is marked
 * `aria-hidden` to avoid a duplicate announcement.
 */
export function Logo({
  variant = "mark",
  tone = "onLight",
  priority = false,
  className,
}: LogoProps) {
  if (variant === "lockup") {
    return (
      <Image
        src={LOGO_SRC}
        alt={`${siteInfo.name} logo`}
        width={LOGO_INTRINSIC}
        height={LOGO_INTRINSIC}
        priority={priority}
        sizes="(max-width: 768px) 160px, 220px"
        className={cn(
          "h-auto w-full rounded-lg object-contain",
          tone === "onDark" && "bg-white p-2",
          className
        )}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative block overflow-hidden",
        tone === "onDark"
          ? "rounded-md bg-white p-0.5 shadow-elevation-sm ring-1 ring-white/20"
          : "rounded-md",
        className
      )}
      style={{ aspectRatio: `${MARK_CROP.w} / ${MARK_CROP.h}` }}
    >
      <Image
        src={LOGO_SRC}
        alt=""
        width={LOGO_INTRINSIC}
        height={LOGO_INTRINSIC}
        priority={priority}
        sizes="120px"
        className="absolute select-none"
        style={MARK_STYLE}
      />
    </span>
  );
}

/**
 * Full brand lockup for navigation: cropped mark + typeset wordmark.
 * Keeping the wordmark as live text (rather than baked into the image) keeps it
 * crisp at every DPI, searchable, and legible at header sizes.
 */
export function LogoLockup({
  tone = "onLight",
  priority = false,
  className,
  markClassName,
}: Omit<LogoProps, "variant"> & { markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Logo
        variant="mark"
        tone={tone}
        priority={priority}
        className={cn("h-8 w-auto", markClassName)}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            /*
             * Pinned sizes rather than the `h4-24` token: the heading scale is
             * fluid, and a wordmark that breathes with the viewport reads as a
             * rendering bug. These are the two sizes the lockup has always used.
             */
            "font-display text-[1.0625rem] font-bold leading-none tracking-tight sm:text-[1.5rem] sm:leading-[1.3]",
            tone === "onDark" ? "text-white" : "text-dark"
          )}
        >
          Technovate{" "}
          <span className={tone === "onDark" ? "text-primary-300" : "text-gradient-brand"}>AI</span>
        </span>
      </span>
    </span>
  );
}
