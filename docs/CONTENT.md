# Copywriting & Konten Autentik — RPL SMK Tamansiswa Jetis

Naskah resmi website. Semua teks di sini sudah dimasukkan ke `js/data.js` (kecuali judul section statis di `index.html`). Jika naskah diubah, ubah di **kedua tempat** agar tetap sinkron.

**Gaya bahasa:** Bahasa Indonesia yang ramah untuk siswa SMP dan orang tua. Kalimat aktif, sapaan "kamu", judul memakai *sentence case* (huruf besar hanya di awal kalimat). Hindari jargon tanpa penjelasan dan jangan memakai data fiktif.

---

## 1. Navigasi
- Menu: `Perjalanan` · `Keahlian` · `Berita` · `Karya` · `PKL` · `Karir` · `FAQ`
- Tombol: `Daftar SPMB` → WhatsApp (pesan SPMB)

## 2. Hero
- **Pill pengumuman (di atas headline):** `Coba GITHUB: TEAM COLLAPSE, gim karya siswa RPL` → `https://rpl.tamsis.site/` (tab baru)
- **Keterangan kecil (di bawah tombol):** `Konsentrasi Keahlian RPL / PPLG, Kurikulum Merdeka`
- **Sel di samping terminal:** judul `Belajar seperti tim developer sungguhan`, teks `Empat bidang dikerjakan di branch masing-masing, lalu digabung jadi satu bekal kerja.` + grafik `main` → 4 branch → `lulus`.
- **Baris 4 bidang:** nama branch + nama bidang (diambil dari data keahlian), klik membuka bidang tersebut.
- **Headline:** `Bangun Aplikasi, Gim Edukasi, dan Karir Digital Masa Depan.`
- **Subheadline:** `Belajar coding dari nol hingga mahir membuat website full-stack, pemrograman Python, serta gim interaktif di SMK Tamansiswa Jetis Yogyakarta dengan standar alur kerja industri.`
- **CTA utama:** `Coba Game Karya RPL` → `https://rpl.tamsis.site/` (tab baru)
- **CTA sekunder:** `Tanya Info SPMB` → WhatsApp (pesan SPMB)
- **Terminal interaktif.** Intro diketik sekali saat halaman dibuka:
  ```text
  $ git clone rpl-tamsis
  Cloning into 'rpl-tamsis'... selesai.
  ✔ Ketik perintah atau klik tombol di bawah. Coba: keahlian
  ```
  - **Placeholder input:** `ketik perintah, misal: bantuan`
  - **Chip perintah cepat:** `bantuan` · `keahlian` · `perjalanan` · `berita` · `karya` · `karir` · `daftar`
  - **Perintah yang dikenali:** `gitquest` (tautan GIT QUEST), `main`/`play` (daftar kedua game), `berita`/`news`, `bantuan`/`help`, `keahlian`/`git branch`, `git checkout feature/…`, `perjalanan`/`git log`, `karya`, `karir`, `daftar`/`spmb` (tautan WhatsApp), `main`/`play` (tautan game), `clear`. Perintah lain: `perintah tidak dikenal: … Ketik bantuan.` Perintah `sudo`: `Akses ditolak. Daftar RPL dulu, nanti kamu belajar soal ini.`
  - Isi keluaran perintah diambil otomatis dari data keahlian, perjalanan, karya, dan karir (lihat `js/main.js`, objek `Terminal`).

## 3. Perjalanan (riwayat commit)
- **Judul:** `Dari belum bisa coding sampai siap kerja`
- **Pengantar:** `Tiga tahun di RPL dicatat seperti riwayat commit di Git. Klik tiap commit untuk melihat isinya.`
- **Tombol panel:** `Sebelumnya` · `Berikutnya`. Commit terakhir diberi label `(HEAD → main)`.

| Hash | Jenis | Judul | Detail (tampil di panel `git show`) | Tautan |
|---|---|---|---|---|
| `0d4e8b7` | commit | Daftar ke RPL | Kamu tidak perlu sudah bisa coding sebelum masuk RPL. Cukup punya rasa penasaran dan mau belajar pelan-pelan. Info jadwal dan syarat SPMB bisa ditanyakan langsung ke admin lewat WhatsApp. | — |
| `2a6f913` | commit | Dasar logika | Pembelajaran dimulai dari dasar logika pemrograman dan pengenalan kode langkah demi langkah. Praktiknya di laboratorium komputer sekolah, jadi laptop pribadi bukan syarat. | — |
| `5e1c0d4` | branch | Empat bidang keahlian | Dari Kelas X sampai XII kamu mendalami empat bidang: Web & Full-Stack Development, Python & PBO, Game Development & UI/UX Design, serta Git, GitHub & Kolaborasi Tim. | `Coba keempat bidangnya` → `#keahlian` |
| `7b10e4d` | commit | PKL di industri | Siswa menerapkan keterampilannya langsung di dunia usaha dan dunia industri (DUDI), lalu menyusun laporan PKL secara terstruktur dengan Sistem Generator Laporan PKL. | `Lihat alur PKL` → `#pkl` |
| `8c3fa21` | commit | UKK | Bekal dari simulasi alur kerja developer profesional, seperti version control dan branching, dipakai untuk menghadapi Uji Kompetensi Keahlian (UKK). | — |
| `9f3a2c1` | merge | Lulus | Semua branch digabung jadi satu. Lulusan siap bekerja, berwirausaha di bidang digital, atau melanjutkan kuliah di jurusan Informatika/Ilmu Komputer. | `Pilih jalan setelah lulus` → `#karir` |

