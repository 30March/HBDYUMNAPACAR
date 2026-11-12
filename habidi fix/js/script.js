(() => {
    'use strict';
    const CONFIG = {
        greetingLines: [
            'aloOooww celamattt ulanggg tahunnn pacaarrkuu sayangggkuuuu cantikkkuu imopku gemashku cintakuuuuu duniakuuuuu.',
            'yeaaay udaa empat belass tahunnn niiee yaww!!!?? wishhh u all the best, semogaaa citaa citaaa yangg yumnak inginkann bisaaa terwujuddd yaaaw, panjang umull cehatttt celaluuuu anndd belbaktii kepadaaa oranggg tuaa (nurut sama ortu💕), aminnn.',
            'cemangatttt teyusss yaaaw sayang, jangannnnn pelnaaaa mEnyerAh untukkk mengejarrrr impiann WKEKWKW, kakaa celaluuu cemangatin andd supporttt yumnakk, timaciii cudaaaa selalo sabarrrr samaaa kakA, timacii ugaa udaaa selalo sayanggg kee kaka hwhehee.',
            'happyy teyus yaww sayang maaff hadiahnaa kecilkecilan WKWKWKWK cemuga tahun-tahun kedepan kaka selalo nemanin habidi yumnak yaw s e l a m a n y a, LOVEEE YOUU MOREE PACAARR SAYAANGG'
        ],
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
        letters: [
            { text: 'Kau sibuk menghitung batas pandangmu,\nsementara aku menghabiskan waktu\nmensyukuri caramu memandang dunia dengan tulus.\nBagiku kau adalah sebuah karya\nsemesta yang telah teramat sempurna\nuntuk dicintai dengan sisa napas yang aku punya.', sign: '- AufarL' },
            { text: 'walau gemerlapnya lampu kota diwaktu kini, kulihat tatap matamu tetap terang benderang, bagai sinar bintang yang berkelipan dihampanya langit malam. sayang, jikalau dalam kehidupan ini aku hanyalah rumput liar dibentangan sawah, sedangkan kau bintangnya.aku rela membayar jutaan teleskop hanya untuk memandangi indahnya gemerlap manis dirimu.', sign: '- AufarL' },
            { text: 'Diramainya politik pemilu kemarin kenapa kau tidak mencalonkan diri saja, sebab di hadapanmu Aku bukan lagi seorang oposisi melainkan rakyat yang menyerahkan seluruh kedaulatan nya untuk Kau jajah dengan kasih sayang yang absolut', sign: '- AufarL' },
            { text: 'Aku selalu suka cara langit membuat hujan, seperti Tuhan membuat senyummu untuk kudoakan. ​Turunnya tenang meresapi cakrawala, sama seperti caraku merapal namamu dalam diam. jika sang langit menjaga semesta dengan rintiknya, Maka kurawat nyala asmara alangkah terus mengaminkanmu.', sign: '- AufarL' },
            { text: '10 years 20, whenever your hair turned gray till your able to ride those waves alone', sign: '- Ride Your Wave' }
        ],
        typingSpeed: 65
    };

    const $  = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
    const rand = (min, max) => Math.random() * (max - min) + min;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const PINKS   = ['#f78fb3', '#ffb3cb', '#e76a97', '#ffd0df', '#f3a6b2'];
    const MOCHAS  = ['#a27863', '#bd9783', '#d6b8a8', '#895d48', '#b57264'];
    const PALETTE = PINKS.concat(MOCHAS);

    function spawnFloater() {
        if (document.hidden || reduceMotion) return;
        const box = $('#floaters');
        const roll = Math.random();
        const el = document.createElement('span');

        if (roll < 0.65) {                       
            el.className = 'heart-f';
            const symbols = ['♥', '❤', '✨', '🌸', '🧸'];
            el.textContent = symbols[Math.floor(rand(0, symbols.length))];
            el.style.left = rand(2, 96) + '%';
            el.style.fontSize = rand(16, 32) + 'px';
            el.style.setProperty('--sx', rand(-60, 60) + 'px');
            el.style.setProperty('--rot', rand(-40, 40) + 'deg');
            el.style.animationDuration = rand(7, 13) + 's';
        } else {                                 
            el.className = 'petal';
            const s = rand(10, 20);
            el.style.width = s + 'px';
            el.style.height = s + 'px';
            el.style.left = rand(0, 100) + '%';
            el.style.setProperty('--sx', rand(-80, 100) + 'px');
            el.style.setProperty('--rot', rand(300, 720) + 'deg');
            el.style.animationDuration = rand(8, 14) + 's';
        }
        box.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
    }

    function clickBurst(x, y, n = 8) {
        if (reduceMotion) return;
        for (let i = 0; i < n; i++) {
            const h = document.createElement('span');
            h.className = 'burst-heart';
            const symbols = ['♥', '✨', '🌸', '💖'];
            h.textContent = symbols[Math.floor(rand(0, symbols.length))];
            h.style.left = x + 'px';
            h.style.top = y + 'px';
            h.style.fontSize = rand(14, 26) + 'px';
            h.style.color = PINKS[Math.floor(rand(0, PINKS.length))];
            h.style.setProperty('--bx', rand(-80, 80) + 'px');
            h.style.setProperty('--by', rand(-100, -25) + 'px');
            document.body.appendChild(h);
            setTimeout(() => h.remove(), 950);
        }
    }

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

    function confetti(amount = 140, origin = { x: 0.5, y: 0.4 }) {
        if (reduceMotion) return;
        for (let i = 0; i < amount; i++) {
            const angle = rand(0, Math.PI * 2);
            const speed = rand(4, 13);
            particles.push({
                x: window.innerWidth * origin.x,
                y: window.innerHeight * origin.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 5,
                size: rand(8, 16),
                color: PALETTE[Math.floor(rand(0, PALETTE.length))],
                rot: rand(0, 360),
                vr: rand(-10, 10),
                shape: Math.random(),
                life: 0,
                max: rand(120, 200)
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
            if (p.shape < 0.4) {
                ctx.font = p.size * 1.6 + 'px serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('♥', 0, 0);
            } else if (p.shape < 0.7) {
                ctx.font = p.size * 1.5 + 'px serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('✨', 0, 0);
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

    const bgm = $('#bgm');
    const musicBtn = $('#musicBtn');
    let musicWanted = true; 
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
        if (p && p.catch) p.catch(() => {});
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

    document.addEventListener('click', e => {
        const t = e.target.closest('[data-go]');
        if (!t) return;
        if (t.dataset.go === 'greeting') playMusic(); 
        showPage(t.dataset.go);
    });

    document.addEventListener('pointerdown', e => clickBurst(e.clientX, e.clientY, 5));

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
            cakeHint.textContent = 'cemugaaa semua doa baikk yumnaa terkabul, cemugaaa sayang kaka selalu tanpa batas HWHEHEH, SEHATTT AND HAPPYY SELALUUU PACALLKAKAA 🤍';
            const r = cake.getBoundingClientRect();
            confetti(120, { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top) / window.innerHeight });
        } else {
            cakeHint.textContent = '✨ klik kuenya buat tiup lilin ✨';
        }
    }
    cake.addEventListener('click', toggleCandles);
    cake.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCandles(); } });

    function placeholder(i, label) {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd0df"/><stop offset="1" stop-color="#e8d0c4"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/><text x="200" y="215" font-size="120" text-anchor="middle" fill="#e76a97">♥</text><text x="200" y="300" font-size="26" text-anchor="middle" fill="#6f4735" font-family="sans-serif">${label || 'Foto ' + (i + 1)}</text></svg>`;
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    const album = $('#album');
    CONFIG.photos.forEach((ph, i) => {
        const fig = document.createElement('div');
        fig.className = 'polaroid';
        fig.style.setProperty('--tilt', (i % 2 ? 1 : -1) * rand(1, 4) + 'deg');
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
        const h = cards[letterIndex].offsetHeight;
        track.style.minHeight = Math.max(320, h + 24) + 'px';
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

    let touchX = null;
    track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) showLetter(letterIndex + (dx < 0 ? 1 : -1));
        touchX = null;
    });

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

    $('#replayBtn').addEventListener('click', () => {
        visited.clear();
        $$('.menu-item').forEach(m => m.classList.remove('visited'));
        cake.classList.remove('blown');
        cakeHint.textContent = '✨ klik kuenya buat tiup lilin ✨';
        showPage('start');
    });

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 0; i < 10; i++) setTimeout(spawnFloater, i * 280);
    setInterval(spawnFloater, 750);

    /* --- CUTE CURSOR TRAIL --- */
    let lastTrailTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrailTime < 50) return;
        lastTrailTime = now;
        
        const trail = document.createElement('div');
        const emotes = ['💖', '✨', '🧸', '🤎', '🌸', '💫'];
        trail.innerHTML = emotes[Math.floor(Math.random() * emotes.length)];
        trail.className = 'trail-heart';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 1200);
    });

})();