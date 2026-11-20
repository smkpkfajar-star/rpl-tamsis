# Kumpulan Prompt Siap Pakai untuk AI Vibecoding

Website sudah selesai dibangun (`index.html`, `css/style.css`, `js/data.js`, `js/main.js`). Prompt di bawah dipakai untuk **merawat dan mengembangkan** website tanpa merusak konsep desainnya. Selalu sertakan `@docs/DESIGN.md` agar AI tidak kembali ke pola templat lama (kartu identik, label di atas judul, fade-up di setiap section).

## Prompt Utama (Membangun Ulang dari Nol)
```text
Baca seluruh spesifikasi di @docs/PRD.md, @docs/DESIGN.md, @docs/TECH_SPEC.md, @docs/CONTENT.md, dan @docs/STRUCTURE.md. Buat website profil jurusan RPL / PPLG SMK Tamansiswa Jetis Yogyakarta dengan HTML5, Tailwind CSS (CDN), dan Vanilla JavaScript modular (index.html, css/style.css, js/data.js, js/main.js). Ikuti konsep "riwayat commit" di DESIGN.md: perjalanan siswa sebagai garis commit Git, empat bidang keahlian sebagai branch feature/*, dan kelulusan sebagai titik merge. Pakai token warna, tipografi (Plus Jakarta Sans, JetBrains Mono hanya untuk kode, Press Start 2P hanya untuk judul game), dan satu-satunya animasi otomatis berupa terminal hero yang mengetik. Gunakan naskah persis dari CONTENT.md tanpa lorem ipsum. Karya unggulan GITHUB: TEAM COLLAPSE (https://rpl.tamsis.site/) dibuka di tab baru, dan semua tombol WhatsApp memakai link wa.me dengan pesan otomatis.
```

## Prompt Mengubah Konten (Tanpa Menyentuh Desain)
```text
Baca @docs/CONTENT.md dan @js/data.js. Perbarui [bagian yang diubah, misalnya FAQ / daftar karya / langkah PKL] sesuai naskah berikut: [tempel naskah baru]. Ubah hanya js/data.js dan docs/CONTENT.md agar keduanya tetap sinkron. Jangan ubah index.html, css/style.css, atau logika js/main.js.
```

## Prompt Mengisi Data Resmi (TODO)
```text
Baca @js/data.js dan @docs/CONTENT.md. Isi semua bagian bertanda TODO dengan data resmi berikut:
- Nomor WhatsApp admin RPL: [628...]
- Alamat lengkap sekolah: [alamat]
- URL halaman jurusan DKV, TITL, TSM, TKR: [url masing-masing]
- URL publik Portal SPMB (jika ada): [url]
Perbarui juga CONTENT.md. Setelah selesai, pastikan tidak ada lagi teks "TODO" atau "628xxxxxxxxxx" yang tersisa.
```

## Prompt Menambah Karya Siswa Baru
```text
Baca @docs/CONTENT.md, @docs/DESIGN.md, dan @js/data.js. Tambahkan karya siswa baru ke array projects di js/data.js: judul [judul], kategori [Game Edukasi / Aplikasi Web / kategori baru], deskripsi [satu kalimat], URL [url atau null jika internal]. Jika kategorinya baru, tambahkan juga ke projectCategories. Tampilkan sebagai baris di daftar karya (bukan kartu), lalu catat di tabel Daftar karya pada CONTENT.md.
```

## Prompt Mengganti Logo & Aset
```text
Baca @docs/STRUCTURE.md. Saya sudah menaruh logo resmi di ./assets/images/[nama-file]. Ganti logo sementara logo-tamsis.svg di navbar, footer, dan favicon dengan file tersebut memakai relative path. Pertahankan ukuran dan atribut alt yang sudah ada.
```

## Prompt Menambah Section Baru
```text
Baca @docs/DESIGN.md dan @docs/CONTENT.md. Tambahkan section [nama section] setelah section [posisi]. Ikuti aturan DESIGN.md: judul memakai kelas .heading dengan sentence case, tanpa label kecil di atas judul, tanpa kartu berbayang, tanpa animasi fade-up, dan latar selang-seling paper/putih dengan section sebelumnya. Simpan isinya di js/data.js, tampilkan lewat fungsi render di js/main.js, lalu tambahkan naskahnya ke CONTENT.md.
```

## Prompt Audit Sebelum Rilis
```text
Jalankan pemeriksaan sesuai @docs/CHECKLIST.md pada index.html di lebar 360px, 375px, 414px, dan 1280px. Laporkan: horizontal overflow, link mati atau href="#", link eksternal tanpa target="_blank" rel="noopener noreferrer", tombol WhatsApp tanpa pesan otomatis, sisa TODO/placeholder, serta kontras warna yang tidak memenuhi WCAG AA. Perbaiki temuan yang tidak mengubah konsep di @docs/DESIGN.md.
```
