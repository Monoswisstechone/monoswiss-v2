document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Sticky Header on Scroll ---
    const nav = document.querySelector('.sticky-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- 2. Animate Number Counters on Scroll ---
    const animateCounter = (selector) => {
        const statNumbers = document.querySelectorAll(selector);
        statNumbers.forEach(number => {
            const target = +number.getAttribute('data-target');
            if (isNaN(target)) return;
            let start = 0;
            const duration = 2000;
            const stepTime = Math.max(1, Math.floor(duration / target));

            const timer = setInterval(() => {
                start += 1;
                number.textContent = start;
                if (start >= target) {
                    number.textContent = target;
                    clearInterval(timer);
                }
            }, stepTime);
        });
    };

    // --- 3. Intersection Observer for Animations & Active Nav Link ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let heroNumbersAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const targetElement = entry.target;

            if (entry.isIntersecting) {
                const id = targetElement.getAttribute('id');
                const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

                // Active Nav Link
                if (navLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }

                // Animate Sections
                if (targetElement.classList.contains('animated-section')) {
                    targetElement.classList.add('is-visible');
                }

                // Animate Hero Numbers
                if (targetElement.classList.contains('hero-stats') && !heroNumbersAnimated) {
                    // Only animate numbers, not badges/text symbols
                    animateCounter('.hero-stats .stat-number[data-target]');
                    heroNumbersAnimated = true;
                    observer.unobserve(targetElement);
                }
            }
        });
    }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    });

    // Observe sections for nav highlighting
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe stat container for number animation
    const statContainers = document.querySelectorAll('.hero-stats');
    statContainers.forEach(container => {
        observer.observe(container);
    });



    // --- 4. Mouse Move Parallax Effect ---
    const background = document.getElementById('hero-background');
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        const y = (clientY / window.innerHeight - 0.5) * 2; // -1 to 1

        background.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
    });

    // --- 5. Mobile Navigation (Basic Toggle) ---
    // Note: This only toggles a class for styling. A full implementation
    // would show/hide the navigation links.
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('mobile-nav-open');
            mobileNavToggle.setAttribute('aria-expanded', isOpen);
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('mobile-nav-open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Back to Top Button ---
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
});
