# Technovate AI — UI Implementation Plan

> **Scope:** UI interface only. No backend wiring, no form submissions, no auth, no API calls — placeholders and mock data only.
> **Stack:** Next.js 14 (App Router) + React + TypeScript + Tailwind CSS + Framer Motion + GSAP + Three.js + Lucide Icons.
> **Reference spec:** `client/.claude/specs/TechnovateAI_INTERFACE_DESIGN.md` (v1.0)
> **Target:** Enterprise-grade marketing website with WCAG 2.2 AA, Lighthouse >95, responsive across 4 breakpoints.

---

## Phase 0 — Project Foundation (Day 1)

Goal: Bootstrap a clean Next.js project, wire up tooling, and prove the dev server runs.

- [ ] **0.1 Scaffold Next.js 14 (App Router, TypeScript)**
  - `npx create-next-app@latest technovate-client --typescript --tailwind --app --src-dir --eslint --import-alias "@/*"`
  - Move/symlink generated project into `client/` (replace empty folder).
- [ ] **0.2 Install UI dependencies**
  - `framer-motion`, `gsap`, `three`, `@react-three/fiber`, `@react-three/drei`, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`, `react-hook-form`, `zod`, `react-icons`, `swiper`, `embla-carousel-react`.
- [ ] **0.3 Configure path aliases & ESLint/Prettier**
  - Update `tsconfig.json` paths (`@/components`, `@/lib`, `@/hooks`, `@/data`).
  - Add Prettier + Tailwind class sort plugin.
- [ ] **0.4 Add scripts**
  - `dev`, `build`, `start`, `lint`, `type-check`, `format`.
- [ ] **0.5 Verify dev server**
  - `npm run dev` → confirm localhost:3000 renders default page.

**Deliverable:** Working Next.js skeleton at `client/`.

---

## Phase 1 — Design System & Tokens (Day 2)

Goal: Lock in the brand system before any component is built.

- [ ] **1.1 Create `tailwind.config.ts` with brand tokens**
  - Colors: `#0066FF`, `#00F5FF`, `#6A0DAD`, `#0F172A`, `#F8FAFC`, `#FFFFFF`, `#10B981`, `#F59E0B`, `#EF4444`.
  - Gradients: `bg-gradient-blue-cyan`, `bg-gradient-blue-purple`.
  - Font families: `Space Grotesk` (heading), `Inter` (body).
  - Spacing: 8pt scale extension.
  - Border radius: 4/8/12/20/32 → `rounded-sm/md/lg/xl/2xl` + custom `rounded-[20px]`, `rounded-[32px]`.
  - Box shadow: `elevation-xs/sm/md/lg/xl`.
  - Transition durations: 150/250/350/500 ms.
  - Screens: 640/768/1024/1280/1536 + `2xl`.
  - Container: `max-w-[1440px]`.
- [ ] **1.2 Wire Google Fonts via `next/font`**
  - Space Grotesk (400/500/600/700) and Inter (400/500/600/700).
  - Set CSS variables `--font-space-grotesk`, `--font-inter`.
- [ ] **1.3 Global styles in `src/app/globals.css`**
  - CSS variables for color tokens.
  - Base typography (display-72, h1-48, h2-36, h3-30, h4-24, body-16, small-14).
  - Focus-visible ring styles.
  - Reduced-motion media query overrides.
- [ ] **1.4 Create `src/lib/utils.ts`**
  - `cn()` helper (clsx + tailwind-merge).
- [ ] **1.5 Mock data module `src/data/site.ts`**
  - Navigation links (primary, solutions, products, industries, resources, company).
  - Footer sections, social links, contact info.
  - Trust logos, metrics, testimonials, FAQ items.
  - Portfolio items, case studies, blog posts (placeholder JSON).

**Deliverable:** Reusable design tokens, mock data, and a themed baseline.

---

## Phase 2 — Core UI Primitives (Day 3)

Goal: Build the atomic components referenced in §6 of the spec.

