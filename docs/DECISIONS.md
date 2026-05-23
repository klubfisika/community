# Technical Decisions Log

> Catatan keputusan arsitektur dan teknis beserta rationale. Diperbarui setiap ada keputusan signifikan.

---

## 1. Dua Database Terpisah (Community DB ≠ Index DB)

**Keputusan**: Community (Platform) dan Index menggunakan database Neon PostgreSQL yang berbeda.

**Rationale**:
- Auth dan data sosial adalah tanggung jawab Community — tidak boleh tercampur dengan data riset
- Index adalah arsip riset murni — schema-nya independen dari schema sosial
- Kalau satu DB down, aplikasi lain tetap berjalan
- Scaling independen: Index mungkin perlu query full-text search yang intensif, Community perlu write-heavy untuk feed sosial
- Security boundary: Index tidak boleh akses data user/password Community, begitu juga sebaliknya

**Alternatif yang dipertimbangkan**: Satu DB shared dengan schema prefix. Ditolak karena coupling terlalu tinggi dan melanggar domain separation.

## 2. Community sebagai Auth Provider, Index Konsumsi via API

**Keputusan**: Community (Platform) menjalankan Better Auth sebagai auth provider. Index memvalidasi session via HTTP call ke `/api/auth/get-session`, bukan koneksi DB langsung.

**Rationale**:
- Single source of truth untuk data user — hanya Community yang punya akses ke tabel `user`
- Index tidak perlu tahu struktur DB Community — cukup tahu API contract
- Kalau auth provider ganti di masa depan (mis: Ory, Clerk), Index tidak perlu diubah
- Index tidak butuh Better Auth instance sendiri — mengurangi dependency dan attack surface

**Alternatif yang dipertimbangkan**: Index menjalankan Better Auth sendiri dengan koneksi ke Community DB. Ditolak karena Index hardcode koneksi ke DB Community — melanggar "jangan hardcode DB" principle.

## 3. Git Submodules, Bukan Monorepo Tools (Turborepo/Nx)

**Keputusan**: Menggunakan git submodules untuk `apps/index` dan `apps/platform`, bukan monorepo tools seperti Turborepo atau Nx.

**Rationale**:
- Index dan Platform adalah proyek berbeda dengan framework berbeda (SvelteKit vs Qwik) — tidak ada shared build pipeline
- Setiap aplikasi punya lifecycle release independen — tidak pernah di-build atau di-deploy bersamaan
- Submodule memungkinkan issue tracking terpisah: bug di Index → `klubfisika/index/issues`, bug di Platform → `klubfisika/platform/issues`
- Developer bisa clone dan bekerja di satu aplikasi tanpa harus clone seluruh monorepo
- Monorepo hanya digunakan untuk koordinasi dokumentasi dan shared packages

**Alternatif yang dipertimbangkan**: Turborepo dengan shared pipeline. Ditolak karena overengineering — tidak ada shared build step antara SvelteKit dan Qwik.

## 4. Better Auth, Bukan Auth.js/NextAuth atau Clerk

**Keputusan**: Menggunakan Better Auth sebagai auth framework.

**Rationale**:
- First-class Drizzle adapter — satu stack ORM dari hulu ke hilir
- SvelteKit native integration via `sveltekitCookies()` plugin
- Cross-subdomain cookie support built-in — kritis untuk arsitektur multi-app kami
- Admin plugin untuk user management tanpa perlu bikin sendiri
- Lebih ringan dari Auth.js, lebih murah dari Clerk, lebih fleksibel dari Supabase Auth
- Tidak ada vendor lock-in — semua data di DB sendiri

**Alternatif yang dipertimbangkan**:
- Auth.js/NextAuth — terlalu SvelteKit-unfriendly, dokumentasi minim
- Clerk — bagus tapi mahal untuk skala non-profit, vendor lock-in
- Supabase Auth — bagus tapi coupled dengan Supabase ecosystem
- Custom auth — terlalu banyak yang harus dibangun ulang

