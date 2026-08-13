import type { Config } from "tailwindcss";

/**
 * Technovate AI design tokens.
 *
 * The palette is derived from the brand logo (`public/logos/technovate_ai_logo.jpeg`):
 * a royal azure → electric violet gradient over a deep navy ink. There is no
 * cyan in the mark, and the previous cyan `secondary` (#00F5FF) failed WCAG
 * contrast on light surfaces (~1.2:1 on white), so it has been replaced by an
 * indigo that bridges the two brand hues.
 *
 * Every value used as a *text* color is AA-compliant (≥4.5:1) on its intended
 * surface — see the ratios noted inline.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        /* Azure — the dominant blue of the logo mark. 5.2:1 on white. */
        primary: {
          DEFAULT: "#1B62F0",
          50: "#EEF4FF",
          100: "#DBE6FE",
          200: "#BDD0FD",
          300: "#93B4FB",
          400: "#5C8CF7",
          500: "#1B62F0",
          600: "#1450D4",
          700: "#123FA8",
          800: "#122F79",
          900: "#0F2350",
        },
        /* Indigo — bridges azure and violet. Replaces the old cyan. 6.5:1 on white. */
        secondary: {
          DEFAULT: "#4F46E5",
          50: "#EEF0FF",
          100: "#E0E2FE",
          200: "#C6C8FD",
          300: "#A5A6FA",
          400: "#8180F6",
          500: "#4F46E5",
          600: "#4338CA",
          700: "#372FA3",
          800: "#2E2A80",
          900: "#201C57",
        },
        /* Electric violet — the logo's lower gradient stop and "AI" wordmark. 7.0:1 on white. */
        accent: {
          DEFAULT: "#6D28D9",
          50: "#F5F0FF",
          100: "#EDE3FF",
          200: "#DCC9FE",
          300: "#C4A4FC",
          400: "#A575F8",
          500: "#6D28D9",
          600: "#5B21B6",
          700: "#4A1D96",
          800: "#3A1875",
          900: "#26104D",
        },
        /*
         * Navy ink ramp. 300/400 were lightened-out slate values that failed AA
         * as body text (2.5:1 and 4.1:1 on white); they are now 4.7:1 and 6.0:1,
         * which repairs ~25 existing call sites without touching them.
         */
        dark: {
          DEFAULT: "#0B1533",
          50: "#F4F6FB",
          100: "#E6EAF3",
          200: "#CBD3E4",
          300: "#66748E",
          400: "#55637C",
          500: "#3F4B61",
          600: "#2C374A",
          700: "#1B2438",
          800: "#0B1533",
          900: "#050B1F",
        },
        light: {
          DEFAULT: "#F7F9FC",
          50: "#FFFFFF",
          100: "#F7F9FC",
          200: "#EEF2F8",
          300: "#E3E9F2",
        },
        /* Semantic colors, darkened to pass AA both as text on white and as a background behind white text. */
        success: "#0A7A53",
        warning: "#B45309",
        error: "#DC2626",
        info: "#1B62F0",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        /*
         * Display & heading scale — fluid.
         *
         * The name records the *maximum* size (display-72 tops out at 72px);
         * each step interpolates down to a legible mobile size via clamp() so
         * the ~40 call sites that use these tokens raw (`text-display-72` on an
         * <h1>, `text-h1-48` on section headings) never need a breakpoint
         * ladder of their own. Every preferred value keeps a rem term, so text
         * still responds to the browser's font-size setting (WCAG 1.4.4).
         *
         * Each ramp is tuned to hit its minimum at 320px and its maximum around
         * 1000–1024px, which is where the layouts reach their desktop form.
         */
        "display-72": [
          "clamp(2.25rem, 1.19rem + 5.3vw, 4.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.028em", fontWeight: "700" },
        ],
        "h1-48": [
          "clamp(1.875rem, 1.36rem + 2.57vw, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.022em", fontWeight: "700" },
        ],
        "h2-36": [
          "clamp(1.625rem, 1.34rem + 1.43vw, 2.25rem)",
          { lineHeight: "1.15", letterSpacing: "-0.018em", fontWeight: "600" },
        ],
        "h3-30": [
          "clamp(1.375rem, 1.146rem + 1.14vw, 1.875rem)",
          { lineHeight: "1.2", letterSpacing: "-0.014em", fontWeight: "600" },
        ],
        "h4-24": [
          "clamp(1.125rem, 0.955rem + 0.86vw, 1.5rem)",
          { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "body-16": ["1rem", { lineHeight: "1.65", fontWeight: "400" }],
        "small-14": ["0.875rem", { lineHeight: "1.55", fontWeight: "400" }],
        /* Uppercase eyebrow/label treatment used across sections. */
        eyebrow: [
          "0.6875rem",
          { lineHeight: "1.2", letterSpacing: "0.14em", fontWeight: "600" },
        ],
      },
      spacing: {
        // 8pt scale extension beyond Tailwind's default
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "20px",
        "2xl": "32px",
      },
      boxShadow: {
        /*
         * Elevation is tinted with the navy ink rather than neutral black so
         * shadows read as part of the brand instead of dirtying the surface.
         */
        "elevation-xs": "0 1px 2px 0 rgb(11 21 51 / 0.05)",
        "elevation-sm":
          "0 2px 4px 0 rgb(11 21 51 / 0.06), 0 1px 2px 0 rgb(11 21 51 / 0.04)",
        "elevation-md":
          "0 8px 16px -4px rgb(11 21 51 / 0.08), 0 4px 6px -2px rgb(11 21 51 / 0.04)",
        "elevation-lg":
          "0 16px 32px -8px rgb(11 21 51 / 0.12), 0 8px 16px -4px rgb(11 21 51 / 0.06)",
        "elevation-xl":
          "0 24px 48px -12px rgb(11 21 51 / 0.16), 0 12px 24px -6px rgb(11 21 51 / 0.08)",
        // Brand glow
        "glow-primary": "0 0 28px rgb(27 98 240 / 0.32)",
        "glow-accent": "0 0 28px rgb(109 40 217 / 0.32)",
        /** Deprecated alias — kept so existing call sites keep compiling. */
        "glow-secondary": "0 0 28px rgb(79 70 229 / 0.32)",
      },
      transitionDuration: {
        "150": "150ms",
        "250": "250ms",
        "350": "350ms",
        "500": "500ms",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      backgroundImage: {
        /* Canonical brand gradient — the logo's azure → violet sweep. */
        "gradient-brand": "linear-gradient(135deg, #1B62F0 0%, #6D28D9 100%)",
        "gradient-brand-soft":
          "linear-gradient(135deg, #4F46E5 0%, #6D28D9 100%)",
        "gradient-brand-vivid":
          "linear-gradient(135deg, #1B62F0 0%, #4F46E5 45%, #6D28D9 100%)",
        /* Deep navy backdrop for hero / CTA bands. */
        "gradient-ink":
          "linear-gradient(135deg, #0B1533 0%, #12204A 45%, #2A1259 100%)",
        "gradient-radial-primary":
          "radial-gradient(circle at 50% 50%, #1B62F0 0%, transparent 70%)",
        "gradient-radial-accent":
          "radial-gradient(circle at 50% 50%, #6D28D9 0%, transparent 70%)",
        /*
         * Deprecated aliases. Both previously terminated in #00F5FF, which was
         * invisible against white and behind white text. They now resolve to the
         * brand gradient so any call site not yet migrated is contrast-safe.
         */
        "gradient-blue-cyan": "linear-gradient(135deg, #1B62F0 0%, #6D28D9 100%)",
        "gradient-blue-purple":
          "linear-gradient(135deg, #1B62F0 0%, #6D28D9 100%)",
        "gradient-radial-blue":
          "radial-gradient(circle at 50% 50%, #1B62F0 0%, transparent 70%)",
        "gradient-radial-cyan":
          "radial-gradient(circle at 50% 50%, #6D28D9 0%, transparent 70%)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        /* Slow aurora drift for hero backdrops. */
        aurora: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.08)" },
        },
      },
      animation: {
        "fade-in": "fade-in 350ms ease-out both",
        "fade-up": "fade-up 350ms ease-out both",
        "fade-down": "fade-down 350ms ease-out both",
        "scale-in": "scale-in 250ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-right":
          "slide-in-right 350ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-up": "slide-in-up 350ms cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 2000ms linear infinite",
        marquee: "marquee 30s linear infinite",
        "accordion-down": "accordion-down 250ms cubic-bezier(0.87, 0, 0.13, 1)",
        "accordion-up": "accordion-up 200ms cubic-bezier(0.87, 0, 0.13, 1)",
        aurora: "aurora 18s ease-in-out infinite",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      maxWidth: {
        container: "1440px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
