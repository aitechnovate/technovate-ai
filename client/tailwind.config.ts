import type { Config } from "tailwindcss";

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
        // Brand
        primary: {
          DEFAULT: "#0066FF",
          50: "#E6F0FF",
          100: "#CCE0FF",
          200: "#99C2FF",
          300: "#66A3FF",
          400: "#3385FF",
          500: "#0066FF",
          600: "#0052CC",
          700: "#003D99",
          800: "#002966",
          900: "#001433",
        },
        secondary: {
          DEFAULT: "#00F5FF",
          50: "#E6FFFF",
          100: "#CCFFFF",
          200: "#99FFFF",
          300: "#66FFFF",
          400: "#33FFFF",
          500: "#00F5FF",
          600: "#00C4CC",
          700: "#009399",
          800: "#006266",
          900: "#003133",
        },
        accent: {
          DEFAULT: "#6A0DAD",
          50: "#F2E6F9",
          100: "#E5CCF3",
          200: "#CC99E7",
          300: "#B266DB",
          400: "#9933CF",
          500: "#6A0DAD",
          600: "#550A8A",
          700: "#400868",
          800: "#2B0546",
          900: "#150323",
        },
        dark: {
          DEFAULT: "#0F172A",
          50: "#F1F5F9",
          100: "#E2E8F0",
          200: "#CBD5E1",
          300: "#94A3B8",
          400: "#64748B",
          500: "#475569",
          600: "#334155",
          700: "#1E293B",
          800: "#0F172A",
          900: "#020617",
        },
        light: {
          DEFAULT: "#F8FAFC",
          50: "#FFFFFF",
          100: "#F8FAFC",
          200: "#F1F5F9",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        // Backwards-compatible shim for defaults from create-next-app
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Display & heading scale
        "display-72": [
          "4.5rem",
          { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "h1-48": [
          "3rem",
          { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "700" },
        ],
        "h2-36": [
          "2.25rem",
          { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "h3-30": [
          "1.875rem",
          { lineHeight: "1.2", letterSpacing: "-0.005em", fontWeight: "600" },
        ],
        "h4-24": [
          "1.5rem",
          { lineHeight: "1.3", letterSpacing: "0", fontWeight: "600" },
        ],
        "body-16": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "small-14": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
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
        // Elevation scale
        "elevation-xs": "0 1px 2px 0 rgb(15 23 42 / 0.04)",
        "elevation-sm":
          "0 2px 4px 0 rgb(15 23 42 / 0.06), 0 1px 2px 0 rgb(15 23 42 / 0.04)",
        "elevation-md":
          "0 8px 16px -4px rgb(15 23 42 / 0.08), 0 4px 6px -2px rgb(15 23 42 / 0.04)",
        "elevation-lg":
          "0 16px 32px -8px rgb(15 23 42 / 0.12), 0 8px 16px -4px rgb(15 23 42 / 0.06)",
        "elevation-xl":
          "0 24px 48px -12px rgb(15 23 42 / 0.16), 0 12px 24px -6px rgb(15 23 42 / 0.08)",
        // Brand glow
        "glow-primary": "0 0 24px rgb(0 102 255 / 0.35)",
        "glow-secondary": "0 0 24px rgb(0 245 255 / 0.35)",
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
        "gradient-blue-cyan":
          "linear-gradient(135deg, #0066FF 0%, #00F5FF 100%)",
        "gradient-blue-purple":
          "linear-gradient(135deg, #0066FF 0%, #6A0DAD 100%)",
        "gradient-radial-blue":
          "radial-gradient(circle at 50% 50%, #0066FF 0%, transparent 70%)",
        "gradient-radial-cyan":
          "radial-gradient(circle at 50% 50%, #00F5FF 0%, transparent 70%)",
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
      },
      animation: {
        "fade-in": "fade-in 350ms ease-out both",
        "fade-up": "fade-up 350ms ease-out both",
        "fade-down": "fade-down 350ms ease-out both",
        "scale-in": "scale-in 250ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-right": "slide-in-right 350ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-up": "slide-in-up 350ms cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 2000ms linear infinite",
        marquee: "marquee 30s linear infinite",
        "accordion-down": "accordion-down 250ms cubic-bezier(0.87, 0, 0.13, 1)",
        "accordion-up": "accordion-up 200ms cubic-bezier(0.87, 0, 0.13, 1)",
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
