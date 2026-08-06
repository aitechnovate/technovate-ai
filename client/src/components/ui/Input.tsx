"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { makeId } from "@/lib/utils";

const inputVariants = cva(
  // Base — every variant inherits these.
  "peer flex w-full rounded-md border bg-white text-body-16 text-dark transition-colors duration-150 " +
    "placeholder:text-dark-400 " +
    "file:border-0 file:bg-transparent file:text-small-14 file:font-medium file:text-primary " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 " +
    "disabled:cursor-not-allowed disabled:opacity-50 " +
    "aria-[invalid=true]:border-error aria-[invalid=true]:ring-error/20",
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-small-14",
        md: "h-11 px-4 text-body-16",
        lg: "h-14 px-5 text-h4-24",
      },
      variant: {
        default:
          "border-dark/15 focus-visible:border-primary hover:border-dark/25",
        ghost: "border-transparent bg-dark/5 focus-visible:bg-white",
        filled: "border-transparent bg-light-200 focus-visible:bg-white",
      },
      hasIcon: {
        true: "pl-11",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      hasIcon: false,
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /** Optional leading icon (rendered inside, left-aligned). */
  leadingIcon?: React.ReactNode;
  /** Optional trailing icon (rendered inside, right-aligned). */
  trailingIcon?: React.ReactNode;
  /** Accessible label for screen readers when no visible <Label> is present. */
  "aria-label"?: string;
}

/**
 * Text input — UI only (no validation wiring). Compose with <Label> + <FieldError>.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      variant,
      leadingIcon,
      trailingIcon,
      type = "text",
      id,
      "aria-label": ariaLabel,
      "aria-describedby": describedBy,
      "aria-invalid": invalid,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const inputDescribedBy = makeId(inputId, "desc");
    const errorId = `${inputId}-error`;

    return (
      <div className="relative">
        {leadingIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 [&_svg]:size-4"
          >
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          aria-label={ariaLabel}
          aria-describedby={describedBy ?? inputDescribedBy}
          aria-invalid={invalid}
          className={cn(
            inputVariants({ size, variant, hasIcon: !!leadingIcon, className }),
          )}
          {...props}
        />
        {trailingIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 [&_svg]:size-4"
          >
            {trailingIcon}
          </span>
        )}
        <span id={inputDescribedBy} className="sr-only">
          {ariaLabel ?? "Input field"}
        </span>
        <span id={errorId} className="sr-only" aria-live="polite" />
      </div>
    );
  },
);
Input.displayName = "Input";

/* ----------- Textarea ----------- */

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "flex min-h-[120px] w-full rounded-md border bg-white px-4 py-3 text-body-16 text-dark " +
          "placeholder:text-dark-400 transition-colors duration-150 " +
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 " +
          "disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        invalid ? "border-error ring-2 ring-error/20" : "border-dark/15 hover:border-dark/25",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
