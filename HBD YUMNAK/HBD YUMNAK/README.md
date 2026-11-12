# Website Ucapan Ulang Tahun 💗 (Pink & Mocha)

## Cara membuka
Klik dua kali `index.html` (atau buka lewat browser). Tidak perlu install apa pun.
Koneksi internet hanya dipakai untuk memuat font Google (kalau offline, font diganti otomatis).

## Struktur folder
```
birthday-website/
├── index.html
├── css/style.css
├── js/script.js        ← semua teks, foto, dan surat bisa diubah di bagian CONFIG
├── images/             ← taruh foto: foto1.jpg ... foto9.jpg
├── music/              ← taruh lagu: lagu.mp3
└── video/              ← taruh video: video.mp4
```

## Alur halaman
1. **Halaman 1** – tombol "klikk sayangg" (sekaligus memulai musik)
2. **Halaman 2** – "Happy Birthday" + kue yang bisa ditiup + teks diketik
3. **Halaman 3** – 3 tombol: Album Kenangan · Kata-Kata Indah · Momen Kita (masing-masing 1 halaman)
4. **Halaman 4** – penutup "Happy Birthday / Love you sayang" + confetti

## Cara mengganti isi
- **Foto**: taruh 9 foto di `images/` dengan nama `foto1.jpg` s/d `foto9.jpg`
  (atau ubah daftar `photos` di `js/script.js`, misalnya jadi `yomnas.jpg`).
  Kalau foto belum ada, tampil gambar pengganti berbentuk hati.
- **Video**: simpan sebagai `video/video.mp4`.
- **Musik**: simpan sebagai `music/lagu.mp3`. Musik otomatis berhenti sementara saat video diputar.
- **Teks / surat**: edit `CONFIG.greetingLines` dan `CONFIG.letters` di `js/script.js`.
- **Warna**: ubah variabel `--pink-*` dan `--mocha-*` di bagian atas `css/style.css`.

## Cara tampil online (opsional)
Upload seluruh folder ke hosting statis gratis seperti Netlify Drop, GitHub Pages, atau Vercel,
lalu bagikan link-nya ke pasangan kamu.
