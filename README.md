# LogiSight

LogiSight is a logistics management platform for the Kenyan market. It provides role-based interfaces for senders, drivers, pickup agents, and admins, covering the full parcel lifecycle from booking to delivery with real-time status tracking.

See [ARCHITECTURE.md](ARCHITECTURE.md) for how this frontend fits together with the [logisights-be](https://github.com/LogiSights/logisights-be) API.

## Stack

- [Next.js](https://nextjs.org) (App Router) with TypeScript
- [Tailwind CSS](https://tailwindcss.com) with a token-driven theme (light/dark)
- [shadcn/ui](https://ui.shadcn.com) on top of Radix primitives
- [lucide-react](https://lucide.dev) for icons
- [Recharts](https://recharts.org) for analytics charts
- [Framer Motion](https://motion.dev) for interface and scroll animation
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) for form validation
- [Sonner](https://sonner.emilkowal.ski) for toasts

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project structure

```
src/
  app/            route segments (marketing, auth, dashboard)
  components/
    ui/           design system primitives
    shared/       navbar, sidebar, data table, stat card, etc.
    landing/      landing page sections
    dashboard/    role-specific dashboard widgets
  lib/
    auth/         auth context, role/route mapping, storage
    mock/         seed data for parcels, users, and stats
    utils.ts
  types/          shared domain models
  hooks/          theme, media query, reduced-motion hooks
```

## Roles

| Role   | Route      |
|--------|------------|
| Sender | `/sender`  |
| Driver | `/driver`  |
| Pickup | `/pickup`  |
| Admin  | `/admin`   |

Dashboard routes are gated by role, with the mapping defined in `src/lib/auth/roles.ts`.

## Scripts

```bash
npm run dev            # start the dev server
npm run build           # production build
npm run lint             # lint the project
npm run test              # run the test suite once
npm run test:watch         # run tests in watch mode
npm run test:coverage       # run tests with the coverage gate
```

## Testing

Unit tests (Vitest + React Testing Library) live alongside the code they cover in `src/lib/**/*.test.ts(x)`. The coverage gate targets `src/lib/**` (the schemas, auth context, storage, and tracking/pricing logic), not presentational components or routes, since that is where the business rules live. Current gate: 90% statements/lines/functions, 85% branches.

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs lint, the test suite with the coverage gate, and a production build on every push and pull request against `main`.
