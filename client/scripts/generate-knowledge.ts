/**
 * Generates the machine-readable half of the chatbot knowledge base from the
 * typed data modules that already drive the site.
 *
 * Why generate rather than hand-write: `src/data/` is the source of truth for
 * every price, capability, and metric the site renders. A hand-maintained copy
 * would silently disagree with the site the first time someone edits a tier.
 * Anything the data modules don't capture (history, process, engagement model)
 * belongs in `knowledge-base.manual.md`, which this script never touches.
 *
 * Output: src/data/knowledge/knowledge-base.generated.md — committed so the
 * corpus is reviewable in diffs, but never edited by hand.
 *
 *   npm run knowledge:generate
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

import { siteInfo } from "../src/data/site";
import { solutions } from "../src/data/solutions";
import { products } from "../src/data/products";
import { industries } from "../src/data/industries";
import { portfolioItems, caseStudies, blogPosts } from "../src/data/content";
import { testimonials, faqItems } from "../src/data/social";
import { roles } from "../src/data/careers";
import { certifications, metrics, techStack } from "../src/data/trust";

/**
 * Each section becomes exactly one retrieval chunk. The `##` heading is
 * repeated into the chunk text at embed time, so a chunk retrieved on its own
 * still says what it is about — retrieval returns fragments, not documents.
 */
const sections: string[] = [];

function section(heading: string, body: string) {
  sections.push(`## ${heading}\n\n${body.trim()}\n`);
}

const list = (items: readonly string[]) => items.map((i) => `- ${i}`).join("\n");

/* ---- Company basics ------------------------------------------------- */

section(
  "About Technovate AI",
  `
${siteInfo.legalName} (trading as ${siteInfo.name}) is an enterprise AI consulting, automation, and custom development firm founded in ${siteInfo.founded}.

Tagline: ${siteInfo.tagline}
What we do: ${siteInfo.description}

Contact:
- Email: ${siteInfo.email}
- Phone: ${siteInfo.phone}
- WhatsApp: ${siteInfo.phone}
- Office: ${siteInfo.address.formatted}
- Website: ${siteInfo.url}
`,
);

section(
  "Certifications, scale, and technology",
  `
Certifications and compliance: ${certifications.map((c) => c.name).join(", ")}

Company scale:
${list(
  metrics.map(
    (m) => `${m.label}: ${m.prefix ?? ""}${m.value}${m.suffix ?? ""} — ${m.description}`,
  ),
)}

Technologies we work with: ${techStack.join(", ")}
`,
);

/* ---- Solutions ------------------------------------------------------ */

for (const s of solutions) {
  section(
    `Solution: ${s.title}`,
    `
${s.longDescription}

The problem it addresses — ${s.problem.title}: ${s.problem.body}
Symptoms clients report:
${list(s.problem.symptoms)}

How we approach it:
${s.approach.map((a) => `${a.step}. ${a.title} — ${a.description}`).join("\n")}

Capabilities:
${list(s.capabilities)}

Capability detail:
${s.capabilityDetails.map((c) => `- ${c.title}: ${c.description}`).join("\n")}

Technologies used: ${s.techUsed.join(", ")}

Typical outcomes:
${list(s.outcomes.map((o) => `${o.label}: ${o.value}`))}

Engagement: ${s.engagement.duration}, ${s.engagement.team}, starting at ${s.engagement.startingAt}.
Page: ${siteInfo.url}${s.href}
`,
  );
}

/* ---- Products ------------------------------------------------------- */

for (const p of products) {
  section(
    `Product: ${p.title}`,
    `
${p.tagline}
${p.description}

Availability status: ${p.status}
Built for:
${list(p.builtFor)}

Features:
${p.featureDetails.map((f) => `- ${f.title}: ${f.description}`).join("\n")}

Modules:
${p.modules.map((m) => `- ${m.name}: ${m.description}`).join("\n")}

Integrations: ${p.integrations.join(", ")}

Metrics:
${list(p.metrics.map((m) => `${m.label}: ${m.value}`))}

Plans:
${p.plans.map((pl) => `- ${pl.name}: ${pl.price} ${pl.cadence} — ${pl.blurb}`).join("\n")}

Product FAQ:
${p.faq.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n")}

Page: ${siteInfo.url}${p.href}
`,
  );
}

