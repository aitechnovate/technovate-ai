import * as React from "react";
import Link from "next/link";
import {
  FaLinkedin as LinkedinIcon,
  FaXTwitter as TwitterIcon,
  FaGithub as GithubIcon,
  FaYoutube as YoutubeIcon,
} from "react-icons/fa6";
import { Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { LogoLockup } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { Separator } from "@/components/ui/Separator";
import { footerNav } from "@/data/nav";
import { siteInfo } from "@/data/site";

type FooterProps = {
  className?: string;
};

/**
 * Site-wide footer with 6 link columns + newsletter + social + bottom bar.
 *
 * A server component: the only stateful part (newsletter capture) is isolated
 * in <NewsletterForm>, so the footer's markup and link data no longer ship to
 * the browser on every route.
 */
export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "on-dark border-t border-white/10 bg-dark text-white",
        className,
      )}
    >
      <Container>
        <div className="grid gap-10 py-16 lg:grid-cols-[1.4fr_2fr] lg:gap-16 lg:py-20">
          {/* Brand + newsletter */}
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
              aria-label={`${siteInfo.name} home`}
            >
              <LogoLockup tone="onDark" markClassName="h-9" />
            </Link>
            <p className="max-w-md text-small-14 text-white/70 text-pretty">
              {siteInfo.description}
            </p>

            <div className="space-y-3">
              <p className="text-small-14 font-semibold text-white">Newsletter</p>
              <NewsletterForm tone="onDark" id="footer-newsletter" />
              {/* 4.3:1 at white/50 — lifted to white/70 (6.0:1 on the ink base). */}
              <p className="text-[12px] text-white/70">
                One email a month with our best engineering notes. No spam.
              </p>
            </div>

            <ul className="flex items-center gap-2 pt-2" aria-label="Social links">
              {[
                {
                  href: siteInfo.social.linkedin,
                  label: "LinkedIn",
                  Icon: LinkedinIcon,
                },
                {
                  href: siteInfo.social.twitter,
                  label: "X (Twitter)",
                  Icon: TwitterIcon,
                },
                {
                  href: siteInfo.social.github,
                  label: "GitHub",
                  Icon: GithubIcon,
                },
                {
                  href: siteInfo.social.youtube,
                  label: "YouTube",
                  Icon: YoutubeIcon,
                },
              ].map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-10 items-center justify-center rounded-md bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6"
          >
            {footerNav.map((column) => (
              <div key={column.title}>
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-white/70">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-small-14 text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <Separator className="bg-white/10" />

        {/* Contact strip + bottom bar */}
        <div className="grid gap-6 py-8 text-small-14 text-white/70 lg:grid-cols-[2fr_1fr]">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li className="inline-flex items-center gap-2">
              <Mail className="size-4" aria-hidden="true" />
              <a href={`mailto:${siteInfo.email}`} className="hover:text-white">
                {siteInfo.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <Phone className="size-4" aria-hidden="true" />
              <a href={`tel:${siteInfo.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
                {siteInfo.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="size-4" aria-hidden="true" />
              <span>
                {siteInfo.address.city}, {siteInfo.address.region}
              </span>
            </li>
          </ul>
          <p className="text-white/70 lg:text-right">
            Founded {siteInfo.founded} · {siteInfo.legalName}
          </p>
        </div>

        <Separator className="bg-white/10" />

        <div className="flex flex-col items-start gap-4 py-6 text-[12px] text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteInfo.legalName}. All rights
            reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="hover:text-white">
                Cookies
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-white">
                Accessibility
              </Link>
            </li>
            <li>
              <Link href="/status" className="hover:text-white">
                Status
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}