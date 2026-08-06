"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: React.ReactNode;
  /** Default theme on first render. */
  defaultTheme?: Theme;
  /** Storage key — defaults to "technovate-theme". */
  storageKey?: string;
};

/**
 * Light-only theme provider for v1. The structure supports dark mode later:
 *   - Add a `dark` class to <html>.
 *   - Drive Tailwind via `darkMode: ["class", ...]` config.
 *   - Read `prefers-color-scheme` when theme === "system".
 *
 * The provider publishes React context so any child can read/set the theme.
 */
export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "technovate-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(
    "light",
  );

  // Hydrate from storage and the user preference on mount.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(storageKey) as Theme | null;
    const initial: Theme = stored ?? defaultTheme;
    setThemeState(initial);

    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolved: "light" | "dark" =
      initial === "system" ? (systemDark ? "dark" : "light") : initial;
    setResolvedTheme(resolved);

    document.documentElement.classList.toggle("dark", resolved === "dark");
  }, [defaultTheme, storageKey]);

  const setTheme = React.useCallback(
    (next: Theme) => {
      setThemeState(next);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, next);
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const resolved: "light" | "dark" =
          next === "system" ? (systemDark ? "dark" : "light") : next;
        setResolvedTheme(resolved);
        document.documentElement.classList.toggle("dark", resolved === "dark");
      }
    },
    [storageKey],
  );

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/** Read the current theme from context. Throws if used outside a provider. */
export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme() must be used within <ThemeProvider>.");
  }
  return ctx;
}
