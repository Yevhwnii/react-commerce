# Skills — react-ecommerce Monorepo

Reusable task recipes for AI agents and developers working in this repo.

---

## Dev & Build

### Start all apps in dev mode
```bash
pnpm dev
```
Runs client (:3000), admin (:3001), and server (:3002) in parallel via Turborepo.

### Start a single app
```bash
pnpm --filter client dev
pnpm --filter admin dev
pnpm --filter server start:dev
```

### Build everything
```bash
pnpm build
```

### Lint everything
```bash
pnpm lint
```

---

## Adding a New Shared Package

1. Create `packages/<name>/package.json` with `"name": "@commerce/<name>"`.
2. Add the entry to `pnpm-workspace.yaml` if not already covered by `packages/*`.
3. Add `"@commerce/<name>": "workspace:*"` to the consuming app's `package.json`.
4. Run `pnpm install` from the repo root.

### Example: create `@commerce/tailwind-config`
```
packages/tailwind-config/
  package.json     → name: "@commerce/tailwind-config"
  base.js          → exports a Tailwind preset object
  package.json     → main: "base.js"
```

---

## Adding a NestJS Feature Module

```bash
cd apps/server
npx nest g module <name>
npx nest g controller <name>
npx nest g service <name>
```
Register the new module in `app.module.ts` imports.

---

## Adding a New Shared UI Component

1. Create `packages/ui/src/<ComponentName>.tsx`.
2. Add `"use client"` at the top (required for Next.js App Router compatibility).
3. Export it from the file directly — consumers import as `@commerce/ui/<ComponentName>`.

---

## Adding a Database (NestJS)

Preferred approach — TypeORM with PostgreSQL:
```bash
cd apps/server
pnpm add @nestjs/typeorm typeorm pg
```
Configure `TypeOrmModule.forRoot(...)` in `app.module.ts`.
Keep DB credentials in `.env`, never hardcoded.

---

## Environment Variables

- Server reads `process.env.PORT` (defaults to 3002).
- Add app-level `.env` files inside each app directory.
- Never commit `.env` files — they are gitignored.

---

## Port Reference

| App    | Port |
|--------|------|
| client | 3000 |
| admin  | 3001 |
| server | 3002 |

---

## Common Gotchas

- **Next.js 16** has breaking changes from earlier versions. Read `node_modules/next/dist/docs/` before writing Next.js code.
- **`@commerce/tailwind-config`** is referenced by `apps/admin` but not yet created. Build it before running the admin app in a fresh install.
- Turborepo caches `build` outputs. Run `turbo build --force` to bypass the cache.
- NestJS `test:e2e` uses a separate jest config at `apps/server/test/jest-e2e.json` (currently deleted — recreate if needed).
