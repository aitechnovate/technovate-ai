import * as React from "react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Timeline, type TimelineItem } from "@/components/ui/Timeline";
import { Icon } from "@/components/ui/Icon";

const steps: TimelineItem[] = [
  {
    title: "Discovery",
    description:
      "Stakeholder interviews, data audit, success metrics. We leave day 5 with a clear problem statement.",
    duration: "Week 1–2",
    icon: <Icon name="Search" className="size-4" />,
  },
  {
    title: "Strategy",
    description:
      "Architecture, build-vs-buy, model selection, and a 90-day delivery plan with measurable checkpoints.",
    duration: "Week 3–4",
    icon: <Icon name="Sparkles" className="size-4" />,
  },
  {
    title: "Build",
    description:
      "Iterative prototyping with weekly demos. You see real progress every Friday.",
    duration: "Week 5–8",
    icon: <Icon name="Cpu" className="size-4" />,
  },
  {
    title: "Deploy",
    description:
      "Hardened, observed, and integrated with your stack. SOC 2 + ISO controls baked in from the start.",
    duration: "Week 9–12",
    icon: <Icon name="Cloud" className="size-4" />,
  },
  {
    title: "Optimize",
    description:
      "Continuous evaluation, drift detection, and feature releases month over month.",
    duration: "Ongoing",
    icon: <Icon name="Rocket" className="size-4" />,
  },
];

type ProcessProps = {
  className?: string;
};

export function Process({ className }: ProcessProps) {
  return (
    <Section
      spacing="lg"
      tone="muted"
      className={className}
      containerSize="wide"
    >
      <div className="mb-12 max-w-2xl">
        <Badge variant="default" size="sm" className="mb-3">
          How we work
        </Badge>
        <h2 className="font-display text-h1-48 text-balance">
          From idea to production in 12 weeks.
        </h2>
        <p className="mt-3 text-body-16 text-dark-600">
          A predictable cadence that turns ambiguity into working software —
          with checkpoints, demos, and accountability baked in.
        </p>
      </div>

      <Timeline items={steps} />
    </Section>
  );
}