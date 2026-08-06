import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Render as a different element. */
  as?: keyof React.JSX.IntrinsicElements;
  /** Constrain to the design system max-width (1440px). */
  size?: "default" | "narrow" | "wide" | "full";
};

/**
 * Centered, max-width container that respects the 8pt grid gutters.
 * Defaults: `max-w-container` (1440px), responsive horizontal padding.
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Tag = "div", size = "default", className, ...props }, ref) => {
    const sizeClass = {
      default: "max-w-container",
      narrow: "max-w-3xl",
      wide: "max-w-[1600px]",
      full: "max-w-none",
    }[size];

    return React.createElement(
      Tag,
      {
        ref,
        className: cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeClass, className),
        ...props,
      },
      props.children,
    );
  },
);
Container.displayName = "Container";
