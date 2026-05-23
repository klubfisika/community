# Arsitektur Autentikasi — Shared Session Index ↔ Platform

> Dokumen ini menjelaskan bagaimana Index (arsip riset) dan Platform (sosial media) berbagi sesi pengguna melalui Community sebagai auth provider.

---

## Prinsip Dasar

1. **Community (Platform) adalah auth provider tunggal** — semua data user, session, dan profile tersimpan di Community DB
2. **Index tidak memiliki koneksi langsung ke Community DB** — semua validasi session via HTTP API
3. **Kedua aplikasi memiliki halaman login sendiri** — Index dengan profiling minimal, Platform dengan onboarding lengkap
4. **Cookie session dishare via domain** — production menggunakan `crossSubDomainCookies` di `.klubfisika.or.id`

## Arsitektur

```
┌──────────────────────────────────────────────────────────────────┐
│                     AUTH FLOW                                     │
│                                                                  │
│  Index (index.klubfisika.or.id)                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  hooks.server.ts                                           │  │
│  │    ↓                                                       │  │
│  │  fetch('https://platform.klubfisika.or.id/api/auth/        │  │
│  │         get-session', { headers: { cookie } })             │  │
│  │    ↓                                                       │  │
│  │  if (user) → event.locals.user = user                      │  │
│  │  if (session) → event.locals.session = session             │  │
│  │                                                            │  │
│  │  Login page: /auth/sign-in                                 │  │
│  │    → POST ke Community/api/auth/sign-in/email              │  │
│  │    → Community set cookie                                  │  │
│  │    → Redirect ke Index                                     │  │
│  └────────────────────────────────────────────────────────────┘  │
│                          │                                       │
│                          │ HTTP (fetch)                          │
│                          ▼                                       │
│  Platform (platform.klubfisika.or.id)                            │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Better Auth (full instance)                               │  │
│  │    • Email/password auth                                   │  │
│  │    • GitHub OAuth                                          │  │
│  │    • Session management                                    │  │
│  │    • Admin plugin                                          │  │
│  │    • Database hooks (auto-create profile)                  │  │
│  │                                                            │  │
│  │  API Routes: /api/auth/[...all]                            │  │
│  │    → toNodeHandler(betterAuth.handler)                     │  │
│  │                                                            │  │
│  │  Session config:                                           │  │
│  │    • expiresIn: 30 hari                                    │  │
│  │    • updateAge: 24 jam                                     │  │
│  │    • cookiePrefix: 'kf13'                                  │  │
│  │    • crossSubDomain: .klubfisika.or.id                     │  │
│  └────────────────────────────────────────────────────────────┘  │
│                          │                                       │
│                          ▼                                       │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Community DB (Neon)                                       │  │
│  │  Tabel: user, session, account, verification, profiles     │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

## Detail Implementasi

### Community Side (Platform — Qwik City)

**File**: `apps/platform/src/lib/auth.ts`

```typescript
// Better Auth instance — auth provider
export function getAuth() {
  return betterAuth({
    database: drizzleAdapter(getDb(), { provider: 'pg' }),
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: { enabled: true },
    socialProviders: { github: { ... } },
    session: {
      expiresIn: 30 * 24 * 60 * 60,
      updateAge: 24 * 60 * 60
    },
    advanced: {
      cookiePrefix: 'kf13',
      crossSubDomainCookies: {
        enabled: true,
        domain: '.klubfisika.or.id'
      }
    }
  });
}
```

**API Route**: `apps/platform/src/routes/api/auth/[...all]/index.ts`

Qwik City tidak memiliki first-party adapter Better Auth. Kami menggunakan `toNodeHandler()` untuk menjembatani Better Auth ke Qwik request handler.

```typescript
export const onRequest: RequestHandler = async (event) => {
  const auth = getAuth();
  const handler = toNodeHandler(auth.handler);
  // Adapt Qwik request/response ke Node.js request/response
  await handler(nodeReq, nodeRes);
};
```

**Route Loader**: `apps/platform/src/lib/router.ts`

```typescript
export const useAuth = routeLoader$(async (event) => {
  const auth = getAuth();
  const session = await auth.api.getSession({
    headers: event.request.headers
  });
  return session?.user ?? null;
});
```

### Index Side (SvelteKit)

**File**: `apps/index/src/lib/server/auth.ts`

```typescript
const AUTH_ORIGIN = env.AUTH_ORIGIN || 'https://platform.klubfisika.or.id';

