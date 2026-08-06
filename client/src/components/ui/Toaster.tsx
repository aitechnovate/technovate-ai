"use client";

import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";
import { cn } from "@/lib/utils";

/**
 * App-wide toast renderer. Mount once near the root.
 * Theme/tokens are aligned with the brand system via className overrides.
 */
export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      closeButton
      expand
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-dark group-[.toaster]:border-dark/10 group-[.toaster]:shadow-elevation-md group-[.toaster]:rounded-md",
          description: "group-[.toast]:text-dark-500",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-white group-[.toast]:rounded-sm",
          cancelButton:
            "group-[.toast]:bg-dark/5 group-[.toast]:text-dark-700 group-[.toast]:rounded-sm",
          title: cn("font-display font-semibold"),
        },
      }}
    />
  );
}

/** Convenience re-export so consumers can call `toast.success(...)` etc. */
export const toast = sonnerToast;
