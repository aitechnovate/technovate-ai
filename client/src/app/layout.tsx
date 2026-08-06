import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { siteInfo } from "@/data/site";
import "./globals.css";

/*
 * Both families are variable fonts. Omitting `weight` makes next/font fetch the
 * single variable file per family covering the whole 400–700 axis, instead of
 * four static cuts each — 8 font requests collapse to 2, and intermediate
 * weights become available for free.
 *
 * `adjustFontFallback` (on by default) derives a metric-matched local fallback
 * so the swap from fallback to webfont does not shift layout.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  preload: true,
});

const LOGO = "/logos/technovate_ai_logo.jpeg";

export const metadata: Metadata = {
  /*
   * metadataBase resolves the relative OG/canonical URLs below to absolute
   * ones. Without it Next emits a build-time warning and social crawlers
   * receive unusable relative image paths.
   */
  metadataBase: new URL(siteInfo.url),
  title: {
    default: `${siteInfo.name} — ${siteInfo.tagline}`,
    template: `%s — ${siteInfo.name}`,
  },
  description: siteInfo.description,
  applicationName: siteInfo.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteInfo.name,
    title: `${siteInfo.name} — ${siteInfo.tagline}`,
    description: siteInfo.description,
    url: "/",
    images: [{ url: LOGO, width: 1254, height: 1254, alt: `${siteInfo.name} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteInfo.name} — ${siteInfo.tagline}`,
    description: siteInfo.description,
    images: [LOGO],
  },
  icons: {
    icon: [{ url: LOGO, type: "image/jpeg" }],
    apple: [{ url: LOGO }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B1533",
  colorScheme: "light",
};

/**
 * Organization + WebSite structured data. Emitted once from the root layout so
 * every route inherits it; page-level schema (breadcrumb, FAQ) composes on top.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteInfo.legalName,
  alternateName: siteInfo.name,
  url: siteInfo.url,
  logo: `${siteInfo.url}${LOGO}`,
  description: siteInfo.description,
  email: siteInfo.email,
  telephone: siteInfo.phone,
  foundingDate: siteInfo.founded,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteInfo.address.street,
    addressLocality: siteInfo.address.city,
    addressRegion: siteInfo.address.region,
    postalCode: siteInfo.address.postal,
    addressCountry: siteInfo.address.country,
  },
  sameAs: Object.values(siteInfo.social),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/*
          Scroll-reveal elements ship in their pre-animation (transparent) state.
          If JS never runs there is nothing to promote them, so force the resting
          state — content must never depend on scripting to be readable.
        */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-white font-sans text-dark antialiased">
        {/* First focusable element on the page — WCAG 2.2 bypass block. */}
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          // Serialised from a local literal, not user input; `<` is escaped to
          // close off the `</script>` breakout vector regardless.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
