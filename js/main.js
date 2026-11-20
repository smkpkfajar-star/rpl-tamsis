/**
 * main.js — Rendering konten dari data.js dan semua interaksi:
 * tema terang/gelap, terminal, grafik branch, git log, branch + kode,
 * kuis, puzzle merge conflict, karya, stepper PKL, karir, FAQ, drawer.
 */
(function () {
  'use strict';

  const D = SITE_DATA;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const EXT = 'target="_blank" rel="noopener noreferrer"';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const icons = () => { if (window.lucide) window.lucide.createIcons(); };
  const swapIn = (el) => { if (!el) return; el.classList.remove('swap-in'); void el.offsetWidth; el.classList.add('swap-in'); };

  /* ================= Tema terang / gelap ================= */
  const Theme = {
    media: window.matchMedia('(prefers-color-scheme: dark)'),
    get() { try { return localStorage.getItem('theme') || 'system'; } catch (e) { return 'system'; } },
    set(choice) {
      try { localStorage.setItem('theme', choice); } catch (e) {}
      // transisi warna halus hanya selama pergantian tema
      const root = document.documentElement;
      root.classList.add('theme-fade');
      clearTimeout(this.t);
      this.t = setTimeout(() => root.classList.remove('theme-fade'), 400);
      this.apply();
    },
    apply() {
      const choice = this.get();
      const dark = choice === 'dark' || (choice === 'system' && this.media.matches);
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
      $$('[data-theme-choice]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.themeChoice === choice)));
    },
    init() {
      $('#theme-switch').addEventListener('click', (e) => {
        const b = e.target.closest('[data-theme-choice]');
        if (b) this.set(b.dataset.themeChoice);
      });
      $('#theme-toggle').addEventListener('click', () => {
        this.set(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      });
      this.media.addEventListener('change', () => { if (this.get() === 'system') this.apply(); });
      this.apply();
    },
  };

  /* ================= WhatsApp ================= */
  function waLink(type) {
    const text = D.whatsappMessages[type] || D.whatsappMessages.konsultasi;
    return `https://wa.me/${D.config.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }
  function applyWaLinks(root = document) {
    $$('[data-wa]', root).forEach((el) => { el.href = waLink(el.dataset.wa); });
  }

  /* ================= Helper tab (keyboard: panah, Home, End) ================= */
  function makeTabs(list, onSelect) {
    const tabs = () => $$('[role="tab"]', list);
    list.addEventListener('click', (e) => {
      const t = e.target.closest('[role="tab"]');
      if (t) onSelect(tabs().indexOf(t));
    });
    list.addEventListener('keydown', (e) => {
      const all = tabs();
      const cur = all.indexOf(document.activeElement);
      if (cur < 0) return;
      let next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (cur + 1) % all.length;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (cur - 1 + all.length) % all.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = all.length - 1;
      if (next === null) return;
      e.preventDefault();
      onSelect(next);
      tabs()[next].focus();
    });
  }
  function markTabs(list, idx) {
    $$('[role="tab"]', list).forEach((t, i) => {
      t.setAttribute('aria-selected', String(i === idx));
      t.tabIndex = i === idx ? 0 : -1;
    });
  }

  /* ================= Navigasi ================= */
  function renderNav() {
    $('#nav-links').innerHTML = D.nav.map((n) => `<li><a href="${n.href}" class="nav-link">${esc(n.label)}</a></li>`).join('');
    $('#drawer-links').innerHTML = D.nav
      .map((n) => `<li class="border-b border-line last:border-0"><a href="${n.href}" data-drawer-link class="flex items-center justify-between py-4 text-lg font-medium">${esc(n.label)}<i data-lucide="${n.icon}" class="h-5 w-5 text-muted"></i></a></li>`)
      .join('');
  }

  /* ============================================================
   * HERO
   * ============================================================ */
  function renderHero() {
    const h = D.hero;
    const pill = $('#hero-pill');
    pill.href = D.config.gameUrl;
    $('#hero-pill-text').textContent = `Coba ${D.featuredProject.title}, gim karya siswa RPL`;
    // Headline dipecah per kata agar bisa muncul bergiliran
    $('#hero-headline').innerHTML = h.headline
      .split(' ')
      .map((w, i) => `<span class="word" style="--i:${i}">${esc(w)}</span>`)
      .join(' ');
    $('#hero-subheadline').textContent = h.subheadline;
    $('#hero-kicker').textContent = h.kicker;
    const game = $('#hero-cta-game');
    game.href = D.config.gameUrl;
    $('span', game).textContent = h.ctaPrimary;
    $('span', $('#hero-cta-wa')).textContent = h.ctaSecondary;

    // Grafik: main + 4 branch berwarna lajur yang digabung kembali (merge)
    // Kelas animasi: .draw (garis tergambar), .pop (titik muncul), .fade (label), --d = jeda
    const ys = [28, 70, 150, 192];
    const branches = D.curriculum
      .map((c, i) => {
        const y = ys[i];
        const d = 0.35 + i * 0.12;
        return `
        <g class="theme-${c.key}">
          <path class="draw" pathLength="1" style="--d:${d}s" d="M60 110 C 92 110, 92 ${y}, 124 ${y} H 300 C 332 ${y}, 332 110, 364 110" fill="none" stroke="var(--lane)" stroke-width="2"/>
          <circle class="pop" style="--d:${d + 0.55}s" cx="180" cy="${y}" r="4.5" fill="var(--bg)" stroke="var(--lane)" stroke-width="2"/>
          <circle class="pop" style="--d:${d + 0.75}s" cx="245" cy="${y}" r="4.5" fill="var(--bg)" stroke="var(--lane)" stroke-width="2"/>
          <text class="fade" style="--d:${d + 0.4}s" x="132" y="${y - 8}" font-family="Geist Mono, monospace" font-size="10" fill="var(--lane-ink)">${esc(c.branch)}</text>
        </g>`;
      })
      .join('');
    $('#hero-graph').innerHTML = `
      <svg viewBox="0 0 420 220" class="graph w-full">
        <line class="draw" pathLength="1" x1="8" y1="110" x2="412" y2="110" stroke="var(--line2)" stroke-width="2"/>
        ${branches}
        <circle class="pop" style="--d:.1s" cx="26" cy="110" r="5" fill="var(--fg)"/>
        <circle class="pop" style="--d:.25s" cx="60" cy="110" r="5" fill="var(--fg)"/>
        <circle class="merge-pulse" cx="364" cy="110" r="8" fill="none" stroke="#F2B53A" stroke-width="2"/>
        <circle class="pop" style="--d:1.9s" cx="364" cy="110" r="8" fill="#F2B53A" stroke="var(--bg)" stroke-width="3"/>
        <text class="fade" style="--d:.2s" x="8" y="132" font-family="Geist Mono, monospace" font-size="10" fill="var(--muted)">main</text>
        <text class="fade" style="--d:2s" x="348" y="134" font-family="Geist Mono, monospace" font-size="10" fill="var(--muted)">lulus</text>
      </svg>`;

    // Empat sel bidang: klik = buka bidang di section keahlian
    const cells = $('#hero-branches');
    cells.innerHTML = D.curriculum
      .map((c, i) => `
        <button type="button" data-branch="${i}" class="branch-cell theme-${c.key}">
          <span class="flex items-center gap-2 font-mono text-xs lane-text"><span class="lane-dot"></span>${esc(c.branch)}</span>
          <span class="text-[15px] font-medium leading-snug">${esc(c.title)}</span>
        </button>`)
      .join('');
    cells.addEventListener('click', (e) => {
      const b = e.target.closest('[data-branch]');
      if (!b) return;
      Branches.select(Number(b.dataset.branch));
      $('#keahlian').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ============================================================
   * TERMINAL INTERAKTIF
   * ============================================================ */
  const Terminal = {
    log: null, input: null, history: [], hIdx: 0, ready: false,

    init() {
      this.log = $('#term-log');
      this.input = $('#term-input');
      const chips = ['bantuan', 'keahlian', 'perjalanan', 'berita', 'karya', 'karir', 'daftar'];
      $('#term-chips').innerHTML = chips.map((c) => `<button type="button" class="chip !bg-transparent !text-[#ededed] !shadow-[inset_0_0_0_1px_#333]" data-cmd="${c}">${c}</button>`).join('');
      $('#term-chips').addEventListener('click', (e) => {
        const b = e.target.closest('[data-cmd]');
        if (b && this.ready) this.run(b.dataset.cmd);
      });
      $('#term-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (!this.ready) return;
        const v = this.input.value;
        this.input.value = '';
        this.run(v);
      });
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' && this.history.length) {
          e.preventDefault();
          this.hIdx = Math.max(0, this.hIdx - 1);
          this.input.value = this.history[this.hIdx] || '';
        } else if (e.key === 'ArrowDown' && this.history.length) {
          e.preventDefault();
          this.hIdx = Math.min(this.history.length, this.hIdx + 1);
          this.input.value = this.history[this.hIdx] || '';
        }
      });
      this.intro(D.hero.terminal);
    },

    line(html, cls = 't-out') {
      const el = document.createElement('span');
      el.className = `t-line ${cls}`;
      el.innerHTML = html;
      this.log.appendChild(el);
      this.log.scrollTop = this.log.scrollHeight;
      return el;
    },
    link(label, href, external) {
      return `<a class="t-link" href="${esc(href)}" ${external ? EXT : ''}>${esc(label)}</a>`;
    },

    intro(lines) {
      this.input.disabled = true;
      const finish = () => { this.ready = true; this.input.disabled = false; };
      if (reducedMotion) {
        lines.forEach((l) => this.line(l.cmd ? `<span class="t-prompt">$ </span>${esc(l.cmd)}` : esc(l.out), l.cmd ? 't-head' : l.ok ? 't-ok' : 't-out'));
        finish();
        return;
      }
      let i = 0;
      const next = () => {
        if (i >= lines.length) return finish();
        const l = lines[i++];
        if (!l.cmd) { this.line(esc(l.out), l.ok ? 't-ok' : 't-out'); return setTimeout(next, 280); }
        const row = this.line('<span class="t-prompt">$ </span><span class="t-cmd"></span>', 't-head');
        const cmd = $('.t-cmd', row);
        const caret = document.createElement('span');
        caret.className = 't-caret';
        let c = 0;
        const type = () => {
          cmd.textContent = l.cmd.slice(0, ++c);
          cmd.appendChild(caret);
          if (c < l.cmd.length) setTimeout(type, 35 + Math.random() * 40);
          else { caret.remove(); setTimeout(next, 350); }
        };
        type();
      };
      setTimeout(next, 450);
    },

    run(raw) {
      const input = raw.trim();
      if (!input) return;
      this.history.push(input);
      this.hIdx = this.history.length;
      this.line(`<span class="t-prompt">$ </span>${esc(input)}`, 't-head');
      const cmd = input.toLowerCase();

      if (cmd === 'clear') { this.log.innerHTML = ''; return; }
      if (cmd === 'bantuan' || cmd === 'help') {
        [
          ['keahlian', 'empat bidang yang dipelajari'],
          ['perjalanan', 'riwayat tiga tahun di RPL'],
          ['berita', 'kabar terbaru dari RPL'],
          ['karya', 'karya siswa RPL'],
          ['karir', 'pilihan setelah lulus'],
          ['daftar', 'tanya SPMB lewat WhatsApp'],
          ['main', 'daftar game karya RPL'],
          ['gitquest', 'mainkan GIT QUEST'],
          ['git checkout feature/web', 'pindah ke bidang tertentu'],
          ['clear', 'bersihkan layar'],
        ].forEach(([c, d]) => this.line(`<span class="text-[#ededed]">${esc(c.padEnd(12))}</span> ${esc(d)}`));
        return;
      }
      if (cmd === 'keahlian' || cmd === 'git branch') {
        this.line('* main');
        D.curriculum.forEach((c) => this.line(`  <span class="theme-${c.key} lane-light">${esc(c.branch)}</span>  ${esc(c.title)}`));
        this.line(this.link('Coba kodenya di bawah', '#keahlian'), 't-ok');
        return;
      }
      const co = cmd.match(/^git (checkout|switch) (.+)$/);
      if (co) {
        const idx = D.curriculum.findIndex((c) => c.branch === co[2].trim() || c.key === co[2].trim());
        if (idx < 0) { this.line(`error: branch '${esc(co[2])}' tidak ditemukan. Ketik: keahlian`, 't-err'); return; }
        Branches.select(idx);
        this.line(`Switched to branch '${esc(D.curriculum[idx].branch)}'`);
        this.line(this.link(`Lihat ${D.curriculum[idx].title}`, '#keahlian'), 't-ok');
        return;
      }
      if (cmd === 'perjalanan' || cmd === 'git log') {
        D.journey.forEach((j) => this.line(`<span class="text-gold">${esc(j.hash)}</span> ${esc(j.title)}`));
        this.line(this.link('Buka riwayat lengkapnya', '#perjalanan'), 't-ok');
        return;
      }
      if (cmd === 'berita' || cmd === 'news') {
        D.news.forEach((n) => this.line(`- ${esc(n.title)} <span class="opacity-60">(${esc(n.category)})</span>`));
        this.line(this.link('Buka kabar terbaru', '#berita'), 't-ok');
        return;
      }
      if (cmd === 'karya' || cmd === 'ls karya') {
        D.projects.forEach((p) => this.line(`- ${esc(p.title)} <span class="opacity-60">(${esc(p.category)})</span>`));
        this.line(this.link('Lihat semua karya', '#karya'), 't-ok');
        return;
      }
      if (cmd === 'karir') {
        D.careers.forEach((c) => this.line(`- <span class="text-[#ededed]">${esc(c.title)}</span>: ${esc(c.items.join(', '))}`));
        this.line(this.link('Pilih jalanmu', '#karir'), 't-ok');
        return;
      }
      if (cmd === 'daftar' || cmd === 'spmb') {
        this.line('Pesan untuk admin RPL sudah disiapkan.');
        this.line(this.link('Buka WhatsApp', waLink('spmb'), true), 't-ok');
        return;
      }
      if (cmd === 'gitquest' || cmd === 'git-quest') {
        this.line('Memuat GIT QUEST: The Repository Chronicles...');
        this.line('7 stage, 10 karakter, monster bug. Paling nyaman di komputer/laptop.');
        this.line(this.link('Mainkan GIT QUEST', D.config.gitQuestUrl, true), 't-ok');
        return;
      }
      if (cmd === 'main' || cmd === 'play') {
        this.line('Pilih game karya RPL:');
        this.line(this.link('GIT QUEST (belajar dasar Git, RPG)', D.config.gitQuestUrl, true), 't-ok');
        this.line(this.link('GITHUB: TEAM COLLAPSE (branching & merge conflict)', D.config.gameUrl, true), 't-ok');
        return;
      }
      if (cmd.startsWith('sudo')) { this.line('Akses ditolak. Daftar RPL dulu, nanti kamu belajar soal ini.', 't-err'); return; }
      this.line(`perintah tidak dikenal: ${esc(input)}. Ketik bantuan.`, 't-err');
    },
  };

  /* ============================================================
   * GIT LOG PERJALANAN
   * ============================================================ */
  const Journey = {
    idx: 0,
    init() {
      const list = $('#log-list');
      list.innerHTML = D.journey
        .map((j, i) => `
          <button type="button" role="tab" id="log-tab-${i}" aria-controls="log-panel" class="log-tab">
            <span class="node ${j.kind === 'merge' ? 'node--merge' : j.kind === 'branch' ? 'node--branch' : ''}" aria-hidden="true"></span>
            <span class="hash">${esc(j.hash)}</span>
            <span class="title">${esc(j.title)}</span>
          </button>`)
        .join('');
      makeTabs(list, (i) => this.select(i));
      $('#log-panel').addEventListener('click', (e) => {
        const b = e.target.closest('[data-step]');
        if (b && !b.disabled) this.select(this.idx + Number(b.dataset.step));
      });
      this.select(0, true);
    },
    select(i, initial) {
      const n = D.journey.length;
      this.idx = Math.max(0, Math.min(n - 1, i));
      const list = $('#log-list');
      markTabs(list, this.idx);
      const tab = $(`#log-tab-${this.idx}`);
      if (list.scrollWidth > list.clientWidth) list.scrollTo({ left: tab.offsetLeft - 16, behavior: reducedMotion ? 'auto' : 'smooth' });
      const j = D.journey[this.idx];
      const panel = $('#log-panel');
      panel.setAttribute('aria-labelledby', `log-tab-${this.idx}`);
      panel.innerHTML = `
        <article class="flex h-full flex-col p-5 md:p-8">
          <div class="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted">
            <span>commit <span class="theme-game lane-text">${esc(j.hash)}</span>${this.idx === n - 1 ? ' <span class="text-fg">(HEAD → main)</span>' : ''}</span>
            <span>${this.idx + 1} / ${n}</span>
          </div>
          <h3 class="mt-6 text-2xl font-semibold tracking-tight md:text-[1.75rem]">${esc(j.title)}</h3>
          <p class="mt-3 max-w-xl text-[17px] leading-relaxed text-muted">${esc(j.detail)}</p>
          ${j.kind === 'branch' ? `<div class="mt-5 flex flex-wrap gap-2">${D.curriculum.map((c) => `<span class="tag theme-${c.key}"><span class="lane-dot"></span><span class="font-mono">${esc(c.branch)}</span></span>`).join('')}</div>` : ''}
          ${j.link ? `<a href="${j.link.href}" class="mt-5 inline-flex w-fit items-center gap-1 text-[15px] font-medium underline underline-offset-4">${esc(j.link.label)}</a>` : ''}
          <div class="mt-auto grid grid-cols-2 gap-2 pt-10 sm:flex">
            <button type="button" data-step="-1" class="btn btn-ghost h-10 px-4 text-sm" ${this.idx === 0 ? 'disabled' : ''}><i data-lucide="chevron-left" class="h-4 w-4"></i> Sebelumnya</button>
            <button type="button" data-step="1" class="btn btn-primary h-10 px-4 text-sm" ${this.idx === n - 1 ? 'disabled' : ''}>Berikutnya <i data-lucide="chevron-right" class="h-4 w-4"></i></button>
          </div>
        </article>`;
      icons();
      if (!initial) swapIn(panel.firstElementChild);
    },
  };

  /* ============================================================
   * BRANCH SWITCHER + KODE
   * ============================================================ */
  const Branches = {
    idx: 0,
    init() {
      const list = $('#branch-tabs');
      list.innerHTML = D.curriculum
        .map((c, i) => `<button type="button" role="tab" id="branch-tab-${i}" aria-controls="branch-panel" class="utab theme-${c.key} font-mono"><span class="lane-dot"></span>${esc(c.branch)}</button>`)
        .join('') + '<span class="utab-ind" aria-hidden="true"></span>';
      makeTabs(list, (i) => this.select(i));
      // posisi indikator dihitung ulang saat font selesai dimuat / layar berubah ukuran
      const re = () => this.moveInd();
      window.addEventListener('resize', re);
      window.addEventListener('load', re);
      if (document.fonts) document.fonts.ready.then(re);
      this.select(0, true);
    },
    moveInd() {
      const t = $(`#branch-tab-${this.idx}`);
      const ind = $('#branch-tabs .utab-ind');
      if (!t || !ind) return;
      ind.style.width = `${t.offsetWidth - 16}px`;
      ind.style.transform = `translateX(${t.offsetLeft + 8}px)`;
    },
    select(i, initial) {
      this.idx = i;
      markTabs($('#branch-tabs'), i);
      this.moveInd();
      const c = D.curriculum[i];
      const sec = $('#keahlian');
      sec.className = sec.className.replace(/\btheme-\w+/, '').trim() + ` theme-${c.key}`;
      const panel = $('#branch-panel');
      panel.setAttribute('aria-labelledby', `branch-tab-${i}`);
      panel.innerHTML = `
        <div class="cells grid-cols-1 lg:grid-cols-12">
          <div class="relative overflow-hidden p-5 md:p-9 lg:col-span-5">
            <div class="keahlian-glow" aria-hidden="true"></div>
            <div class="relative">
              <p class="flex items-center gap-2 font-mono text-xs lane-text"><span class="lane-dot"></span>${esc(c.branch)}</p>
              <h3 class="mt-3 text-2xl font-semibold tracking-tight md:text-[1.75rem]">${esc(c.title)}</h3>
              <p class="mt-3 text-[17px] leading-relaxed text-muted">${esc(c.description)}</p>
              <p class="mt-7 text-sm text-muted">Yang dipakai</p>
              <div class="mt-3 flex flex-wrap gap-2">${c.tools.split(', ').map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
              ${c.practice ? `<a href="${esc(c.practice.url)}" ${EXT} class="btn btn-ghost mt-7 h-10 px-4 text-sm"><i data-lucide="gamepad-2" class="h-4 w-4"></i> ${esc(c.practice.label)}</a>` : ''}
            </div>
          </div>
          <div class="min-w-0 bg-base2 p-4 md:p-8 lg:col-span-7" style="background:var(--bg2)">
            <div class="editor">
              <div class="flex items-center justify-between gap-3 border-b border-[#222] py-2.5 pl-5 pr-2.5">
                <span class="font-mono text-xs text-[#8f8f8f]">${esc(c.file)}</span>
                <button type="button" id="run-btn" class="btn btn-gold h-8 px-3.5 text-[13px]"><i data-lucide="play" class="h-3.5 w-3.5"></i> Jalankan</button>
              </div>
              <ol class="code" aria-label="Contoh kode ${esc(c.title)}">${c.code.map((l) => `<li>${l ? esc(l) : ' '}</li>`).join('')}</ol>
              <div id="run-out" class="run-out" aria-live="polite"><span class="text-[#6b6b6b]">Tekan Jalankan untuk melihat hasilnya.</span></div>
            </div>
          </div>
        </div>`;
      $('#run-btn').addEventListener('click', () => this.run(c.key));
      icons();
      if (!initial) swapIn(panel.firstElementChild);
    },
    run(key) {
      const out = $('#run-out');
      out.onclick = null;
      if (key === 'web') {
        out.innerHTML = `<span class="text-[#6b6b6b]">Hasil di browser:</span><div class="mt-3"><button type="button" id="demo-btn" class="rounded-full bg-emerald-800 px-5 py-2 font-sans text-white">Klik aku</button></div>`;
        $('#demo-btn').addEventListener('click', (e) => { e.currentTarget.textContent = 'Halo, calon developer!'; });
      } else if (key === 'python') {
        out.innerHTML = `<span class="text-[#6b6b6b]">$ python siswa.py</span><br/><span>Kamu menguasai 3 materi</span>`;
      } else if (key === 'game') {
        out.innerHTML = `
          <span class="text-[#6b6b6b]">Gerakkan hero dengan tombol atau panah ← → saat arena dipilih.</span>
          <div id="stage" class="stage" tabindex="0" role="application" aria-label="Arena game, gunakan panah kiri dan kanan"><span id="hero-px" class="stage-hero" style="left:5%"></span></div>
          <div class="mt-3 flex gap-2">
            <button type="button" data-move="-1" class="btn-code" aria-label="Gerak ke kiri">◀</button>
            <button type="button" data-move="1" class="btn-code" aria-label="Gerak ke kanan">▶</button>
            <span id="hero-x" class="self-center text-[#8f8f8f]">hero.x = 0</span>
          </div>`;
        let x = 0;
        const move = (d) => {
          x = Math.max(0, Math.min(10, x + d));
          $('#hero-px').style.left = `${5 + x * 9}%`;
          $('#hero-x').textContent = `hero.x = ${x}`;
        };
        out.onclick = (e) => { const b = e.target.closest('[data-move]'); if (b) move(Number(b.dataset.move)); };
        $('#stage').addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); move(1); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); }
        });
        $('#stage').focus({ preventScroll: true });
      } else if (key === 'git') {
        out.innerHTML = '';
        const lines = [
          ["Switched to a new branch 'fitur-login'", 'text-[#8f8f8f]'],
          ['[fitur-login 3b7e1c2] Tambah halaman login', 'text-[#8f8f8f]'],
          ['To github.com/tim-kamu/proyek.git', 'text-[#8f8f8f]'],
          [' * [new branch]  fitur-login -> fitur-login', ''],
          ['Siap dibuatkan Pull Request untuk direview tim.', 'text-gold'],
        ];
        lines.forEach(([t, cls], i) => setTimeout(() => {
          out.insertAdjacentHTML('beforeend', `<span class="block ${cls}">${esc(t)}</span>`);
        }, reducedMotion ? 0 : i * 260));
      }
    },
  };

  /* ============================================================
   * KUIS MINAT
   * ============================================================ */
  const Quiz = {
    answers: [],
    init() {
      $('#quiz').addEventListener('click', (e) => {
        const opt = e.target.closest('[data-key]');
        if (opt) {
          if (this.busy) return;
          // jawaban menyala sebentar sebelum pindah ke pertanyaan berikutnya
          this.busy = true;
          opt.classList.add('picked');
          setTimeout(() => { this.busy = false; this.answers.push(opt.dataset.key); this.render(); }, reducedMotion ? 0 : 260);
          return;
        }
        const act = e.target.closest('[data-act]');
        if (!act) return;
        if (act.dataset.act === 'back') this.answers.pop();
        if (act.dataset.act === 'reset') this.answers = [];
        if (act.dataset.act === 'try') {
          Branches.select(D.curriculum.findIndex((c) => c.key === act.dataset.branch));
          $('#keahlian').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
          return;
        }
        this.render();
      });
      this.render(true);
    },
    render(initial) {
      const Q = D.quiz;
      const step = this.answers.length;
      const total = Q.questions.length;
      const head = `
        <div class="text-center">
          <h2 class="heading">${esc(Q.title)}</h2>
          <p class="lead mx-auto mt-4">${esc(Q.intro)}</p>
        </div>`;
      let body;
      if (step < total) {
        const q = Q.questions[step];
        body = `
          <div class="p-5 md:p-7">
            <div class="flex items-center justify-between text-sm text-muted">
              <span class="font-mono text-xs">${step + 1} / ${total}</span>
              ${step > 0 ? '<button type="button" data-act="back" class="underline underline-offset-4 hover:text-fg">Kembali</button>' : ''}
            </div>
            <div class="quiz-bar mt-3"><span style="width:${(step / total) * 100}%"></span></div>
            <h3 class="mt-6 text-xl font-semibold tracking-tight md:text-2xl">${esc(q.q)}</h3>
          </div>
          <div class="cells grid-cols-1 border-t border-line sm:grid-cols-2">
            ${q.options.map((o, i) => `<button type="button" class="quiz-opt theme-${o.key}" data-key="${o.key}"><span class="key">${'ABCD'[i]}</span>${esc(o.label)}</button>`).join('')}
          </div>`;
      } else {
        const score = {};
        this.answers.forEach((k) => { score[k] = (score[k] || 0) + 1; });
        const best = D.curriculum.reduce((a, c) => ((score[c.key] || 0) > (score[a.key] || 0) ? c : a), D.curriculum.find((c) => c.key === this.answers[0]));
        body = `
          <div class="p-5 md:p-7">
            <div class="quiz-bar"><span style="width:100%"></span></div>
            <div class="quiz-result theme-${best.key} mt-6">
              <p class="text-sm text-muted">Hasilmu</p>
              <h3 class="mt-1 text-xl font-semibold tracking-tight md:text-2xl">Kamu cocok mulai dari <span class="font-mono lane-text">${esc(best.branch)}</span></h3>
              <p class="mt-3 font-medium">${esc(best.title)}</p>
              <p class="mt-1 leading-relaxed text-muted">${esc(best.description)}</p>
            </div>
            <p class="mt-4 text-[15px] text-muted">Ingat, di RPL kamu tetap belajar keempat bidang. Ini cuma titik mulai yang paling seru buatmu.</p>
            <div class="mt-6 flex flex-col gap-2 sm:flex-row">
              <button type="button" data-act="try" data-branch="${best.key}" class="btn btn-primary h-10 px-5 text-sm"><i data-lucide="code-xml" class="h-4 w-4"></i> Coba kodenya</button>
              <button type="button" data-act="reset" class="btn btn-ghost h-10 px-5 text-sm">Ulangi kuis</button>
            </div>
          </div>`;
      }
      $('#quiz').innerHTML = `${head}<div class="quiz-card mt-10 overflow-hidden rounded-xl bg-base" style="box-shadow:0 0 0 1px var(--line), 0 8px 30px rgba(0,0,0,.06)" aria-live="polite">${body}</div>`;
      icons();
      if (!initial) swapIn($('.quiz-card', $('#quiz')));
    },
  };

  /* ============================================================
   * BERITA: SCROLL HORIZONTAL
   * Geser dengan jari / trackpad, seret mouse, tombol ‹ ›, atau panah keyboard.
   * ============================================================ */
  const News = {
    init() {
      const track = $('#news-track');
      this.track = track;
      this.wrap = $('#news-wrap');
      track.style.position = 'relative'; // agar offsetLeft kartu relatif ke track
      track.innerHTML = D.news.map((n) => (n.featured ? this.featuredCard(n) : this.card(n))).join('');
      applyWaLinks(track);

      $('#news-prev').addEventListener('click', () => this.go(-1));
      $('#news-next').addEventListener('click', () => this.go(1));
      track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); this.go(1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); this.go(-1); }
      });
      // perhitungannya ringan (beberapa kartu), jadi langsung diperbarui setiap scroll
      track.addEventListener('scroll', () => this.update(), { passive: true });
      window.addEventListener('resize', () => this.update());
      this.setupDrag();
      this.update();
    },

    // Sampul kartu unggulan: judul game bergaya pixel + sprite kecil
    featuredCard(n) {
      const px = [
        '..GGGG..', '.GGGGGG.', '.GwGGwG.', '.GGGGGG.', '..GGGG..', '.MMMMMM.', 'M.MMMM.M', '..M..M..',
      ];
      const colors = { G: '#F2B53A', w: '#0a2c1e', M: '#5fd39a' };
      const rects = px.flatMap((row, y) => [...row].map((c, x) => (colors[c] ? `<rect x="${x}" y="${y}" width="1" height="1" fill="${colors[c]}"/>` : ''))).join('');
      return `
        <article class="news-card news-card--game">
          <div class="news-cover">
            <span class="absolute left-5 top-5 z-[1] rounded-full bg-gold px-2.5 py-1 text-xs font-medium text-[#0a0a0a]">${esc(n.category)}</span>
            <p class="pixel-title absolute bottom-5 left-5 right-24 z-[1] font-pixel text-[0.95rem] text-gold sm:text-[1.1rem]">${esc(D.featuredProject.title)}</p>
            <svg class="pixel-sprite z-[1]" width="56" height="56" viewBox="0 0 8 8" aria-hidden="true">${rects}</svg>
          </div>
          <div class="flex flex-1 flex-col p-5 md:p-6">
            <h3 class="text-lg font-semibold leading-snug tracking-tight">${esc(n.title)}</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-[#bdbdbd]">${esc(n.summary)}</p>
            <div class="mt-auto pt-5"><a href="${esc(n.url)}" ${EXT} class="btn btn-gold h-10 w-fit px-5 text-sm"><i data-lucide="play" class="h-4 w-4"></i> ${esc(n.cta || 'Buka')}</a></div>
          </div>
        </article>`;
    },

    card(n) {
      const date = n.date
        ? `<time datetime="${esc(n.date)}" class="font-mono text-xs text-muted">${esc(new Date(n.date + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }))}</time>`
        : '';
      let link = '';
      if (n.cta && n.url) link = `<a href="${esc(n.url)}" ${EXT} class="btn btn-primary h-10 w-fit px-5 text-sm"><i data-lucide="play" class="h-4 w-4"></i> ${esc(n.cta)}</a>`;
      else if (n.wa) link = `<a data-wa="${esc(n.wa)}" href="#" ${EXT} class="news-link">Tanya lewat WhatsApp <i data-lucide="arrow-up-right" class="h-4 w-4"></i></a>`;
      else if (n.url && n.url.startsWith('#')) link = `<a href="${esc(n.url)}" class="news-link">Lihat selengkapnya <i data-lucide="arrow-down" class="h-4 w-4"></i></a>`;
      else if (n.url) link = `<a href="${esc(n.url)}" ${EXT} class="news-link">Baca selengkapnya <i data-lucide="arrow-up-right" class="h-4 w-4"></i></a>`;
      return `
        <article class="news-card ${n.wide ? 'news-card--wide' : ''} theme-${esc(n.theme || 'web')}">
          <div class="news-cover">
            ${n.image ? `<img src="${esc(n.image)}" alt="${esc(n.imageAlt || '')}" loading="lazy" />` : `<span class="ico"><i data-lucide="${esc(n.icon || 'newspaper')}" class="h-6 w-6"></i></span>`}
            ${n.image ? '' : `<span class="tag absolute left-5 top-5 z-[1]"><span class="lane-dot"></span>${esc(n.category)}</span>`}
          </div>
          <div class="flex flex-1 flex-col p-5 md:p-6">
            ${n.image ? `<span class="tag mb-3 w-fit"><span class="lane-dot"></span>${esc(n.category)}</span>` : ''}
            ${date}
            <h3 class="h3 ${date ? 'mt-1.5' : ''}">${esc(n.title)}</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-muted">${esc(n.summary)}</p>
            ${link ? `<div class="mt-auto pt-5">${link}${n.note ? `<p class="mt-2.5 flex items-center gap-1.5 text-xs text-muted"><i data-lucide="monitor" class="h-3.5 w-3.5"></i>${esc(n.note)}</p>` : ''}</div>` : ''}
          </div>
        </article>`;
    },

    cards() { return $$('.news-card', this.track); },
    pad() { return parseFloat(getComputedStyle(this.track).paddingLeft) || 0; },

    // Geser ke kartu berikutnya / sebelumnya
    go(dir) {
      const t = this.track;
      const x = t.scrollLeft + this.pad();
      const cards = this.cards();
      let target;
      if (dir > 0) target = cards.find((c) => c.offsetLeft > x + 4);
      else target = [...cards].reverse().find((c) => c.offsetLeft < x - 4);
      if (!target) target = dir > 0 ? cards[cards.length - 1] : cards[0];
      t.scrollTo({ left: target.offsetLeft - this.pad(), behavior: reducedMotion ? 'auto' : 'smooth' });
    },

    // Garis progres, bayangan tepi, status tombol, dan penghitung posisi
    update() {
      const t = this.track;
      const max = t.scrollWidth - t.clientWidth;
      const ratio = t.scrollWidth ? t.clientWidth / t.scrollWidth : 1;
      const p = max > 0 ? t.scrollLeft / max : 1;
      $('#news-bar').style.width = `${Math.min(100, (ratio + p * (1 - ratio)) * 100)}%`;
      const atStart = t.scrollLeft < 4;
      const atEnd = t.scrollLeft > max - 4;
      this.wrap.classList.toggle('at-start', atStart);
      this.wrap.classList.toggle('at-end', atEnd);
      $('#news-prev').disabled = atStart;
      $('#news-next').disabled = atEnd;
      const x = t.scrollLeft + this.pad();
      const cards = this.cards();
      let idx = cards.findIndex((c) => c.offsetLeft + c.offsetWidth / 2 > x);
      if (atEnd) idx = cards.length - 1;
      $('#news-count').textContent = `${Math.max(0, idx) + 1} / ${cards.length}`;
    },

    // Seret dengan mouse (sentuhan & trackpad memakai scroll bawaan)
    setupDrag() {
      const t = this.track;
      let startX = 0, startLeft = 0, down = false, moved = false;
      t.addEventListener('pointerdown', (e) => {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        down = true; moved = false; startX = e.clientX; startLeft = t.scrollLeft;
      });
      t.addEventListener('pointermove', (e) => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 5) {
          moved = true;
          t.classList.add('dragging');
          t.setPointerCapture(e.pointerId);
        }
        if (moved) t.scrollLeft = startLeft - dx;
      });
      const end = () => {
        if (!down) return;
        down = false;
        if (moved) {
          t.classList.remove('dragging'); // snap aktif lagi → kartu menempel rapi
          setTimeout(() => { moved = false; }, 0);
        }
      };
      t.addEventListener('pointerup', end);
      t.addEventListener('pointercancel', end);
      // klik setelah menyeret tidak membuka tautan
      t.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
    },
  };

  /* ================= Karya lain + filter ================= */
  function renderProjects() {
    const seg = $('#project-filters');
    seg.innerHTML = D.projectCategories
      .map((c, i) => `<button type="button" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`)
      .join('') + '<span class="seg-ind" aria-hidden="true"></span>';
    // pill indikator meluncur ke tombol filter yang aktif
    const moveSeg = () => {
      const b = $('[aria-pressed="true"]', seg);
      const ind = $('.seg-ind', seg);
      ind.style.width = `${b.offsetWidth}px`;
      ind.style.height = `${b.offsetHeight}px`;
      ind.style.transform = `translate(${b.offsetLeft}px, ${b.offsetTop}px)`;
    };
    window.addEventListener('resize', moveSeg);
    window.addEventListener('load', moveSeg);
    if (document.fonts) document.fonts.ready.then(moveSeg);
    requestAnimationFrame(moveSeg);
    $('#project-grid').innerHTML = D.projects
      .map((p) => {
        const action = p.url
          ? `<a href="${esc(p.url)}" ${EXT} class="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline">Buka karya <span class="sr-only">${esc(p.title)}</span><i data-lucide="arrow-up-right" class="h-4 w-4"></i></a>`
          : `<span class="text-sm text-muted">Dipakai internal sekolah</span>`;
        return `
        <article data-category="${esc(p.category)}" class="project-cell p-5 md:p-8">
          <span class="tag theme-${p.theme} w-fit"><span class="lane-dot"></span>${esc(p.category)}</span>
          <h3 class="h3 mt-5">${esc(p.title)}</h3>
          <p class="mb-8 mt-2 text-[15px] leading-relaxed text-muted">${esc(p.description)}</p>
          <div class="mt-auto">${action}</div>
        </article>`;
      })
      .join('');
    $('#project-filters').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      $$('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      moveSeg();
      const cat = btn.dataset.filter;
      $$('.project-cell').forEach((el, i) => {
        const hide = cat !== 'Semua' && el.dataset.category !== cat;
        el.classList.toggle('is-hidden', hide);
        el.classList.remove('pop-in');
        if (!hide) { void el.offsetWidth; el.style.animationDelay = `${i * 60}ms`; el.classList.add('pop-in'); }
      });
    });
  }

  /* ============================================================
   * STEPPER PKL
   * ============================================================ */
  const Pkl = {
    idx: 0,
    init() {
      const steps = D.pklSteps;
      const wrap = $('#pkl-stepper');
      wrap.className = 'cells grid-cols-1';
      wrap.innerHTML = `
        <div class="stepper cells grid-cols-2 md:grid-cols-4" role="tablist" aria-label="Langkah PKL">
          ${steps.map((s, i) => `<button type="button" role="tab" id="pkl-tab-${i}" aria-controls="pkl-panel" class="step-cell"><span class="bar" aria-hidden="true"></span><span class="num">0${i + 1}</span><span class="font-medium">${esc(s.title)}</span></button>`).join('')}
        </div>
        <div id="pkl-panel" role="tabpanel"></div>`;
      makeTabs($('.stepper'), (i) => this.select(i));
      $('#pkl-panel').addEventListener('click', (e) => {
        if (e.target.closest('[data-next]')) this.select(this.idx === steps.length - 1 ? 0 : this.idx + 1);
      });
      this.select(0, true);
    },
    select(i, initial) {
      const steps = D.pklSteps;
      this.idx = i;
      const bar = $('.stepper');
      markTabs(bar, i);
      $$('.step-cell', bar).forEach((b, k) => { b.dataset.done = String(k < i); });
      const s = steps[i];
      const last = i === steps.length - 1;
      const panel = $('#pkl-panel');
      panel.setAttribute('aria-labelledby', `pkl-tab-${i}`);
      panel.innerHTML = `
        <div class="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between md:px-8 md:py-7">
          <div>
            <p class="font-mono text-xs text-muted">Langkah ${i + 1} dari ${steps.length}</p>
            <h3 class="h3 mt-1">${esc(s.title)}</h3>
            <p class="mt-1 text-[15px] leading-relaxed text-muted">${esc(s.description)}</p>
          </div>
          <button type="button" data-next class="btn ${last ? 'btn-ghost' : 'btn-primary'} h-10 shrink-0 px-5 text-sm">${last ? 'Ulangi dari awal' : 'Langkah berikutnya'}</button>
        </div>`;
      if (!initial) swapIn(panel.firstElementChild);
    },
  };

  /* ================= Karir ================= */
  function renderCareers() {
    $('#careers').innerHTML = D.careers
      .map((c) => `
        <article class="career-cell theme-${c.theme} p-5 md:p-8">
          <span class="flex items-center gap-2 text-sm lane-text"><i data-lucide="${c.icon}" class="h-4 w-4"></i>${c.items.length} pilihan</span>
          <h3 class="mt-4 text-2xl font-semibold tracking-tight">${esc(c.title)}</h3>
          <p class="mt-2 text-[15px] leading-relaxed text-muted">${esc(c.text)}</p>
          <ul class="mt-6 border-t border-line">
            ${c.items.map((it) => `<li class="flex items-center gap-2.5 border-b border-line py-3 text-[15px] last:border-0"><span class="lane-dot"></span>${esc(it)}</li>`).join('')}
          </ul>
        </article>`)
      .join('');
  }

  /* ================= FAQ ================= */
  function renderFaq() {
    $('#faq-list').innerHTML = D.faq
      .map((f, i) => `
        <div class="faq-item" data-open="${i === 0}">
          <h3>
            <button type="button" id="faq-btn-${i}" aria-expanded="${i === 0}" aria-controls="faq-panel-${i}" class="flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-medium leading-snug">
              <span>${esc(f.q)}</span>
              <i data-lucide="plus" class="faq-icon h-5 w-5 shrink-0 text-muted"></i>
            </button>
          </h3>
          <div id="faq-panel-${i}" role="region" aria-labelledby="faq-btn-${i}" class="faq-panel">
            <div><div class="pb-5 pr-10 leading-relaxed text-muted">
              ${esc(f.a)}
              ${f.waCta ? `<a data-wa="spmb" href="#" ${EXT} class="mt-3 block w-fit font-medium text-fg underline underline-offset-4">${esc(f.waCta)}</a>` : ''}
            </div></div>
          </div>
        </div>`)
      .join('');
    $('#faq-list').addEventListener('click', (e) => {
      const btn = e.target.closest('button[aria-controls]');
      if (!btn) return;
      const item = btn.closest('.faq-item');
      const open = item.dataset.open !== 'true';
      item.dataset.open = String(open);
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  /* ================= Footer ================= */
  function renderFooter() {
    $('#footer-address').textContent = D.config.address;
    const linkCls = 'text-muted transition-colors hover:text-fg';
    $('#footer-departments').innerHTML = D.departments.map((d) => `<li><a href="${esc(d.url)}" ${EXT} class="${linkCls}">${esc(d.name)}</a></li>`).join('');
    $('#footer-links').innerHTML = D.footerLinks.map((l) => `<li><a href="${esc(l.url)}" ${l.external ? EXT : ''} class="${linkCls}">${esc(l.label)}</a></li>`).join('');
    $('#footer-portal').href = D.config.mainPortal;
    $('#cta-main-portal').href = D.config.mainPortal;
    $('#year').textContent = new Date().getFullYear();
  }

  /* ================= Mobile drawer ================= */
  function setupDrawer() {
    const drawer = $('#mobile-drawer');
    const backdrop = $('#drawer-backdrop');
    const openBtn = $('#menu-open');
    const closeBtn = $('#menu-close');
    function open() {
      backdrop.classList.remove('hidden');
      requestAnimationFrame(() => backdrop.classList.remove('opacity-0'));
      drawer.classList.remove('translate-x-full');
      drawer.setAttribute('aria-hidden', 'false');
      openBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('drawer-open');
      closeBtn.focus();
    }
    function close() {
      backdrop.classList.add('opacity-0');
      drawer.classList.add('translate-x-full');
      drawer.setAttribute('aria-hidden', 'true');
      openBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('drawer-open');
      setTimeout(() => backdrop.classList.add('hidden'), 300);
    }
    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', () => { close(); openBtn.focus(); });
    backdrop.addEventListener('click', close);
    drawer.addEventListener('click', (e) => { if (e.target.closest('[data-drawer-link]')) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') { close(); openBtn.focus(); }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (m) => { if (m.matches) close(); });
  }

  /* ================= Animasi muncul saat di-scroll ================= */
  function setupReveal() {
    // Konten di dalam sel yang dianimasikan (bukan selnya, agar garis grid tetap utuh)
    const targets = $$([
      '.band:not(#beranda) h2.heading', '.band:not(#beranda) .lead',
      '#hero-branches .branch-cell > *',
      '#log-list', '#log-panel', '#branch-tabs', '#branch-panel', '#quiz',
      '#news-track', '#news-count',
      '#project-filters', '#project-grid .project-cell > *',
      '.step-cell > *', '#pkl-panel',
      '.career-cell > *', '.faq-item',
      '#spmb .btn', 'footer .frame > div > div',
    ].join(','));
    // Grafik branch tergambar saat terlihat
    const graph = $('#hero-graph .graph');

    if (reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('reveal', 'in'));
      if (graph) graph.classList.add('in');
      return;
    }
    targets.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver(
      (entries) => {
        // elemen yang masuk bersamaan dimunculkan bergiliran
        entries.filter((en) => en.isIntersecting).forEach((en, i) => {
          en.target.style.setProperty('--d', `${Math.min(i, 8) * 70}ms`);
          en.target.classList.add('in');
          io.unobserve(en.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((el) => io.observe(el));
    let gio = null;
    if (graph) {
      gio = new IntersectionObserver((en) => {
        if (en[0].isIntersecting) { graph.classList.add('in'); gio.disconnect(); }
      }, { threshold: 0.35 });
      gio.observe(graph);
    }

    // Cadangan: elemen yang sudah terlihat saat halaman dimuat langsung dimunculkan,
    // tanpa bergantung pada callback awal IntersectionObserver.
    const revealVisible = () => {
      const vh = window.innerHeight;
      let n = 0;
      targets.forEach((el) => {
        if (el.classList.contains('in')) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh - 40 && r.bottom > 0) {
          el.style.setProperty('--d', `${Math.min(n++, 8) * 70}ms`);
          el.classList.add('in');
          io.unobserve(el);
        }
      });
      if (graph && !graph.classList.contains('in')) {
        const r = graph.getBoundingClientRect();
        if (r.top < vh - r.height * 0.35 && r.bottom > 0) { graph.classList.add('in'); gio.disconnect(); }
      }
    };
    requestAnimationFrame(revealVisible);
    window.addEventListener('load', revealVisible);
    setTimeout(revealVisible, 900);

    // Juga dicek saat scroll (dibatasi 1x per frame), berhenti bila semua sudah tampil
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        revealVisible();
        const done = targets.every((el) => el.classList.contains('in')) && (!graph || graph.classList.contains('in'));
        if (done) window.removeEventListener('scroll', onScroll);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ================= Bayangan navbar saat scroll ================= */
  function setupHeader() {
    const header = $('header');
    const on = () => header.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', on, { passive: true });
    on();
  }

  /* ================= Penanda section aktif ================= */
  function setupScrollSpy() {
    if (!('IntersectionObserver' in window)) return;
    const links = $$('.nav-link');
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = '#' + entry.target.id;
          links.forEach((a) => {
            if (a.getAttribute('href') === id) a.setAttribute('aria-current', 'true');
            else a.removeAttribute('aria-current');
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    D.nav.forEach((n) => { const s = $(n.href); if (s) spy.observe(s); });
  }

  /* ================= Init ================= */
  document.addEventListener('DOMContentLoaded', () => {
    Theme.init();
    renderNav();
    renderHero();
    Branches.init();
    Terminal.init();
    Journey.init();
    Quiz.init();
    News.init();
    renderProjects();
    Pkl.init();
    renderCareers();
    renderFaq();
    renderFooter();
    applyWaLinks();
    if (/x/i.test(D.config.whatsappNumber)) {
      console.warn('[RPL] Nomor WhatsApp masih placeholder. Isi config.whatsappNumber di js/data.js sebelum rilis.');
    }
    icons();
    setupDrawer();
    setupScrollSpy();
    setupHeader();
    setupReveal();
  });
})();
