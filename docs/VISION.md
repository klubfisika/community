# KF13 Community Platform — Dokumen Visi

> Dokumentasi lengkap hasil brainstorming arsitektur, produk, dan arah pengembangan platform komunitas Klub Fisika Indonesia.

---

## Daftar Isi

1. [Latar Belakang](#latar-belakang)
2. [Tiga Pilar Produk](#tiga-pilar-produk)
3. [Platform — Sosial Media untuk STEM](#platform--sosial-media-untuk-stem)
4. [Index — Arsip Riset Terpadu K-12](#index--arsip-riset-terpadu-k-12)
5. [Integrasi: Satu Identitas, Dua Fungsi](#integrasi-satu-identitas-dua-fungsi)
6. [Arsitektur Teknis](#arsitektur-teknis)
7. [Repository Strategy](#repository-strategy)
8. [Gamifikasi & Sistem Reputasi](#gamifikasi--sistem-reputasi)
9. [Roadmap Pengembangan](#roadmap-pengembangan)
10. [Prinsip & Nilai](#prinsip--nilai)

---

## Latar Belakang

### Klub Fisika Indonesia

**Klub Fisika Indonesia (KF13)** adalah yayasan non-profit independen yang tidak terafiliasi dan tidak didanai oleh pihak manapun. Diisi oleh rekan-rekan dari berbagai perguruan tinggi, gerakan mahasiswa, hingga penggiat pendidikan formal dan non-formal dengan basis literasi sains dan STEM — termasuk di antaranya informatika dan IT.

Untuk operasional, yayasan berusaha mandiri melalui unit-unit usaha, sehingga kegiatan penyuluhan, sosialisasi, dan pembinaan dapat terus berjalan.

### Misi

> Menjadi wadah/ruang eksploratif yang dapat memfasilitasi anak-anak SMP, SMA/SMK, mahasiswa, bahkan pascasarjana untuk belajar kolaboratif dan eksploratif — demi terbangunnya kehidupan masyarakat yang terbuka akan sains dan ilmu pengetahuan alam yang mengedepankan informasi dan penelitian yang dapat saling diverifikasi.

### Kehadiran Digital Saat Ini

- **Website utama**: [klubfisika.github.io](https://klubfisika.github.io) (→ `klubfisika.or.id`)
- **Sosial media**: TikTok, Instagram, Facebook, WhatsApp Business, Threads, LinkedIn, Shopee
- **Platform komunitas**: [community.klubfisika.or.id](https://community.klubfisika.or.id)
- **Arsip riset**: [index.klubfisika.or.id](https://index.klubfisika.or.id)

---

## Tiga Pilar Produk

```
┌─────────────────────────────────────────────────────────────┐
│                  EKOSISTEM KLUB FISIKA                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🌐 klubfisika.or.id (Astro)                                │
│  Website utama — blog, dokumentasi, profil organisasi        │
│  Host dataset publik: /datasets/v1/                         │
│                                                             │
│  💬 platform (Qwik City)                                    │
│  Sosial media untuk ilmuwan/engineer/teknokrat              │
│  Feed, diskusi, proyek, gamifikasi, networking              │
│                                                             │
│  📚 index (SvelteKit)                                       │
│  Arsip riset terpadu — SINTA untuk jenjang SD-SMA/SMK       │
│  Indeksasi, verifikasi, sitasi, portofolio                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

| Pilar | Domain | Repo | Stack | Peran |
|---|---|---|---|---|
| **Website** | klubfisika.or.id | `klubfisika.github.io` | Astro + TinaCMS | Identitas organisasi, blog, dataset host |
| **Platform** | community.klubfisika.or.id | `klubfisika/platform` | Qwik City + Neon | Sosial media komunitas |
| **Index** | index.klubfisika.or.id | `klubfisika/index` | SvelteKit + Drizzle | Arsip & indeks riset |

---

## Platform — Sosial Media untuk STEM

### Konsep

KF13 Platform adalah **jaringan sosial profesional** yang dirancang khusus untuk komunitas STEM Indonesia. Ia menggabungkan dua DNA:

| DNA | Inspirasi | Manifestasi |
|---|---|---|
| **Kredibilitas profesional** | LinkedIn | Profil terverifikasi, jejaring, portofolio karya nyata |
| **Budaya komunitas Indonesia** | Kaskus | Gamifikasi cendol/bata, rank, emoticon, forum diskusi |

### Mengapa Platform Ini Berbeda

LinkedIn menjual kredibilitas melalui koneksi dan endorsement — bukan karya nyata. KF13 Platform membangun kredibilitas dari **dua sisi yang saling menguatkan**:

1. **Siapa kamu** — kontribusi di komunitas: diskusi, proyek, mentoring
2. **Apa karyamu** — karya ilmiah terverifikasi di Index yang terintegrasi

Seorang pengguna dengan 200 cendol dari 15 paper terverifikasi memiliki kredibilitas yang jauh lebih konkret daripada 500 koneksi LinkedIn.

### Fitur

#### Sudah Ada (MVP)

| Fitur | Deskripsi |
|---|---|
| **Feed sosial** | Timeline dengan komposer posting (teks, gambar, proyek, tanya) |
| **Stories** | Story row ala Instagram untuk update cepat |
| **Diskusi forum** | Subforum: Fisika Modern, Mekanika, Olimpiade, Karir & Kuliah, Lounge |
| **Thread panas** | Highlight thread dengan engagement tinggi |
| **Proyek komunitas** | Katalog proyek dengan status (Open/In Progress/Completed), tag, star |
| **Science Shorts** | Video pendek edukasi sains |
| **Kompetisi** | Direktori lomba sains nasional & internasional (robotics, rocket, physics olympiad, research, maker) |
| **Profil pengguna** | Profil publik dengan statistik, badge, proyek, artikel |
| **Dashboard overview** | Statistik personal, grafik aktivitas mingguan, target mingguan, rank progress |
| **Explore** | Browsing 8 kategori topik fisika |
| **Design system** | Referensi komponen UI (warna, tombol, card) |

#### Mendatang

| Fitur | Prioritas | Deskripsi |
|---|---|---|
| Integrasi identitas dengan Index | 🔴 High | SSO tunggal, profil terpadu |
| Mentorship matching | 🟡 Medium | Temukan mentor/mentee berdasarkan bidang |
| Leaderboard | 🟡 Medium | Ranking komunitas mingguan/bulanan |
| Direct messaging | 🟢 Low | Chat antar pengguna |
| Real-time notifications | 🟡 Medium | Notifikasi cendol, komentar, mention |
| API publik | 🟢 Low | Third-party integration |
| i18n multi-bahasa | 🟢 Low | Paraglide dari Index diperluas ke Platform |

### Target Pengguna

| Segmen | Kebutuhan |
|---|---|
| **Siswa SMA/SMK** | Diskusi persiapan OSN, tanya jawab konsep, eksperimen DIY |
| **Mahasiswa S1** | Kolaborasi proyek, networking, portofolio riset |
| **Mahasiswa S2/S3** | Publikasi, mentorship, peer review |
| **Guru/Dosen** | Bimbingan, verifikasi karya, berbagi materi |
| **Peneliti independen** | Jejaring, diseminasi karya, kolaborasi |

---

## Index — Arsip Riset Terpadu K-12

### Konsep

KF13 Index adalah **platform indeksasi karya ilmiah** yang dirancang khusus untuk peneliti di tingkat pendidikan dasar dan menengah. Jika [SINTA](https://sinta.kemdikbud.go.id) (Science and Technology Index) fokus pada akademisi dan peneliti perguruan tinggi, KF13 Index hadir untuk segmen yang selama ini belum tersentuh:

> **SD, SMP, SMA/SMK — peneliti muda yang karyanya belum memiliki rumah.**

### Mengapa Ini Penting

Di Indonesia, tidak ada platform yang secara serius mengindeks dan memverifikasi karya ilmiah tingkat sekolah:

- **Karya hilang**: Paper dan laporan penelitian siswa hilang setelah lomba/kompetisi selesai
- **Tidak ada rekam jejak**: Siswa tidak punya portofolio riset terverifikasi untuk mendaftar kuliah atau beasiswa
- **Sekolah kesulitan**: Guru dan sekolah tidak punya cara mudah mendokumentasikan capaian riset siswanya
- **Tidak ada metrik**: Tidak ada cara mengukur dampak riset di tingkat K-12

KF13 Index mengisi kekosongan ini — dengan standar verifikasi yang sesuai usia dan dalam pengawasan wali/mentor/orangtua.

### Perbedaan dengan SINTA

| Aspek | SINTA | KF13 Index |
|---|---|---|
| **Target** | Dosen, peneliti, akademisi PT | Siswa SD-SMA/SMK, guru, peneliti muda |
| **Jenis karya** | Jurnal, prosiding, buku, HKI | Laporan riset, paper, poster ilmiah, eksperimen, proyek sains |
| **Verifikasi** | Institusi + peer review akademik | Mentor/guru → peer → komunitas |
| **Metrik** | H-index, S-score | H-index K-12, cendol citation |
| **Integrasi** | Standalone | Terintegrasi dengan platform sosial |

### Unit Karya yang Diindeks

| Jenis | Deskripsi | Contoh |
|---|---|---|
| **Laporan penelitian** | Dokumen lengkap dengan metodologi | Penelitian pengaruh pH terhadap pertumbuhan tanaman |
| **Paper ilmiah** | Tulisan akademik terstruktur | Analisis gerak parabola pada roket air |
| **Poster ilmiah** | Presentasi visual hasil riset | Poster untuk lomba penelitian remaja |
| **Eksperimen terdokumentasi** | Dokumentasi eksperimen dengan data | Interferometer Michelson DIY |
| **Proyek sains** | Proyek multidisiplin | Sistem monitoring suhu berbasis Arduino |
| **Catatan & tutorial** | Konten edukasi orisinal | Rangkuman mekanika untuk OSN |

### Verifikasi Bertingkat

```
Level 1: Self-submit         → Pengguna mengunggah karya
Level 2: Mentor/Guru review  → Diverifikasi oleh wali/mentor/guru
Level 3: Peer review         → Direview oleh sesama peneliti
Level 4: Community validated → Mendapat cendol dari komunitas
Level 5: Institution verified → Diverifikasi oleh institusi (sekolah/universitas)
```

### Roadmap Index

#### Fase 1 — Fondasi (Current)

- [ ] Indeksasi dasar: upload, metadata, penyimpanan
- [ ] Profil peneliti dengan daftar karya
- [ ] Pencarian dan filter (kategori, tingkat, tahun)
- [ ] Sistem verifikasi Level 1 & 2

#### Fase 2 — Integrasi

- [ ] Single sign-on dengan Platform
- [ ] Auto-post: karya baru → feed sosial
- [ ] Profil terpadu (tab "Karya" di profil Platform)
- [ ] Badge verifikasi di profil Platform
- [ ] API publik untuk query karya

#### Fase 3 — Ekosistem

- [ ] Sitasi dan reference tracking
- [ ] H-index K-12 (berbasis cendol dan sitasi)
- [ ] Ekspor portofolio (PDF, JSON, CV format)
- [ ] Integrasi dengan kompetisi sains nasional
- [ ] Rekomendasi kolaborator berdasarkan minat riset

---

## Integrasi: Satu Identitas, Dua Fungsi

### Konsep Inti

Platform dan Index bukan dua produk terpisah — mereka adalah **dua sisi dari satu koin identitas**.

```
┌──────────────────────────────────────────────────────────┐
│                  SATU IDENTITAS PENGGUNA                   │
│                                                          │
│   ┌─────────────────────┐    ┌─────────────────────────┐ │
│   │    PLATFORM          │    │    INDEX                │ │
│   │    (siapa kamu)      │◄──►│    (apa karyamu)        │ │
│   ├─────────────────────┤    ├─────────────────────────┤ │
│   │                     │    │                         │ │
│   │  • Nama & bio       │    │  • Daftar karya         │ │
│   │  • Institusi        │    │  • Status verifikasi    │ │
│   │  • Rank & badge     │    │  • Metrik (sitasi)      │ │
│   │  • Aktivitas sosial │    │  • Portofolio riset     │ │
│   │  • Jejaring         │    │  • Timeline riset       │ │
│   │                     │    │                         │ │
│   │  🥒 234 cendol      │    │  📚 15 karya terindeks  │ │
│   │  ⭐ Kaskus Addict   │    │  ✅ 12 terverifikasi    │ │
│   │  💬 312 posts       │    │  🔗 47 sitasi           │ │
│   │                     │    │                         │ │
│   └─────────────────────┘    └─────────────────────────┘ │
│                                                          │
│   Profil publik menampilkan KEDUA dimensi secara          │
│   terpadu dalam satu halaman.                             │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Alur Pengguna

1. **Daftar** → satu akun untuk kedua platform
2. **Platform**: bangun reputasi melalui diskusi, proyek, kontribusi
3. **Index**: unggah dan verifikasi karya ilmiah
4. **Sinergi**: karya terverifikasi meningkatkan kredibilitas di Platform, reputasi di Platform meningkatkan visibilitas karya di Index

### Teknis Integrasi

| Aspek | Pendekatan |
|---|---|
| **Auth** | Shared auth service / SSO — Better Auth dari Index sebagai provider |
| **Session** | Cookie domain-level (`.klubfisika.or.id`) untuk cross-app session |
| **User profile** | Tabel user bersama, profil queryable dari kedua app |
| **Data sharing** | API contract antara Platform dan Index |
| **Event-driven** | Karya baru di Index → event → auto-post di feed Platform |

---

## Arsitektur Teknis

### Diagram

```
┌───────────────────────────────────────────────────────────┐
│                    Vercel Edge / Production                │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────┐    ┌─────────────────────────┐   │
│  │  community.klubfisika│    │  index.klubfisika.or.id │   │
│  │  .or.id              │    │                         │   │
│  │  (Qwik City)         │    │  (SvelteKit)            │   │
│  │                     │    │                         │   │
│  │  • SSR (Edge)       │    │  • SSR (Vercel)         │   │
│  │  • Resumable         │    │  • Static generation    │   │
│  │  • Lazy-loading      │    │  • i18n routing         │   │
│  └─────────┬───────────┘    └───────────┬─────────────┘   │
│            │                            │                 │
│            └──────────┬─────────────────┘                 │
│                       │                                   │
│              ┌────────▼────────┐                          │
│              │  Neon PostgreSQL │                          │
│              │  (serverless)    │                          │
│              └─────────────────┘                          │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Database Schema (Platform)

| Tabel | Deskripsi |
|---|---|
| `users` | Profil pengguna (username, name, email, password_hash, bio, institution, level, posts_count, cendol_count, bata_count) |
| `sessions` | Session token (user_id FK, token, expires_at — 7 hari) |
| `posts` | Konten feed/diskusi (author_id FK, title, content, type, tags, cendol_count) |
| `projects` | Proyek komunitas (owner_id FK, title, description, status, tags, stars_count) |
| `reactions` | Cendol/bata (user_id FK, post_id FK, type, UNIQUE(user_id, post_id)) |
| `members` | Pendaftaran member (name, email, phone, year, major, university, motivation, interests) |

### Database Schema (Index)

| Tabel | Deskripsi |
|---|---|
| `task` | Placeholder — akan diganti dengan schema riset |

### Shared Packages (Mendatang)

```
packages/
├── auth/          # Shared auth utilities & types
├── types/         # Shared TypeScript interfaces (User, Profile, Karya)
├── utils/         # Shared helpers (date, formatting, validation)
└── ui/            # Shared design tokens & themes
```

---

## Repository Strategy

### Struktur

```
github.com/klubfisika/
├── platform          ← apps/platform (Qwik City social media)
├── index             ← apps/index (SvelteKit research archive)
├── community         ← monorepo entrypoint
│   ├── apps/platform    → submodule → github.com/klubfisika/platform
│   ├── apps/index       → submodule → github.com/klubfisika/index
│   └── packages/        → shared auth, types, utils
├── klubfisika.github.io  ← website utama (Astro)
└── datasets              ← shared data (institutions, competitions)
```

### Mengapa Monorepo + Submodule?

| Keuntungan | Penjelasan |
|---|---|
| **Satu entrypoint** | Kontributor clone satu repo, lihat semua |
| **Independent deployment** | Platform dan Index deploy sendiri-sendiri |
| **Shared packages** | Auth, types, utils di satu tempat |
| **Atomic changes** | Bisa commit ke submodule + shared package dalam satu PR |
| **History terpisah** | Masing-masing app punya git history sendiri |

### Alur Kontribusi

```bash
# Clone monorepo
git clone --recurse-submodules git@github.com:klubfisika/community.git

# Kerjakan di app yang relevan
cd apps/platform  # atau apps/index

# Commit di submodule
git add . && git commit -m "feat: ..."
git push

# Update referensi submodule di monorepo
cd ../..
git add apps/platform
git commit -m "chore: bump platform submodule"
git push
```

---

## Gamifikasi & Sistem Reputasi

### Filosofi

Sistem gamifikasi KF13 terinspirasi dari **Kaskus** — forum komunitas terbesar Indonesia yang berhasil membangun budaya partisipasi melalui sistem reputasi sederhana namun efektif. Kami mengadaptasi DNA ini untuk konteks komunitas ilmiah.

### Cendol & Bata

| Aksi | Simbol | Makna |
|---|---|---|
| **Cendol** | 🥒 | Apresiasi positif — setara upvote/like, tapi dengan bobot komunitas |
| **Bata** | 🧱 | Feedback negatif — untuk konten tidak akurat atau tidak berkontribusi |

### Rank Progression

| Level | Minimal Posts | Judul | Warna |
|---|---|---|---|
| 0 | 0 | **Newbie** | Abu-abu |
| 1 | 10 | **Kaskuser** | Biru |
| 2 | 50 | **Aktivis** | Hijau |
| 3 | 100 | **Kaskus Holic** | Ungu |
| 4 | 250 | **Kaskus Addict** | Oranye |
| 5 | 500 | **Kaskus Maniac** | Merah |
| 6 | 1000 | **Kaskus Geek** | Pink |

### Reputasi = Cendol - Bata

Reputasi adalah metrik agregat yang menggabungkan aktivitas sosial (Platform) dan kontribusi ilmiah (Index):

```
Reputasi = (cendol_sosial + cendol_karya) - (bata_sosial + bata_karya)
```

### Badge System (Mendatang)

| Badge | Kriteria |
|---|---|
| 🌟 Early Member | Bergabung di tahun pertama |
| 🥒 Cendol Master | 500+ cendol |
| 🔬 Experimenter | 5+ proyek terverifikasi |
| 🏆 OSN Medalist | Prestasi olimpiade terverifikasi |
| 💡 Top Contributor | Top 10% kontributor bulanan |
| 📚 Educator | 10+ karya terindeks |
| 🎯 Mentor | Membimbing 3+ peneliti muda |

### Emoticon Kaskus

18 emote yang menjadi "bahasa ibu" komunitas:

| Emote | Kode | Emote | Kode |
|---|---|---|---|
| 🍵 | `:cendol` | 🧱 | `:bata` |
| 🤣 | `:ngakak` | 😳 | `:malu` |
| 😎 | `:cool` | 😕 | `:bingung` |
| 😠 | `:marah` | 😢 | `:sedih` |
| 😱 | `:takut` | 😍 | `:love` |
| 👍 | `:jempol` | 🤝 | `:salaman` |
| 🏆 | `:pertamax` | ⬆️ | `:sundul` |
| ♻️ | `:repost` | 🚫 | `:hoax` |
| 💯 | `:mantap` | 🔥 | `:gas` |

---

## Roadmap Pengembangan

### Fase 1: Fondasi ✅ (Current)

- [x] Platform sosial media MVP (feed, diskusi, proyek, profil)
- [x] Sistem auth (login, register, session)
- [x] Database Neon PostgreSQL
- [x] Gamifikasi dasar (rank, cendol/bata, emoticon)
- [x] Vercel Edge deployment
- [x] Repository strategy (monorepo + submodule)
- [x] Dokumentasi visi
- [ ] Test coverage (unit, component, e2e)

### Fase 2: Integrasi (Next)

- [ ] Unifikasi auth (SSO antara Platform dan Index)
- [ ] Shared user profile
- [ ] Index: upload dan indeksasi karya
- [ ] Index: verifikasi bertingkat
- [ ] Profil terpadu (tab "Karya" di Platform)
- [ ] Auto-post karya baru ke feed
- [ ] Shared packages (auth, types)

### Fase 3: Matang (Future)

- [ ] Mentorship matching
- [ ] Direct messaging
- [ ] Real-time notifications
- [ ] Leaderboard komunitas
- [ ] API publik
- [ ] Mobile app (PWA / native)
- [ ] i18n penuh di Platform
- [ ] Analytics dashboard untuk institusi
- [ ] Ekspor portofolio (CV researcher format)

### Fase 4: Ekosistem (Vision)

- [ ] Integrasi dengan platform kompetisi sains nasional
- [ ] Partnership dengan institusi pendidikan
- [ ] Program ambassador kampus
- [ ] Konferensi riset tahunan (online + offline)
- [ ] Grant dan pendanaan riset untuk peneliti muda

---

## Prinsip & Nilai

### Prinsip Dasar

| Prinsip | Implementasi |
|---|---|
| **Terbuka & non-profit** | Tidak terafiliasi, tidak didanai pihak manapun. Open-source. |
| **Universal** | Meskipun diinisiasi Klub Fisika, platform dirancang untuk digunakan siapa saja — tidak terikat branding organisasi. |
| **Verifikasi ketat** | Karya ilmiah diverifikasi bertingkat. Akun peneliti muda dalam pengawasan wali/mentor. |
| **Audit terbuka** | Sistem dan data dapat diaudit. Transparansi sebagai fondasi kepercayaan. |
| **Kids-friendly** | Konten dan interaksi aman untuk pengguna di bawah umur. Mode pengawasan orangtua/mentor. |
| **Kredibilitas dari karya** | Reputasi dibangun dari karya nyata, bukan dari koneksi atau popularitas semata. |

### Inspirasi

Platform ini dibangun dengan semangat para pahlawan pendidikan Indonesia:

| Tokoh | Nilai yang Diadopsi |
|---|---|
| **Ki Hajar Dewantara** | Pendidikan yang memerdekakan — ing ngarso sung tulodo, ing madyo mangun karso, tut wuri handayani |
| **HOS Cokroaminoto** | Keberanian intelektual — guru para pendiri bangsa, rumahnya adalah "kampus" pergerakan |
| **BJ Habibie** | Teknokrat sejati — ilmuwan yang membuktikan bahwa Indonesia mampu bersaing di panggung teknologi dunia |
| **Prof. Yohanes Surya** | Revolusi pendidikan sains — membawa anak-anak pelosok Indonesia ke olimpiade fisika dunia |

---

## Glosarium

| Istilah | Definisi |
|---|---|
| **Cendol** (🥒) | Apresiasi positif — satuan reputasi, setara upvote |
| **Bata** (🧱) | Feedback negatif — pengurang reputasi |
| **KF13** | Kode internal untuk Klub Fisika Indonesia (KF = Klub Fisika, 13 = angka identitas) |
| **Kaskus** | Forum komunitas terbesar Indonesia — inspirasi sistem gamifikasi |
| **SINTA** | Science and Technology Index — platform indeksasi karya ilmiah akademisi Indonesia |
| **H-index** | Metrik yang mengukur produktivitas dan dampak sitasi seorang peneliti |
| **SSO** | Single Sign-On — satu login untuk banyak aplikasi |
| **Submodule** | Git mechanism untuk menyertakan repository lain dalam repository |

---

<p align="center">
  <sub>Dokumen ini hidup dan akan terus diperbarui seiring perkembangan platform.</sub>
</p>

<p align="center">
  <sub>Diinisiasi oleh <a href="https://klubfisika.github.io">Klub Fisika Indonesia</a> — Research · Inovasi · Kolaborasi</sub>
</p>
