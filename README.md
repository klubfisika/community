# KF13 Community Platform

> Wadah eksploratif yang memfasilitasi kolaborasi ilmiah dari tingkat SMP hingga pascasarjana — demi masyarakat yang terbuka akan sains, informasi, dan penelitian yang dapat saling diverifikasi.

Monorepo untuk dua produk terintegrasi: **platform sosial media** dan **arsip riset terpadu** — diinisiasi oleh [Klub Fisika Indonesia](https://klubfisika.github.io), sebuah yayasan non-profit independen, dan dirancang untuk dimiliki bersama oleh komunitas.

---

## Navigasi Cepat

| Dokumen | Deskripsi |
|---------|-----------|
| 📖 [VISION.md](docs/VISION.md) | Visi lengkap, mengapa platform ini dibangun, roadmap |
| 🏛️ [GOVERNANCE.md](docs/GOVERNANCE.md) | Tata kelola, peran, proses pengambilan keputusan |
| 💰 [FUNDING.md](docs/FUNDING.md) | Strategi pendanaan, grant, cara berkontribusi finansial |
| 📣 [OUTREACH.md](docs/OUTREACH.md) | Strategi promosi ke pemerintah, institusi, komunitas global |
| 🤝 [CONTRIBUTING.md](CONTRIBUTING.md) | Cara berkontribusi — kode, dokumentasi, desain, ide |
| 💬 [Discussions](https://github.com/klubfisika/community/discussions) | Forum diskusi terbuka untuk komunitas |
| 🐛 [Issues](https://github.com/klubfisika/community/issues) | Bug report, feature request, RFC |


| Dokumen | Deskripsi |
|---------|-----------|
| 🏗️ [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Arsitektur teknis lengkap — database, auth, submodule |
| 🔐 [AUTH.md](docs/AUTH.md) | Detail shared auth: Community sebagai auth provider, Index via API |
| 💻 [DEVELOPMENT.md](docs/DEVELOPMENT.md) | Setup, env, workflow development, deployment |
| 📋 [DECISIONS.md](docs/DECISIONS.md) | Log keputusan teknis & rationale |
| 📖 [VISION.md](docs/VISION.md) | Visi lengkap, mengapa platform ini dibangun, roadmap |
| 🏛️ [GOVERNANCE.md](docs/GOVERNANCE.md) | Tata kelola, peran, proses pengambilan keputusan |
| 💰 [FUNDING.md](docs/FUNDING.md) | Strategi pendanaan, grant, cara berkontribusi finansial |
| 📣 [OUTREACH.md](docs/OUTREACH.md) | Strategi promosi ke pemerintah, institusi, komunitas global |
| 🤝 [CONTRIBUTING.md](CONTRIBUTING.md) | Cara berkontribusi — kode, dokumentasi, desain, ide |
Membangun ekosistem digital tempat **kredibilitas ilmiah** tumbuh dari dua sisi yang saling menguatkan:

| Dimensi | Produk | Analogi |
|---------|--------|---------|
| **Siapa kamu** — jejaring, diskusi, reputasi | `apps/platform` | LinkedIn × Kaskus untuk ilmuwan Indonesia |
| **Apa karyamu** — publikasi, verifikasi, sitasi | `apps/index` | SINTA untuk jenjang SD–SMA/SMK |

Keduanya berbagi **satu identitas pengguna**. Seorang peneliti muda yang aktif berdiskusi di platform akan otomatis terhubung dengan karya ilmiahnya di index — dan sebaliknya, karya yang terverifikasi akan memperkuat kredibilitas profilnya.

Baca [VISION.md](docs/VISION.md) untuk penjelasan mendalam tentang mengapa platform ini dibangun.

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
community/
├── apps/
│   ├── platform/          → github.com/klubfisika/platform (Qwik City)
│   └── index/             → github.com/klubfisika/index (SvelteKit)
├── packages/              → shared packages (auth, types, utils)
├── docs/
│   ├── VISION.md          → visi lengkap & roadmap
│   ├── GOVERNANCE.md      → tata kelola komunitas
│   ├── FUNDING.md         → strategi pendanaan
│   └── OUTREACH.md        → strategi promosi & advokasi
├── .github/
│   ├── ISSUE_TEMPLATE/    → template bug report, feature request, RFC
│   └── DISCUSSION_TEMPLATE/
├── CONTRIBUTING.md        → panduan kontribusi
├── .gitmodules
└── README.md              → (ini)
```

| Path | Repository | Stack |
|------|------------|-------|
| `apps/platform` | [klubfisika/platform](https://github.com/klubfisika/platform) | Qwik City · Neon · Tailwind 4 |
| `apps/index` | [klubfisika/index](https://github.com/klubfisika/index) | SvelteKit · Drizzle · Paraglide |

---

## Memulai

### Prasyarat

- [bun](https://bun.sh) ≥ 1.x
- [Node.js](https://nodejs.org) ≥ 18 (untuk Qwik)
- Akun [Neon](https://neon.tech) untuk PostgreSQL (free tier cukup)

### Clone

```bash
git clone --recurse-submodules git@github.com:klubfisika/community.git
cd community
```

### Development

```bash
# Index arsip riset (SvelteKit)
cd apps/index
bun install
cp .env.example .env           # isi DATABASE_URL, BETTER_AUTH_SECRET, ORIGIN
bun run dev                    # → http://localhost:5173

# Platform sosial media (Qwik City)
cd apps/platform
bun install
cp .env.example .env.local     # isi NEON_DATABASE_URL
bun run dev                    # → http://localhost:5173
```

Lihat [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan setup lengkap.

---

## DNA Produk

### 🥒 Gamifikasi Kaskus

Platform menggunakan sistem reputasi terinspirasi Kaskus:

- **Cendol** (🥒) — apresiasi positif, endorsement berbobot berbasis kontribusi
- **Bata** (🧱) — feedback negatif untuk konten tidak berkualitas
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
- **Milik komunitas** — diinisiasi Klub Fisika, dirancang untuk dimiliki dan dikelola bersama
- **Verifikasi ketat dengan audit terbuka** — keamanan, transparansi, dan kenyamanan bersama
- **Kids-friendly** — pengawasan wali/mentor/orangtua untuk pengguna di bawah umur
- **Terinspirasi oleh**: Ki Hajar Dewantara, HOS Cokroaminoto, BJ Habibie, Prof Yohanes Surya

---

## Beyond Klub Fisika — Menuju Platform Komunitas

### Domain Saat Ini Hanya Titik Awal

Platform saat ini berjalan di bawah domain `klubfisika.or.id` sebagai **titik awal fase beta**, karena Klub Fisika Indonesia adalah inisiator yang menyediakan infrastruktur dan sumber daya pertama. Ini bukan identitas permanen.

**Visi jangka panjang**: Platform ini tidak bergantung pada, dan tidak dikontrol oleh, satu entitas tunggal — termasuk Klub Fisika Indonesia sendiri.

```
SEKARANG (Beta)                        MASA DEPAN (Komunitas)
──────────────────────────             ──────────────────────────────
Inisiator : Klub Fisika Indonesia      Governance : multi-stakeholder
Domain    : klubfisika.or.id           Domain     : independen / netral
Maintainer: tim internal               Maintainer : komunitas terbuka
Funding   : mandiri (unit usaha)       Funding    : komunitas + institusi
Kontributor: terbatas                  Kontributor: dari mana saja
```

### Komitmen Klub Fisika Indonesia

- Kode tetap **open-source (MIT)** tanpa syarat dan tanpa perubahan lisensi
- Tidak mengunci platform ke infrastruktur atau layanan proprietary
- Semua keputusan teknis dan arsitektur didokumentasikan secara terbuka
- Kontributor dari luar Klub Fisika disambut dengan setara

> Platform ini dibangun bukan untuk menjadi produk Klub Fisika.
> Ia dibangun untuk menjadi infrastruktur bersama ekosistem riset Indonesia.

---

## Cara Terlibat

### Sebagai Developer
→ Baca [CONTRIBUTING.md](CONTRIBUTING.md), cari issue berlabel `good first issue`

### Sebagai Peneliti / Akademisi
→ Buka [Discussion](https://github.com/klubfisika/community/discussions) dan share perspektif domain Anda

### Sebagai Guru / Pendidik
→ Hubungi via Discussion — kami butuh feedback dari ground level

### Sebagai Organisasi / Institusi
→ Baca [OUTREACH.md](docs/OUTREACH.md) untuk opsi kemitraan

### Sebagai Donatur / Funder
→ Baca [FUNDING.md](docs/FUNDING.md) untuk cara mendukung platform ini

---

## Kontribusi

Lihat [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan lengkap.

Komunitas pengembang dapat memulai dari:

1. Clone monorepo ini dengan `--recurse-submodules`
2. Pilih area kontribusi: `apps/platform` atau `apps/index`
3. Baca README di masing-masing submodule
4. Buat pull request ke repository terkait

Untuk kolaborasi institusional, diskusi terbuka, atau pertanyaan tentang adopsi platform — buka [GitHub Discussions](https://github.com/klubfisika/community/discussions).

---

## Lisensi

MIT — kode bebas digunakan, dimodifikasi, dan didistribusikan ulang tanpa syarat afiliasi.

---

<p align="center">
  <sub>
    Diinisiasi oleh <a href="https://klubfisika.github.io">Klub Fisika Indonesia</a> — dimaintain bersama komunitas
    <br>
    <a href="docs/VISION.md">Visi</a> ·
    <a href="docs/GOVERNANCE.md">Governance</a> ·
    <a href="docs/FUNDING.md">Funding</a> ·
    <a href="docs/OUTREACH.md">Outreach</a> ·
    <a href="CONTRIBUTING.md">Kontribusi</a>
  </sub>
</p>
