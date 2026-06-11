/* =============================================
   SALON 360 — JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Progress Bar ---
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Mobile Menu ---
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;

    mobileToggle.addEventListener('click', () => {
        menuOpen = !menuOpen;
        mobileMenu.classList.toggle('active', menuOpen);
        const spans = mobileToggle.querySelectorAll('span');
        if (menuOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuOpen = false;
            mobileMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });

    // --- Open/Closed Status ---
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    if (statusDot && statusText) {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const time = hour + minute / 60;
        let isOpen = false;
        // Mon closed, Tue-Sat 9-19, Sun 10-17
        if (day >= 2 && day <= 6 && time >= 9 && time < 19) isOpen = true;
        if (day === 0 && time >= 10 && time < 17) isOpen = true;
        statusDot.classList.toggle('open', isOpen);
        statusDot.classList.toggle('closed', !isOpen);
        statusText.textContent = isOpen ? 'Open Now' : 'Closed';
    }

    // --- Back to Top ---
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 600);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    // --- Form Validation ---
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');

            // Clear previous errors
            contactForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

            if (!name.value.trim()) { name.classList.add('error'); valid = false; }
            if (!phone.value.trim() || phone.value.trim().length < 7) { phone.classList.add('error'); valid = false; }

            if (valid) {
                contactForm.style.display = 'none';
                formSuccess.classList.add('active');
            }
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
