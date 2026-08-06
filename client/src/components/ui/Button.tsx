"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base — every variant inherits these.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium " +
    "transition-all duration-250 ease-out-expo outline-none " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary " +
    "disabled:pointer-events-none disabled:opacity-50 " +
    "active:scale-[0.98] " +
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white shadow-elevation-sm hover:bg-primary-600 hover:shadow-elevation-md",
        secondary:
          "bg-secondary text-dark shadow-elevation-sm hover:bg-secondary-600 hover:shadow-elevation-md",
        gradient:
          "bg-gradient-blue-cyan text-white shadow-elevation-sm hover:shadow-elevation-md hover:brightness-110",
        outline:
          "border border-dark/15 bg-transparent text-dark hover:bg-dark/5 hover:border-dark/25",
        ghost:
          "bg-transparent text-dark hover:bg-dark/5",
        accent:
          "bg-accent text-white shadow-elevation-sm hover:bg-accent-600 hover:shadow-elevation-md",
        destructive:
          "bg-error text-white shadow-elevation-sm hover:bg-red-600 hover:shadow-elevation-md",
        link: "bg-transparent text-primary underline-offset-4 hover:underline px-0",
        dark: "bg-dark text-light hover:bg-dark-700 shadow-elevation-sm",
      },
      size: {
        sm: "h-9 px-3 text-small-14 min-w-[44px]",
        md: "h-11 px-5 text-body-16 min-w-[44px]",
        lg: "h-14 px-7 text-h4-24 min-w-[44px]",
        icon: "h-11 w-11 p-0 min-w-[44px]",
        "icon-sm": "h-9 w-9 p-0 min-w-[44px]",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a child element (e.g. Next/Link) while keeping button styles. */
  asChild?: boolean;
  /** Show a spinner and disable interaction. */
  loading?: boolean;
  /** Optional leading icon. */
  leftIcon?: React.ReactNode;
  /** Optional trailing icon. */
  rightIcon?: React.ReactNode;
}

/**
 * Primary call-to-action button. Variants cover the brand system +
 * outline/ghost accents. All buttons enforce a 44×44 touch target minimum.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      type,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    if (asChild) {
      // When using asChild, Slot needs a single element child. We render the
      // children directly so callers can do `<Button asChild><a>…</a></Button>`.
      // The ref type widens to HTMLElement since Slot renders the child's element.
      return (
        <Slot
          ref={ref as React.Ref<HTMLElement>}
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          aria-busy={loading || undefined}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        aria-busy={loading || undefined}
        disabled={isDisabled}
        type={type ?? "button"}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        <span className="truncate">{children}</span>
        {!loading && rightIcon}
      </button>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
