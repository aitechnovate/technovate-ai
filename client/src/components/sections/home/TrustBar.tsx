import * as React from "react";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { trustLogos, partnerLogos, certifications, type Logo } from "@/data/trust";
import { Reveal } from "@/components/ui/Reveal";

type TrustBarProps = {
  className?: string;
};

/**
 * Badge silhouettes, as clip-paths. Drawing the mark with `clip-path` over a
 * gradient keeps each lockup a single element — no per-instance SVG gradient
 * ids, which matters because the marquee track renders every logo twice.
 */
const glyphClip: Record<NonNullable<Logo["glyph"]>, string> = {
  shield: "polygon(50% 0%, 100% 18%, 100% 60%, 50% 100%, 0% 60%, 0% 18%)",
  diamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  hex: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
  circle: "circle(50%)",
  square: "inset(0% round 26%)",
  book: "polygon(0% 0%, 100% 0%, 100% 100%, 14% 100%, 0% 86%)",
};

/**
 * A single client lockup — gradient monogram badge + wordmark. We render these
 * in-house rather than licensing third-party artwork.
 */
function ClientLogo({ logo }: { logo: Logo }) {
  const clip = glyphClip[logo.glyph ?? "square"];
  return (
    <div className="flex items-center gap-3 whitespace-nowrap">
      <span
        aria-hidden="true"
        className="inline-flex size-9 shrink-0 items-center justify-center text-[11px] font-bold tracking-tight text-white"
        style={{
          clipPath: clip,
          WebkitClipPath: clip,
          backgroundImage: `linear-gradient(135deg, ${logo.from ?? "#1B62F0"} 0%, ${logo.to ?? "#6D28D9"} 100%)`,
        }}
      >
        {logo.mark}
      </span>
      <span className="font-display text-body-16 font-semibold tracking-tight text-dark-600">
        {logo.name}
      </span>
    </div>
  );
}

/**
 * The marquee keyframe slides the track exactly -50%, so the track must be two
 * identical halves for the loop point to be invisible. Each half repeats the
 * six clients twice — six lockups alone are narrower than a wide desktop
 * viewport, which would leave a visible gap mid-cycle.
 */
const marqueeHalf = [...trustLogos, ...trustLogos];
const marqueeTrack = [...marqueeHalf, ...marqueeHalf];

/**
 * Trust signal strip — client logos, partner logos, certification badges.
 * The client row scrolls continuously right to left.
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
        <Reveal>
          <p
            id="trust-heading"
            className="text-center text-[11px] font-semibold uppercase tracking-widest text-dark-500"
          >
            Trusted by enterprise teams &amp; backed by industry leaders
          </p>
        </Reveal>
      </Container>

      {/* Client logo marquee — full-bleed so the track can run edge to edge. */}
      <div
        className="relative mt-8 w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
        }}
      >
        {/*
          The visual track is decorative and repeats each client several times,
          so it is hidden from assistive tech; the sr-only list below carries
          the real, unduplicated names.
        */}
        <div
          aria-hidden="true"
          /* Longer than the shared 30s default: this track is ~4× the width of
             the tech-stack one, so 30s would whip past. */
          className="flex w-max animate-marquee items-center gap-10 py-2 [animation-duration:70s] hover:[animation-play-state:paused] sm:gap-14"
        >
          {marqueeTrack.map((logo, index) => (
            <ClientLogo key={`${logo.name}-${index}`} logo={logo} />
          ))}
        </div>
      </div>

      <ul className="sr-only" aria-label="Client logos">
        {trustLogos.map((logo) => (
          <li key={logo.name}>{logo.name}</li>
        ))}
      </ul>

      <Container>
        <Reveal>
          <div className="mt-10 flex flex-col items-center gap-6 border-t border-dark/10 pt-8 sm:flex-row sm:justify-between">
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
                  <Shield className="size-3 text-success" aria-hidden="true" />
                  {cert.name}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