- [ ] **2.1 Button** (`src/components/ui/Button.tsx`)
  - Variants: `primary`, `secondary`, `ghost`, `outline`, `gradient`.
  - Sizes: `sm`, `md`, `lg`, `icon`.
  - States: default, hover, focus, active, disabled, loading.
  - 44×44 minimum touch target.
- [ ] **2.2 Container / Section wrapper**
  - Max-width 1440, responsive horizontal padding.
  - Vertical rhythm presets (`py-16`, `py-20`, `py-24`).
- [ ] **2.3 Card** (base)
  - Optional hover lift, shadow, gradient border.
- [ ] **2.4 Badge / Tag / Pill**
  - Status, industry, category chips.
- [ ] **2.5 Input / Textarea / Select** (UI only, no validation wiring)
  - Labels, helper text, error state slot, icons.
- [ ] **2.6 Accordion** (Radix or Headless UI)
- [ ] **2.7 Tabs** (Radix or Headless UI)
- [ ] **2.8 Modal / Dialog** (Radix)
- [ ] **2.9 Tooltip** (Radix)
- [ ] **2.10 Toast** (sonner or react-hot-toast)
- [ ] **2.11 Skeleton loader** (shimmer)
- [ ] **2.12 Avatar** (image + fallback)
- [ ] **2.13 Icon wrapper** (lucide-react re-export)
- [ ] **2.14 Separator / Divider**
- [ ] **2.15 Theme provider** (light only for v1, structure ready for dark)

**Deliverable:** Storybook-less component library in `src/components/ui/`.

---

## Phase 3 — Layout Components (Day 4)

Goal: Global chrome that wraps every page.

- [ ] **3.1 AnnouncementBar** (`src/components/layout/AnnouncementBar.tsx`)
  - Dismissible top strip.
  - Marquee option for multiple promos.
- [ ] **3.2 Header** (`src/components/layout/Header.tsx`)
  - Logo (left), nav (center), CTA cluster (right).
  - Sticky on scroll, transparent → solid transition.
  - Mobile drawer toggle.
- [ ] **3.3 MegaMenu** (`src/components/layout/MegaMenu.tsx`)
  - Multi-column dropdown for Solutions / Products / Industries / Resources.
  - Featured spotlight slot per menu group.
  - Keyboard navigable.
- [ ] **3.4 MobileNav**
  - Full-screen drawer with collapsible groups.
- [ ] **3.5 Breadcrumbs** (`src/components/layout/Breadcrumbs.tsx`)
  - Renders JSON-LD breadcrumb schema.
- [ ] **3.6 Footer** (`src/components/layout/Footer.tsx`)
  - 6 link columns (Company, Solutions, Products, Industries, Resources, Legal).
  - Newsletter signup form (UI only).
  - Social icons row.
  - Bottom bar: copyright, region selector, accessibility link.

**Deliverable:** Assembled `<Header />` + `<Footer />` mounted in `src/app/(marketing)/layout.tsx`.

---

## Phase 4 — Homepage Sections (Days 5–7)

Build each section as an isolated component under `src/components/sections/home/`, then compose them in `src/app/page.tsx`.

### Day 5
- [ ] **4.1 Hero**
  - Headline: "Innovate. Automate. Elevate."
  - Subheadline + 2 CTAs.
  - Animated 3D geometric background (`@react-three/fiber`).
  - GSAP entrance timeline.
  - Respects `prefers-reduced-motion`.
- [ ] **4.2 TrustBar** — client/partner logos + certification badges.
- [ ] **4.3 ProblemSolution** — two-column pain → outcome with illustration.
- [ ] **4.4 WhyUs** — 4–6 feature pillars with icons.

### Day 6
- [ ] **4.5 CoreSolutions** — grid of 9 solution cards.
- [ ] **4.6 Industries** — horizontal scroll of 7 industry tiles.
- [ ] **4.7 AIDemo** — interactive chatbot mock (typed replies, no API), workflow visualizer, mini chart.
- [ ] **4.8 Process** — 5-step timeline (Discovery → Optimize).

