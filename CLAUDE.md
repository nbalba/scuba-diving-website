# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start development server (Next.js, hot reload on http://localhost:3000)
- `npm run build` — Production build
- `npm start` — Serve production build (run `npm run build` first)
- `npm run lint` — Run ESLint (flat config: `eslint-config-next/core-web-vitals` + `typescript`)

No test framework is configured.

## Architecture

**Next.js 16 App Router** site for "DeepBlue Diving", a scuba diving trip booking website. Uses React 19, TypeScript (strict), and Tailwind CSS v4.

### Data Layer (Hybrid: Static + Salesforce)

Static data in `src/data/` serves as the default and fallback. When `NEXT_PUBLIC_USE_SALESFORCE=true`, the app fetches from Salesforce REST API instead.

**Static data** (`src/data/`): `destinations.ts`, `trips.ts`, `blog-posts.ts`, `testimonials.ts` — typed arrays with lookup helpers (e.g. `getDestinationBySlug()`). Trips reference destinations via `destinationSlug`.

**Salesforce integration** (`src/lib/salesforce/`):
- `config.ts` — env-based config, `USE_SALESFORCE` feature flag
- `auth.ts` — OAuth 2.0 Authorization Code + PKCE flow for Salesforce Communities
- `client.ts` — Generic REST API functions: `sfQuery`, `sfCreate`, `sfUpdate`, `sfDelete`
- `mappers.ts` — Bidirectional mappers between Salesforce field names and app types
- `queries.ts` — SOQL query functions for each object type
- `AuthContext.tsx` — React context providing `accessToken`, `login()`, `logout()`, `handleCallback()`

**Data fetching hook** (`src/hooks/useSalesforceQuery.ts`): Takes a Salesforce fetcher and static fallback; returns `{ data, loading, error }`. Falls back to static data when Salesforce is disabled or on error.

Types for all data models are in `src/lib/types.ts`. This includes `BookingFormData` and `ContactFormData` for forms.

### Routing

Pages use the App Router in `src/app/`:
- `/destinations` (list) and `/destinations/[slug]` (detail with `generateStaticParams`)
- `/trips/[slug]` (detail with `generateStaticParams`)
- `/blog` (list) and `/blog/[slug]` (detail)
- `/booking` — booking form, accepts `?trip=<slug>` query param to preselect
- `/contact`, `/about`, `/not-found.tsx`
- `/auth/login`, `/auth/callback`, `/auth/signup` — Salesforce OAuth flow
- `/admin` — Dashboard with sub-pages for destinations, trips, blog, testimonials, bookings, contacts (auth-gated)
- `/api/auth/token`, `/api/auth/userinfo` — Server-side proxies to Salesforce OAuth endpoints (avoids CORS)

Dynamic route pages use `params: Promise<{ slug: string }>` (Next.js 16 async params pattern).

### Components

- `src/components/ui/` — Reusable primitives: `Button` (supports `href` prop for link rendering, variants: primary/secondary/outline/coral), `Container`, `SectionHeading`, `Badge`
- `src/components/layout/` — `Navbar` and `Footer` (rendered in root layout, navbar is fixed with `pt-16` offset on main)
- `src/components/home/` — Homepage sections (Hero, FeaturedDestinations, WhyChooseUs, etc.)
- `src/components/destinations/`, `trips/`, `blog/`, `booking/`, `contact/` — Page-specific components

- `src/components/admin/` — `AdminTable` reusable table component for admin CRUD pages

Client components (`"use client"`) are used for interactive/data-fetching: `Navbar`, `BookingForm`, `ContactForm`, `FeaturedDestinations`, `FeaturedTrips`, `Testimonials`, `DestinationsList`, `BlogList`, all admin pages, and auth pages.

### Styling

Tailwind CSS v4 with `@theme` custom color scales defined in `globals.css`:
- `ocean-*` (blues) — primary palette, used for text, backgrounds, gradients
- `deep-*` (teals) — secondary accent
- `sand-*` (yellows) — warm tones
- `coral-*` (oranges) — CTA buttons and highlights

Uses `clsx` via `cn()` helper in `src/lib/utils.ts` for conditional class merging. Inter font loaded via `next/font/google`. Icons from `lucide-react`.

### Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json).

### Salesforce Setup

Requires a Salesforce Developer org with:
- Custom objects: `Destination__c`, `Trip__c`, `Blog_Post__c`, `Testimonial__c`, `Booking__c`, `Contact_Submission__c`
- Connected App with OAuth (Authorization Code + PKCE) and CORS allowed origins
- Experience Cloud (Communities) for customer authentication
- Seed data via `npx tsx scripts/seed-salesforce.ts` (needs `SF_ACCESS_TOKEN` and `SF_INSTANCE_URL` env vars)

Environment variables are in `.env.local` — set `NEXT_PUBLIC_USE_SALESFORCE=true` to activate.

### Images

Static images live in `public/images/`. Currently only `destinations/` has real images; `trips/` and `blog/` directories need placeholder or real images to display properly.
