# KF13 Community Platform

> Wadah eksploratif yang memfasilitasi kolaborasi ilmiah dari tingkat SMP hingga pascasarjana — demi masyarakat yang terbuka akan sains, informasi, dan penelitian yang dapat saling diverifikasi.

Monorepo untuk dua produk terintegrasi: **platform sosial media** dan **arsip riset terpadu** — diinisiasi dan dimaintain oleh [Klub Fisika Indonesia](https://klubfisika.github.io), sebuah yayasan non-profit independen yang bergerak di bidang literasi sains dan STEM.

---

## Visi

Membangun ekosistem digital tempat **kredibilitas ilmiah** tumbuh dari dua sisi yang saling menguatkan:

| Dimensi | Produk | Analogi |
|---|---|---|
| **Siapa kamu** — jejaring, diskusi, reputasi | `apps/platform` | LinkedIn × Kaskus untuk ilmuwan Indonesia |
| **Apa karyamu** — publikasi, verifikasi, sitasi | `apps/index` | SINTA untuk jenjang SD–SMA/SMK |

Keduanya berbagi **satu identitas pengguna**. Seorang peneliti muda yang aktif berdiskusi di platform akan otomatis terhubung dengan karya ilmiahnya di index — dan sebaliknya, karya yang terverifikasi akan memperkuat kredibilitas profilnya.

---

## Arsitektur

```
┌──────────────────────────────────────────────┐
│           github.com/klubfisika/community     │
│              (monorepo entrypoint)            │
├──────────────────────────────────────────────┤
│                                              │
│  apps/platform           apps/index          │
│  ┌──────────────┐       ┌──────────────┐     │
│  │  Qwik City   │       │  SvelteKit   │     │
│  │  Tailwind 4  │◄─────►│  Drizzle ORM │     │
│  │  Neon DB     │ auth  │  Better Auth │     │
│  │  bcryptjs    │shared │  Paraglide   │     │
│  │  KaTeX       │       │  mdsvex      │     │
│  │  Mermaid     │       │  Storybook   │     │
│  └──────────────┘       └──────────────┘     │
│        │                      │              │
│   sosial media          arsip riset          │
│   • feed & diskusi      • indeks karya       │
│   • proyek kolaborasi   • verifikasi peer    │
│   • gamifikasi kaskus   • sitasi & metrik    │
│   • mentorship          • portofolio riset   │
│                                              │
│  packages/                                   │
│  ┌──────────────────────────────────────┐    │
│  │  shared auth · shared types · utils  │    │
│  └──────────────────────────────────────┘    │
│                                              │
└──────────────────────────────────────────────┘
```

---

## Struktur Repository

```
community.klubfisika.or.id/
├── apps/
│   ├── platform/   → submodule github.com/klubfisika/platform
│   └── index/      → submodule github.com/klubfisika/index
├── packages/       → shared packages (auth, types, utils)
├── .gitmodules
├── package.json    → pnpm workspaces
└── README.md
```

| Path | Repository | Stack | Domain |
|---|---|---|---|
| `apps/platform` | [klubfisika/platform](https://github.com/klubfisika/platform) | Qwik City · Neon · Tailwind 4 | Sosial media & komunitas |
| `apps/index` | [klubfisika/index](https://github.com/klubfisika/index) | SvelteKit · Drizzle · Paraglide | Arsip & indeks riset |

---

## Memulai

### Prasyarat

- [bun](https://bun.sh) ≥ 1.x
- [Node.js](https://nodejs.org) ≥ 18 (untuk Qwik)
- Akses ke Neon PostgreSQL (env: `NEON_DATABASE_URL`, `DATABASE_URL`)

### Clone

```bash
git clone --recurse-submodules git@github.com:klubfisika/community.git
cd community.klubfisika.or.id
```

### Development

```bash
# Platform sosial media (Qwik City)
cd apps/platform
bun install
cp .env.example .env.local   # isi NEON_DATABASE_URL
bun run dev                    # → http://localhost:5173

# Index arsip riset (SvelteKit)
cd apps/index
bun install
cp .env.example .env           # isi DATABASE_URL, BETTER_AUTH_SECRET, ORIGIN
bun run dev                    # → http://localhost:5173
```

---

## DNA Produk

### 🥒 Gamifikasi Kaskus

Platform menggunakan sistem reputasi terinspirasi Kaskus:

- **Cendol** (🥒) — apresiasi positif, setara upvote/like
- **Bata** (🧱) — feedback negatif
- **Rank progression**: Newbie → Kaskuser → Aktivis → Kaskus Holic → Kaskus Addict → Kaskus Maniac → Kaskus Geek
- **Emoticon parser**: 18 emote Kaskus-style (`:cendol:`, `:ngakak:`, `:pertamax:`, dll)

### 🔬 Kredibilitas Terverifikasi

Tidak seperti platform sosial pada umumnya, kredibilitas di KF13 ditentukan oleh **karya nyata**:

- Diskusi dan kontribusi di platform → reputasi sosial
- Karya ilmiah terindeks di index → kredibilitas akademik
- Keduanya terintegrasi dalam satu profil

---

## Prinsip

- **Terbuka & non-profit** — tidak terafiliasi, tidak didanai pihak manapun
- **Universal** — meskipun diinisiasi Klub Fisika, platform dirancang untuk digunakan oleh siapa saja
- **Verifikasi ketat dengan audit terbuka** — keamanan, transparansi, dan kenyamanan bersama
- **Kids-friendly** — dalam pengawasan wali/mentor/orangtua untuk pengguna di bawah umur
- **Terinspirasi oleh**: Ki Hajar Dewantara, HOS Cokroaminoto, BJ Habibie, Prof Yohanes Surya

---

## Kontribusi

Lihat [CONTRIBUTING.md](./CONTRIBUTING.md) (segera hadir).

Komunitas pengembang dapat memulai dari:

1. Clone monorepo ini
2. Pilih area kontribusi: `apps/platform` atau `apps/index`
3. Baca README di masing-masing submodule
4. Buat pull request ke repository terkait

---

## Lisensi

MIT — lihat masing-masing submodule untuk detail lisensi.

---

<p align="center">
  <sub>Diinisiasi dan dimaintain oleh <a href="https://klubfisika.github.io">Klub Fisika Indonesia</a> — Research · Inovasi · Kolaborasi</sub>
</p>