### Day 7
- [ ] **4.9 TechStack** — marquee of 13 logos with grayscale → color hover.
- [ ] **4.10 PortfolioHighlights** — 3 featured cards.
- [ ] **4.11 CaseStudy** — problem/solution/outcome block + metrics strip.
- [ ] **4.12 MetricsCounter** — animated number counters (Projects / Clients / Countries / ROI / Satisfaction).
- [ ] **4.13 Testimonials** — carousel with avatar, quote, role, company.
- [ ] **4.14 FAQ** — 10–15 SEO-friendly Q&A via Accordion.
- [ ] **4.15 FinalCTA** — full-width gradient banner with primary + secondary CTAs.

**Deliverable:** `src/app/page.tsx` rendering all 18 homepage sections in order, fully styled and animated.

---

## Phase 5 — Primary Pages (Days 8–10)

Goal: Build the 11 top-level pages from the sitemap, each with its own layout in `src/app/(marketing)/`.

- [ ] **5.1 `/about`** — Story, mission/vision/values, leadership grid, milestones timeline, culture reel.
- [ ] **5.2 `/solutions`** — Solutions index hub; 9 cards linking to detail pages.
- [ ] **5.3 `/products`** — Products index; 4 product cards with feature lists.
- [ ] **5.4 `/industries`** — 7 industry tiles, each with stats and use cases.
- [ ] **5.5 `/case-studies`** — Filterable grid (by industry/solution), each card → detail page.
- [ ] **5.6 `/portfolio`** — Masonry / grid of work samples with category filters.
- [ ] **5.7 `/resources`** — Resource hub (Blog, Tutorials, Whitepapers, Webinars, Docs, News tabs).
- [ ] **5.8 `/careers`** — Culture, benefits, hiring process, open roles, remote/internships sections.
- [ ] **5.9 `/pricing`** — 3-tier cards, comparison table, FAQ.
- [ ] **5.10 `/contact`** — Form (UI), email/phone/WhatsApp cards, embedded map, "Book Meeting" CTA.
- [ ] **5.11 404 page** — Branded not-found with search and primary nav.

**Deliverable:** All 11 primary routes navigable with shared layout.

---

## Phase 6 — Detail / Long-form Pages (Days 11–12)

- [ ] **6.1 Solution detail pages (×9)**
  - Template: hero, problem, approach, capabilities, tech used, case study, related solutions, CTA.
  - Routes: `/solutions/ai-consulting`, `/ai-automation`, `/custom-ai-development`, `/ai-agents`, `/rag-systems`, `/llm-integrations`, `/predictive-analytics`, `/intelligent-process-automation`, `/data-analytics`.
- [ ] **6.2 Product detail pages (×4)**
  - `/products/ai-platform-suite`, `/automation-tools`, `/knowledge-assistant`, `/analytics-dashboard`.
- [ ] **6.3 Industry detail pages (×7)**
  - `/industries/healthcare`, `/finance`, `/manufacturing`, `/retail`, `/logistics`, `/education`, `/real-estate`.
- [ ] **6.4 Case study detail template** (`/case-studies/[slug]`)
- [ ] **6.5 Portfolio detail template** (`/portfolio/[slug]`)
- [ ] **6.6 Blog list + post template** (`/resources/blog`, `/resources/blog/[slug]`)
- [ ] **6.7 Whitepaper / Webinar / Tutorial / Docs / News templates**
- [ ] **6.8 Careers detail** (`/careers/[slug]`) and application form UI.

**Deliverable:** Full information architecture reachable from nav.

---

## Phase 7 — Company & Utility Pages (Day 13)

- [ ] **7.1 `/partners`** — Partner program tiers and CTA.
- [ ] **7.2 `/security`** — Compliance badges, certifications, downloadable PDFs.
- [ ] **7.3 `/faq`** — Aggregated FAQ page.
- [ ] **7.4 `/press`** — Press kit, logos, contacts.
- [ ] **7.5 `/accessibility`** — Statement + WCAG conformance details.
- [ ] **7.6 `/privacy`, `/terms`, `/cookie-policy`** — Legal templates with TOC.
- [ ] **7.7 `/status`** — Status indicator UI (mock green state).
- [ ] **7.8 `/search`** — Search results page (UI only, mocked results).
- [ ] **7.9 Sitemap.xml + robots.txt** — Auto-generated via `next-sitemap`.

