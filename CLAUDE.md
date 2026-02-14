# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start development server (Next.js, hot reload on http://localhost:3000)
- `npm run build` — Production build
- `npm run lint` — Run ESLint (`eslint` with flat config)

No test framework is configured.

## Architecture

**Next.js 16 App Router** site for "DeepBlue Diving", a scuba diving trip booking website. Uses React 19, TypeScript (strict), and Tailwind CSS v4.

### Data Layer

All data is static — no database or API. Content lives in `src/data/` as typed arrays with lookup helpers:
- `destinations.ts` — `Destination[]` with `getDestinationBySlug()`, `getFeaturedDestinations()`
- `trips.ts` — `Trip[]` with `getTripBySlug()`, `getTripsByDestination()`, `getFeaturedTrips()`. Trips reference destinations via `destinationSlug`.
- `blog-posts.ts`, `testimonials.ts` — static content arrays

Types for all data models are in `src/lib/types.ts`. This includes `BookingFormData` and `ContactFormData` for forms.

### Routing

Pages use the App Router in `src/app/`:
- `/destinations` (list) and `/destinations/[slug]` (detail with `generateStaticParams`)
- `/trips/[slug]` (detail with `generateStaticParams`)
- `/blog` (list) and `/blog/[slug]` (detail)
- `/booking` — booking form, accepts `?trip=<slug>` query param to preselect
- `/contact`, `/about`, `/not-found.tsx`

Dynamic route pages use `params: Promise<{ slug: string }>` (Next.js 16 async params pattern).

### Components

- `src/components/ui/` — Reusable primitives: `Button` (supports `href` prop for link rendering, variants: primary/secondary/outline/coral), `Container`, `SectionHeading`, `Badge`
- `src/components/layout/` — `Navbar` and `Footer` (rendered in root layout, navbar is fixed with `pt-16` offset on main)
- `src/components/home/` — Homepage sections (Hero, FeaturedDestinations, WhyChooseUs, etc.)
- `src/components/destinations/`, `trips/`, `blog/`, `booking/`, `contact/` — Page-specific components

Client components (`"use client"`) are used only where needed: `Navbar`, `BookingForm`, `ContactForm`.

### Styling

Tailwind CSS v4 with `@theme` custom color scales defined in `globals.css`:
- `ocean-*` (blues) — primary palette, used for text, backgrounds, gradients
- `deep-*` (teals) — secondary accent
- `sand-*` (yellows) — warm tones
- `coral-*` (oranges) — CTA buttons and highlights

Uses `clsx` via `cn()` helper in `src/lib/utils.ts` for conditional class merging. Inter font loaded via `next/font/google`. Icons from `lucide-react`.

### Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json).
