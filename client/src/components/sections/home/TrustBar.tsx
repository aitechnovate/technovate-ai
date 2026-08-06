"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { trustLogos, partnerLogos, certifications } from "@/data/trust";

type TrustBarProps = {
  className?: string;
};

/**
 * Trust signal strip — client logos, partner logos, certification badges.
 * Renders three rows of wordmark placeholders since we don't license real
 * third-party logos.
 */
export function TrustBar({ className }: TrustBarProps) {
  return (
    <section
      aria-labelledby="trust-heading"
      className={cn(
        "border-y border-dark/10 bg-light-200 py-12 sm:py-16",
        className,
      )}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.4 }}
          className="space-y-10"
        >
          <p
            id="trust-heading"
            className="text-center text-[11px] font-semibold uppercase tracking-widest text-dark-500"
          >
            Trusted by enterprise teams &amp; backed by industry leaders
          </p>

          {/* Client logos */}
          <ul
            aria-label="Client logos"
            className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6"
          >
            {trustLogos.map((logo) => (
              <li key={logo.name} className="flex items-center justify-center">
                <span className="font-display text-body-16 font-semibold tracking-tight text-dark-400 transition-colors hover:text-dark-700">
                  {logo.name}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center gap-6 border-t border-dark/10 pt-8 sm:flex-row sm:justify-between">
            <ul
              aria-label="Partner logos"
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:justify-start"
            >
              {partnerLogos.map((logo) => (
                <li key={logo.name}>
                  <span className="text-small-14 font-medium tracking-tight text-dark-500 transition-colors hover:text-dark-700">
                    {logo.name}
                  </span>
                </li>
              ))}
            </ul>

            <ul
              aria-label="Certifications"
              className="flex flex-wrap items-center justify-center gap-2 sm:justify-end"
            >
              {certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-dark/10 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-dark-700 shadow-elevation-xs"
                >
                  <Shield
                    className="size-3 text-success"
                    aria-hidden="true"
                  />
                  {cert.name}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}