> Setiap commit juga punya `text` pendek (±10 kata) di `js/data.js` yang dipakai sebagai ringkasan.

## 4. Empat bidang keahlian (Kelas X – XII)
- **Judul:** `Pindah branch, coba kodenya`
- **Pengantar:** `Empat bidang keahlian dari Kelas X sampai XII. Pilih satu, baca contoh kodenya, lalu tekan Jalankan.`
- **Label materi:** `Yang dipakai`
- **Editor kode:** tiap bidang menampilkan contoh kode sederhana (`index.html`, `siswa.py`, `game.js`, `terminal`; isi lengkap di `js/data.js` → `curriculum[].code`). Sebelum dijalankan: `Tekan Jalankan untuk melihat hasilnya.`
- **Hasil tombol Jalankan:**
  - `feature/web`: tombol `Klik aku` yang berubah jadi `Halo, calon developer!`
  - `feature/python`: `Kamu menguasai 3 materi`
  - `feature/game`: arena kecil, hero pixel digerakkan dengan tombol ◀ ▶ atau panah keyboard (`hero.x = n`)
  - `feature/git`: keluaran `git push` dan `Siap dibuatkan Pull Request untuk direview tim.`
- **Tautan latihan:** panel `feature/git` punya tombol `Latihan di GIT QUEST` → `./pages/media/gameinteraktif/git_guest/index.html`.

| Branch | Bidang | Deskripsi | Alat & materi |
|---|---|---|---|
| `feature/web` | Web & Full-Stack Development | Merancang antarmuka modern dengan HTML5, Tailwind CSS, JavaScript, hingga pengembangan backend menggunakan Node.js & Laravel. | HTML5, Tailwind CSS, JavaScript, Node.js, Laravel |
| `feature/python` | Python & Pemrograman Berorientasi Objek | Menguasai logika algoritma, struktur data, dan arsitektur kode bersih berbasis objek. | Python, PBO, algoritma, struktur data |
| `feature/game` | Game Development & UI/UX Design | Merancang media pembelajaran interaktif, simulasi berbasis web, dan aset visual bergaya pixel-art modern. | UI/UX, pixel-art, simulasi web |
| `feature/git` | Git, GitHub & Kolaborasi Tim | Simulasi alur kerja developer profesional menggunakan version control, branching, serta persiapan Uji Kompetensi Keahlian (UKK). | Git, GitHub, branching, UKK |

### Kuis minat
- **Judul:** `Branch mana yang paling cocok buatmu?`
- **Pengantar:** `Jawab tiga pertanyaan singkat. Tidak ada jawaban salah, dan di RPL kamu tetap belajar keempat bidang.`

| Pertanyaan | web | python | game | git |
|---|---|---|---|---|
| Kamu paling penasaran dengan... | Cara website dan aplikasi dibuat | Cara komputer memecahkan soal | Cara game dibuat dan dimainkan | Cara tim besar bisa bekerja bareng |
| Saat tugas kelompok, kamu biasanya... | Menyusun semua info jadi satu halaman | Mengerjakan bagian hitungan dan logika | Merapikan tampilan dan desainnya | Membagi tugas lalu menggabungkan hasilnya |
| Karya yang paling ingin kamu buat... | Website sekolah atau toko online | Program yang menyelesaikan masalah otomatis | Game edukasi bergaya pixel-art | Proyek besar bersama teman satu tim |

- **Hasil:** `Kamu cocok mulai dari feature/…` + nama dan deskripsi bidang + `Ingat, di RPL kamu tetap belajar keempat bidang. Ini cuma titik mulai yang paling seru buatmu.`
- **Tombol:** `Coba kodenya` (membuka branch tersebut) · `Ulangi kuis` · `Kembali` (saat menjawab)

