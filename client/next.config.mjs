/**
 * Security headers.
 *
 * Pages are static; the one server surface is `/api/chat`, which the browser
 * calls same-origin, so `connect-src 'self'` still covers it and no third-party
 * origin needs allowing. `'unsafe-inline'` is required for style-src because
 * Next injects inline <style> for critical CSS and next/font, and for script-src
 * because the App Router streams inline bootstrap scripts.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /*
   * Strips console.* from production bundles but keeps error/warn so real
   * failures remain diagnosable in the field.
   */
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  images: {
    // AVIF first, WebP fallback — the logo JPEG drops from ~55KB to ~8KB.
    formats: ["image/avif", "image/webp"],
    // Only the widths the layout actually requests; each extra entry is another
    // build-time transform and another cache entry.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  experimental: {
    /*
     * Rewrites barrel imports to deep per-symbol imports at build time.
     * Icon.tsx pulls ~180 named exports from lucide-react; without this the
     * whole icon set is walked on every client bundle that touches an icon.
     */
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "framer-motion",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
    ],
    // Inlines the small critical CSS Next already splits per route.
    optimisticClientCache: true,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Content-hashed build output — safe to cache permanently.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/logos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
