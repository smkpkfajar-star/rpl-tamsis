# Design System: RPL SMK Tamansiswa Jetis — "Riwayat Commit", gaya monokrom bergaris

## 1. Filosofi Desain
Tampilan **monokrom bergaris** khas situs developer modern (bingkai konten, sel grid dengan garis 1px, penanda "+" di sudut, font Geist, mode terang/gelap), dipadukan dengan konsep jurusan: **perjalanan siswa RPL sebagai riwayat commit Git**. Empat bidang keahlian adalah branch `feature/*` yang digabung (*merge*) saat lulus.

> Gaya ini hanya mengambil prinsip tata letak & tipografi. Tidak memakai logo, nama, ikon, atau aset merek perusahaan mana pun.

Prinsip utama:
- **Dasar monokrom, aksen bermakna.** Latar, teks, garis, dan tombol utama hitam/putih/abu. Warna hanya muncul untuk informasi: 4 warna lajur branch dan emas pixel-art game.
- **Setiap section adalah satu interaksi dari dunia RPL**: terminal yang bisa diketik, `git log` yang bisa diklik, branch + kode yang bisa dijalankan, kuis minat, kabar terbaru yang digeser ke samping, stepper PKL.
- **Satu elemen berani:** kartu unggulan *GITHUB: TEAM COLLAPSE* di deretan berita, berlatar gelap dengan pixel-art emas, di kedua mode.
- **Struktur = informasi.** Garis memisahkan sel; nomor hanya untuk langkah PKL; hash commit & nama branch memakai font mono karena memang kode.
- **Hindari pola templat:** tanpa label kecil di atas setiap judul, tanpa satu kata berwarna di headline, tanpa kartu berbayang seragam, tanpa fade-up di setiap section.

## 2. Warna
Semua warna dasar adalah variabel CSS di `css/style.css` (`:root` untuk terang, `[data-theme="dark"]` untuk gelap) dan dipetakan ke Tailwind (`fg`, `muted`, `base`, `base2`, `line`, `line2`).

| Variabel | Terang | Gelap | Penggunaan |
|---|---|---|---|
| `--bg` | `#FFFFFF` | `#0A0A0A` | Latar halaman & sel |
| `--bg2` | `#FAFAFA` | `#111111` | Hover sel, panel editor, tab aktif |
| `--fg` | `#171717` | `#EDEDED` | Teks utama, penanda "+" |
| `--muted` | `#666666` | `#A1A1A1` | Teks deskripsi |
| `--line` | `#EAEAEA` | `#262626` | Garis bingkai & pemisah sel |
| `--line2` | `#D4D4D4` | `#3D3D3D` | Garis tombol sekunder, titik latar |
| `--btn-bg` / `--btn-fg` | `#171717` / putih | `#EDEDED` / `#0A0A0A` | Tombol utama (terbalik di mode gelap) |
| `--code-bg` | `#0A0A0A` | `#000000` | Terminal & editor kode (selalu gelap) |
| `--focus` | `#0284C7` | `#7CC4F0` | Focus ring |

Warna identitas tetap dipakai: **Tamansiswa Emerald `#16523A`** (logo, lajur `feature/web`), **emas `#F2B53A`** (prompt terminal, node *merge*, tombol Jalankan, section game), `#0F3B29` / `#D8F3E5` (jendela game).

### Tema lajur branch
Kelas `.theme-web` / `.theme-python` / `.theme-game` / `.theme-git`. Semua kombinasi teks lolos WCAG AA (≥ 4,5:1) di kedua mode.

| Tema | `--lane` terang / gelap | `--lane-ink` (teks) terang / gelap | `--lane-tint` (latar) terang / gelap |
|---|---|---|---|
| `web` | `#16523A` / `#3FA877` | `#16523A` / `#9BE3BE` | `#EAF5EF` / hijau 14% |
| `python` | `#2F7D5B` / `#4ADE80` | `#24654A` / `#A7E8C7` | `#E3F2EA` / hijau 12% |
| `game` | `#C98E12` / `#F2B53A` | `#7A5300` / `#F2C66D` | `#FDF1D6` / emas 13% |
| `git` | `#0284C7` / `#38BDF8` | `#0369A1` / `#7CC4F0` | `#E0F2FE` / biru 13% |

