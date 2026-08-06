"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;
type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;
type AvatarFallbackProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Fallback
> & {
  /** Visual size of the avatar. */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const sizeClass: Record<NonNullable<AvatarFallbackProps["size"]>, string> = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-small-14",
  md: "size-10 text-body-16",
  lg: "size-14 text-h4-24",
  xl: "size-20 text-h3-30",
};

/** Wrapper for the avatar root with a 44×44 minimum on relevant sizes. */
export function Avatar({ className, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  size = "md",
  ...props
}: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-gradient-blue-cyan font-semibold text-white",
        sizeClass[size],
        className,
      )}
      {...props}
    />
  );
}
