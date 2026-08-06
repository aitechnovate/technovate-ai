"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label, HelperText, FieldError } from "@/components/ui/Label";
import { toast } from "@/components/ui/Toaster";

type ApplicationFormProps = {
  roleTitle: string;
};

type Errors = {
  name?: string;
  email?: string;
  resume?: string;
  why?: string;
};

/**
 * Application form UI for a single role. Validation is client-side only —
 * there is no submission endpoint in this phase, so a successful submit
 * shows a toast and resets the fields.
 */
export function ApplicationForm({ roleTitle }: ApplicationFormProps) {
  const [submitting, setSubmitting] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [resume, setResume] = React.useState("");
  const [why, setWhy] = React.useState("");
  const [errors, setErrors] = React.useState<Errors>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const next: Errors = {};
    if (!name.trim()) next.name = "Please tell us your name.";
    if (!email.trim()) next.email = "We need an email to reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (!resume.trim())
      next.resume = "Add a link to your resume, GitHub, or portfolio.";
    if (!why.trim() || why.trim().length < 30)
      next.why = "A few sentences (30+ characters) helps us read this properly.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      toast.success(
        `Application received — we reply to every applicant within 3 business days.`,
      );
      setName("");
      setEmail("");
      setLinkedin("");
      setResume("");
      setWhy("");
    }, 600);
  };

  return (
    <Card variant="flat" size="lg" className="bg-white">
      <h2 className="font-display text-h2-36 text-dark">Apply for this role</h2>
      <p className="mt-2 text-small-14 text-dark-500">
        Applying for <span className="font-medium text-dark">{roleTitle}</span>.
        A person reads every application — we reply either way within three
        business days.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="applicant-name" required>
              Your name
            </Label>
            <Input
              id="applicant-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sana Qureshi"
              autoComplete="name"
              aria-invalid={!!errors.name}
            />
            {errors.name && <FieldError>{errors.name}</FieldError>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="applicant-email" required>
              Email
            </Label>
            <Input
              id="applicant-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sana@example.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
            />
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="applicant-resume" required>
            Resume or portfolio link
          </Label>
          <Input
            id="applicant-resume"
            type="url"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="https://github.com/yourname"
            aria-invalid={!!errors.resume}
          />
          <HelperText>
            A GitHub profile, portfolio site, or hosted PDF all work.
          </HelperText>
          {errors.resume && <FieldError>{errors.resume}</FieldError>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="applicant-linkedin">LinkedIn (optional)</Label>
          <Input
            id="applicant-linkedin"
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/yourname"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="applicant-why" required>
            Why this role?
          </Label>
          <textarea
            id="applicant-why"
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            rows={5}
            placeholder="What drew you to this role, and what would you want to work on first?"
            className="flex min-h-[120px] w-full rounded-md border border-dark/15 bg-white px-4 py-3 text-body-16 text-dark placeholder:text-dark-400 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-invalid={!!errors.why}
          />
          <HelperText>
            Two or three honest sentences beat a cover letter. We read these.
          </HelperText>
          {errors.why && <FieldError>{errors.why}</FieldError>}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            type="submit"
            size="lg"
            loading={submitting}
            rightIcon={<Send className="size-4" />}
          >
            Submit application
          </Button>
          <p className="text-[13px] text-dark-500">
            We reply to every applicant within 3 business days.
          </p>
        </div>
      </form>
    </Card>
  );
}
