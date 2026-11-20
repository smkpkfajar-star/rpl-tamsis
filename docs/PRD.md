# Product Requirements Document (PRD): Portal Jurusan RPL SMK Tamansiswa Jetis

## 1. Tujuan & Target Audiens
Membangun portal resmi Konsentrasi Keahlian **Rekayasa Perangkat Lunak (RPL / PPLG)** di bawah naungan ekosistem `tamsis.site` (SMK Tamansiswa Jetis Yogyakarta).
- **Audiens Utama:** Siswa SMP/MTs kelas IX & orang tua calon pendaftar SPMB.
- **Audiens Sekunder:** Mitra industri (DUDI / tempat PKL), guru, dan siswa aktif RPL.

## 2. Daftar Perbaikan dari Struktur Web Sebelumnya (`tamsis.site`)
1. **Perbaikan Hierarki Informasi:** Mengubah tampilan yang sebelumnya terlalu statis dan penuh teks menjadi *scannable* dengan alur "riwayat commit" perjalanan siswa (lihat `docs/DESIGN.md`).
2. **Penonjolan Bukti Karya (Show, Don't Just Tell):** Menampilkan demo langsung proyek siswa dan media pembelajaran interaktif (seperti *serious game* Git `GITHUB: TEAM COLLAPSE` di `rpl.tamsis.site`), bukan sekadar daftar mata pelajaran.
3. **Alur Konversi SPMB yang Jelas:** Menyediakan tombol aksi (CTA) konsisten untuk konsultasi jurusan via WhatsApp standar (direct link `wa.me`) dan simulasi/info pendaftaran SPMB.
4. **Responsivitas & Performa Mobile:** Memastikan navigasi bawah (*bottom bar* / *hamburger drawer*) nyaman diakses lewat HP siswa SMP dengan kecepatan muat instan.

## 3. Struktur Halaman & Fitur Utama (Single Page + Modal/Drawer)
- **Navbar Sticky:** Logo SMK Tamansiswa Jetis + Badge "RPL / PPLG", menu navigasi cepat, dan tombol CTA **"Daftar SPMB"**.
- **Hero Section:** Headline tajam tentang mencetak *Software & Game Developer* muda, subheadline berbasis Kurikulum Merdeka & praktik industri, CTA utama ("Coba Game Karya RPL" & "Info Pendaftaran"), serta ilustrasi/mockup kode & pixel-art modern.
- **Perjalanan & Kurikulum (riwayat commit, empat bidang keahlian sebagai branch `feature/*`):**
  - *Web & Full-Stack Development* (HTML5, JS, Tailwind, Laravel/Node.js).
  - *Python & Pemrograman Berorientasi Objek (PBO)*.
  - *Educational Game Dev & UI/UX* (Pixel-art, simulasi interaktif).
  - *Workflow Industri* (Git, GitHub, kolaborasi tim & persiapan UKK).
- **Showcase Karya & Lab Virtual (Featured Section):**
  - Kartu sorotan utama: **GITHUB: TEAM COLLAPSE** (`https://rpl.tamsis.site/`) dengan tombol langsung mainkan di browser.
  - Galeri proyek siswa: Portal SPMB, Sistem Generator Laporan PKL, dan aplikasi web sekolah.
- **Prospek Karir & Mitra PKL:** Daftar peran lulusan (*Frontend/Backend Dev, Game Dev, UI/UX Designer, QA*) serta gambaran program Praktik Kerja Lapangan (PKL).
- **FAQ & Konsultasi Langsung:** Accordion pertanyaan umum (apakah harus punya laptop sendiri, prospek kuliah/kerja, biaya) + tombol chat WhatsApp admin/guru RPL.
- **Footer:** Alamat lengkap SMK Tamansiswa Jetis Yogyakarta, tautan kembali ke portal utama `tamsis.site`, dan link jurusan lain (DKV, TITL, TSM, TKR).
