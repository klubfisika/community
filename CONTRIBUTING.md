# Berkontribusi ke KF13 Community Platform

> Selamat datang! KF13 adalah proyek open-source yang dibangun oleh dan untuk komunitas.
> Kontribusi dari siapapun sangat disambut — baik kode, dokumentasi, desain, ide, maupun feedback.

---

## Daftar Isi

1. [Cara Paling Cepat untuk Memulai](#1-cara-paling-cepat-untuk-memulai)
2. [Jenis Kontribusi](#2-jenis-kontribusi)
3. [Setup Development Environment](#3-setup-development-environment)
4. [Workflow Kontribusi Kode](#4-workflow-kontribusi-kode)
5. [Standar Kode](#5-standar-kode)
6. [Panduan Commit](#6-panduan-commit)
7. [Proses Review](#7-proses-review)
8. [Kontribusi Non-Kode](#8-kontribusi-non-kode)
9. [Konvensi Bahasa](#9-konvensi-bahasa)
10. [Mendapatkan Bantuan](#10-mendapatkan-bantuan)

---

## 1. Cara Paling Cepat untuk Memulai

```bash
# 1. Fork repository ini di GitHub

# 2. Clone fork Anda
git clone --recurse-submodules git@github.com:YOUR_USERNAME/community.git
cd community

# 3. Pilih app yang ingin dikerjakan
cd apps/index    # SvelteKit — arsip riset
# atau
cd apps/platform # Qwik City — sosial media

# 4. Install dependencies
bun install

# 5. Setup environment
cp .env.example .env
# Edit .env dengan kredensial lokal Anda

# 6. Jalankan dev server
bun run dev

# 7. Buat branch baru
git checkout -b feat/nama-fitur-anda

# 8. Kerjakan perubahan, lalu buat PR!
```

Lihat [Section 3](#3-setup-development-environment) untuk setup lengkap.

---

## 2. Jenis Kontribusi

### Untuk Developer

| Kontribusi | Cara | Skill yang Dibutuhkan |
|-----------|------|----------------------|
| **Bugfix** | Cari issue berlabel `bug`, buat PR | Sesuai area bug |
| **Fitur baru** | Diskusi dulu di GitHub Discussions, lalu implementasi | Sesuai area fitur |
| **Refactoring** | Buka issue terlebih dahulu untuk diskusi | TypeScript, Svelte/Qwik |
| **Testing** | Tambah test untuk kode yang belum ter-cover | Vitest, Playwright |
| **Performance** | Profile dulu, lalu optimasi dengan data | Web performance |
| **Aksesibilitas** | Audit a11y, perbaiki isu | HTML, ARIA |

### Untuk Non-Developer

| Kontribusi | Cara |
|-----------|------|
| **Dokumentasi** | Edit file `.md`, buat PR |
| **Terjemahan** | Bantu terjemahkan pesan i18n di `messages/` |
| **Desain** | Buat mockup/prototype, share di Discussions |
| **Laporan bug** | Buka issue dengan template bug report |
| **Ide fitur** | Buka Discussion dengan kategori "Ideas" |
| **Penelitian pengguna** | Bantu wawancara pengguna, share insight |
| **Outreach** | Bantu promosikan ke sekolah, komunitas, media |

### Issue yang Ramah untuk Pemula

Cari issue dengan label:
- `good first issue` — cocok untuk kontributor baru
- `help wanted` — butuh bantuan, terbuka untuk siapapun
- `documentation` — perubahan dokumentasi saja

---

## 3. Setup Development Environment

### Prasyarat

| Tool | Versi Minimum | Keterangan |
|------|--------------|------------|
| [bun](https://bun.sh) | 1.x | Package manager utama |
| [Node.js](https://nodejs.org) | 18.x | Untuk Qwik (apps/platform) |
| [Git](https://git-scm.com) | 2.x | Version control |
| PostgreSQL | — | Via Neon (cloud) — tidak perlu lokal |

### Setup apps/index (SvelteKit)

```bash
cd apps/index
bun install
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL=postgres://user:pass@host/dbname   # Neon connection string
BETTER_AUTH_SECRET=random-32-char-string         # Generate: openssl rand -base64 32
ORIGIN=http://localhost:5173
```

```bash
bun run db:push    # Push schema ke database
bun run dev        # → http://localhost:5173
```

### Setup apps/platform (Qwik City)

```bash
cd apps/platform
bun install
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEON_DATABASE_URL=postgres://user:pass@host/dbname
```

```bash
bun run dev        # → http://localhost:5173
```

### Tips Database

Untuk development, disarankan menggunakan **Neon free tier**:
1. Buat akun di [neon.tech](https://neon.tech)
2. Buat project baru
3. Copy connection string ke `.env`
4. Gunakan **Neon branching** untuk isolasi database per fitur

---

## 4. Workflow Kontribusi Kode

### Alur Standar

```
1. Cek issue yang ada atau buat issue baru
         │
         ▼
2. Fork repo & buat branch
   git checkout -b feat/nama-fitur
         │
         ▼
3. Kerjakan perubahan
   - Tulis kode
   - Tulis/update test
   - Update dokumentasi jika perlu
         │
         ▼
4. Cek kualitas
   bun run check   # TypeScript
   bun run lint    # ESLint + Prettier
   bun run test    # Vitest
         │
         ▼
5. Commit dengan konvensi yang benar
   git commit -m "feat(index): tambah halaman upload karya"
         │
         ▼
6. Push dan buat Pull Request
   git push origin feat/nama-fitur
         │
         ▼
7. Tunggu review & respond to feedback
         │
         ▼
8. Merge! 🎉
```

### Naming Convention untuk Branch

```
feat/nama-fitur          # fitur baru
fix/deskripsi-bug        # bugfix
docs/nama-dokumen        # dokumentasi
refactor/nama-modul      # refactoring
test/nama-test           # penambahan test
chore/nama-task          # maintenance
```

---

## 5. Standar Kode

### TypeScript (Keduanya)

```typescript
// ✅ Benar — strict mode, explicit types
export async function getResearch(id: string): Promise<Research | null> {
  return db.query.research.findFirst({ where: eq(research.id, id) })
}

// ❌ Salah — any, implicit return type
export async function getResearch(id: any) {
  return db.query.research.findFirst({ where: eq(research.id, id) })
}
```

**Aturan TypeScript:**
- `strict: true` — selalu
- Tidak boleh `as any`, `@ts-ignore`, `@ts-expect-error`
- Gunakan `import type` untuk type-only imports
- Explicit return types untuk function yang di-export

### Svelte 5 (apps/index)

```svelte
<!-- ✅ Svelte 5 Runes — benar -->
<script lang="ts">
  let { data } = $props()
  let count = $state(0)
  let doubled = $derived(count * 2)

  function handleClick() {
    count++
  }
</script>

<button onclick={handleClick}>{count}</button>

<!-- ❌ Svelte 4 syntax — jangan dipakai -->
<script>
  export let data
  $: doubled = count * 2
</script>
<button on:click={handleClick}>{count}</button>
```

### Styling

- **Hanya Tailwind CSS** — tidak ada custom CSS, tidak ada `<style>` block
- Ikuti urutan class Tailwind (prettier-plugin-tailwindcss akan sort otomatis)

### Database (Drizzle ORM — apps/index)

```typescript
// ✅ Drizzle query builder
const results = await db.query.research.findMany({
  where: eq(research.authorId, userId),
  with: { author: true },
})

// ❌ Raw SQL (kecuali sangat diperlukan)
const results = await db.execute(sql`SELECT * FROM research WHERE author_id = ${userId}`)
```

---

## 6. Panduan Commit

Format: `type(scope): deskripsi singkat`

### Types

| Type | Kapan |
|------|-------|
| `feat` | Fitur baru |
| `fix` | Bugfix |
| `docs` | Perubahan dokumentasi saja |
| `refactor` | Restrukturisasi tanpa perubahan fungsional |
| `test` | Penambahan atau perbaikan test |
| `chore` | Maintenance, update dependency |
| `perf` | Peningkatan performa |
| `db` | Perubahan database schema |
| `i18n` | Perubahan terjemahan / pesan |

### Scopes

| Scope | Area |
|-------|------|
| `index` | apps/index (SvelteKit) |
| `platform` | apps/platform (Qwik) |
| `auth` | Autentikasi / Better Auth |
| `db` | Database / Drizzle schema |
| `docs` | Dokumentasi di /docs |
| `ci` | GitHub Actions / CI |

### Contoh Commit yang Baik

```bash
feat(index): tambah halaman upload karya ilmiah
fix(auth): perbaiki session timeout yang terlalu cepat
docs: tambah panduan setup Neon di CONTRIBUTING
refactor(platform): pisahkan komponen Feed menjadi lebih kecil
db: tambah tabel citations dan references
i18n: tambah terjemahan Bahasa Indonesia untuk error messages
```

### Contoh Commit yang Buruk

```bash
fix bug                    # terlalu umum
update file                # tidak informatif
WIP                        # jangan commit WIP ke main branch
asdfghjkl                  # tidak bermakna
```

---

## 7. Proses Review

### Yang Dicek Reviewer

- [ ] Kode berjalan dan tidak memecah test yang ada
- [ ] TypeScript tanpa error (`bun run check`)
- [ ] Lint clean (`bun run lint`)
- [ ] Mengikuti konvensi kode yang ada
- [ ] Perubahan minimal dan fokus (tidak refactor sekaligus fix bug)
- [ ] Dokumentasi diupdate jika diperlukan
- [ ] Test ditambahkan untuk perubahan fungsional

### Ekspektasi Timeline

- Review pertama: **dalam 3–5 hari kerja**
- Jika belum ada respons setelah 7 hari: mention maintainer di PR

### Etika Review

**Untuk reviewer:**
- Kritik kode, bukan orangnya
- Berikan alasan spesifik untuk setiap permintaan perubahan
- Bedakan antara "harus diubah" vs "saya prefer tapi opsional"

**Untuk yang di-review:**
- Respons setiap komentar, bahkan jika hanya "acknowledged"
- Jelaskan reasoning di balik pilihan teknis Anda
- Tidak setuju? Jelaskan dengan data/argumen, jangan silent reject

---

## 8. Kontribusi Non-Kode

### Dokumentasi

File dokumentasi ada di:
- `docs/` — dokumentasi umum (GOVERNANCE, FUNDING, OUTREACH, dll)
- `apps/index/docs/` — dokumentasi teknis KF13 Index
- `apps/platform/` — dokumentasi KF13 Platform
- Root `README.md` — halaman muka monorepo

Edit file `.md` dan buat PR seperti biasa.

### Terjemahan (i18n)

KF13 Index mendukung 5 bahasa: `en`, `id`, `es`, `jp`, `de`.

File pesan ada di `apps/index/messages/`:
```
messages/
├── en.json   ← English (referensi utama)
├── id.json   ← Bahasa Indonesia
├── es.json   ← Español
├── jp.json   ← 日本語
└── de.json   ← Deutsch
```

Untuk menambah terjemahan:
1. Buka `en.json` sebagai referensi
2. Edit file bahasa target
3. Jangan terjemahkan key (hanya value)
4. Buat PR dengan label `i18n`

### Melaporkan Bug

Gunakan template **Bug Report** saat membuka issue. Sertakan:
- Deskripsi bug yang jelas
- Langkah-langkah untuk mereproduksi
- Expected vs actual behavior
- Screenshot jika relevan
- Environment (browser, OS, versi)

### Mengusulkan Fitur

Buka **GitHub Discussion** dengan kategori "Ideas" terlebih dahulu sebelum membuat issue fitur. Ini membantu:
- Validasi apakah fitur sesuai visi platform
- Mengumpulkan feedback awal dari komunitas
- Menghindari duplikasi dengan yang sudah direncanakan

---

## 9. Konvensi Bahasa

| Konteks | Bahasa |
|---------|--------|
| Kode (variabel, fungsi, komentar kode) | Inggris |
| Commit message | Inggris atau Indonesia (konsisten per PR) |
| Dokumentasi teknis (`docs/`) | Indonesia (utama), Inggris (terjemahan) |
| Issue & Pull Request | Bebas — Indonesia atau Inggris |
| GitHub Discussions | Bebas — Indonesia atau Inggris |
| UI text (`messages/`) | Sesuai bahasa target |

---

## 10. Mendapatkan Bantuan

- **Setup bermasalah?** → Buka Discussion dengan kategori "Help"
- **Tidak mengerti codebase?** → Tanya di Discussion, maintainer akan bantu
- **Ide tapi tidak tahu mulai dari mana?** → Share di Discussion, kami bantu breakdown
- **Bug yang Anda temukan?** → Buka issue dengan template bug report

**Tidak ada pertanyaan yang terlalu bodoh.** Kami prefer Anda bertanya daripada tebak-tebakan dan akhirnya implementasi yang salah arah.

---

<p align="center">
  <sub>
    Terima kasih sudah meluangkan waktu untuk berkontribusi!
    Setiap kontribusi, sekecil apapun, berarti bagi komunitas.
    <br>
    <a href="docs/GOVERNANCE.md">Governance</a>
    ·
    <a href="docs/FUNDING.md">Funding</a>
    ·
    <a href="docs/OUTREACH.md">Outreach</a>
  </sub>
</p>
