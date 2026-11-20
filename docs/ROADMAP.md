# Roadmap Eksekusi Vibecoding (4 Tahap)

## Tahap 1: Kerangka Layout & Sistem Desain
- Buat `index.html` dan `css/style.css` berdasarkan `docs/PRD.md` dan `docs/DESIGN.md`.
- Pastikan palet warna `#16523A` dan tipografi Google Fonts (`Geist`, `Geist Mono`, `Press Start 2P`) terpasang rapi.

## Tahap 2: Pemisahan Layer Data
- Buat `js/data.js` berisi array objek dari `docs/CONTENT.md` (Kurikulum, Karya Siswa, Prospek Karir, FAQ, Link Jurusan Lain di `tamsis.site`).
- Hubungkan rendering kartu dinamis lewat `js/main.js`.

## Tahap 3: Interaktivitas & Konversi SPMB
- Implementasikan *mobile navigation drawer*, *accordion FAQ*, filter kategori karya siswa, serta tombol konsultasi WhatsApp dengan *pre-filled text* untuk calon siswa SMP.
- Pastikan kartu utama `GITHUB: TEAM COLLAPSE` mengarah langsung ke `https://rpl.tamsis.site/`.

## Tahap 4: Audit & Rilis
- Jalankan pemeriksaan sesuai `docs/CHECKLIST.md` pada viewport mobile (375px) dan desktop (1280px).
