import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export const metadata: Metadata = {
  title: "Page not found — Technovate AI",
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: false },
};

const popularLinks = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Resources", href: "/resources" },
  { label: "Careers", href: "/careers" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

export default function NotFound() {
  return (
    <main className="min-h-dvh bg-light text-dark">
      <Container className="py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Copy */}
          <div>
            <Badge variant="default" size="sm" className="mb-4">
              404
            </Badge>
            <h1 className="font-display text-display-72 text-balance leading-[1.05]">
              That page is{" "}
              <span className="text-gradient-brand">somewhere else.</span>
            </h1>
            <p className="mt-6 max-w-xl text-body-16 text-dark-600 text-pretty">
              The link you followed may be broken, or the page may have moved
              when we shipped the latest version of the site. Let&apos;s get
              you back to something useful.
            </p>

            <form
              className="mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
              action="/search"
              method="get"
              role="search"
              aria-label="Site search"
            >
              <Input
                type="search"
                name="q"
                placeholder="Search the site…"
                aria-label="Search the site"
                leadingIcon={<Search className="size-4" />}
              />
              <Button type="submit" size="md">
                Search
              </Button>
            </form>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="md">
                <Link href="/">
                  Go home
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="md" variant="outline">
                <Link href="/contact">Contact support</Link>
              </Button>
            </div>
          </div>

          {/* Popular links */}
          <div className="rounded-2xl border border-dark/10 bg-white p-6 sm:p-8">
            <h2 className="font-display text-h4-24 text-dark">
              Popular pages
            </h2>
            <p className="mt-2 text-small-14 text-dark-500">
              The most-visited destinations on our site.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {popularLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center justify-between gap-2 rounded-md px-3 py-2 text-small-14 text-dark-700 transition-colors hover:bg-light-200 hover:text-dark"
                  >
                    {l.label}
                    <ArrowRight className="size-3.5 text-dark-400 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </main>
  );
}
