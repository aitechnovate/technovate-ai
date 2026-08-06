import * as React from "react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { testimonials } from "@/data/social";
import { Reveal } from "@/components/ui/Reveal";

type TestimonialsProps = {
  className?: string;
};

export function Testimonials({ className }: TestimonialsProps) {
  if (!testimonials.length) return null;
  const [featured, ...rest] = testimonials;

  return (
    <Section
      spacing="lg"
      tone="default"
      className={className}
      containerSize="wide"
    >
      <div className="mb-12 max-w-2xl">
        <Badge variant="secondary" size="sm" className="mb-3">
          What clients say
        </Badge>
        <h2 className="font-display text-h1-48 text-balance">
          Trusted by leaders who ship.
        </h2>
        <p className="mt-3 text-body-16 text-dark-600">
          Operators, founders, and CTOs describe what it&apos;s like to
          partner with Technovate AI from kickoff to scale.
        </p>
      </div>

      {featured ? (
        <Reveal
          className="mb-6"
        >
          <TestimonialCard item={featured} />
        </Reveal>
      ) : null}

      {rest.length > 0 ? (
        <div
          className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {rest.map((t, idx) => (
            <Reveal key={`${t.name}-${idx}`} delay={idx * 60}>
              <TestimonialCard item={t} />
            </Reveal>
          ))}
        </div>
      ) : null}
    </Section>
  );
}