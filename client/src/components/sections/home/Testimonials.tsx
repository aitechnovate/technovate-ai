"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { testimonials } from "@/data/social";

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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <TestimonialCard item={featured} />
        </motion.div>
      ) : null}

      {rest.length > 0 ? (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {rest.map((t, idx) => (
            <motion.div
              key={`${t.name}-${idx}`}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <TestimonialCard item={t} />
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </Section>
  );
}