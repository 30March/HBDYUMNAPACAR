/* =========================================================
   Happy Birthday Sayang — script.js
   Semua teks yang ingin kamu ganti ada di bagian CONFIG.
   ========================================================= */
(() => {
    'use strict';

    /* ---------------------------------------------------------
       CONFIG  →  ubah teks, foto, video, dan musik di sini
       --------------------------------------------------------- */
    const CONFIG = {
        // Teks yang diketik di halaman 2
        greetingLines: ['happy birthday', 'Love you', 'More too', 'Sayangg'],

        // 9 foto untuk album (taruh di folder images/)
        photos: [
            { src: 'images/foto1.jpg', caption: 'cantiknyaa' },
            { src: 'images/foto2.jpg', caption: 'manisnyaaa' },
            { src: 'images/foto3.jpg', caption: 'gemashhnyaaa' },
            { src: 'images/foto4.jpg', caption: 'lucukkknyaaa' },
            { src: 'images/foto5.jpg', caption: 'pacalll kaka iniee' },
            { src: 'images/foto6.jpg', caption: 'kakaa sayang yomnaa' },
            { src: 'images/foto7.jpg', caption: 'pretty' },
            { src: 'images/foto8.jpg', caption: 'beautiful' },
            { src: 'images/foto9.jpg', caption: 'loveeyouu selamanya' }
        ],

        // Kartu surat di halaman "Kata-Kata Indah" (bebas tambah / kurangi)
        letters: [
            {
                text: 'Kau sibuk menghitung batas pandangmu,\nsementara aku menghabiskan waktu\nmensyukuri caramu memandang dunia dengan tulus.\nBagiku kau adalah sebuah karya\nsemesta yang telah teramat sempurna\nuntuk dicintai dengan sisa napas yang aku punya.',
                sign: '- AufarL'
            },
            {
                text: 'walau gemerlapnya lampu kota diwaktu kini, kulihat tatap matamu tetap terang benderang, bagai sinar bintang yang berkelipan dihampanya langit malam. sayang, jikalau dalam kehidupan ini aku hanyalah rumput liar dibentangan sawah, sedangkan kau bintangnya.aku rela membayar jutaan teleskop hanya untuk memandangi indahnya gemerlap manis dirimu.',
                sign: '- AufarL'
            },
            {
                text: 'Diramainya politik pemilu kemarin kenapa kau tidak mencalonkan diri saja, sebab di hadapanmu Aku bukan lagi seorang oposisi melainkan rakyat yang menyerahkan seluruh kedaulatan nya untuk Kau jajah dengan kasih sayang yang absolut',
                sign: '- AufarL'
            },
            {
                text: 'Aku selalu suka cara langit membuat hujan, seperti Tuhan membuat senyummu untuk kudoakan. ​Turunnya tenang meresapi cakrawala, sama seperti caraku merapal namamu dalam diam. jika sang langit menjaga semesta dengan rintiknya, Maka kurawat nyala asmara alangkah terus mengaminkanmu.',
                sign: '- AufarL'
            },
            {
                text: '10 years 20, whenever your hair turned gray till your able to ride those waves alone',
                sign: '- Ride Your Wave'
            }
        ],

        // Musik latar: taruh file di music/lagu.mp3 (opsional)
        // Video momen: taruh file di video/video.mp4 (opsional)
        typingSpeed: 70 // ms per huruf
    };

    /* ---------------------------------------------------------
       Helper
       --------------------------------------------------------- */
    const $  = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
    const rand = (min, max) => Math.random() * (max - min) + min;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const PINKS   = ['#f78fb3', '#ffb3cb', '#e76a97', '#ffd0df'];
    const MOCHAS  = ['#a07860', '#bb9582', '#d3b4a2', '#6e4a39'];
    const PALETTE = PINKS.concat(MOCHAS);

    /* ---------------------------------------------------------
       Dekorasi: bunting, hati melayang, kelopak, balon
       --------------------------------------------------------- */
    function buildBunting() {
        const el = $('#bunting');
        const count = Math.ceil(window.innerWidth / 38);
        el.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const f = document.createElement('i');
            f.className = 'flag';
            el.appendChild(f);
        }
    }

    function spawnFloater() {
        if (document.hidden || reduceMotion) return;
        const box = $('#floaters');
        const roll = Math.random();
        const el = document.createElement('span');

        if (roll < 0.55) {                       // hati
            el.className = 'heart-f';
            el.textContent = Math.random() < 0.8 ? '♥' : '❤';
            el.style.left = rand(2, 96) + '%';
            el.style.fontSize = rand(14, 34) + 'px';
            el.style.color = PINKS[Math.floor(rand(0, PINKS.length))];
            el.style.setProperty('--sx', rand(-60, 60) + 'px');
            el.style.setProperty('--rot', rand(-40, 40) + 'deg');
            el.style.animationDuration = rand(8, 14) + 's';
        } else if (roll < 0.92) {                // kelopak
            el.className = 'petal';
            const s = rand(10, 18);
            el.style.width = s + 'px';
            el.style.height = s + 'px';
            el.style.left = rand(0, 100) + '%';
            el.style.setProperty('--sx', rand(-80, 120) + 'px');
            el.style.setProperty('--rot', rand(300, 720) + 'deg');
            el.style.animationDuration = rand(9, 16) + 's';
        } else {                                 // balon
            el.className = 'balloon';
            el.style.left = rand(4, 92) + '%';
            el.style.background = PALETTE[Math.floor(rand(0, PALETTE.length))];
            el.style.setProperty('--sx', rand(-40, 40) + 'px');
            el.style.setProperty('--rot', rand(-12, 12) + 'deg');
            el.style.animationDuration = rand(12, 18) + 's';
        }
        box.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
    }

    // hati kecil muncul di titik klik
    function clickBurst(x, y, n = 7) {
        if (reduceMotion) return;
        for (let i = 0; i < n; i++) {
            const h = document.createElement('span');
            h.className = 'burst-heart';
            h.textContent = '♥';
            h.style.left = x + 'px';
            h.style.top = y + 'px';
            h.style.fontSize = rand(12, 24) + 'px';
            h.style.color = PINKS[Math.floor(rand(0, PINKS.length))];
            h.style.setProperty('--bx', rand(-70, 70) + 'px');
            h.style.setProperty('--by', rand(-90, -20) + 'px');
            document.body.appendChild(h);
            setTimeout(() => h.remove(), 950);
        }
    }

    /* ---------------------------------------------------------
       Confetti (canvas)
       --------------------------------------------------------- */
    const canvas = $('#confetti');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let rafId = null;

    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function confetti(amount = 130, origin = { x: 0.5, y: 0.4 }) {
        if (reduceMotion) return;
        for (let i = 0; i < amount; i++) {
            const angle = rand(0, Math.PI * 2);
            const speed = rand(4, 12);
            particles.push({
                x: window.innerWidth * origin.x,
                y: window.innerHeight * origin.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 5,
                size: rand(7, 15),
                color: PALETTE[Math.floor(rand(0, PALETTE.length))],
                rot: rand(0, 360),
                vr: rand(-9, 9),
                heart: Math.random() < 0.38,
                life: 0,
                max: rand(110, 190)
            });
        }
        if (!rafId) rafId = requestAnimationFrame(tickConfetti);
    }

    function tickConfetti() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        particles = particles.filter(p => p.life < p.max);
        for (const p of particles) {
            p.life++;
            p.vy += 0.22;
            p.vx *= 0.992;
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.vr;
            ctx.save();
            ctx.globalAlpha = Math.max(0, 1 - p.life / p.max);
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot * Math.PI / 180);
            ctx.fillStyle = p.color;
            if (p.heart) {
                ctx.font = p.size * 1.6 + 'px serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('♥', 0, 0);
            } else {
                ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            }
            ctx.restore();
        }
        if (particles.length) {
            rafId = requestAnimationFrame(tickConfetti);
        } else {
            rafId = null;
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
    }

    /* ---------------------------------------------------------
       Musik
       --------------------------------------------------------- */
    const bgm = $('#bgm');
    const musicBtn = $('#musicBtn');
    let musicWanted = true;       // keinginan pengguna
    let musicAvailable = true;

    function setMusicUI() {
        const playing = !bgm.paused;
        musicBtn.classList.toggle('playing', playing);
        musicBtn.classList.toggle('off', !playing);
        musicBtn.textContent = playing ? '♪' : '♫';
    }

    function playMusic() {
        if (!musicAvailable || !musicWanted) return;
        const p = bgm.play();
        if (p && p.catch) p.catch(() => { /* diblokir / belum ada file */ });
    }

    bgm.addEventListener('play', setMusicUI);
    bgm.addEventListener('pause', setMusicUI);
    bgm.addEventListener('error', () => { musicAvailable = false; musicBtn.classList.add('off'); }, true);
    $('source', bgm).addEventListener('error', () => { musicAvailable = false; setMusicUI(); });

    musicBtn.addEventListener('click', () => {
        if (!musicAvailable) {
            alert('File musik belum ada.\nTaruh file lagu di folder music/ dengan nama lagu.mp3');
            return;
        }
        if (bgm.paused) { musicWanted = true; playMusic(); }
        else { musicWanted = false; bgm.pause(); }
    });
    setMusicUI();

    /* ---------------------------------------------------------
       Navigasi antar halaman
       --------------------------------------------------------- */
    const pages = $$('.page');
    let current = 'start';
    let typingTimer = null;
    const visited = new Set();

    function showPage(name) {
        const next = $('#page-' + name);
        if (!next || name === current) return;
        const prev = $('#page-' + current);

        if (prev) {
            prev.classList.remove('active');
            prev.classList.add('leaving');
            setTimeout(() => prev.classList.remove('leaving'), 360);
        }
        pages.forEach(p => { if (p !== prev) p.classList.remove('active'); });
        next.classList.add('active');
        next.scrollTop = 0;
        window.scrollTo(0, 0);
        current = name;
        onEnter(name);
    }

    function onEnter(name) {
        if (name === 'greeting') startTyping();
        if (name === 'album')    markVisited('album');
        if (name === 'words')    { markVisited('words'); resetLetters(); }
        if (name === 'moment')   markVisited('moment');
        if (name === 'end')      { setTimeout(() => confetti(160, { x: 0.5, y: 0.3 }), 250); setTimeout(() => confetti(90, { x: 0.15, y: 0.5 }), 700); setTimeout(() => confetti(90, { x: 0.85, y: 0.5 }), 900); }
        if (name !== 'moment')   pauseVideo();
    }

    function markVisited(key) {
        visited.add(key);
        const btn = $(`.menu-item[data-key="${key}"]`);
        if (btn) btn.classList.add('visited');
    }

    // tombol [data-go]
    document.addEventListener('click', e => {
        const t = e.target.closest('[data-go]');
        if (!t) return;
        if (t.dataset.go === 'greeting') playMusic();   // klik pertama = izin autoplay
        showPage(t.dataset.go);
    });

    // hati kecil di setiap klik
    document.addEventListener('pointerdown', e => clickBurst(e.clientX, e.clientY, 5));

    /* ---------------------------------------------------------
       Halaman 2 : ketik teks + kue
       --------------------------------------------------------- */
    function startTyping() {
        const out = $('#typedText');
        const nextBtn = $('#toMenuBtn');
        clearTimeout(typingTimer);
        out.textContent = '';
        nextBtn.classList.add('hidden');

        const full = CONFIG.greetingLines.join('\n');
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        let i = 0;

        const step = () => {
            out.textContent = full.slice(0, i);
            out.appendChild(cursor);
            if (i < full.length) {
                const ch = full[i - 1];
                i++;
                typingTimer = setTimeout(step, ch === '\n' ? CONFIG.typingSpeed * 7 : CONFIG.typingSpeed);
            } else {
                nextBtn.classList.remove('hidden');
            }
        };
        step();
    }

    const cake = $('#cake');
    const cakeHint = $('#cakeHint');
    function toggleCandles() {
        const blown = cake.classList.toggle('blown');
        if (blown) {
            cakeHint.textContent = ' cemugaaa semua doa baikk yumnaa terkabul, cemugaaa sayang kaka selalu tanpa batas HWHEHEH, SEHATTT AND HAPPYY SELALUUU PACALLKAKAA 🤍';
            const r = cake.getBoundingClientRect();
            confetti(110, { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top) / window.innerHeight });
        } else {
            cakeHint.textContent = '✨ klik kuenya buat tiup lilin ✨';
        }
    }
    cake.addEventListener('click', toggleCandles);
    cake.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCandles(); } });

    /* ---------------------------------------------------------
       Album + lightbox
       --------------------------------------------------------- */
    function placeholder(i, label) {
        const svg =
            `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
               <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                 <stop offset="0" stop-color="#ffd0df"/><stop offset="1" stop-color="#d3b4a2"/>
               </linearGradient></defs>
               <rect width="400" height="400" fill="url(#g)"/>
               <text x="200" y="215" font-size="120" text-anchor="middle" fill="#e76a97">♥</text>
               <text x="200" y="300" font-size="26" text-anchor="middle" fill="#6e4a39" font-family="sans-serif">${label || 'Foto ' + (i + 1)}</text>
             </svg>`;
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    const album = $('#album');
    CONFIG.photos.forEach((ph, i) => {
        const fig = document.createElement('div');
        fig.className = 'polaroid';
        fig.style.setProperty('--tilt', (i % 2 ? 1 : -1) * rand(1, 3.5) + 'deg');
        fig.style.animationDelay = (i * 0.07) + 's';
        const img = document.createElement('img');
        img.src = ph.src;
        img.alt = ph.caption || 'Foto ' + (i + 1);
        img.loading = 'lazy';
        img.addEventListener('error', () => { img.src = placeholder(i, ph.caption); }, { once: true });
        fig.appendChild(img);
        fig.addEventListener('click', () => openLightbox(i));
        album.appendChild(fig);
    });

    const lb = $('#lightbox');
    const lbImg = $('#lbImg');
    const lbCap = $('#lbCap');
    let lbIndex = 0;

    function renderLightbox() {
        const ph = CONFIG.photos[lbIndex];
        lbImg.onerror = () => { lbImg.onerror = null; lbImg.src = placeholder(lbIndex, ph.caption); };
        lbImg.src = ph.src;
        lbImg.alt = ph.caption || '';
        lbCap.textContent = ph.caption || '';
    }
    function openLightbox(i) { lbIndex = i; renderLightbox(); lb.classList.remove('hidden'); }
    function closeLightbox() { lb.classList.add('hidden'); }
    function stepLightbox(d) { lbIndex = (lbIndex + d + CONFIG.photos.length) % CONFIG.photos.length; renderLightbox(); }

    $('#lbClose').addEventListener('click', closeLightbox);
    $('#lbPrev').addEventListener('click', () => stepLightbox(-1));
    $('#lbNext').addEventListener('click', () => stepLightbox(1));
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', e => {
        if (lb.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') stepLightbox(-1);
        if (e.key === 'ArrowRight') stepLightbox(1);
    });

    /* ---------------------------------------------------------
       Kata-kata indah (amplop + kartu surat)
       --------------------------------------------------------- */
    const envelope = $('#envelope');
    const lettersBox = $('#letters');
    const track = $('#letterTrack');
    const dotsBox = $('#letterDots');
    let letterIndex = 0;

    CONFIG.letters.forEach((l, i) => {
        const card = document.createElement('article');
        card.className = 'letter';
        l.text.split('\n').forEach((line, idx, arr) => {
            card.appendChild(document.createTextNode(line));
            if (idx < arr.length - 1) card.appendChild(document.createElement('br'));
        });
        if (l.sign) {
            const s = document.createElement('span');
            s.className = 'sign';
            s.textContent = l.sign;
            card.appendChild(s);
        }
        track.appendChild(card);

        const d = document.createElement('i');
        dotsBox.appendChild(d);
    });

    function showLetter(i) {
        const cards = $$('.letter', track);
        const dots = $$('i', dotsBox);
        letterIndex = (i + cards.length) % cards.length;
        cards.forEach((c, idx) => {
            c.classList.toggle('active', idx === letterIndex);
            c.classList.toggle('past', idx < letterIndex);
        });
        dots.forEach((d, idx) => d.classList.toggle('on', idx === letterIndex));
        // sesuaikan tinggi area agar kartu tidak terpotong
        const h = cards[letterIndex].offsetHeight;
        track.style.minHeight = Math.max(300, h + 24) + 'px';
    }

    function resetLetters() {
        envelope.classList.remove('open');
        envelope.classList.remove('hidden');
        lettersBox.classList.add('hidden');
        letterIndex = 0;
    }

    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        const r = envelope.getBoundingClientRect();
        clickBurst(r.left + r.width / 2, r.top + r.height / 2, 14);
        setTimeout(() => {
            envelope.classList.add('hidden');
            lettersBox.classList.remove('hidden');
            showLetter(0);
        }, 650);
    });
    $('#prevLetter').addEventListener('click', () => showLetter(letterIndex - 1));
    $('#nextLetter').addEventListener('click', () => showLetter(letterIndex + 1));

    // geser (swipe) di HP
    let touchX = null;
    track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) showLetter(letterIndex + (dx < 0 ? 1 : -1));
        touchX = null;
    });

    /* ---------------------------------------------------------
       Video: jeda musik saat video diputar
       --------------------------------------------------------- */
    const video = $('#momentVideo');
    const videoMissing = $('#videoMissing');
    let musicWasPlaying = false;

    function pauseVideo() { if (video && !video.paused) video.pause(); }

    video.addEventListener('play', () => {
        musicWasPlaying = !bgm.paused;
        if (musicWasPlaying) bgm.pause();
    });
    const resumeMusic = () => { if (musicWasPlaying && musicWanted) { playMusic(); musicWasPlaying = false; } };
    video.addEventListener('pause', resumeMusic);
    video.addEventListener('ended', resumeMusic);

    $('source', video).addEventListener('error', () => {
        video.classList.add('hidden');
        videoMissing.classList.remove('hidden');
    });

    /* ---------------------------------------------------------
       Penutup: putar ulang
       --------------------------------------------------------- */
    $('#replayBtn').addEventListener('click', () => {
        visited.clear();
        $$('.menu-item').forEach(m => m.classList.remove('visited'));
        cake.classList.remove('blown');
        cakeHint.textContent = '✨ klik kuenya buat tiup lilin ✨';
        showPage('start');
    });

    /* ---------------------------------------------------------
       Init
       --------------------------------------------------------- */
    buildBunting();
    resizeCanvas();
    window.addEventListener('resize', () => { buildBunting(); resizeCanvas(); });

    for (let i = 0; i < 8; i++) setTimeout(spawnFloater, i * 350);
    setInterval(spawnFloater, 900);
})();
