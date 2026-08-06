import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** Vertical spacing preset. */
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  /** Background tone. */
  tone?: "default" | "muted" | "dark" | "gradient";
  /** Render as a semantic landmark. Default: <section>. */
  as?: keyof React.JSX.IntrinsicElements;
  /** Container size override. */
  containerSize?: "default" | "narrow" | "wide" | "full";
  /** Pass-through for an id used by anchor links / nav. */
  id?: string;
};

const spacingClass = {
  none: "py-0",
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-24 lg:py-32",
  xl: "py-24 sm:py-32 lg:py-40",
} as const;

const toneClass = {
  default: "bg-light text-dark",
  muted: "bg-light-200 text-dark",
  dark: "bg-dark text-light",
  gradient:
    "bg-gradient-to-br from-dark via-dark to-[#001a4d] text-light",
} as const;

/**
 * Page section wrapper with vertical rhythm + optional background tone.
 * Wraps children in <Container> by default. Pass `container={false}` to skip.
 */
export function Section({
  spacing = "md",
  tone = "default",
  as: Tag = "section",
  containerSize = "default",
  className,
  children,
  container: hasContainer = true,
  ...props
}: SectionProps & { container?: boolean }) {
  return React.createElement(
    Tag,
    {
      className: cn("relative w-full", spacingClass[spacing], toneClass[tone], className),
      ...props,
    },
    hasContainer ? (
      <Container size={containerSize}>{children}</Container>
    ) : (
      children
    ),
  );
}

Section.displayName = "Section";
