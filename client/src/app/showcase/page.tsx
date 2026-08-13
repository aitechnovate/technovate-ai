import * as React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  Badge,
  BlogCard,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CaseStudyCard,
  Container,
  CTABanner,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FieldError,
  HelperText,
  Icon,
  Input,
  KpiCard,
  Label,
  PortfolioCard,
  PricingCard,
  Progress,
  Section,
  Separator,
  SkeletonCard,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TeamCard,
  TestimonialCard,
  Textarea,
  Timeline,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import {
  ArrowRight,
  BarChart,
  CheckCircle,
  Cloud,
  Cpu,
  Mail,
  Plus,
  Rocket,
  Search,
  Sparkles,
} from "lucide-react";
import { portfolioItems, caseStudies, blogPosts, faqItems, testimonials } from "@/data/site";

export const metadata = {
  title: "UI Showcase — Technovate AI",
  description:
    "Visual smoke test for all Phase 2 UI primitives. Demonstrates Button, Card, Dialog, Tabs, Accordion, KPI cards, and more.",
};

const teamMembers = [
  {
    name: "Aisha Bello",
    role: "Chief Executive Officer",
    bio: "Ex-McKinsey AI practice lead. PhD, MIT CSAIL.",
    initials: "AB",
    social: [{ label: "LinkedIn", href: "#" }],
  },
  {
    name: "David Okafor",
    role: "Head of Platform",
    bio: "Built the data platform at three unicorns. Loves distributed systems.",
    initials: "DO",
    social: [{ label: "GitHub", href: "#" }],
  },
  {
    name: "Mariana Costa",
    role: "Engagement Lead",
    bio: "Twelve years across automation and applied ML consulting.",
    initials: "MC",
    social: [{ label: "LinkedIn", href: "#" }],
  },
];

const pricingTiers = [
  {
    name: "Starter",
    tagline: "Validate an AI hypothesis",
    price: 9000,
    cadence: "/ month",
    annualDiscount: "Save 15% paid annually",
    description:
      "For teams exploring AI for the first time. Includes a strategy workshop and a working pilot.",
    features: [
      "AI Maturity Assessment",
      "4-week proof-of-concept",
      "Up to 2 engineers",
      "Weekly progress demos",
      "Slack & email support",
    ],
    ctaLabel: "Start a pilot",
    ctaHref: "/contact",
  },
  {
    name: "Growth",
    tagline: "Ship AI to production",
    price: 28000,
    cadence: "/ month",
    annualDiscount: "Save 15% paid annually",
    description:
      "For teams shipping production AI. Cross-functional squad with a senior engagement lead.",
    features: [
      "Everything in Starter",
      "Cross-functional squad (4–6)",
      "Production-grade architecture",
      "SOC 2 + ISO 27001 controls",
      "Observability & evaluation suite",
      "Dedicated success manager",
    ],
    ctaLabel: "Book strategy call",
    ctaHref: "/contact",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    tagline: "Transform at scale",
    price: 75000,
    cadence: "/ month",
    description:
      "For multi-business-unit transformations. Embedded senior partner and custom SLAs.",
    features: [
      "Everything in Growth",
      "Embedded senior partner",
      "Multi-region deployments",
      "Custom security & legal",
      "Quarterly executive reviews",
      "24/7 incident response",
    ],
    ctaLabel: "Contact sales",
    ctaHref: "/contact",
  },
];

const timelineSteps = [
  {
    title: "Discovery",
    description: "Stakeholder interviews, data audit, success criteria.",
    duration: "Week 1–2",
    icon: <Search className="size-4" />,
  },
  {
    title: "Strategy",
    description: "Roadmap, architecture, ROI modeling, build-vs-buy.",
    duration: "Week 3–4",
    icon: <Sparkles className="size-4" />,
  },
  {
    title: "Build",
    description: "Iterative prototyping with weekly demos to your team.",
    duration: "Week 5–8",
    icon: <Cpu className="size-4" />,
  },
  {
    title: "Deploy",
    description: "Hardened, observed, integrated with your stack.",
    duration: "Week 9–12",
    icon: <Cloud className="size-4" />,
  },
  {
    title: "Optimize",
    description: "Continuous evaluation and improvement month over month.",
    duration: "Ongoing",
    icon: <Rocket className="size-4" />,
  },
];

