# KF13 Community Platform

Monorepo untuk platform komunitas Klub Fisika Indonesia.

## Struktur

```
kf13-community/
├── apps/
│   ├── platform/   → github.com/klubfisika/platform  (Qwik City — sosial media)
│   └── index/      → github.com/klubfisika/index     (SvelteKit — arsip riset)
└── packages/       (shared: auth, types, utils)
```

## Clone

```bash
git clone --recurse-submodules git@github.com:klubfisika/community.git
```

## Development

```bash
# Init semua submodule
git submodule update --init --recursive

# Jalankan platform (sosial media)
cd apps/platform && bun install && bun run dev

# Jalankan index (arsip riset)
cd apps/index && bun install && bun run dev
```

## Repositori

| Path | Repo | Stack | Deskripsi |
|---|---|---|---|
| `apps/platform` | [klubfisika/platform](https://github.com/klubfisika/platform) | Qwik City + Neon | Platform sosial media & komunitas |
| `apps/index` | [klubfisika/index](https://github.com/klubfisika/index) | SvelteKit + Drizzle | Arsip riset terpadu (SINTA for K-12) |