## 5. Praktik Kerja Lapangan
- **Interaksi:** stepper 4 langkah; tombol `Langkah berikutnya`, di langkah terakhir `Ulangi dari awal`.
- **Judul:** `Praktik Kerja Lapangan`
- **Pengantar:** `Siswa menerapkan keterampilannya langsung di dunia usaha dan dunia industri (DUDI), lalu menyusun laporan PKL secara terstruktur.`
- **Langkah (berurutan):**
1. **Pembekalan:** Persiapan kompetensi dan etika kerja.
2. **Penempatan di DUDI:** Ditempatkan di dunia usaha dan industri mitra sekolah.
3. **Praktik & bimbingan:** Tugas nyata, didampingi pembimbing industri dan guru.
4. **Laporan PKL:** Disusun dengan Sistem Generator Laporan PKL.

> Nama perusahaan mitra PKL belum dicantumkan. Tambahkan hanya jika sudah ada data resmi dari sekolah.

## 6. Karya
### Kabar terbaru (scroll horizontal)
- **Judul:** `Kabar terbaru dari RPL`
- **Pengantar:** `Karya, aplikasi, dan info seputar jurusan. Geser ke samping untuk melihat lainnya.`
- **Kontrol:** penghitung `n / total`, tombol ‹ ›, geser jari/trackpad, seret mouse, panah keyboard.
- **Isi awal** (hanya fakta dari dokumen ini, tanpa tanggal):

| Kategori | Judul | Ringkasan | Tautan |
|---|---|---|---|
| Game edukasi *(kartu lebar, gambar sampul `pages/media/gameinteraktif/git_guest/assets/images/cover-gitquest.webp`)* | GIT QUEST: belajar Git lewat petualangan RPG | Jelajahi dunia ala RPG, baca materi dari NPC, lalu kalahkan monster bug lewat kuis, simulasi terminal, dan simulator commit. 7 stage untuk siswa kelas XI RPL, bisa dimainkan tanpa internet. Catatan: `Paling nyaman dimainkan di komputer atau laptop.` | `Mainkan GIT QUEST` → `./pages/media/gameinteraktif/git_guest/index.html` |
| Karya siswa *(kartu unggulan, pixel-art)* | GITHUB: TEAM COLLAPSE bisa dimainkan langsung di browser | Gim edukasi berbasis web bergaya JRPG/Simulasi untuk melatih kolaborasi tim menggunakan Git branching dan penyelesaian merge conflict. | `Mainkan sekarang` → `https://rpl.tamsis.site/` |
| Aplikasi web | Portal SPMB Online SMK Tamansiswa Jetis | Sistem pendaftaran peserta didik baru terintegrasi verifikasi berkas digital, dikembangkan di lingkungan RPL. | — |
| Aplikasi web | Generator Laporan PKL bantu siswa menyusun laporan | Aplikasi web internal untuk membantu siswa menyusun dokumen laporan Praktik Kerja Lapangan secara terstruktur. | — |
| Kurikulum | RPL / PPLG belajar dengan Kurikulum Merdeka | Web full-stack, Python & PBO, game & UI/UX, serta Git dan kolaborasi tim dipelajari dari Kelas X sampai XII. | `Lihat selengkapnya` → `#keahlian` |
| Info SPMB | Tanya jadwal dan syarat SPMB lewat WhatsApp | Admin dan guru RPL siap menjawab pertanyaan calon siswa maupun orang tua seputar pendaftaran. | `Tanya lewat WhatsApp` |

> **TODO:** tambahkan berita kegiatan asli (lomba, kunjungan industri, workshop, pameran karya, dll.) di `js/data.js` → `news`, lengkap dengan `date` (YYYY-MM-DD) dan foto (`image`, simpan di `assets/images/news/`). Format lengkap ada di komentar di atas array `news`. Jangan menambahkan berita yang tidak benar-benar terjadi.

### Daftar karya
- **Judul section:** `Karya dan aplikasi buatan RPL`
- **Filter:** `Semua` · `Game Edukasi` · `Aplikasi Web`

| Kategori | Judul | Deskripsi | Aksi |
|---|---|---|---|
| Game Edukasi | GIT QUEST — The Repository Chronicles | Game RPG edukatif untuk belajar dasar Git: version control, tiga area Git, perintah CLI, commit, dan .gitignore. 7 stage, 10 karakter, bisa dimainkan offline. | `Buka karya` → `./pages/media/gameinteraktif/git_guest/index.html` |
| Game Edukasi | GITHUB: TEAM COLLAPSE | Gim edukasi bergaya JRPG/Simulasi untuk berlatih Git branching dan menyelesaikan merge conflict bersama tim. | `Buka karya` → `https://rpl.tamsis.site/` |
| Aplikasi Web | Portal SPMB Online SMK Tamansiswa Jetis | Sistem pendaftaran peserta didik baru terintegrasi verifikasi berkas digital. | `Dipakai internal sekolah` *(isi URL jika sudah publik)* |
| Aplikasi Web | Sistem Generator Laporan PKL Otomatis | Aplikasi web internal untuk membantu siswa menyusun dokumen laporan Praktik Kerja Lapangan secara terstruktur. | `Dipakai internal sekolah` |

