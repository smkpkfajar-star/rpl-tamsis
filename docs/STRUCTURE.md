# Struktur Direktori & Arsitektur File Proyek

```text
web-rpl-tamsis/
├── docs/                        <-- Folder khusus dokumentasi & referensi AI
│   ├── PRD.md                   <-- Spesifikasi fitur & perbaikan dari tamsis.site
│   ├── DESIGN.md                <-- Panduan warna (#16523A), font, & Material Design 3
│   ├── TECH_SPEC.md             <-- Standar kode, modular JS, & aturan link WA
│   ├── CONTENT.md               <-- Naskah asli berbahasa Indonesia
│   ├── STRUCTURE.md             <-- Peta folder & aturan koneksi antarfile
│   ├── ROADMAP.md               <-- Panduan tahap demi tahap pengerjaan
│   ├── CHECKLIST.md             <-- Daftar pemeriksaan akhir sebelum rilis
│   └── PROMPT.md                <-- Kumpulan prompt siap pakai untuk vibecoding
│
├── assets/                      <-- Aset gambar & media lokal
│   ├── images/
│   │   ├── logo-tamsis.svg      <-- Logo sementara (ganti dengan logo resmi)
│   │   ├── hero-mockup.webp     <-- Ilustrasi/screenshot lab atau game Git
│   │   └── projects/            <-- Thumbnail karya siswa (rpl.tamsis.site, SPMB, dll)
│   └── icons/
│       └── favicon.svg
│
├── js/                          <-- Logika JavaScript modular
│   ├── data.js                  <-- Data kurikulum, proyek siswa, prospek karir, & FAQ
│   └── main.js                  <-- Interaksi UI (tema terang/gelap, terminal, git log, branch + kode, kuis, berita scroll horizontal, stepper PKL, FAQ, drawer)
│
├── css/                         <-- Custom styling tambahan di luar Tailwind
│   └── style.css                <-- Animasi halus, custom scrollbar, font variables
│
├── git_guest/                   <-- GIT QUEST: game RPG edukatif Git (repo terpisah, web statis, bisa offline)
│   ├── index.html               <-- Ditautkan dari website: ./git_guest/index.html
│   ├── assets/images/cover-gitquest.webp  <-- Sampul, dipakai di kartu berita
│   └── README.md                <-- Cara menjalankan & batasan (belum optimal di HP)
│
├── .cursorrules                 <-- Aturan otomatis untuk AI editor (Cursor/Windsurf)
└── index.html                   <-- Halaman utama portal Jurusan RPL / PPLG
```

## Aturan Path & Koneksi Antarfile
- Semua tautan aset di `index.html` dan `js/data.js` wajib menggunakan *relative path* (contoh: `./assets/images/logo-tamsis.svg`, `./js/data.js`).
- `js/data.js` dimuat sebelum `js/main.js` di bagian bawah `<body>` agar variabel data siap digunakan.
