# LogiSight Frontend Plan

## Context

LogiSight is a logistics platform for the Kenyan market with role-based interfaces for senders, drivers, pickup agents, and admins. The frontend moved from Angular 16 to Next.js (App Router, TypeScript, Tailwind), matching the stack already used by the team's other projects. This is a visual/UX rebuild: mocked data and model shapes carry over unchanged so a real backend can be wired in later.

Key decisions:

- **React/Next.js**, not an Angular upgrade — full rewrite of every page and component.
- **Cinematic/scroll-driven design applies only to the public landing page.** Dashboards and auth screens stay clean and data-dense, with standard motion (fades, subtle transitions) — no parallax or scroll-jacking, since these are working tools.
- **Visual/UX only** — mocked data and the existing model shapes (`User`, `Role`, `Parcel`, `Stat`) are preserved. RBAC-guard behavior is replicated faithfully.
- **No emojis.** Single icon system: `lucide-react`.
- **Mobile-first, fully responsive** on every screen.
- Design inspiration: Flexport's dense, data-first dashboard philosophy; calm/operational logistics-SaaS landing patterns for the marketing site.
- A **Quarkus + PostgreSQL + Keycloak backend** (repo: `logisights-BE`) is planned as a separate follow-up effort once this frontend is stable. Out of scope here.

## Workflow

Branch-per-logical-chunk: each unit of work gets its own branch, a PR against `main` in `LogiSights/logisights-FE`, and a squash-merge, rather than one large branch. Conventional commit messages, no trailers/em dashes/test-plan boilerplate in commits or PR bodies.

## Status

### Done

- Next.js scaffold: App Router, TypeScript, Tailwind v4, design tokens ported from the original SCSS variables (light/dark via `[data-theme]`), Sora + IBM Plex Sans via `next/font`
- Design system: shadcn/Radix primitives (Button, Dialog, DropdownMenu, Select, Tabs, Tooltip, Sheet, Switch, Badge, Avatar, Input, Label) plus hand-rolled shared components (StatCard, StatusBadge, DataTable, Sidebar, Navbar)
- Auth + RBAC: `AuthContext` replicating the mock `AuthService` (simulated login delay, localStorage persistence, role switching), route-gated dashboard shell, login/register forms with `react-hook-form` + `zod`
- Login page redesign: split-screen hero with a floating illustration, gradient background, trust stats, form in its own card
- All four role dashboards: Pickup, Driver, Sender (+ booking wizard + parcel tracker), Admin (charts via Recharts, users table)
- Toast notifications repositioned (bottom-right) with a 5-second auto-dismiss
- Slide-in detail panels (matching a reference "order details" pattern) on the primary table/list of every dashboard, built on a shared `DetailSheet` component
- Status filtering on the sender parcel history table, consolidated to a single search bar (no duplicate search inputs)
- Public landing page (`/`) with the cinematic/scroll-driven treatment: parallax hero with a live dashboard preview, pinned "how it works" scrub timeline mirroring the real `ParcelStatus` flow, platform feature showcase, trust stats, role-based CTA cards. Built with `framer-motion` (already a project dependency) rather than the epic-design skill's default GSAP/vanilla-HTML template, to stay idiomatic to this Next.js codebase. Mobile fallback disables the pinned scrub section and respects `prefers-reduced-motion`. Flat colors throughout, no gradients or em dashes in copy per design direction.

### Remaining

- Testing: Vitest + React Testing Library for shared components and auth logic, integration tests for the RBAC guard and booking wizard, a narrow Playwright smoke suite
- Backend integration is explicitly out of scope for this effort (see `logisights-BE`, planned separately)

## Repo / workflow notes

- Repo: `LogiSights/logisights-FE` (GitHub), `main` branch
- Every change ships as its own branch → PR → squash-merge; branches are deleted after merge
- `npm run dev|build|lint` for local verification; changes are checked in a real browser (Chrome via the `claude-in-chrome` extension) before merging, not just by build/lint passing
