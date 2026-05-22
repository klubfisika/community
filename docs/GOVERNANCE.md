# GOVERNANCE.md — Tata Kelola KF13 Community Platform

> Dokumen ini menjelaskan bagaimana keputusan dibuat, siapa yang memiliki otoritas apa,
> dan bagaimana platform ini dikelola secara bertanggung jawab sebagai proyek komunitas.
> Governance adalah fondasi kepercayaan. Tanpa tata kelola yang jelas, komunitas tidak bisa tumbuh.

---

## Daftar Isi

1. [Filosofi Governance](#1-filosofi-governance)
2. [Struktur Saat Ini (Bootstrap Phase)](#2-struktur-saat-ini-bootstrap-phase)
3. [Peran dan Tanggung Jawab](#3-peran-dan-tanggung-jawab)
4. [Proses Pengambilan Keputusan](#4-proses-pengambilan-keputusan)
5. [RFC — Request for Comments](#5-rfc--request-for-comments)
6. [Kode Etik (Code of Conduct)](#6-kode-etik-code-of-conduct)
7. [Penyelesaian Konflik](#7-penyelesaian-konflik)
8. [Roadmap Governance](#8-roadmap-governance)

---

## 1. Filosofi Governance

KF13 dirancang untuk tidak bergantung pada satu orang atau satu organisasi. Namun realitanya, setiap proyek open-source dimulai dengan seseorang yang memulai.

Prinsip governance KF13:

1. **Meritokrasi berbasis kontribusi** — otoritas diperoleh dari kontribusi nyata, bukan dari jabatan atau afiliasi
2. **Transparansi penuh** — semua keputusan besar didiskusikan terbuka, tidak ada keputusan tersembunyi
3. **Konsensus dulu, voting jika perlu** — sebisa mungkin keputusan dicapai dengan konsensus; voting hanya jika konsensus tidak tercapai
4. **Tidak ada single point of failure** — tidak ada satu orang pun yang *harus* ada agar platform bisa berjalan
5. **Evolusi bertahap** — governance berkembang seiring platform dan komunitas tumbuh

---

## 2. Struktur Saat Ini (Bootstrap Phase)

Platform masih dalam fase awal. Governance saat ini bersifat **pragmatis**: keputusan dibuat oleh tim bootstrap Klub Fisika Indonesia, dengan mekanisme yang makin terbuka seiring komunitas tumbuh.

```
BOOTSTRAP PHASE (Sekarang)
┌─────────────────────────────────────────────────────┐
│                  KLUB FISIKA INDONESIA               │
│              (Inisiator & Bootstrap Team)            │
│                                                      │
│  • Keputusan arsitektur teknis                       │
│  • Moderasi konten awal                              │
│  • Pengelolaan infrastruktur                         │
│  • Arah produk jangka pendek                         │
└─────────────────────────────────────────────────────┘
                          │
                          │ berkembang menjadi
                          ▼
COMMUNITY PHASE (Target: 12–24 bulan setelah launch)
┌─────────────────────────────────────────────────────┐
│                  STEERING COMMITTEE                  │
│           (multi-stakeholder, terpilih)              │
├──────────────┬──────────────────┬───────────────────┤
│  CORE TEAM   │  ADVISORY BOARD  │  COMMUNITY REPS   │
│  (teknis)    │  (domain expert) │  (pengguna)       │
└──────────────┴──────────────────┴───────────────────┘
```

---

## 3. Peran dan Tanggung Jawab

### 3.1 Maintainer

**Siapa**: Developer yang memiliki akses merge ke `main` branch.

**Tanggung jawab:**
- Review dan merge pull request
- Menjaga kualitas dan konsistensi kode
- Memimpin diskusi teknis
- Release management

**Cara menjadi maintainer:**
- Kontribusi signifikan (minimal 5 PR yang di-merge)
- Diusulkan oleh maintainer yang sudah ada
- Disetujui oleh minimal 2 maintainer aktif lainnya

### 3.2 Kontributor

**Siapa**: Siapapun yang membuat PR, issue, atau kontribusi dokumentasi.

**Tanggung jawab:**
- Mengikuti panduan di [CONTRIBUTING.md](../CONTRIBUTING.md)
- Merespons review dalam waktu wajar
- Menjaga diskusi tetap konstruktif

**Tidak ada prasyarat** untuk menjadi kontributor — buka PR, buka issue, mulai diskusi.

### 3.3 Advisory Board (Direncanakan)

**Siapa**: Pakar domain yang memberikan masukan strategis.

**Komposisi yang direncanakan:**
| Kursi | Domain |
|-------|--------|
| 1–2 kursi | Akademisi / peneliti pendidikan |
| 1 kursi | Guru / praktisi pendidikan K-12 |
| 1 kursi | Pustakawan / pakar indeksasi |
| 1 kursi | Pakar open science / open data |
| 1 kursi | Perwakilan komunitas pengguna |

**Peran**: Memberikan masukan, bukan mengambil keputusan. Advisory board tidak memiliki veto.

### 3.4 Community Representatives (Direncanakan)

Setelah komunitas pengguna terbentuk, perwakilan dipilih dari:
- Komunitas siswa/peneliti muda
- Komunitas guru/mentor
- Komunitas institusi yang mengadopsi platform

---

## 4. Proses Pengambilan Keputusan

### Skala Keputusan

| Tipe Keputusan | Contoh | Mekanisme |
|----------------|--------|-----------|
| **Kecil** (tidak mempengaruhi user) | Refactoring internal, typo fix | PR langsung, 1 reviewer |
| **Sedang** (mempengaruhi sebagian user) | Perubahan API, fitur baru minor | PR + discussion, 2 reviewer |
| **Besar** (mempengaruhi semua user) | Perubahan schema database, perubahan auth | RFC process, minimal 7 hari diskusi |
| **Strategis** (arah platform) | Pivot produk, perubahan governance, lisensi | RFC + vote steering committee |

### Proses Standar (Keputusan Sedang)

```
1. Buka issue / discussion
         │
         ▼
2. Kumpulkan feedback (minimal 5 hari)
         │
         ▼
3. Buat PR dengan implementasi
         │
         ▼
4. Review oleh 2 maintainer
         │
         ▼
5. Merge setelah approval
```

### Proses RFC (Keputusan Besar)

Lihat [Section 5](#5-rfc--request-for-comments) untuk detail.

---

## 5. RFC — Request for Comments

RFC adalah mekanisme untuk keputusan besar yang mempengaruhi arah platform secara signifikan.

### Kapan RFC Diperlukan

- Perubahan breaking pada API publik
- Perubahan besar pada schema database
- Perubahan arsitektur sistem autentikasi
- Penambahan atau penghapusan dependensi utama
- Perubahan pada model governance itu sendiri
- Keputusan strategis produk yang permanen

### Format RFC

Buat file di `docs/rfcs/0000-nama-singkat.md` dengan struktur:

```markdown
# RFC-XXXX: Judul Singkat

## Summary
Penjelasan singkat (1–2 paragraf) tentang apa yang diusulkan.

## Motivation
Mengapa ini perlu? Masalah apa yang dipecahkan?

## Detailed Design
Penjelasan teknis detail dari perubahan yang diusulkan.

## Drawbacks
Apa kelemahan atau konsekuensi negatif dari proposal ini?

## Alternatives
Alternatif apa yang sudah dipertimbangkan dan mengapa ditolak?

## Unresolved Questions
Pertanyaan apa yang belum terjawab dan perlu didiskusikan lebih lanjut?
```

### Proses RFC

```
1. Buat PR dengan file RFC di docs/rfcs/
         │
         ▼
2. Anonunskan di GitHub Discussions
         │
         ▼
3. Periode komentar minimal 14 hari
         │
         ▼
4. Revisi RFC berdasarkan feedback
         │
         ▼
5. Keputusan: Accept / Reject / Defer
         │
         ▼
6. Merge RFC ke main (sebagai catatan)
         │
         ▼
7. Implementasi dimulai
```

---

## 6. Kode Etik (Code of Conduct)

KF13 mengadopsi [Contributor Covenant v2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) sebagai standar perilaku.

### Standar Perilaku

**Yang diharapkan:**
- Bahasa yang inklusif dan ramah
- Menghormati sudut pandang dan pengalaman yang berbeda
- Menerima kritik konstruktif dengan baik
- Fokus pada apa yang terbaik untuk komunitas
- Menunjukkan empati terhadap anggota komunitas lain

**Yang tidak ditoleransi:**
- Bahasa atau gambar seksual dan perhatian seksual yang tidak diinginkan
- Komentar merendahkan, penghinaan personal atau politik
- Pelecehan publik atau privat
- Mempublikasikan informasi pribadi orang lain tanpa izin
- Perilaku lain yang dianggap tidak pantas dalam konteks profesional

### Penegakan

Pelanggaran dapat dilaporkan ke: **[conduct@klubfisika.or.id]** (placeholder — ganti dengan email aktif)

Semua laporan akan:
- Direspons dalam 48 jam
- Ditangani dengan kerahasiaan
- Ditindaklanjuti dengan konsekuensi yang proporsional

**Konsekuensi bertahap:**
1. **Peringatan** — untuk pelanggaran pertama yang ringan
2. **Suspend sementara** — tidak bisa berkontribusi selama 30 hari
3. **Ban permanen** — untuk pelanggaran berat atau berulang

---

## 7. Penyelesaian Konflik

### Konflik Teknis

Untuk ketidaksepakatan tentang implementasi teknis:
1. Presenter masing-masing argumen secara tertulis di GitHub Discussion
2. Cari data atau preseden dari proyek open-source lain
3. Jika tidak ada konsensus setelah 7 hari: maintainer senior memutuskan
4. Keputusan dapat di-appeal ke Steering Committee (setelah terbentuk)

### Konflik Non-teknis

Untuk ketidaksepakatan tentang arah produk, prioritas, atau governance:
1. Diskusi terbuka di GitHub Discussions
2. Mediasi oleh maintainer netral jika diperlukan
3. Jika tidak ada resolusi: RFC formal

### Prinsip Resolusi

- **Asumsikan itikad baik** dulu sebelum berasumsi sebaliknya
- **Data beats opinion** — argumen berbasis data lebih kuat
- **Dokumentasikan keputusan** — bahkan jika Anda tidak setuju, dokumentasikan mengapa keputusan dibuat

---

## 8. Roadmap Governance

| Milestone | Target | Indikator |
|-----------|--------|-----------|
| **Bootstrap phase** | Sekarang | Tim Klub Fisika mengambil semua keputusan |
| **Komunitas awal** | Launch + 3 bulan | Minimal 3 maintainer dari luar Klub Fisika |
| **Advisory Board** | Launch + 6 bulan | 3–5 anggota advisory board aktif |
| **Steering Committee** | Launch + 12 bulan | Komite terpilih, multi-stakeholder |
| **Foundation independence** | Launch + 24 bulan | Platform tidak bergantung pada Klub Fisika secara infrastruktur |
| **Open Collective** | Launch + 12 bulan | Transparansi keuangan penuh via Open Collective |

---

<p align="center">
  <sub>
    Pertanyaan tentang governance?
    <a href="https://github.com/klubfisika/community/discussions">Buka diskusi</a>
    ·
    <a href="FUNDING.md">Funding</a>
    ·
    <a href="../CONTRIBUTING.md">Kontribusi</a>
  </sub>
</p>
