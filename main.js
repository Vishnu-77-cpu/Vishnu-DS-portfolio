// ===== SMOOTH SCROLL PARALLAX - EXACT YOUTUBE EFFECT =====

document.addEventListener('DOMContentLoaded', () => {

    // ===== LOADING SCREEN =====
    const loader = document.querySelector('.loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    });

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // ===== TYPING EFFECT =====
    const typingText = document.getElementById('typingText');
    const roles = ['Data Scientist', 'ML Engineer', 'Data Analyst'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    // Elements
    const scrollProgress = document.querySelector('.scroll-progress');
    const nav = document.querySelector('.nav');
    const floatingElements = document.querySelectorAll('.float-item');
    const layers = document.querySelectorAll('.layer');
    const reveals = document.querySelectorAll('.reveal');
    const skillFills = document.querySelectorAll('.skill-fill');

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

    // ===== REVEAL ON SCROLL (SCROLL UP AND DOWN) =====
    function revealOnScroll() {
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            const revealBottom = reveal.getBoundingClientRect().bottom;
            const revealPoint = window.innerHeight * 0.85;
            const hidePoint = 50; // Hide when element goes above viewport

            // Show when scrolling down into view
            if (revealTop < revealPoint && revealBottom > hidePoint) {
                reveal.classList.add('active');
            } else {
                // Hide when scrolling out of view (up or down)
                reveal.classList.remove('active');
            }
        });
    }

    // ===== SKILL BARS ANIMATION (REPEATING) =====
    function animateSkillBars() {
        skillFills.forEach(fill => {
            const parent = fill.closest('.skill-card');
            const rect = parent.getBoundingClientRect();

            if (rect.top < window.innerHeight * 0.9 && rect.bottom > 50) {
                const level = fill.getAttribute('data-level');
                fill.style.width = level + '%';
            } else {
                // Reset when out of view
                fill.style.width = '0%';
            }
        });
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
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        contactForm.reset();
                        submitBtn.innerHTML = '<span>✅ Message Sent!</span>';
                        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                        setTimeout(() => {
                            submitBtn.innerHTML = originalBtnText;
                            submitBtn.disabled = false;
                            submitBtn.style.background = '';
                        }, 3000);
                    } else {
                        throw new Error('Form submission failed');
                    }
                })
                .catch(error => {
                    console.error('Form error:', error);
                    submitBtn.innerHTML = '<span>❌ Failed to send</span>';
                    submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3000);
                });
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

    const certCards = document.querySelectorAll('.cert-card.reveal');
    certCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 0.1) + 's';
    });

    const blogCards = document.querySelectorAll('.blog-card.reveal');
    blogCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 0.1) + 's';
    });

    console.log('📊 Data Science Portfolio - All 10 Features Loaded!');
});