/* ---- Industries ----------------------------------------------------- */

for (const ind of industries) {
  section(
    `Industry: ${ind.name}`,
    `
${ind.description}

Context — ${ind.context.title}: ${ind.context.body}

Challenges and how we respond:
${ind.challenges.map((c) => `- Challenge: ${c.challenge}\n  Response: ${c.response}`).join("\n")}

Use cases:
${ind.useCaseDetails.map((u) => `- ${u.title}: ${u.description}`).join("\n")}

Compliance frameworks we work within: ${ind.compliance.join(", ")}

Results:
${list(ind.kpis.map((k) => `${k.label}: ${k.value}`))}
${ind.metric.label}: ${ind.metric.value}
${ind.stat.label}: ${ind.stat.value}
`,
  );
}

/* ---- Case studies & portfolio --------------------------------------- */

for (const cs of caseStudies) {
  section(
    `Case study: ${cs.title}`,
    `
Client: ${cs.client}
Industry: ${cs.industry}

Problem: ${cs.problem}
Solution: ${cs.solution}
Outcome: ${cs.outcome}

Measured results:
${list(cs.metrics.map((m) => `${m.label}: ${m.value}`))}
`,
  );
}

for (const item of portfolioItems) {
  section(
    `Project: ${item.title}`,
    `
Client: ${item.client}
Category: ${item.category}
${item.summary}

${item.overview ?? ""}
${item.brief ? `What we were asked to solve: ${item.brief}` : ""}

${item.year ? `Year: ${item.year}` : ""}
${item.duration ? `Duration: ${item.duration}` : ""}
${item.team ? `Team: ${item.team}` : ""}
${item.stack?.length ? `Technologies: ${item.stack.join(", ")}` : ""}
Tags: ${item.tags.join(", ")}

${item.highlights?.length ? `Engineering highlights:\n${item.highlights.map((h) => `- ${h.title}: ${h.description}`).join("\n")}` : ""}

${item.results?.length ? `Results:\n${list(item.results)}` : ""}
${item.quote ? `\nClient quote: "${item.quote.text}" — ${item.quote.author}, ${item.quote.role}` : ""}
`,
  );
}

/* ---- FAQ, testimonials, careers, blog -------------------------------- */

section(
  "Frequently asked questions",
  faqItems.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n"),
);

section(
  "Client testimonials",
  testimonials
    .map((t) => `"${t.quote}" — ${t.name}, ${t.role} at ${t.company}`)
    .join("\n\n"),
);

/* One chunk per role: "do you have any backend openings?" should retrieve the
   matching role, not a directory listing of every job. */
for (const r of roles) {
  section(
    `Open role: ${r.title}`,
    `
Team: ${r.team}
Location: ${r.location}
Employment type: ${r.type}
Level: ${r.level}
Salary range: ${r.salaryRange}

${r.summary}

Responsibilities:
${list(r.responsibilities)}

Requirements:
${list(r.requirements)}

Nice to have:
${list(r.bonus)}

First quarter:
${r.firstQuarter.map((q) => `- ${q.period}: ${q.description}`).join("\n")}

Apply at ${siteInfo.url}/careers/${r.slug}
`,
  );
}

for (const post of blogPosts) {
  section(
    `Article: ${post.title}`,
    `
${post.excerpt}

Category: ${post.category}
Author: ${post.author.name}, ${post.author.role}
Published: ${post.publishedAt}
Reading time: ${post.readingMinutes} minutes
${post.tags?.length ? `Tags: ${post.tags.join(", ")}` : ""}
Read at: ${siteInfo.url}/resources/blog/${post.slug}
`,
  );
}

/* ---- Emit ------------------------------------------------------------ */

const header = `<!--
  GENERATED FILE — DO NOT EDIT.
  Produced by scripts/generate-knowledge.ts from the modules in src/data/.
  To change this content, edit the data module it comes from.
  For content that has no data module, edit knowledge-base.manual.md instead.
-->

# Technovate AI — company knowledge base (generated)
`;

const outDir = join(process.cwd(), "src", "data", "knowledge");
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "knowledge-base.generated.md");
writeFileSync(outPath, `${header}\n${sections.join("\n")}`, "utf8");

console.log(`Wrote ${sections.length} sections to ${outPath}`);