## 5. Qwik untuk Platform, SvelteKit untuk Index

**Keputusan**: Platform (sosial media) menggunakan Qwik City, Index (arsip riset) menggunakan SvelteKit.

**Rationale**:
- **Platform → Qwik**: Resumability — ideal untuk aplikasi interaktif tinggi seperti feed sosial. Tidak ada hydration overhead. JS hanya didownload saat dibutuhkan.
- **Index → SvelteKit**: SSR-first dengan partial hydration — ideal untuk situs yang heavy-read seperti arsip riset. Transisi halaman native dengan SvelteKit routing.

**Alternatif yang dipertimbangkan**: Keduanya di SvelteKit. Ditolak karena Platform butuh interactivity tinggi yang lebih cocok dengan Qwik's resumability model.

## 6. `bun --cwd`, Bukan `cd &&` atau Concurrently

**Keputusan**: Root scripts menggunakan `bun --cwd apps/X run dev` untuk menjalankan aplikasi.

**Rationale**:
- Lebih bersih dari `cd apps/index && bun run dev`
- Tidak mengubah working directory shell — aman untuk chaining
- Tidak butuh `concurrently` — Index dan Platform bukan aplikasi yang harus berjalan bersamaan
- Konsisten dengan bun workspace convention

## 7. Dua Tingkat Profiling: Minimal (Index) vs Lengkap (Platform)

**Keputusan**: Index menggunakan profiling minimal saat sign-up. Platform menyediakan onboarding lengkap.

**Rationale**:
- Index: user hanya butuh identitas dasar (nama, email) untuk mengunggah karya — profiling minimal mengurangi friction
- Platform: user butuh profil lengkap (institusi, bio, interest) untuk berpartisipasi dalam komunitas — onboarding di Platform
- User yang sign-up di Index nanti bisa melengkapi profil saat pertama kali ke Platform — seamless cross-app experience

## 8. 21 Tabel Database untuk Index (Bukan Schema Minimal)

**Keputusan**: Index schema diimplementasikan dengan 18 tabel kustom + Better Auth tables, total 21 tabel — lengkap dari awal, bukan bertahap.

**Rationale**:
- Schema dirancang berdasarkan spec DATABASE_SCHEMA.md yang sudah matang
- Relasi antar tabel sudah didefinisikan dengan jelas — membangun bertahap akan menyebabkan migration pain
- Drizzle ORM memungkinkan schema besar tanpa performance penalty — query builder hanya menghasilkan SQL untuk tabel yang di-query
- Semua tabel sudah di-push ke production — tidak ada migration di masa depan untuk struktur dasar

**Alternatif yang dipertimbangkan**: Phase-based migration (MVP dulu, baru sisanya). Ditolak karena Drizzle relation system membutuhkan semua tabel terdefinisi untuk type safety yang optimal.

## 9. Svelte 5 Runes — Wajib

**Keputusan**: Semua komponen Svelte di Index menggunakan Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`). Tidak ada Svelte 4 syntax.

**Rationale**:
- Svelte 5 adalah versi stabil terbaru dengan API yang lebih bersih
- Runes lebih predictable daripada Svelte 4 reactivity
- `$props()` menggantikan `export let` — lebih eksplisit
- `$derived()` menggantikan `$:` — lebih performant
- AGENTS.md mewajibkan Svelte 5 runes untuk konsistensi

## 10. Tidak Ada Concurrent Development

**Keputusan**: Root monorepo tidak menyediakan script `dev` yang menjalankan kedua aplikasi sekaligus.

**Rationale**:
- Index dan Platform adalah proyek independen yang dikembangkan oleh orang yang berbeda
- Tidak ada shared state atau dependency runtime — tidak perlu running bersamaan untuk development
- Menjalankan keduanya sekaligus di local akan conflict di port yang sama
- Masing-masing developer hanya perlu menjalankan aplikasi yang sedang dikerjakan
