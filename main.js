// ===== SMOOTH SCROLL PARALLAX - EXACT YOUTUBE EFFECT =====

document.addEventListener('DOMContentLoaded', () => {

    // Elements
    const scrollProgress = document.querySelector('.scroll-progress');
    const nav = document.querySelector('.nav');
    const floatingElements = document.querySelectorAll('.float-item');
    const layers = document.querySelectorAll('.layer');
    const reveals = document.querySelectorAll('.reveal');
    const skillFills = document.querySelectorAll('.skill-fill');
    const statNumbers = document.querySelectorAll('.stat-number');

    // ===== SCROLL PROGRESS BAR =====
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }

    // ===== NAVIGATION SCROLL EFFECT =====
    function updateNav() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    // ===== PARALLAX EFFECT (SMOOTH SCROLL DOWN ANIMATION) =====
    function updateParallax() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        // Only apply parallax in hero section
        if (scrollY < viewportHeight * 1.5) {
            // Different speeds for each layer = depth effect
            layers[0].style.transform = `translateY(${scrollY * 0.1}px)`;
            layers[1].style.transform = `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0003})`;
            layers[2].style.transform = `translateY(${scrollY * 0.05}px)`;
            layers[3].style.transform = `translateY(${scrollY * 0.2}px)`;

            // Floating elements move at different speeds
            floatingElements.forEach((el, index) => {
                const speed = 0.1 + (index * 0.05);
                const rotation = scrollY * 0.02 * (index % 2 === 0 ? 1 : -1);
                el.style.transform = `translateY(${scrollY * speed}px) rotate(${rotation}deg)`;
            });
        }
    }

    // ===== REVEAL ON SCROLL (SCROLL DOWN ANIMATION) =====
    function revealOnScroll() {
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = window.innerHeight * 0.85;

            if (revealTop < revealPoint) {
                reveal.classList.add('active');
            }
        });
    }

    // ===== SKILL BARS ANIMATION =====
    function animateSkillBars() {
        skillFills.forEach(fill => {
            const parent = fill.closest('.skill-card');
            const rect = parent.getBoundingClientRect();

            if (rect.top < window.innerHeight * 0.9) {
                const level = fill.getAttribute('data-level');
                fill.style.width = level + '%';
            }
        });
    }

    // ===== COUNTER ANIMATION =====
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            countersAnimated = true;

            statNumbers.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
            });
        }
    }

    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== ACTIVE NAV LINK =====
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // ===== FORM HANDLING =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }

    // ===== SCROLL EVENT =====
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollProgress();
                updateNav();
                updateParallax();
                revealOnScroll();
                animateSkillBars();
                animateCounters();
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);

    // Initial calls
    onScroll();

    // ===== ADD STAGGER TO REVEALS =====
    const skillCards = document.querySelectorAll('.skill-card.reveal');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 0.1) + 's';
    });

    const projectCards = document.querySelectorAll('.project-card.reveal');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 0.15) + 's';
    });

    console.log('📊 Data Science Portfolio - Smooth Scroll Parallax Loaded!');
});
