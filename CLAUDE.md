# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository shape

Two top-level folders: [client/](client/) holds the entire application (Next.js 14 App Router marketing site for "Technovate AI"); [server/](server/) is an empty placeholder — nothing is implemented there yet. **All commands run from `client/`.**

## Commands

```bash
cd client
npm run dev          # dev server (localhost:3000)
npm run build        # production build
npm run start        # serve the production build
npm run lint         # next lint (eslint-config-next)
npm run type-check   # tsc --noEmit — TypeScript is strict; run this after edits
npm run format       # prettier --write over src/**
```

There is no test framework configured — no test runner, no test files. Verification is `type-check` + `lint` + `build`, plus loading the affected route in the dev server.

## Architecture

### Static, data-driven marketing site — no backend

Every page is a server component rendered from typed TypeScript literals in [client/src/data/](client/src/data/). There is no API, no database, no CMS, no auth, and no form submission endpoint. Forms validate client-side and fire a `toast()` on success (see [ApplicationForm.tsx](client/src/app/(marketing)/careers/[slug]/ApplicationForm.tsx)). When adding content, **edit the data module — not the page**.

The data layer (~4.5k lines) is the source of truth:

| Module | Contents |
| --- | --- |
| [site.ts](client/src/data/site.ts) | `siteInfo` (contact, address, social) + barrel re-export of `nav`, `social`, `content`, `trust` |
| [nav.ts](client/src/data/nav.ts) | `primaryNav` (`NavGroup[]` with `children` + `featured`) drives Header, MegaMenu, MobileNav, and Footer together |
| [solutions.ts](client/src/data/solutions.ts) / [products.ts](client/src/data/products.ts) / [industries.ts](client/src/data/industries.ts) | Detail-page entities, each with a `getX(slug)` lookup and often `getRelatedX(slug)` |
| [content.ts](client/src/data/content.ts) | Portfolio items, case studies, blog posts |
| [careers.ts](client/src/data/careers.ts), [resources.ts](client/src/data/resources.ts), [trust.ts](client/src/data/trust.ts) | Roles, resource listings, logos/metrics/testimonials |

Adding a new detail page = add an entry to the data array (slug included) and `generateStaticParams` picks it up automatically.

### Route structure

All public pages live under the `(marketing)` route group, whose [layout.tsx](client/src/app/(marketing)/layout.tsx) supplies `AnnouncementBar + Header + <main id="main"> + Footer`. The group exists so utility pages ([not-found.tsx](client/src/app/not-found.tsx), [showcase/](client/src/app/showcase/)) can opt out of that chrome. `[slug]` routes all follow the same contract: `generateStaticParams()` over the data array, `generateMetadata()` returning title/description/canonical/openGraph, then `notFound()` if the lookup misses — mirror [solutions/[slug]/page.tsx](client/src/app/(marketing)/solutions/[slug]/page.tsx) when adding one.

`/showcase` is a living gallery of every UI primitive; add new primitives there.

### Component layers

- `components/ui/` — primitives, mostly Radix-wrapping, re-exported through [ui/index.ts](client/src/components/ui/index.ts). Import as `import { Button, Card } from "@/components/ui"`. Keep the barrel updated.
- `components/sections/home/` — one file per homepage band, composed in order by [(marketing)/page.tsx](client/src/app/(marketing)/page.tsx).
- `components/sections/shared/` — `DetailHero` + `DetailSections` (`ProblemSection`, `ApproachSection`, `FeatureGrid`, `TechStrip`, `RelatedGrid`, `SectionHeading`). Detail pages are assembled almost entirely from these; reuse rather than hand-rolling markup.
- `components/layout/` — Header, MegaMenu, MobileNav, Footer, AnnouncementBar, Breadcrumbs.
- `components/three/HeroScene.tsx` — the only Three.js surface.

Server components by default; `"use client"` only where interaction/animation demands it (providers, forms, mega menu, motion-heavy sections).

[Providers.tsx](client/src/components/providers/Providers.tsx) mounts once from the root layout: `ThemeProvider` → `MotionConfig reducedMotion="user"` → `TooltipProvider` → children + `Toaster`. `ThemeProvider` is deliberately light-only for v1 (Tailwind `darkMode: "class"` is already configured, so dark mode is a later switch, not a rewrite).

### Design system

Tokens are defined twice on purpose and must stay in sync: Tailwind theme extensions in [tailwind.config.ts](client/tailwind.config.ts) and CSS variables in [globals.css](client/src/app/globals.css).

- Semantic type scale, not raw Tailwind sizes: `text-display-72`, `text-h1-48` … `text-body-16`, `text-small-14` (each bakes in line-height/tracking/weight).
- Colors: `primary` (#0066FF), `secondary` (#00F5FF), `accent` (#6A0DAD), `dark`, `light`, each with a 50–900 ramp, plus `success`/`warning`/`error`.
- Fonts: `font-display` (Space Grotesk) for headings, `font-sans` (Inter) for body — loaded via `next/font` in the root layout as CSS variables.
- Elevation `shadow-elevation-xs…xl`, brand `shadow-glow-primary/secondary`, gradients `bg-gradient-blue-cyan` / `bg-gradient-blue-purple`, and custom utilities `text-gradient-blue-cyan`, `gradient-border`, `shimmer`, `text-balance`, `no-scrollbar`.
- Durations are the fixed set 150/250/350/500ms with `ease-out-expo` / `ease-in-out-expo`.

Layout goes through [Section.tsx](client/src/components/ui/Section.tsx) (`spacing` × `tone` × `containerSize` presets, wraps `Container` at max-width 1440px) rather than ad-hoc padding classes.

Icons are referenced **by string name** from data files and resolved through the fixed allowlist in [Icon.tsx](client/src/components/ui/Icon.tsx) (`IconName` union). A new icon must be added to both the import list and the `library` object there, or the type check fails. Some brand glyphs are absent from the installed `lucide-react` and come from `react-icons` imported directly at the use site.

Motion variants (`fadeUp`, `staggerParent`, `inViewOnce`, easings) are shared in [lib/motion.ts](client/src/lib/motion.ts); use those instead of inline variant objects. `prefers-reduced-motion` is honored twice — globally in `globals.css` and via `MotionConfig`.

## Reference documents

- [client/.claude/specs/TechnovateAI_INTERFACE_DESIGN.md](client/.claude/specs/TechnovateAI_INTERFACE_DESIGN.md) — the master UI/UX spec: sitemap, brand system, homepage section order, targets (WCAG 2.2 AA, Lighthouse >95, LCP <2.5s / CLS <0.1 / INP <200ms).
- [client/.claude/plan/UI_IMPLEMENTATION_PLAN.md](client/.claude/plan/UI_IMPLEMENTATION_PLAN.md) — phased build plan (Phases 0–9). Note its explicit scope guard: **UI only — no backend wiring, no form submissions, no auth, no API calls; mock data only.** Checkboxes in it were never ticked, so read the code, not the checkmarks, to tell what is done.

Conventions worth matching: JSDoc block at the top of each component/data module explaining its role, `React.HTMLAttributes`-extending prop types with a preset-map object (`spacingClass`, `toneClass`) rather than conditional strings, `cn()` from [lib/utils.ts](client/src/lib/utils.ts) for class merging, and double quotes / semicolons / 100-char width per [.prettierrc](client/.prettierrc).