## 7. Karir
- **Judul:** `Setelah lulus, pilih jalanmu`
- **Pengantar:** `Keterampilan RPL bisa langsung dipakai bekerja, dijadikan usaha, atau jadi bekal kuliah.`

| Jalan | Teks | Daftar |
|---|---|---|
| Bekerja | Langsung berkarir di bidang pengembangan perangkat lunak. | Junior Web / Software Developer, Game Developer, UI/UX Designer, QA / Software Tester, IT Support |
| Berwirausaha | Membuka usaha sendiri di bidang digital. | Jasa pembuatan website, Jasa pembuatan aplikasi |
| Kuliah | Melanjutkan pendidikan ke perguruan tinggi. | Informatika, Ilmu Komputer |

## 8. FAQ calon siswa (SMP/MTs)
- **Judul:** `Yang sering ditanyakan`
- **Pengantar:** `Pertanyaan dari calon siswa dan orang tua saat memilih jurusan.`

- **Q: Apakah masuk jurusan RPL harus sudah bisa coding sebelumnya?**
  A: Tidak perlu. Pembelajaran dimulai dari dasar logika pemrograman dan pengenalan kode langkah demi langkah.
- **Q: Apakah wajib punya laptop sendiri saat mendaftar?**
  A: Sekolah menyediakan laboratorium komputer lengkap untuk praktik di sekolah. Memiliki laptop pribadi di rumah akan sangat membantu eksplorasi mandiri, namun bukan syarat wajib pendaftaran.
- **Q: Bagaimana prospek lulusan RPL setelah lulus?**
  A: Lulusan siap bekerja sebagai Junior Web/Software Developer, Game Developer, UI/UX Designer, IT Support, berwirausaha di bidang digital, maupun melanjutkan kuliah di jurusan Informatika/Ilmu Komputer.
- **Q: Berapa biaya sekolah dan bagaimana cara mendaftar SPMB?**
  A: Informasi biaya, jadwal, dan alur pendaftaran SPMB terbaru dapat ditanyakan langsung kepada admin melalui WhatsApp.
  Tautan: `Tanya biaya dan jadwal SPMB` → WhatsApp (pesan SPMB)

> Jika sekolah sudah punya angka biaya resmi, ganti jawaban ini dengan rinciannya.

## 9. Ajakan daftar (CTA penutup)
- **Judul:** `Masih ragu? Ngobrol dulu sebelum daftar.`
- **Teks:** `Admin dan guru RPL siap menjawab soal jadwal, syarat, dan alur pendaftaran SPMB, untuk calon siswa maupun orang tua.`
- **Tombol:** `Chat admin RPL` → WhatsApp (pesan konsultasi)
- **Tautan:** `Buka portal tamsis.site` → `https://tamsis.site/`

## 10. Pesan WhatsApp otomatis
- **SPMB:** `Halo Admin RPL SMK Tamansiswa Jetis, saya ingin bertanya tentang info pendaftaran SPMB untuk jurusan Rekayasa Perangkat Lunak (RPL / PPLG). Terima kasih.`
- **Konsultasi:** `Halo Admin RPL SMK Tamansiswa Jetis, saya calon siswa/orang tua calon siswa dan ingin berkonsultasi tentang jurusan Rekayasa Perangkat Lunak (RPL / PPLG). Terima kasih.`
- **Nomor:** `628xxxxxxxxxx` ← **TODO: isi nomor resmi admin/guru RPL**

## 11. Footer
- **Identitas:** `SMK Tamansiswa Jetis Yogyakarta` / `Rekayasa Perangkat Lunak / PPLG`
- **Alamat:** `SMK Tamansiswa Jetis, Kecamatan Jetis, Kota Yogyakarta, Daerah Istimewa Yogyakarta` ← **TODO: lengkapi nama jalan & nomor**
- **Jurusan lain:** Desain Komunikasi Visual (DKV), Teknik Instalasi Tenaga Listrik (TITL), Teknik Sepeda Motor (TSM), Teknik Kendaraan Ringan (TKR) ← **TODO: URL halaman tiap jurusan**
- **Tautan:** Portal utama tamsis.site, Main GITHUB: TEAM COLLAPSE, Perjalanan belajar di RPL, Pertanyaan calon siswa
- **Hak cipta:** `© {tahun} RPL SMK Tamansiswa Jetis Yogyakarta, bagian dari tamsis.site`
