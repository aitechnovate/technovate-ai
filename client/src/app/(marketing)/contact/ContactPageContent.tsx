"use client";

import * as React from "react";
import {
  ArrowRight,
  Calendar,
  Mail,
  Map,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label, HelperText, FieldError } from "@/components/ui/Label";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/ui/CTABanner";
import { toast } from "@/components/ui/Toaster";
import { siteInfo } from "@/data/site";

type InquiryType = "consulting" | "demo" | "partnership" | "press" | "other";

const inquiryOptions: { value: InquiryType; label: string }[] = [
  { value: "consulting", label: "AI consulting / engagement" },
  { value: "demo", label: "Product demo" },
  { value: "partnership", label: "Partnership" },
  { value: "press", label: "Press / media" },
  { value: "other", label: "Something else" },
];

const budgetRanges = [
  "Under $50K",
  "$50K – $150K",
  "$150K – $500K",
  "$500K+",
  "Not sure yet",
];

export function ContactPageContent() {
  const [submitting, setSubmitting] = React.useState(false);
  const [inquiryType, setInquiryType] = React.useState<InquiryType>("consulting");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Please tell us your name.";
    if (!email.trim()) next.email = "We'll need an email to reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (!message.trim() || message.trim().length < 10)
      next.message = "A short description (10+ chars) helps us route this.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      toast.success("Message received — we'll reply within 1 business day.");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setInquiryType("consulting");
    }, 600);
  };

  return (
    <>
      {/* Hero */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
            className="mb-6"
          />
          <Badge variant="default" size="sm" className="mb-4">
            Contact
          </Badge>
          <h1 className="font-display text-display-72 text-balance leading-[1.05]">
            Tell us about the problem.{" "}
            <span className="text-gradient-brand">We&apos;ll reply within 1 business day.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-16 text-dark-600 text-pretty">
            Form, email, phone, or WhatsApp — whichever feels right. For
            procurement or security questionnaires, email hello@technovate.ai
            and we&apos;ll loop in the right people.
          </p>
        </div>
      </Section>

      {/* Form + contact cards */}
      <Section spacing="md" tone="muted" containerSize="wide">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          {/* Form */}
          <Card variant="flat" size="lg" className="bg-white">
            <h2 className="font-display text-h2-36 text-dark">
              Send us a message
            </h2>
            <p className="mt-2 text-small-14 text-dark-500">
              We answer every inbound. For sensitive matters, email directly
              to <a className="text-primary hover:underline" href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" required>
                    Your name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sana Qureshi"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <FieldError>{errors.name}</FieldError>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" required>
                    Work email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sana@company.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <FieldError>{errors.email}</FieldError>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Northwind Health"
                  autoComplete="organization"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inquiry">What can we help with?</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {inquiryOptions.map((o) => (
                    <label
                      key={o.value}
                      className={
                        "flex cursor-pointer items-center gap-3 rounded-md border bg-white px-3 py-2.5 text-small-14 transition-colors " +
                        (inquiryType === o.value
                          ? "border-primary bg-primary/5 font-medium text-dark"
                          : "border-dark/10 text-dark-700 hover:border-primary/40")
                      }
                    >
                      <input
                        type="radio"
                        name="inquiry"
                        value={o.value}
                        checked={inquiryType === o.value}
                        onChange={() => setInquiryType(o.value)}
                        className="size-4 accent-primary"
                      />
                      {o.label}
                    </label>
                  ))}
                </div>
              </div>

              {inquiryType === "consulting" && (
                <div className="space-y-2">
                  <Label htmlFor="budget">Estimated budget</Label>
                  <select
                    id="budget"
                    className="flex h-11 w-full rounded-md border border-dark/15 bg-white px-4 text-body-16 text-dark transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Pick a range (optional)
                    </option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  <HelperText>
                    Helps us tailor the call. Not a commitment.
                  </HelperText>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="message" required>
                  How can we help?
                </Label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="A few sentences on the problem, the team, and the outcome you're aiming for."
                  className="flex min-h-[120px] w-full rounded-md border border-dark/15 bg-white px-4 py-3 text-body-16 text-dark placeholder:text-dark-400 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  aria-invalid={!!errors.message}
                />
                {errors.message && <FieldError>{errors.message}</FieldError>}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  type="submit"
                  size="lg"
                  loading={submitting}
                  rightIcon={<Send className="size-4" />}
                >
                  Send message
                </Button>
                <p className="text-[13px] text-dark-500">
                  We&apos;ll reply within 1 business day. Your details stay
                  confidential.
                </p>
              </div>
            </form>
          </Card>

          {/* Sidebar — contact cards */}
          <div className="space-y-4">
            <ContactCard
              icon={<Mail className="size-5" />}
              title="Email"
              value={siteInfo.email}
              href={`mailto:${siteInfo.email}`}
              note="Best for new engagements and procurement."
            />
            <ContactCard
              icon={<Phone className="size-5" />}
              title="Phone"
              value={siteInfo.phone}
              href={`tel:${siteInfo.phone.replace(/[^+\d]/g, "")}`}
              note="Mon–Fri, 9am–6pm PKT."
            />
            <ContactCard
              icon={<MessageCircle className="size-5" />}
              title="WhatsApp"
              value={siteInfo.phone}
              href={`https://wa.me/${siteInfo.whatsapp}`}
              note="Fastest reply for international clients."
            />
            <ContactCard
              icon={<MapPin className="size-5" />}
              title="Lahore HQ"
              value={`${siteInfo.address.city}, ${siteInfo.address.country}`}
              href={`https://maps.google.com/?q=${encodeURIComponent(siteInfo.address.formatted)}`}
              note={siteInfo.address.formatted}
            />
            <ContactCard
              icon={<Calendar className="size-5" />}
              title="Book a meeting"
              value="30-minute AI Maturity Assessment"
              href="/contact?book=1"
              note="Skip the inbox — book a slot directly."
              variant="highlight"
            />
          </div>
        </div>
      </Section>

      {/* Map placeholder */}
      <Section spacing="md" tone="default" containerSize="wide">
        <div className="overflow-hidden rounded-2xl border border-dark/10 bg-light-200">
          <div className="relative aspect-[16/6] sm:aspect-[16/5]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,255,0.06),transparent_70%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-elevation-md">
                <span
                  aria-hidden="true"
                  className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-blue-purple text-white shadow-elevation-sm"
                >
                  <Map className="size-4" />
                </span>
                <div className="leading-tight">
                  <p className="text-small-14 font-semibold text-dark">
                    Technovate AI HQ
                  </p>
                  <p className="text-[13px] text-dark-500">
                    {siteInfo.address.street}, {siteInfo.address.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section spacing="lg" tone="default" containerSize="wide">
        <CTABanner
          eyebrow="Prefer a meeting?"
          title="Book a 30-min AI Maturity Assessment."
          description="On the calendar of your choice. Senior team on the call — no SDRs, no junior consultants. Walk away with a one-page recommendation."
          primaryLabel="Book a call"
          primaryHref="/contact?book=1"
          secondaryLabel="See pricing"
          secondaryHref="/pricing"
        />
      </Section>
    </>
  );
}

function ContactCard({
  icon,
  title,
  value,
  href,
  note,
  variant = "default",
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
  note: string;
  variant?: "default" | "highlight";
}) {
  return (
    <a
      href={href}
      className={
        "group flex items-start gap-4 rounded-xl border p-5 transition-all duration-350 hover:-translate-y-0.5 hover:shadow-elevation-md " +
        (variant === "highlight"
          ? "border-primary/30 bg-gradient-blue-purple text-white shadow-elevation-sm"
          : "border-dark/10 bg-white hover:border-primary/30")
      }
    >
      <span
        aria-hidden="true"
        className={
          "inline-flex size-10 shrink-0 items-center justify-center rounded-md " +
          (variant === "highlight"
            ? "bg-white/20 text-white"
            : "bg-primary/10 text-primary")
        }
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p
          className={
            "text-[11px] font-semibold uppercase tracking-wider " +
            (variant === "highlight" ? "text-white/75" : "text-dark-500")
          }
        >
          {title}
        </p>
        <p className="mt-1 font-display text-body-16 font-medium">
          {value}
        </p>
        <p
          className={
            "mt-1 text-small-14 " +
            (variant === "highlight" ? "text-white/80" : "text-dark-500")
          }
        >
          {note}
        </p>
      </div>
      <ArrowRight
        className={
          "ml-auto size-4 shrink-0 transition-transform group-hover:translate-x-0.5 " +
          (variant === "highlight" ? "text-white" : "text-dark-400")
        }
        aria-hidden="true"
      />
    </a>
  );
}
