/**
 * data.js — Seluruh konten dinamis Portal RPL SMK Tamansiswa Jetis.
 * Guru cukup mengubah file ini untuk memperbarui isi website,
 * tanpa perlu menyentuh struktur index.html.
 *
 * Bagian bertanda "TODO" wajib diisi data resmi sebelum rilis.
 */

const SITE_DATA = {
  /* ---------- Konfigurasi umum ---------- */
  config: {
    // TODO: ganti dengan nomor WhatsApp resmi admin/guru RPL (format internasional tanpa "+", contoh 6281234567890)
    whatsappNumber: '628xxxxxxxxxx',
    mainPortal: 'https://tamsis.site/',
    gameUrl: 'https://rpl.tamsis.site/',
    // GIT QUEST ada di folder git_guest/ di dalam website ini (aplikasi web statis, bisa offline)
    gitQuestUrl: './git_guest/index.html',
    // TODO: lengkapi nama jalan & nomor sesuai alamat resmi sekolah
    address: 'SMK Tamansiswa Jetis, Kecamatan Jetis, Kota Yogyakarta, Daerah Istimewa Yogyakarta',
  },

  /* ---------- Pesan WhatsApp siap kirim ---------- */
  whatsappMessages: {
    spmb: 'Halo Admin RPL SMK Tamansiswa Jetis, saya ingin bertanya tentang info pendaftaran SPMB untuk jurusan Rekayasa Perangkat Lunak (RPL / PPLG). Terima kasih.',
    konsultasi: 'Halo Admin RPL SMK Tamansiswa Jetis, saya calon siswa/orang tua calon siswa dan ingin berkonsultasi tentang jurusan Rekayasa Perangkat Lunak (RPL / PPLG). Terima kasih.',
  },

  /* ---------- Navigasi ---------- */
  nav: [
    { label: 'Perjalanan', href: '#perjalanan', icon: 'git-commit-vertical' },
    { label: 'Keahlian', href: '#keahlian', icon: 'code-xml' },
    { label: 'Berita', href: '#berita', icon: 'newspaper' },
    { label: 'Karya', href: '#karya', icon: 'layout-grid' },
    { label: 'PKL', href: '#pkl', icon: 'building-2' },
    { label: 'Karir', href: '#karir', icon: 'briefcase' },
    { label: 'FAQ', href: '#faq', icon: 'circle-help' },
  ],

  /* ---------- Hero ---------- */
  hero: {
    kicker: 'Konsentrasi Keahlian RPL / PPLG, Kurikulum Merdeka',
    headline: 'Bangun Aplikasi, Gim Edukasi, dan Karir Digital Masa Depan.',
    subheadline: 'Belajar coding dari nol hingga mahir membuat website full-stack, pemrograman Python, serta gim interaktif di SMK Tamansiswa Jetis Yogyakarta dengan standar alur kerja industri.',
    ctaPrimary: 'Coba Game Karya RPL',
    ctaSecondary: 'Tanya Info SPMB',
    // Terminal yang "diketik" saat halaman dibuka. cmd = perintah, out = keluaran.
    // Intro yang diketik sekali saat halaman dibuka; setelah itu terminal bisa diketik / diklik.
    terminal: [
      { cmd: 'git clone rpl-tamsis' },
      { out: "Cloning into 'rpl-tamsis'... selesai." },
      { out: 'Ketik perintah atau klik tombol di bawah. Coba: keahlian', ok: true },
    ],
  },

  /* ---------- Perjalanan siswa (digambar sebagai riwayat commit) ---------- */
  journey: [
    { hash: '0d4e8b7', kind: 'commit', title: 'Daftar ke RPL', text: 'Tidak perlu sudah bisa coding. Cukup rasa penasaran dan mau belajar.',
      detail: 'Kamu tidak perlu sudah bisa coding sebelum masuk RPL. Cukup punya rasa penasaran dan mau belajar pelan-pelan. Info jadwal dan syarat SPMB bisa ditanyakan langsung ke admin lewat WhatsApp.' },
    { hash: '2a6f913', kind: 'commit', title: 'Dasar logika', text: 'Logika pemrograman dan pengenalan kode langkah demi langkah di lab sekolah.',
      detail: 'Pembelajaran dimulai dari dasar logika pemrograman dan pengenalan kode langkah demi langkah. Praktiknya di laboratorium komputer sekolah, jadi laptop pribadi bukan syarat.' },
    { hash: '5e1c0d4', kind: 'branch', title: 'Empat bidang keahlian', text: 'Web, Python, game & UI/UX, serta Git dari Kelas X sampai XII.',
      detail: 'Dari Kelas X sampai XII kamu mendalami empat bidang: Web & Full-Stack Development, Python & PBO, Game Development & UI/UX Design, serta Git, GitHub & Kolaborasi Tim.',
      link: { label: 'Coba keempat bidangnya', href: '#keahlian' } },
    { hash: '7b10e4d', kind: 'commit', title: 'PKL di industri', text: 'Menerapkan keterampilan langsung di dunia usaha dan industri (DUDI).',
      detail: 'Siswa menerapkan keterampilannya langsung di dunia usaha dan dunia industri (DUDI), lalu menyusun laporan PKL secara terstruktur dengan Sistem Generator Laporan PKL.',
      link: { label: 'Lihat alur PKL', href: '#pkl' } },
    { hash: '8c3fa21', kind: 'commit', title: 'UKK', text: 'Uji Kompetensi Keahlian dengan bekal alur kerja developer profesional.',
      detail: 'Bekal dari simulasi alur kerja developer profesional, seperti version control dan branching, dipakai untuk menghadapi Uji Kompetensi Keahlian (UKK).' },
    { hash: '9f3a2c1', kind: 'merge', title: 'Lulus', text: 'Siap bekerja, berwirausaha di bidang digital, atau kuliah.',
      detail: 'Semua branch digabung jadi satu. Lulusan siap bekerja, berwirausaha di bidang digital, atau melanjutkan kuliah di jurusan Informatika/Ilmu Komputer.',
      link: { label: 'Pilih jalan setelah lulus', href: '#karir' } },
  ],


  /* ---------- Empat bidang keahlian (branch) ---------- */
  curriculum: [
    {
      key: "web",
      branch: "feature/web",
      title: "Web & Full-Stack Development",
      description: "Merancang antarmuka modern dengan HTML5, Tailwind CSS, JavaScript, hingga pengembangan backend menggunakan Node.js & Laravel.",
      tools: "HTML5, Tailwind CSS, JavaScript, Node.js, Laravel",
      // Contoh kode sederhana di editor; tombol "Jalankan" menampilkan hasilnya.
      file: "index.html",
      code: [
        "<button id=\"sapa\"",
        "  class=\"rounded-full bg-emerald-800 px-5 py-2 text-white\">",
        "  Klik aku",
        "</button>",
        "",
        "<script>",
        "  sapa.onclick = () => {",
        "    sapa.textContent = 'Halo, calon developer!';",
        "  };",
        "</script>",
      ],
    },
    {
      key: "python",
      branch: "feature/python",
      title: "Python & Pemrograman Berorientasi Objek",
      description: "Menguasai logika algoritma, struktur data, dan arsitektur kode bersih berbasis objek.",
      tools: "Python, PBO, algoritma, struktur data",
      // Contoh kode sederhana di editor; tombol "Jalankan" menampilkan hasilnya.
      file: "siswa.py",
      code: [
        "class Siswa:",
        "    def __init__(self, nama):",
        "        self.nama = nama",
        "        self.skill = []",
        "",
        "    def belajar(self, materi):",
        "        self.skill.append(materi)",
        "",
        "kamu = Siswa(\"Kamu\")",
        "for m in [\"logika\", \"PBO\", \"struktur data\"]:",
        "    kamu.belajar(m)",
        "print(kamu.nama, \"menguasai\", len(kamu.skill), \"materi\")",
      ],
    },
    {
      key: "game",
      branch: "feature/game",
      title: "Game Development & UI/UX Design",
      description: "Merancang media pembelajaran interaktif, simulasi berbasis web, dan aset visual bergaya pixel-art modern.",
      tools: "UI/UX, pixel-art, simulasi web",
      // Contoh kode sederhana di editor; tombol "Jalankan" menampilkan hasilnya.
      file: "game.js",
      code: [
        "const hero = { x: 0, langkah: 1 };",
        "",
        "document.addEventListener('keydown', (e) => {",
        "  if (e.key === 'ArrowRight') hero.x += hero.langkah;",
        "  if (e.key === 'ArrowLeft')  hero.x -= hero.langkah;",
        "  gambar(hero);",
        "});",
      ],
    },
    {
      key: "git",
      branch: "feature/git",
      practice: { label: "Latihan di GIT QUEST", url: "./git_guest/index.html" },
      title: "Git, GitHub & Kolaborasi Tim",
      description: "Simulasi alur kerja developer profesional menggunakan version control, branching, serta persiapan Uji Kompetensi Keahlian (UKK).",
      tools: "Git, GitHub, branching, UKK",
      // Contoh kode sederhana di editor; tombol "Jalankan" menampilkan hasilnya.
      file: "terminal",
      code: [
        "git checkout -b fitur-login",
        "git add .",
        "git commit -m \"Tambah halaman login\"",
        "git push origin fitur-login",
      ],
    },
  ],

  /* ---------- Kuis minat: branch mana yang cocok ---------- */
  quiz: {
    title: 'Branch mana yang paling cocok buatmu?',
    intro: 'Jawab tiga pertanyaan singkat. Tidak ada jawaban salah, dan di RPL kamu tetap belajar keempat bidang.',
    questions: [
      {
        q: 'Kamu paling penasaran dengan...',
        options: [
          { label: 'Cara website dan aplikasi dibuat', key: 'web' },
          { label: 'Cara komputer memecahkan soal', key: 'python' },
          { label: 'Cara game dibuat dan dimainkan', key: 'game' },
          { label: 'Cara tim besar bisa bekerja bareng', key: 'git' },
        ],
      },
      {
        q: 'Saat tugas kelompok, kamu biasanya...',
        options: [
          { label: 'Menyusun semua info jadi satu halaman', key: 'web' },
          { label: 'Mengerjakan bagian hitungan dan logika', key: 'python' },
          { label: 'Merapikan tampilan dan desainnya', key: 'game' },
          { label: 'Membagi tugas lalu menggabungkan hasilnya', key: 'git' },
        ],
      },
      {
        q: 'Karya yang paling ingin kamu buat...',
        options: [
          { label: 'Website sekolah atau toko online', key: 'web' },
          { label: 'Program yang menyelesaikan masalah otomatis', key: 'python' },
          { label: 'Game edukasi bergaya pixel-art', key: 'game' },
          { label: 'Proyek besar bersama teman satu tim', key: 'git' },
        ],
      },
    ],
  },


  /* ---------- Alur PKL ---------- */
  pklSteps: [
    { title: 'Pembekalan', description: 'Persiapan kompetensi dan etika kerja.' },
    { title: 'Penempatan di DUDI', description: 'Ditempatkan di dunia usaha dan industri mitra sekolah.' },
    { title: 'Praktik & bimbingan', description: 'Tugas nyata, didampingi pembimbing industri dan guru.' },
    { title: 'Laporan PKL', description: 'Disusun dengan Sistem Generator Laporan PKL.' },
  ],

  /* ---------- Showcase Karya ---------- */
  featuredProject: {
    title: 'GITHUB: TEAM COLLAPSE',
    description: 'Gim edukasi berbasis web bergaya JRPG/Simulasi untuk melatih kolaborasi tim menggunakan Git branching dan penyelesaian merge conflict.',
    url: 'https://rpl.tamsis.site/',
    cta: 'Mainkan versi lengkapnya',
  },

  /* ---------- Kabar / berita RPL (scroll horizontal) ----------
   * Isi awal di bawah HANYA berasal dari fakta di docs/CONTENT.md (tanpa tanggal).
   * TODO: tambahkan berita kegiatan asli. Format tiap item:
   *   {
   *     category: 'Kegiatan',          // label kecil di kartu
   *     date: '2026-11-19',            // opsional, format YYYY-MM-DD
   *     title: 'Judul berita',
   *     summary: 'Ringkasan 1–2 kalimat.',
   *     url: 'https://...',            // opsional; atau wa: 'spmb' untuk tautan WhatsApp
   *     image: './assets/images/news/nama-file.webp', // opsional; jika kosong dipakai sampul bergambar ikon
   *     icon: 'calendar',              // ikon Lucide untuk sampul tanpa gambar
   *     theme: 'web' | 'python' | 'game' | 'git',
   *   }
   * Item dengan featured: true tampil sebagai kartu besar bergaya pixel-art.
   */
  news: [
    {
      wide: true,
      category: 'Game edukasi',
      title: 'GIT QUEST: belajar Git lewat petualangan RPG',
      summary: 'Jelajahi dunia ala RPG, baca materi dari NPC, lalu kalahkan monster bug lewat kuis, simulasi terminal, dan simulator commit. 7 stage untuk siswa kelas XI RPL, bisa dimainkan tanpa internet.',
      image: './git_guest/assets/images/cover-gitquest.webp',
      imageAlt: 'Sampul GIT QUEST: The Repository Chronicles, game edukatif Git untuk SMK RPL, dengan 10 karakter pixel-art',
      url: './git_guest/index.html',
      cta: 'Mainkan GIT QUEST',
      note: 'Paling nyaman dimainkan di komputer atau laptop.',
      theme: 'git',
    },
    {
      featured: true,
      category: 'Karya siswa',
      title: 'GITHUB: TEAM COLLAPSE bisa dimainkan langsung di browser',
      summary: 'Gim edukasi berbasis web bergaya JRPG/Simulasi untuk melatih kolaborasi tim menggunakan Git branching dan penyelesaian merge conflict.',
      url: 'https://rpl.tamsis.site/',
      cta: 'Mainkan sekarang',
      theme: 'game',
    },
    {
      category: 'Aplikasi web',
      title: 'Portal SPMB Online SMK Tamansiswa Jetis',
      summary: 'Sistem pendaftaran peserta didik baru terintegrasi verifikasi berkas digital, dikembangkan di lingkungan RPL.',
      icon: 'clipboard-check',
      theme: 'web',
    },
    {
      category: 'Aplikasi web',
      title: 'Generator Laporan PKL bantu siswa menyusun laporan',
      summary: 'Aplikasi web internal untuk membantu siswa menyusun dokumen laporan Praktik Kerja Lapangan secara terstruktur.',
      icon: 'file-text',
      theme: 'git',
    },
    {
      category: 'Kurikulum',
      title: 'RPL / PPLG belajar dengan Kurikulum Merdeka',
      summary: 'Web full-stack, Python & PBO, game & UI/UX, serta Git dan kolaborasi tim dipelajari dari Kelas X sampai XII.',
      icon: 'book-open',
      url: '#keahlian',
      theme: 'python',
    },
    {
      category: 'Info SPMB',
      title: 'Tanya jadwal dan syarat SPMB lewat WhatsApp',
      summary: 'Admin dan guru RPL siap menjawab pertanyaan calon siswa maupun orang tua seputar pendaftaran.',
      icon: 'message-circle',
      wa: 'spmb',
      theme: 'web',
    },
  ],

  projectCategories: ['Semua', 'Game Edukasi', 'Aplikasi Web'],

  projects: [
    {
      title: 'GIT QUEST — The Repository Chronicles',
      category: 'Game Edukasi',
      theme: 'game',
      description: 'Game RPG edukatif untuk belajar dasar Git: version control, tiga area Git, perintah CLI, commit, dan .gitignore. 7 stage, 10 karakter, bisa dimainkan offline.',
      url: './git_guest/index.html',
    },
    {
      title: 'GITHUB: TEAM COLLAPSE',
      category: 'Game Edukasi',
      theme: 'game',
      description: 'Gim edukasi bergaya JRPG/Simulasi untuk berlatih Git branching dan menyelesaikan merge conflict bersama tim.',
      url: 'https://rpl.tamsis.site/',
    },
    {
      title: 'Portal SPMB Online SMK Tamansiswa Jetis',
      category: 'Aplikasi Web',
      theme: 'web',
      description: 'Sistem pendaftaran peserta didik baru terintegrasi verifikasi berkas digital.',
      url: null, // TODO: isi URL jika sudah bisa diakses publik
    },
    {
      title: 'Sistem Generator Laporan PKL Otomatis',
      category: 'Aplikasi Web',
      theme: 'web',
      description: 'Aplikasi web internal untuk membantu siswa menyusun dokumen laporan Praktik Kerja Lapangan secara terstruktur.',
      url: null, // Aplikasi internal sekolah
    },
  ],

  /* ---------- Prospek Karir ---------- */
  careers: [
    {
      title: 'Bekerja',
      theme: 'web',
      text: 'Langsung berkarir di bidang pengembangan perangkat lunak.',
      icon: 'briefcase',
      items: ['Junior Web / Software Developer', 'Game Developer', 'UI/UX Designer', 'QA / Software Tester', 'IT Support'],
    },
    {
      title: 'Berwirausaha',
      theme: 'game',
      text: 'Membuka usaha sendiri di bidang digital.',
      icon: 'store',
      items: ['Jasa pembuatan website', 'Jasa pembuatan aplikasi'],
    },
    {
      title: 'Kuliah',
      theme: 'git',
      text: 'Melanjutkan pendidikan ke perguruan tinggi.',
      icon: 'graduation-cap',
      items: ['Informatika', 'Ilmu Komputer'],
    },
  ],


  /* ---------- FAQ ---------- */
  faq: [
    {
      q: 'Apakah masuk jurusan RPL harus sudah bisa coding sebelumnya?',
      a: 'Tidak perlu. Pembelajaran dimulai dari dasar logika pemrograman dan pengenalan kode langkah demi langkah.',
    },
    {
      q: 'Apakah wajib punya laptop sendiri saat mendaftar?',
      a: 'Sekolah menyediakan laboratorium komputer lengkap untuk praktik di sekolah. Memiliki laptop pribadi di rumah akan sangat membantu eksplorasi mandiri, namun bukan syarat wajib pendaftaran.',
    },
    {
      q: 'Bagaimana prospek lulusan RPL setelah lulus?',
      a: 'Lulusan siap bekerja sebagai Junior Web/Software Developer, Game Developer, UI/UX Designer, IT Support, berwirausaha di bidang digital, maupun melanjutkan kuliah di jurusan Informatika/Ilmu Komputer.',
    },
    {
      q: 'Berapa biaya sekolah dan bagaimana cara mendaftar SPMB?',
      a: 'Informasi biaya, jadwal, dan alur pendaftaran SPMB terbaru dapat ditanyakan langsung kepada admin melalui WhatsApp.',
      waCta: 'Tanya biaya dan jadwal SPMB',
    },
  ],

  /* ---------- Ekosistem tamsis.site ---------- */
  // TODO: ganti URL tiap jurusan dengan alamat halaman resminya di tamsis.site
  departments: [
    { name: 'Desain Komunikasi Visual (DKV)', url: 'https://tamsis.site/' },
    { name: 'Teknik Instalasi Tenaga Listrik (TITL)', url: 'https://tamsis.site/' },
    { name: 'Teknik Sepeda Motor (TSM)', url: 'https://tamsis.site/' },
    { name: 'Teknik Kendaraan Ringan (TKR)', url: 'https://tamsis.site/' },
  ],

  footerLinks: [
    { label: 'Portal utama tamsis.site', url: 'https://tamsis.site/', external: true },
    { label: 'Main GITHUB: TEAM COLLAPSE', url: 'https://rpl.tamsis.site/', external: true },
    { label: 'Perjalanan belajar di RPL', url: '#perjalanan' },
    { label: 'Pertanyaan calon siswa', url: '#faq' },
  ],
};