**Deliverable:** All utility routes functional and styled.

---

## Phase 8 — Motion, Interaction & Accessibility (Day 14)

- [ ] **8.1 Motion polish pass**
  - Apply Framer Motion to cards (subtle lift on hover), buttons (press scale), icons (rotate/scale).
  - GSAP timelines for Hero + AI Demo + Storytelling sections.
  - Three.js scene optimization.
- [ ] **8.2 Scroll behaviour**
  - Smooth anchor scrolling.
  - Reveal-on-scroll using Framer Motion `useInView` (with reduced-motion fallback).
  - Sticky header shadow on scroll.
- [ ] **8.3 Accessibility audit pass**
  - Semantic landmarks on every page.
  - Skip-to-content link.
  - ARIA labels on icon buttons, accordions, tabs.
  - Focus order verification, focus-visible rings.
  - Color-contrast spot check (AA).
  - Form labels and error associations.
  - Reduced-motion test (turn off all heavy animation).
- [ ] **8.4 Keyboard testing**
  - Tab through Home, mega menu, all forms, all interactive components.

**Deliverable:** Accessible, motion-rich UI ready for content.

---

## Phase 9 — SEO, Performance & QA (Day 15)

- [ ] **9.1 SEO infrastructure**
  - Per-page `<title>`, meta description, canonical.
  - Open Graph + Twitter Card image per page.
  - JSON-LD: Organization (root), BreadcrumbList, FAQPage, Article (blog).
  - `sitemap.xml`, `robots.txt`.
- [ ] **9.2 Performance hardening**
  - `next/image` for all imagery, WebP/AVIF.
  - Lazy-load Three.js scene (`next/dynamic` with `ssr: false`).
  - Defer Framer Motion below-the-fold.
  - Font `display: swap`, preload critical fonts.
  - Critical CSS via Next.js defaults.
  - Verify Core Web Vitals (LCP <2.5s, CLS <0.1, INP <200ms).
- [ ] **9.3 Responsive QA**
  - Test at 375 / 640 / 768 / 1024 / 1280 / 1536.
  - Mobile menu, mega menu collapse, table horizontal scroll.
- [ ] **9.4 Cross-browser smoke test**
  - Chrome, Edge, Firefox, Safari (latest 2).
- [ ] **9.5 QA checklist verification (spec §18)**
  - Responsive, cross-browser, a11y, SEO, analytics hooks, forms, performance, security headers.

**Deliverable:** Production-ready static UI (functional layer deferred to next phase).

---

## File / Folder Structure (target)

```
client/
├── .claude/
│   ├── specs/
│   └── plan/
│       └── UI_IMPLEMENTATION_PLAN.md   ← this file
├── public/
│   ├── images/
│   ├── logos/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx              ← Header + Footer
│   │   │   ├── page.tsx                ← Home
│   │   │   ├── about/page.tsx
│   │   │   ├── solutions/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── ai-consulting/page.tsx
│   │   │   │   └── ... (9 total)
│   │   │   ├── products/...
│   │   │   ├── industries/...
│   │   │   ├── case-studies/...
│   │   │   ├── portfolio/...
│   │   │   ├── resources/...
│   │   │   ├── careers/...
│   │   │   ├── pricing/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── partners/page.tsx
│   │   │   ├── security/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   ├── press/page.tsx
│   │   │   ├── accessibility/page.tsx
│   │   │   ├── privacy/page.tsx
│   │   │   ├── terms/page.tsx
│   │   │   ├── cookie-policy/page.tsx
│   │   │   ├── status/page.tsx
│   │   │   └── search/page.tsx
│   │   ├── not-found.tsx               ← 404
│   │   ├── globals.css
│   │   ├── layout.tsx                  ← Root <html>/<body>, fonts
│   │   └── sitemap.ts / robots.ts
│   ├── components/
│   │   ├── ui/                         ← primitives
│   │   ├── layout/                     ← Header, Footer, MegaMenu, etc.
│   │   ├── sections/
│   │   │   ├── home/                   ← 18 homepage sections
│   │   │   ├── solutions/
│   │   │   ├── industries/
│   │   │   └── shared/                 ← CTA banner, FAQ block, etc.
│   │   └── three/                      ← Three.js scenes
│   ├── data/
│   │   ├── site.ts
│   │   ├── nav.ts
│   │   ├── solutions.ts
│   │   ├── products.ts
│   │   ├── industries.ts
│   │   ├── case-studies.ts
│   │   ├── portfolio.ts
│   │   ├── blog.ts
│   │   ├── testimonials.ts
│   │   ├── faq.ts
│   │   └── metrics.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── seo.ts                      ← metadata helpers
│   │   └── motion.ts                   ← shared Framer variants
│   ├── hooks/
│   │   ├── use-scroll.ts
│   │   ├── use-media-query.ts
│   │   └── use-reduced-motion.ts
│   └── types/
│       └── index.ts
├── tailwind.config.ts
├── next.config.mjs
├── package.json
└── tsconfig.json
```

