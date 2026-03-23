# Agent Guidelines — react-ecommerce Monorepo

## Monorepo Rules

- **Package manager:** pnpm only. Never use npm or yarn.
- **Task runner:** Turborepo (`turbo`). Run tasks from the repo root when possible.
- **Workspace protocol:** Use `workspace:*` for all internal package dependencies.
- When adding a new shared package, register it in `pnpm-workspace.yaml` and add it to `packages/`.

## App-specific Rules

### apps/client (Next.js 16)
@apps/client/AGENTS.md

### apps/admin (Vite + React)
- This is a SPA. Do not use SSR or server-only APIs.
- Tailwind is loaded via the `@tailwindcss/vite` plugin — no PostCSS config needed.
- `@commerce/tailwind-config` does not exist yet. Create it in `packages/tailwind-config/` before using it.

### apps/server (NestJS 11)
- Follow NestJS module structure: one folder per feature with `*.module.ts`, `*.controller.ts`, `*.service.ts`.
- CORS is already configured for `localhost:3000` and `localhost:3001`. Update `main.ts` if ports change.
- No database is connected yet. When adding one, prefer using `@nestjs/typeorm` or `@nestjs/mongoose` as a NestJS module.

## Shared Packages (`packages/`)

- `@commerce/ui` — shared React components. Mark components `"use client"` for Next.js compatibility.
- `@commerce/typescript-config` — extend these in app-level `tsconfig.json` files, do not duplicate settings.
- `@commerce/eslint-config` — import the right preset (`base`, `next`, or `react-vite`) per app.

## Component & State Patterns

Follow these rules when building any React component in this repo:

@rules/avoid-boolean-props.md
@rules/explicit-variants.md
@rules/compound-components.md
@rules/lift-state.md

## Code Style

- TypeScript strict mode everywhere.
- No `any` types without a comment explaining why.
- Keep components small and focused. Extract shared logic into `packages/ui` or a new shared package.
- Do not commit generated files (`dist/`, `.next/`, `node_modules/`).

## What Does Not Exist Yet (build these before using)

- `@commerce/tailwind-config` package
- Database / ORM layer
- Authentication
- Any ecommerce domain logic (products, cart, orders, users)