Kelas bantu: `.lane-text`, `.lane-light` (teks di atas latar kode), `.lane-dot`, `.tag`.

### Peta pemakaian warna
| Elemen | Warna |
|---|---|
| Hero | Monokrom + titik latar + cahaya lembut 3 warna lajur di bawah; tombol hitam/putih |
| Grafik branch & 4 sel bidang | Garis & titik warna lajur; node lulus emas |
| Perjalanan | Node branch berisi 4 warna lajur, node lulus emas, hash berwarna `game` |
| Keahlian | Garis bawah tab, titik, tag "Yang dipakai", garis atas editor & cahaya sudut mengikuti lajur aktif |
| Kuis | Hover jawaban berwarna lajur jawabannya; kartu hasil `--lane-tint` |
| Berita | Kartu bergaris tipis; sampul berwarna `--lane-tint` + titik; tag kategori sesuai tema; kartu game `#07170F` + emas pixel-art (sama di kedua mode) |
| Karya lain | Tag kategori: Game Edukasi = `game`, Aplikasi Web = `web` |
| Karir | Garis atas sel: Bekerja = `web`, Berwirausaha = `game`, Kuliah = `git` |

## 3. Tipografi
- **Geist** untuk semua teks. Judul semibold (600) dengan tracking sangat rapat; body 16px, line-height 1.6.
  - `.display` (H1): `clamp(2.5rem, 6.2vw, 4.6rem)`, line-height `1.02`, tracking `-0.055em`, rata tengah.
  - `.heading` (H2): `clamp(1.75rem, 3.4vw, 2.5rem)`, line-height `1.1`, tracking `-0.045em`.
  - `.h3`: `1.25rem`, semibold. Judul ditulis *sentence case*.
- **Geist Mono** — hanya untuk kode: terminal, editor, hash commit, nama branch, nomor langkah, progres kuis.
- **Press Start 2P** — hanya untuk judul game dan HUD jendela game.

## 4. Tata Letak & Komponen
- **Bingkai (`.frame`):** lebar maks. `1080px`, garis vertikal 1px kiri-kanan sepanjang halaman.
- **Band (`.band`):** setiap section dipisah garis horizontal; penanda **"+"** di kedua sudut bawah (disembunyikan di bawah 1100px).
- **Sel (`.cells`):** grid dengan `gap: 1px` di atas latar `--line`, sehingga garis antar-sel selalu 1px. Padding sel `.pad` (`2rem` / `3rem`).
- **Latar titik (`.dots`)** di hero, kuis, dan CTA.
- **Tombol:** pill (`rounded-full`). `.btn-primary` hitam/putih, `.btn-ghost` bergaris, `.btn-gold` untuk aksi game/kode. Tinggi `h-9` navbar, `h-10` panel, `h-12` CTA.
- **Pill pengumuman (`.pill-link`)** di atas headline hero.
- **Tab:** `.utab` (garis bawah berwarna lajur) untuk keahlian; `.log-tab` untuk git log; `.step-cell` untuk PKL. Semua `role="tab"` dengan navigasi panah/Home/End.
- **Pengalih tema:** ikon di navbar (terang ↔ gelap) dan grup Sistem/Terang/Gelap di footer; pilihan disimpan di `localStorage`, bawaan mengikuti sistem.

