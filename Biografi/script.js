document.addEventListener("DOMContentLoaded", function() {
    // 1. Logika agar Navbar berubah aktif otomatis saat di-scroll (Scrollspy)
    const sections = document.querySelectorAll("section.section-container");
    const navLinks = document.querySelectorAll(".navbar a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Deteksi jika bagian atas section sudah mencapai layar
            if (pageYOffset >= (sectionTop - 250)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });

    // 2. Animasi Intersection (Membuat elemen muncul perlahan dari bawah ke atas)
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active'); // Hapus komentar ini jika ingin animasi 1x saja
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
});