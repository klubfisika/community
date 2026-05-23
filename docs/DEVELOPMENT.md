# Development Workflow

> Panduan setup dan workflow development untuk KF13 Community Platform monorepo.

---

## Prasyarat

- **bun** ≥ 1.x — package manager utama
- **Node.js** ≥ 22 — untuk Qwik
- Akun **Neon** (PostgreSQL serverless) — 2 database: Index + Community
- **GitHub** — untuk clone dengan submodules

## Clone

```bash
git clone --recurse-submodules git@github.com:openriset/community.git
cd community
```

Jika lupa `--recurse-submodules`:
```bash
git submodule update --init --recursive
```

## Setup Database

Buat 2 database di [Neon](https://neon.tech):

1. **Community DB** — untuk auth, user, profiles, posts
2. **Index DB** — untuk research_works, authors, citations, dll

Copy connection string masing-masing ke `.env`:

```bash
# apps/index/.env
DATABASE_URL="postgresql://.../IndexDB"
AUTH_ORIGIN="http://localhost:5173"
ORIGIN="http://localhost:5173"

# apps/platform/.env.local
DATABASE_URL="postgresql://.../CommunityDB"
BETTER_AUTH_SECRET="super-secret-32-character-key-here"
ORIGIN="http://localhost:5173"
```

## Push Schema

```bash
# Index DB — research schema (21 tabel)
cd apps/index
bun install
bun run auth:schema    # Generate Better Auth schema
bun run db:push        # Push ke Index DB

# Community DB — Better Auth auto-manage di first run
cd ../platform
bun install
# Better Auth akan auto-create tabel user, session, account saat first run
```

## Development

```bash
# Dari root monorepo:
bun run dev:platform   # Community → http://localhost:5173
bun run dev:index      # Index → http://localhost:5173
```

Keduanya berjalan di port yang sama untuk development karena cookie cross-subdomain tidak berfungsi di `localhost`. Index mengarahkan `AUTH_ORIGIN` ke port Community.

## Perintah

### Root Monorepo

| Perintah | Deskripsi |
|---|---|
| `bun run dev:index` | Jalankan Index dev server |
| `bun run dev:platform` | Jalankan Platform dev server |
| `bun run build:index` | Build Index untuk production |
| `bun run build:platform` | Build Platform untuk production |
| `bun run check` | TypeScript check Index |

### Index (apps/index)

| Perintah | Deskripsi |
|---|---|
| `bun run dev` | Dev server |
| `bun run build` | Production build |
| `bun run check` | TypeScript check |
| `bun run lint` | Prettier + ESLint |
| `bun run test:unit` | Vitest |
| `bun run test:e2e` | Playwright |
| `bun run db:push` | Push schema ke DB |
| `bun run db:generate` | Generate migration |
| `bun run db:studio` | Drizzle Studio (GUI) |

### Platform (apps/platform)

| Perintah | Deskripsi |
|---|---|
| `bun run dev` | Dev server |
| `bun run build` | Production build |
| `bun run preview` | Preview production build |

## Struktur Direktori

```
community/
├── apps/
│   ├── index/                    # github.com/klubfisika/index (submodule)
│   │   ├── src/
│   │   │   ├── lib/server/
│   │   │   │   ├── auth.ts       # getSessionFromCommunity()
│   │   │   │   └── db/           # Drizzle schema + client
│   │   │   ├── routes/
│   │   │   │   ├── +page.svelte  # Homepage
│   │   │   │   ├── +page.server.ts
│   │   │   │   ├── upload/       # Form unggah karya
│   │   │   │   ├── karya/        # Browse + detail karya
│   │   │   │   └── profil/       # Profil peneliti
│   │   │   └── hooks.server.ts
│   │   └── .env                  # DATABASE_URL, AUTH_ORIGIN
│   │
│   └── platform/                 # github.com/klubfisika/platform (submodule)
│       ├── src/
│       │   ├── lib/
│       │   │   ├── auth.ts       # Better Auth instance
│       │   │   ├── db.ts         # DB client
│       │   │   └── router.ts     # useAuth() route loader
│       │   └── routes/
│       │       └── api/auth/     # Better Auth API handler
│       └── .env.local            # DATABASE_URL, BETTER_AUTH_SECRET
│
├── packages/
│   ├── auth/                     # @kf13/auth — shared auth config
│   └── db/                       # @kf13/db — shared DB helpers
│
├── docs/
│   ├── ARCHITECTURE.md           # Arsitektur overview
│   ├── AUTH.md                   # Detail auth architecture
│   ├── DEVELOPMENT.md            # (ini)
│   └── DECISIONS.md              # Log keputusan teknis
│
└── .gitmodules
```

## Commit Convention

```
feat: Fitur baru
fix: Bugfix
refactor: Restrukturisasi kode
docs: Dokumentasi
chore: Maintenance
db: Database schema
auth: Autentikasi
ci: CI/CD
```

## Workflow Submodule

Saat mengubah kode di dalam submodule (`apps/index` atau `apps/platform`):

```bash
# 1. Commit di dalam submodule
cd apps/index
git add -A
git commit -m "feat: deskripsi"
git push origin main

# 2. Update referensi submodule di monorepo parent
cd ../..  # kembali ke root monorepo
git add apps/index
git commit -m "chore: update apps/index submodule"
git push origin main
```

## Environment Variables

### Index (.env)

| Variable | Deskripsi | Contoh |
|---|---|---|
| `DATABASE_URL` | Index research database | `postgresql://...` |
| `AUTH_ORIGIN` | Community origin (auth API) | `http://localhost:5173` |
| `ORIGIN` | Index origin | `http://localhost:5173` |

### Platform (.env.local)

| Variable | Deskripsi | Contoh |
|---|---|---|
| `DATABASE_URL` | Community database (auth + users) | `postgresql://...` |
| `BETTER_AUTH_SECRET` | Secret untuk session encryption | `32-char-random` |
| `ORIGIN` | Platform origin | `http://localhost:5173` |
| `GITHUB_CLIENT_ID` | (Optional) GitHub OAuth | `...` |
| `GITHUB_CLIENT_SECRET` | (Optional) | `...` |

## Testing

### Index

```bash
cd apps/index
bun run test:unit     # Vitest
bun run test:e2e      # Playwright
bun run storybook     # Storybook
```

### Platform

```bash
cd apps/platform
bun run preview       # Preview production build
```

## Deployment

Kedua aplikasi di-deploy ke **Vercel** sebagai project terpisah:

| Project | Domain | Framework |
|---|---|---|
| `kf13-community` | `platform.klubfisika.or.id` | Qwik City |
| `kf13-index` | `index.klubfisika.or.id` | SvelteKit |

### Vercel Config

**Index** (`@sveltejs/adapter-vercel` — auto-configured):
- Build command: `bun run build`
- Output directory: `.svelte-kit/vercel`
- Environment: `DATABASE_URL`, `AUTH_ORIGIN`

**Platform** (`vercel.json`):
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json"
}
```
- Build command: `bun run build`
- Output directory: `dist`
- Environment: `DATABASE_URL`, `BETTER_AUTH_SECRET`