export async function getSessionFromCommunity(headers: Headers) {
  const response = await fetch(`${AUTH_ORIGIN}/api/auth/get-session`, {
    headers: { cookie: headers.get('cookie') || '' }
  });
  const data = await response.json();
  return { user: data?.user ?? null, session: data?.session ?? null };
}
```

**File**: `apps/index/src/hooks.server.ts`

```typescript
const handleAuth: Handle = async ({ event, resolve }) => {
  const { user, session } = await getSessionFromCommunity(event.request.headers);
  if (user && session) {
    event.locals.user = user;
    event.locals.session = session;
  }
  return resolve(event);
};
```

## Environment Variables

### Community (Platform)

```env
DATABASE_URL="postgresql://..."     # Community DB (auth + users + social)
BETTER_AUTH_SECRET="32-char..."     # SAMA dengan secret Index
ORIGIN="http://localhost:5173"      # atau https://platform.klubfisika.or.id
GITHUB_CLIENT_ID="..."              # Optional — GitHub OAuth
GITHUB_CLIENT_SECRET="..."          # Optional
```

### Index

```env
DATABASE_URL="postgresql://..."     # Index DB (research data only)
AUTH_ORIGIN="http://localhost:5173" # Community origin untuk session validation
ORIGIN="http://localhost:5173"      # Index origin (beda port di dev)
```

> **Catatan**: Index TIDAK membutuhkan `BETTER_AUTH_SECRET` — auth secret hanya ada di Community. Index tidak memiliki instance Better Auth sendiri.

## Development

Untuk development lokal, kedua aplikasi berjalan di port berbeda:

```bash
# Terminal 1: Community (auth provider)
bun run dev:platform    # → http://localhost:5173

# Terminal 2: Index (auth consumer)
bun run dev:index       # → http://localhost:5174 (beda port)

# Index .env:
AUTH_ORIGIN="http://localhost:5173"
```

Saat development, cookie cross-subdomain tidak berfungsi karena keduanya di `localhost`. Gunakan port berbeda dan Index mengarahkan `AUTH_ORIGIN` ke port Community.

## Production

Di production, kedua aplikasi di-deploy ke Vercel di subdomain berbeda dari parent domain yang sama:

```
platform.klubfisika.or.id  (Community — auth provider)
index.klubfisika.or.id     (Index — auth consumer)
```

Cookie Better Auth diset dengan `crossSubDomainCookies.domain: '.klubfisika.or.id'` sehingga bisa dibaca oleh kedua subdomain.

## Login Flow

1. User membuka `index.klubfisika.or.id/auth/sign-in`
2. Form login di Index POST ke `https://platform.klubfisika.or.id/api/auth/sign-in/email`
3. Community (Better Auth) memvalidasi kredensial, membuat session, menyimpan di Community DB
4. Better Auth meng-set cookie `kf13.session_token` di domain `.klubfisika.or.id`
5. Response dikembalikan ke Index, user di-redirect
6. Request berikutnya ke Index → `hooks.server.ts` → `fetch(get-session)` → cookie terbaca → user terautentikasi

## Keamanan

- Cookie `httpOnly: true` — tidak bisa diakses JavaScript
- Cookie `secure: true` di production — hanya via HTTPS
- Cookie `sameSite: 'lax'` — mencegah CSRF
- Session expiry: 30 hari dengan refresh setiap 24 jam
- Admin plugin untuk manajemen user dan impersonation
- `trustedOrigins` whitelist untuk mencegah unauthorized origins
