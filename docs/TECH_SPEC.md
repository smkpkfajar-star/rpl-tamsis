# Technical Specification & Implementation Guide

## 1. Tech Stack
- **Core:** Semantic HTML5, Tailwind CSS (via CDN untuk prototipe cepat atau build Vite), dan Vanilla JavaScript (ES6+) yang modular.
- **Icons:** Lucide Icons (`lucide-static` atau CDN) untuk konsistensi ikon UI.
- **Data Layer:** Pisahkan data konten (kurikulum, daftar proyek siswa, FAQ, prospek karir) ke dalam objek/file `js/data.js` agar mudah diperbarui oleh guru tanpa mengacak-acak struktur HTML.

## 2. Standar Kualitas Kode & UX
- **Zero Dead Links:** Semua tombol harus berfungsi — tautan ke `https://rpl.tamsis.site/` terbuka di tab baru (`target="_blank" rel="noopener noreferrer"`), dan tombol WhatsApp menggunakan format `https://wa.me/628xxxxxxxxxx?text=Halo%20Admin%20RPL%20SMK%20Tamansiswa%20Jetis...` (pesan teks biasa tanpa fitur interaktif WA Business).
- **Aksesibilitas:** Kontras teks memenuhi standar WCAG AA (teks putih di atas `#16523A` memiliki rasio kontras tinggi). Gunakan atribut `aria-label` pada tombol menu mobile dan modal.
- **Animasi Ringan:** Hanya satu animasi otomatis, yaitu terminal hero yang mengetik sekali saat halaman dibuka (lihat `docs/DESIGN.md` §5). `IntersectionObserver` di `main.js` dipakai untuk menandai menu section yang aktif, bukan untuk efek fade-up.