export default function ShowcasePage() {
  return (
    <>
      {/* Hero --------------------------------------------------- */}
      <Section spacing="lg" tone="gradient">
        <div className="space-y-4 text-center text-white">
          <Badge variant="glass" className="mx-auto border-white/30 bg-white/15 text-white">
            <Sparkles className="size-3" />
            Phase 2 — UI Primitives
          </Badge>
          <h1 className="text-balance font-display text-h1-48 sm:text-display-72">
            UI Component Showcase
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-body-16 text-white/80">
            A visual smoke test for every primitive built in Phase 2. Each section exercises one
            category of component — buttons, cards, dialogs, tabs, accordions, KPIs, and more.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild variant="secondary" size="lg">
              <a href="#buttons">Browse components</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Buttons ------------------------------------------------ */}
      <Section id="buttons" spacing="md" tone="default">
        <SectionHeader
          eyebrow="Atoms"
          title="Buttons"
          description="Five variants, four sizes, two icon styles. All enforce a 44×44 touch target."
        />
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="gradient">Gradient</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="dark">Dark</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="sm" loading>
              Loading
            </Button>
            <Button leftIcon={<Plus className="size-4" />}>Left icon</Button>
            <Button rightIcon={<ArrowRight className="size-4" />}>Right icon</Button>
            <Button size="icon" aria-label="Add">
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
      </Section>

      {/* Badges ------------------------------------------------- */}
      <Section spacing="md" tone="muted">
        <SectionHeader
          eyebrow="Atoms"
          title="Badges & Tags"
          description="Status, category, and tag pills in 9 variants and 3 sizes."
        />
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success" leadingDot>
            Live
          </Badge>
          <Badge variant="warning" leadingDot>
            Beta
          </Badge>
          <Badge variant="error" leadingDot>
            Critical
          </Badge>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="gradient">Gradient</Badge>
          <Badge variant="outlineGradient">Outline Gradient</Badge>
        </div>
      </Section>

      {/* Avatars ------------------------------------------------ */}
      <Section spacing="md">
        <SectionHeader
          eyebrow="Atoms"
          title="Avatars"
          description="Radix-based with image + initials fallback."
        />
        <div className="flex items-end gap-4">
          <Avatar className="size-6">
            <AvatarFallback size="xs">XS</AvatarFallback>
          </Avatar>
          <Avatar className="size-8">
            <AvatarFallback size="sm">SM</AvatarFallback>
          </Avatar>
          <Avatar className="size-10">
            <AvatarFallback size="md">MD</AvatarFallback>
          </Avatar>
          <Avatar className="size-14">
            <AvatarFallback size="lg">LG</AvatarFallback>
          </Avatar>
          <Avatar className="size-20">
            <AvatarFallback size="xl">XL</AvatarFallback>
          </Avatar>
        </div>
      </Section>

      {/* Tooltip ------------------------------------------------ */}
      <Section spacing="md" tone="muted">
        <SectionHeader
          eyebrow="Atoms"
          title="Tooltips"
          description="Hover any button to see a Radix-powered tooltip with brand styling."
        />
        <div className="flex flex-wrap gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Hello from Technovate AI</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Info">
                <Icon name="HelpCircle" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Tooltips support any side positioning.</TooltipContent>
          </Tooltip>
        </div>
      </Section>

      {/* Cards -------------------------------------------------- */}
      <Section spacing="md">
        <SectionHeader
          eyebrow="Molecules"
          title="Cards"
          description="Base card with four variants and a hover-lift interactive mode."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              { variant: "flat", title: "Flat", desc: "Border, no shadow. Use for dense lists." },
              { variant: "elevated", title: "Elevated", desc: "Subtle elevation, no border." },
              { variant: "bordered", title: "Bordered", desc: "Brand color hairline accent." },
              {
                variant: "gradient",
                title: "Gradient border",
                desc: "Premium look with gradient.",
              },
            ] as const
          ).map((c) => (
            <Card key={c.variant} variant={c.variant} interactive>
              <CardHeader>
                <CardTitle>{c.title}</CardTitle>
                <CardDescription>{c.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-small-14 text-dark-600">
                  Cards can be headers, body, footers — composition is up to you.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="neutral" size="sm">
                  card · {c.variant}
                </Badge>
                <ArrowRight className="size-4 text-dark-400" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      {/* KPI Cards --------------------------------------------- */}
      <Section spacing="md" tone="muted">
        <SectionHeader
          eyebrow="Molecules"
          title="KPI cards"
          description="Animated rolling counters + change pills for hero metrics."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Projects"
            value="240+"
            description="Production AI systems shipped"
            icon={<Rocket className="size-4" />}
            animated
            numericValue={240}
          />
          <KpiCard
            label="Clients"
            value="85+"
            description="Enterprise & growth-stage"
            icon={<CheckCircle className="size-4" />}
            animated
            numericValue={85}
            trend={{ label: "+12% MoM", direction: "up" }}
          />
          <KpiCard
            label="Countries"
            value="22"
            description="Across 4 continents"
            icon={<Cloud className="size-4" />}
            animated
            numericValue={22}
          />
          <KpiCard
            label="Avg ROI"
            value="4.6x"
            description="Client-reported within 12 months"
            icon={<BarChart className="size-4" />}
            trend={{ label: "+0.4x QoQ", direction: "up" }}
          />
        </div>
      </Section>

      {/* Tabs --------------------------------------------------- */}
      <Section spacing="md">
        <SectionHeader
          eyebrow="Molecules"
          title="Tabs & Pills"
          description="Two visual styles: standard underline tabs and pill-style selectors."
        />
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specs">Specs</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="rounded-lg border border-dark/10 p-6">
            <h3 className="font-display text-h4-24">Overview</h3>
            <p className="mt-2 text-small-14 text-dark-600">
              Each tab uses Radix for correct a11y roles, arrow-key navigation, and focus
              management.
            </p>
          </TabsContent>
          <TabsContent value="specs" className="rounded-lg border border-dark/10 p-6">
            <h3 className="font-display text-h4-24">Specs</h3>
            <p className="mt-2 text-small-14 text-dark-600">
              Tab panel animates in with fade-in on activation.
            </p>
          </TabsContent>
          <TabsContent value="results" className="rounded-lg border border-dark/10 p-6">
            <h3 className="font-display text-h4-24">Results</h3>
            <p className="mt-2 text-small-14 text-dark-600">
              Use any number of tab panels; they keyboard-navigate cyclically.
            </p>
          </TabsContent>
        </Tabs>
      </Section>

      {/* Accordion --------------------------------------------- */}
      <Section spacing="md" tone="muted">
        <SectionHeader
          eyebrow="Molecules"
          title="Accordion (FAQ)"
          description="Smooth height-animated accordions wired to the site FAQ data."
        />
        <Accordion type="single" collapsible className="w-full max-w-3xl">
          {faqItems.slice(0, 6).map((item, idx) => (
            <AccordionItem key={item.question} value={`item-${idx}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* Form inputs ------------------------------------------- */}
      <Section spacing="md">
        <SectionHeader
          eyebrow="Molecules"
          title="Form inputs"
          description="Labels, helper text, error states, and icon affordances."
        />
        <form className="grid max-w-2xl gap-5">
          <div className="grid gap-2">
            <Label htmlFor="email" required>
              Work email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              leadingIcon={<Mail className="size-4" />}
            />
            <HelperText>We never share your email. Used only for the consultation.</HelperText>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" placeholder="Acme, Inc." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="msg" required>
              What problem are you solving?
            </Label>
            <Textarea
              id="msg"
              placeholder="A few sentences is plenty — we will follow up."
              invalid
            />
            <FieldError>Please describe the problem in at least one sentence.</FieldError>
          </div>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Section>

      {/* Dialog ------------------------------------------------- */}
      <Section spacing="md" tone="muted">
        <SectionHeader
          eyebrow="Overlays"
          title="Dialog (Modal)"
          description="Accessible modal with backdrop, scale-in animation, and Esc-to-close."
        />
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book your AI Maturity Assessment</DialogTitle>
                <DialogDescription>
                  A free 30-minute strategy call. We will benchmark your readiness and produce a
                  one-page recommendation.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="dlg-name" required>
                    Name
                  </Label>
                  <Input id="dlg-name" placeholder="Jordan Lee" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="dlg-email" required>
                    Email
                  </Label>
                  <Input id="dlg-email" type="email" placeholder="jordan@company.com" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button>Send</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Section>

      {/* Progress + Skeleton ----------------------------------- */}
      <Section spacing="md">
        <SectionHeader
          eyebrow="Molecules"
          title="Progress & Skeletons"
          description="Loading states and progress bars used across data-heavy views."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex justify-between text-small-14">
                <span>Engagement</span>
                <span>78%</span>
              </div>
              <Progress value={78} />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-small-14">
                <span>Deployment</span>
                <span>42%</span>
              </div>
              <Progress value={42} variant="striped" />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-small-14">
                <span>Adoption</span>
                <span>96%</span>
              </div>
              <Progress value={96} variant="default" size="lg" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard withAvatar />
          </div>
        </div>
      </Section>

      {/* Team cards -------------------------------------------- */}
      <Section spacing="md" tone="muted">
        <SectionHeader
          eyebrow="Molecules"
          title="Team cards"
          description="Leadership grid with avatar fallback, social links, and bio."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
      </Section>

      {/* Portfolio --------------------------------------------- */}
      <Section spacing="md">
        <SectionHeader
          eyebrow="Molecules"
          title="Portfolio cards"
          description="Default + overlay variants for the portfolio grid."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.slice(0, 3).map((item) => (
            <PortfolioCard key={item.slug} item={item} />
          ))}
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {portfolioItems.slice(0, 3).map((item) => (
            <PortfolioCard key={item.slug} item={item} variant="overlay" />
          ))}
        </div>
      </Section>

      {/* Case study -------------------------------------------- */}
      <Section spacing="md" tone="muted">
        <SectionHeader
          eyebrow="Molecules"
          title="Case study cards"
          description="Stacked grid + media layout for the homepage hero."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.slug} item={cs} />
          ))}
        </div>
        <div className="mt-6">
          {caseStudies[0] && <CaseStudyCard item={caseStudies[0]} layout="media" />}
        </div>
      </Section>

      {/* Testimonial ------------------------------------------- */}
      <Section spacing="md">
        <SectionHeader
          eyebrow="Molecules"
          title="Testimonials"
          description="Quote cards with attribution and avatar."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <TestimonialCard key={t.name} item={t} />
          ))}
        </div>
      </Section>

      {/* Blog cards -------------------------------------------- */}
      <Section spacing="md" tone="muted">
        <SectionHeader
          eyebrow="Molecules"
          title="Blog cards"
          description="Default, featured, and compact variants for resource lists."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {blogPosts.slice(0, 2).map((p, i) => (
            <BlogCard key={p.slug} post={p} layout={i === 0 ? "featured" : "default"} />
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((p) => (
            <BlogCard key={p.slug} post={p} layout="compact" />
          ))}
        </div>
      </Section>

      {/* Timeline ---------------------------------------------- */}
      <Section spacing="md">
        <SectionHeader
          eyebrow="Molecules"
          title="Timeline"
          description="Animated step list with scroll-triggered reveal."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 font-display text-h4-24">Vertical</h3>
            <Timeline items={timelineSteps} />
          </div>
          <div>
            <h3 className="mb-6 font-display text-h4-24">Horizontal</h3>
            <Timeline items={timelineSteps} orientation="horizontal" />
          </div>
        </div>
      </Section>

      {/* Pricing ----------------------------------------------- */}
      <Section spacing="md" tone="muted">
        <SectionHeader
          eyebrow="Molecules"
          title="Pricing cards"
          description="Three-tier card with highlighted middle plan."
        />
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>
      </Section>

      {/* CTA Banner -------------------------------------------- */}
      <Section spacing="md">
        <CTABanner
          eyebrow="Ready when you are"
          title="Let’s build the AI your team will actually use."
          description="Book a free 30-minute strategy call. We'll leave you with a one-page action plan, no strings attached."
          primaryLabel="Book free call"
          primaryHref="/contact"
          secondaryLabel="See pricing"
          secondaryHref="/pricing"
          variant="gradient"
        />
      </Section>

      {/* Icon library ------------------------------------------ */}
      <Section spacing="md" tone="muted">
        <SectionHeader
          eyebrow="Atoms"
          title="Icon library"
          description="A curated subset of Lucide React icons available via the wrapper."
        />
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
          {(
            [
              "Activity",
              "Award",
              "BadgeCheck",
              "BarChart3",
              "Bell",
              "Bot",
              "Brain",
              "Briefcase",
              "Building2",
              "Calculator",
              "Calendar",
              "Check",
              "CheckCircle",
              "Cloud",
              "Code",
              "Cpu",
              "Database",
              "DollarSign",
              "Download",
              "Eye",
              "Factory",
              "FileText",
              "Filter",
              "Gauge",
              "Globe",
              "GraduationCap",
              "HeartPulse",
              "Lightbulb",
              "Link2",
              "Loader2",
              "Lock",
              "Mail",
              "MapPin",
              "MessageSquare",
              "Mic",
              "Package",
              "Phone",
              "Plug",
              "Quote",
              "Rocket",
              "Search",
              "Send",
              "Server",
              "Settings",
              "Shield",
              "Sparkles",
              "Star",
              "Stethoscope",
              "Target",
              "Terminal",
              "TrendingUp",
              "Truck",
              "User",
              "Users",
              "Wand2",
              "Wrench",
              "Zap",
            ] as const
          ).map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 rounded-md border border-dark/10 bg-white p-3 text-center transition-colors hover:border-primary/30"
            >
              <Icon name={name} className="size-5 text-dark" />
              <span className="truncate text-[11px] text-dark-500">{name}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <Section spacing="sm" tone="default" container={false}>
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dark/10 pt-8 text-small-14 text-dark-500">
            <span>Phase 2 — UI Primitives showcase.</span>
            <Link href="/" className="text-primary hover:underline">
              Back to home
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ */

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-8 max-w-2xl space-y-2">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </span>
      <h2 className="font-display text-h2-36 text-dark">{title}</h2>
      <p className="text-body-16 text-dark-500">{description}</p>
    </header>
  );
}
