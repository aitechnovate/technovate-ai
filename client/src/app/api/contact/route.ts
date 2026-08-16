/**
 * Contact form endpoint — delivers submissions to the inbox by email.
 *
 * Like /api/chat this is public and unauthenticated, so the same abuse-control
 * shape applies: same-origin check, per-IP rate limit, payload caps, and a
 * honeypot field. Nothing is persisted; the message is relayed over SMTP and
 * the request ends.
 *
 * Configuration (see .env.example):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS   — the sending account
 *   CONTACT_TO_EMAIL                             — recipient (defaults below)
 *   CONTACT_FROM_EMAIL                           — envelope From (defaults to SMTP_USER)
 *
 * With Gmail, SMTP_PASS must be an App Password — a normal account password is
 * rejected once 2FA is on, which it must be to mint one.
 */

import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

import { siteInfo } from "@/data/site";

/** Node runtime: nodemailer opens a TCP socket, which the edge runtime cannot. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_TO = "technovateaiofficial2@gmail.com";

/* ---- Limits ---------------------------------------------------------- */

const MAX_NAME_CHARS = 120;
const MAX_EMAIL_CHARS = 254;
const MAX_COMPANY_CHARS = 160;
const MAX_MESSAGE_CHARS = 5000;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const INQUIRY_TYPES = ["consulting", "demo", "partnership", "press", "other"] as const;
type InquiryType = (typeof INQUIRY_TYPES)[number];

/* ---- Rate limiting --------------------------------------------------- */

/**
 * In-memory fixed-window counter. Per-instance, so it resets on cold start and
 * does not coordinate across serverless instances — a speed bump against
 * casual abuse, not a guarantee. Same caveat as /api/chat; move both to a
 * shared store (Upstash Redis, Vercel KV) before this sees real traffic.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }

  bucket.count += 1;
  if (bucket.count > RATE_LIMIT_MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

function sweepBuckets() {
  if (buckets.size < 5000) return;
  const now = Date.now();
  Array.from(buckets.keys()).forEach((key) => {
    const bucket = buckets.get(key);
    if (bucket && now >= bucket.resetAt) buckets.delete(key);
  });
}

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
}

/* ---- Helpers --------------------------------------------------------- */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Strip CR/LF from anything interpolated into a header (Subject, Reply-To).
 * Without this a submitted name containing a newline could inject additional
 * headers into the outgoing message.
 */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ---- Handler --------------------------------------------------------- */

export async function POST(request: NextRequest) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[contact] SMTP is not configured — set SMTP_HOST/SMTP_USER/SMTP_PASS");
    return Response.json(
      { error: "The contact form is temporarily unavailable. Please email us directly." },
      { status: 503 },
    );
  }

  // 1. Same-origin — stops the endpoint being driven from someone else's page.
  const origin = request.headers.get("origin");
  if (origin) {
    const allowed = process.env.NEXT_PUBLIC_SITE_URL ?? siteInfo.url;
    const isLocal = origin.startsWith("http://localhost");
    if (!isLocal && new URL(origin).host !== new URL(allowed).host) {
      return Response.json({ error: "Forbidden." }, { status: 403 });
    }
  }

  // 2. Rate limit.
  sweepBuckets();
  const { ok, retryAfter } = checkRateLimit(clientKey(request));
  if (!ok) {
    return Response.json(
      { error: "Too many submissions. Please try again later or email us directly." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  // 3. Payload validation.
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — a real browser leaves the hidden field empty. Answer 200 so a
  // bot cannot use the response to learn the field is a trap.
  if (field(body.website, 100)) {
    return Response.json({ ok: true });
  }

  const name = field(body.name, MAX_NAME_CHARS);
  const email = field(body.email, MAX_EMAIL_CHARS);
  const company = field(body.company, MAX_COMPANY_CHARS);
  const message = field(body.message, MAX_MESSAGE_CHARS);
  const budget = field(body.budget, 60);
  const inquiryRaw = field(body.inquiryType, 40);
  const inquiryType: InquiryType = (INQUIRY_TYPES as readonly string[]).includes(inquiryRaw)
    ? (inquiryRaw as InquiryType)
    : "other";

  if (!name) {
    return Response.json({ error: "Please tell us your name." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (message.length < 10) {
    return Response.json(
      { error: "Please include a short description (10+ characters)." },
      { status: 400 },
    );
  }

  // 4. Relay.
  const to = process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO;
  const from = process.env.CONTACT_FROM_EMAIL ?? SMTP_USER;
  const port = Number(SMTP_PORT ?? 465);

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ["Inquiry type", inquiryType],
    ["Budget", budget || "—"],
  ];

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#0f172a">
      <h2 style="margin:0 0 16px">New contact form submission</h2>
      <table style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#64748b">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px;font-size:14px;color:#64748b">Message</h3>
      <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;margin:0">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      // 465 is implicit TLS; 587 upgrades via STARTTLS.
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"${siteInfo.name} website" <${from}>`,
      to,
      // Reply goes to the visitor, not to the SMTP account.
      replyTo: `"${headerSafe(name)}" <${headerSafe(email)}>`,
      subject: `[${inquiryType}] New enquiry from ${headerSafe(name)}${company ? ` — ${headerSafe(company)}` : ""}`,
      text,
      html,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] send failed", error);
    return Response.json(
      { error: "We couldn't send that. Please try again or email us directly." },
      { status: 502 },
    );
  }
}
