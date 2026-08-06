import * as React from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

type FinalCtaProps = {
  className?: string;
};

export function FinalCta({ className }: FinalCtaProps) {
  return (
    <Section
      spacing="lg"
      tone="default"
      className={className}
      containerSize="wide"
    >
      <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-brand p-10 text-light shadow-2xl sm:p-14 lg:p-20">
        {/* Decorative blurred orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-white/10 blur-3xl"
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-small-14 font-medium text-light backdrop-blur">
              <Calendar className="size-3.5" />
              30-minute AI Maturity Assessment
            </span>
            <h2 className="mt-5 font-display text-h1-48 leading-tight text-balance text-light">
              Ready to see what AI is worth in your business?
            </h2>
            <p className="mt-4 max-w-xl text-body-16 text-light/85">
              Walk away with a one-page recommendation: the highest-ROI use
              cases, the rough budget envelope, and the team shape to ship
              them. No pitch deck — just an honest read of where you stand.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">
                  Book your assessment
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-light hover:bg-white/10">
                <Link href="/case-studies">Read case studies</Link>
              </Button>
            </div>
          </div>

          <ul className="grid gap-4 rounded-2xl bg-white/10 p-6 text-light backdrop-blur sm:grid-cols-2 lg:grid-cols-1">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-white/20 text-small-14 font-semibold">
                1
              </span>
              <div>
                <p className="font-display text-h5-20">No-cost, no-commitment</p>
                <p className="mt-1 text-small-14 text-light/80">
                  30 minutes, on the calendar of your choice.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-white/20 text-small-14 font-semibold">
                2
              </span>
              <div>
                <p className="font-display text-h5-20">Senior team on the call</p>
                <p className="mt-1 text-small-14 text-light/80">
                  No SDRs or junior consultants — engineers and strategists.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-white/20 text-small-14 font-semibold">
                3
              </span>
              <div>
                <p className="font-display text-h5-20">A one-page takeaway</p>
                <p className="mt-1 text-small-14 text-light/80">
                  Actionable next steps, even if you never hire us.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}