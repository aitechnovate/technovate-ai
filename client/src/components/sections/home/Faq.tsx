import * as React from "react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { faqItems } from "@/data/social";

type FaqProps = {
  className?: string;
};

export function Faq({ className }: FaqProps) {
  return (
    <Section
      spacing="lg"
      tone="muted"
      className={className}
      containerSize="default"
      id="faq"
    >
      <div className="mb-12 max-w-2xl">
        <Badge variant="neutral" size="sm" className="mb-3">
          Frequently asked
        </Badge>
        <h2 className="font-display text-h1-48 text-balance">
          The questions every buyer asks.
        </h2>
        <p className="mt-3 text-body-16 text-dark-600">
          The most common questions we hear in discovery calls, distilled into
          short answers. Need more detail? Book a 30-minute assessment.
        </p>
      </div>

      <div className="rounded-xl border border-dark/10 bg-light-50 px-4 sm:px-6">
        <Accordion type="multiple" className="w-full">
          {faqItems.map((q, idx) => (
            <AccordionItem key={q.question} value={`faq-${idx}`}>
              <AccordionTrigger>{q.question}</AccordionTrigger>
              <AccordionContent>{q.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}