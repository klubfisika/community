# Arsitektur KF13 Community Platform

> Dokumen ini menjelaskan arsitektur teknis monorepo KF13 Community Platform — bagaimana Index (arsip riset), Platform (sosial media), dan shared packages bekerja bersama.

---

## Gambaran Umum

KF13 Community Platform terdiri dari dua aplikasi yang berbagi satu identitas pengguna:

```
┌─────────────────────────────────────────────────────────────┐
│              github.com/openriset/community                  │
│                   (monorepo root)                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  apps/index                  apps/platform                  │
│  ┌──────────────────┐       ┌──────────────────────┐       │
│  │  SvelteKit 2     │       │  Qwik City            │       │
│  │  Drizzle ORM     │       │  Better Auth (full)   │       │
│  │  Paraglide i18n  │       │  Tailwind CSS 4       │       │
│  │  Tailwind CSS 4  │       │  KaTeX · Mermaid      │       │
│  │                  │       │                        │       │
│  │  ARSIP RISET     │       │  PLATFORM SOSIAL      │       │
│  │  • indeks karya  │       │  • feed & diskusi     │       │
│  │  • verifikasi    │◄──────┤  • proyek kolaborasi  │       │
│  │  • sitasi        │ auth  │  • gamifikasi kaskus  │       │
│  │  • portofolio    │  API  │  • onboarding         │       │
│  └──────────────────┘       └──────────────────────┘       │
│          │                           │                      │
│          ▼                           ▼                      │
│  ┌──────────────────┐       ┌──────────────────────┐       │
│  │  Index DB (Neon) │       │  Community DB (Neon) │       │
│  │  research_works  │       │  user, session,      │       │
│  │  authors, tags   │       │  profiles, posts     │       │
│  │  citations, ...  │       │  projects, ...       │       │
│  └──────────────────┘       └──────────────────────┘       │
│                                                             │
│  packages/                                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  @kf13/auth · @kf13/db · (future: @kf13/types, ...) │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Repositori

Monorepo menggunakan **git submodules** — setiap aplikasi memiliki repositori terpisah untuk manajemen issue yang fokus:

| Path | Repository | Framework | Deploy |
|---|---|---|---|
| `apps/index` | `github.com/klubfisika/index` | SvelteKit 2 · Svelte 5 runes | Vercel → `index.klubfisika.or.id` |
| `apps/platform` | `github.com/klubfisika/platform` | Qwik City | Vercel → `platform.klubfisika.or.id` |
| `packages/auth` | (dalam monorepo) | Shared Better Auth config | — |
| `packages/db` | (dalam monorepo) | Shared Drizzle helpers | — |

**Alasan submodules**: Setiap aplikasi memiliki domain dan lifecycle yang berbeda. Issue di Index (bug upload karya) tidak relevan untuk maintainer Platform (bug feed sosial). Dengan repositori terpisah, setiap tim bisa fokus pada domain masing-masing.

## Database

**Dua database Neon PostgreSQL terpisah**:

| Database | Pengguna | Tabel Utama |
|---|---|---|
| Community DB | Platform (auth provider) | `user`, `session`, `account`, `verification`, `profiles`, `posts`, `projects`, `reactions` |
| Index DB | Index (research data) | `research_works`, `authors`, `categories`, `tags`, `citations`, `verifications`, `reviews`, `files`, `competitions`, `mentorships` |

**Alasan pemisahan**: 
- Auth dan data sosial adalah tanggung jawab Community
- Data riset adalah tanggung jawab Index
- Index tidak boleh hardcode koneksi ke DB Community — semua interaksi auth via API

## Autentikasi

Lihat [AUTH.md](./AUTH.md) untuk detail lengkap.

**Ringkasan**: Community (Platform) adalah **auth provider**. Index mengkonsumsi session via API call ke `/api/auth/get-session`. Kedua aplikasi memiliki halaman login sendiri: Index dengan profiling minimal, Platform dengan onboarding lengkap.

## Development

Lihat [DEVELOPMENT.md](./DEVELOPMENT.md) untuk setup workflow.

```bash
bun run dev:index      # bun --cwd apps/index run dev
bun run dev:platform   # bun --cwd apps/platform run dev
```

---

## Keputusan Teknis

Lihat [DECISIONS.md](./DECISIONS.md) untuk log keputusan arsitektur dan rationale di balik setiap pilihan teknis.