---

## Component Dependency Order (build sequence)

```
ui primitives (Phase 2)
   └─► layout (Phase 3)
         └─► homepage sections (Phase 4)
               └─► primary pages (Phase 5)
                     └─► detail pages (Phase 6)
                           └─► utility pages (Phase 7)
                                 └─► polish, a11y, perf, SEO (Phases 8–9)
```

---

## Risks & Mitigations

| Risk | Mitigation |
| --- | --- |
| Three.js bundle bloat | Dynamic import with `ssr: false`; lazy-load after first interaction. |
| Mega menu complexity on mobile | Build mobile nav as a separate full-screen component, not a shrunken mega. |
| Inconsistent section padding | Centralize via `<Section>` wrapper component (Phase 2). |
| Type drift across many pages | Centralize types in `src/types/`; mock data typed from the start. |
| Framer Motion + reduced-motion conflict | Wrap heavy motion in a `useReducedMotion()` guard. |
| Scope creep into functionality | Hard rule: no API calls, no `useEffect` fetching, no auth — UI only. |

---

## Out of Scope (deferred to next phase)

- Backend integration, API routes, form submission wiring.
- Authentication, customer portal, dashboards.
- CMS content (Sanity/Contentful) — using static TS data first.
- Live product sandbox, ROI calculator logic.
- i18n / multi-language.
- A/B testing and analytics event verification (only placeholders).
- Email, WhatsApp, Calendly live integrations.

---

## Definition of Done (UI Phase)

- [ ] All 11 primary pages and their detail pages route correctly.
- [ ] Homepage renders all 18 sections in the order from spec §3.
- [ ] Header mega menu, mobile drawer, and footer present on every marketing page.
- [ ] Design tokens applied consistently (no hardcoded colors or spacing).
- [ ] Responsive at 375 / 768 / 1024 / 1440 with no horizontal scroll.
- [ ] Keyboard navigable end-to-end; visible focus rings.
- [ ] `prefers-reduced-motion` honored.
- [ ] Lighthouse a11y/SEO 100, performance >95 on home and one detail page.
- [ ] Build (`npm run build`) succeeds with zero TS errors and zero ESLint errors.
- [ ] `npm run dev` runs cleanly; visual smoke test on every page.

---

## Estimated Timeline

| Phase | Days | Cumulative |
| --- | --- | --- |
| 0 — Foundation | 1 | 1 |
| 1 — Design System | 1 | 2 |
| 2 — UI Primitives | 1 | 3 |
| 3 — Layout | 1 | 4 |
| 4 — Home Sections | 3 | 7 |
| 5 — Primary Pages | 3 | 10 |
| 6 — Detail Pages | 2 | 12 |
| 7 — Utility Pages | 1 | 13 |
| 8 — Motion + A11y | 1 | 14 |
| 9 — SEO + Perf + QA | 1 | 15 |

**Total: ~15 working days** of UI implementation before functionality work begins.