### Susunan halaman
| Band | Isi |
|---|---|
| Hero | Pill → headline → subjudul → 2 tombol → keterangan Kurikulum Merdeka (rata tengah) |
| Terminal + grafik | 2 sel: terminal interaktif (gelap) · grafik main + 4 branch |
| 4 bidang | 4 sel (2 di mobile), klik = buka bidang di Keahlian |
| Perjalanan | Sel judul · 5/7: daftar commit + panel `git show` |
| Keahlian | Sel judul · tab branch · 5/7: info + editor kode |
| Kuis | Kartu tengah di atas latar titik |
| Berita | Sel judul + penghitung & tombol ‹ › · deretan kartu scroll horizontal (scroll-snap, tepi memudar, garis progres) |
| Karya lain | Sel judul + filter · 3 sel karya |
| PKL | Sel judul · 4 sel langkah · sel detail |
| Karir | Sel judul · 3 sel jalan |
| FAQ | 5/7: judul · accordion bergaris |
| CTA | Rata tengah di atas latar titik |
| Footer | Identitas + alamat · jurusan lain · tautan · baris hak cipta + pengalih tema |

## 5. Motion
Kurva standar `--ease: cubic-bezier(0.22, 1, 0.36, 1)` (cepat di awal, mendarat halus). Semua animasi hanya aktif bila JS berjalan (kelas `.js` di `<html>`), dan **dimatikan total** untuk `prefers-reduced-motion`.

| Bagian | Animasi | Pemicu |
|---|---|---|
| Hero | Pill, subjudul, tombol, keterangan naik + blur memudar bergiliran; headline muncul **per kata** (jeda 55 ms/kata) | Sekali saat halaman dibuka |
| Cahaya hero | Bergeser sangat pelan (18 detik, bolak-balik) | Terus-menerus, halus |
| Terminal | Intro `git clone` diketik | Sekali saat dibuka |
| Grafik branch | Garis main → 4 branch **tergambar** bergiliran, titik commit muncul, label memudar, node "lulus" muncul lalu berdenyut lembut | Saat grafik terlihat |
| Section lain | Judul, deskripsi, isi sel naik 16px + blur memudar, bergiliran 70 ms (`.reveal` → `.in`) | Sekali saat masuk layar |
| Tab keahlian | Garis bawah **meluncur** ke tab aktif & berganti warna lajur; latar cahaya & garis editor ikut berganti warna | Klik tab |
| Filter karya | Pill **meluncur** ke filter aktif; kartu yang tampil muncul bergiliran | Klik filter |
| Panel (git show, kode, PKL, kuis) | Konten baru naik + blur memudar (`.swap-in`, 0,35 detik) | Ganti isi |
| Kuis | Jawaban terpilih menyala 0,26 detik sebelum pindah soal (klik ganda diabaikan) | Klik jawaban |
| Berita | Deretan kartu meluncur halus ke kartu berikutnya; kartu naik sedikit saat hover, ikon sampul & sprite game bergerak; tepi memudar muncul/hilang; garis progres mengikuti posisi | Geser / seret / tombol ‹ › / panah |
| Tombol | Mengecil 3% saat ditekan; panah pill bergeser saat hover; titik sel bidang membesar saat hover | Hover / tekan |
| Navbar | Bayangan tipis muncul setelah halaman digulir | Scroll |
| Tema | Warna berganti halus 0,35 detik (hanya selama pergantian) | Klik pengalih tema |

Catatan teknis: kemunculan saat scroll memakai IntersectionObserver **plus** pengecekan cadangan (saat dimuat dan saat scroll, dibatasi 1×/frame) agar konten tidak pernah tertinggal tersembunyi. Animasi diterapkan pada **isi** sel, bukan selnya, supaya garis grid 1px tetap utuh.

## 6. Aksesibilitas
- Kontras WCAG AA di mode terang dan gelap.
- Focus ring 2px `--focus`. Tombol tema, menu, drawer, FAQ, filter, dan tombol geser berita memakai atribut ARIA yang sesuai. Deretan berita bisa difokuskan dan digeser dengan panah kiri/kanan.
- Terminal: input berlabel, keluaran `role="log"` + `aria-live`. Output kode, hasil kuis, dan penghitung posisi berita memakai `aria-live="polite"`.
- Arena game hanya menangkap tombol panah saat difokuskan.
