// ========================================
// NAVIGATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle?.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle?.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // SMOOTH SCROLL
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const isMobile = window.innerWidth <= 768;
                const offset = isMobile ? 70 : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ========================================
    // EXAMPLES LIGHTBOX
    // ========================================

    const exampleCards = document.querySelectorAll('.example-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.querySelector('.lightbox-close');

    exampleCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('.example-image img');
            if (img && lightbox && lightboxImage) {
                lightboxImage.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // ========================================
    // ORDER FORM HANDLING
    // ========================================

    const orderForm = document.getElementById('orderForm');
    const orderSuccess = document.getElementById('orderSuccess');
    const phoneInput = document.getElementById('phone');
    const startDateInput = document.getElementById('startDate');


    // Phone formatting
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');

            if (value.startsWith('7')) {
                value = value.substring(1);
            } else if (value.startsWith('8')) {
                value = value.substring(1);
            }
            
            if (value.length > 0) {
                let formatted = '+7';
                if (value.length > 0) formatted += ' ' + value.substring(0, 3);
                if (value.length > 3) formatted += ' ' + value.substring(3, 6);
                if (value.length > 6) formatted += '-' + value.substring(6, 8);
                if (value.length > 8) formatted += '-' + value.substring(8, 10);
                e.target.value = formatted;
            }
        });
    }

    // Set minimum date for start date (today)
    if (startDateInput) {
        const today = new Date().toISOString().split('T')[0];
        startDateInput.setAttribute('min', today);
    }

    // Form submission
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate form
            const companyName = document.getElementById('companyName').value;
            const contactPerson = document.getElementById('contactPerson').value;
            const phone = document.getElementById('phone').value;
            const packageType = document.getElementById('package').value;
            const startDate = document.getElementById('startDate').value;

            if (!companyName || !contactPerson || !phone || !packageType || !startDate) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }

            // Phone validation
            const phoneDigits = phone.replace(/\D/g, '');
            if (phoneDigits.length !== 11) {
                alert('Пожалуйста, введите корректный номер телефона');
                return;
            }

            const formData = new FormData(orderForm);

            const response = fetch('https://formgrid.dev/api/f/m6vn4c9m', {
                method: 'POST',
                body: formData
            }).then((response) => {
                if (response.ok) {
                    // Simulate form submission
                    orderForm.style.display = 'none';
                    orderSuccess.style.display = 'block';

                    // Scroll to success message
                    orderSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    }

    // ========================================
    // SCROLL ANIMATIONS
    // ========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const animatedElements = document.querySelectorAll('.section-header, .spec-card, .pricing-card, .benefit-card, .requirement-card, .example-card, .stat-card, .about-text, .calculator-wrapper');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // ========================================
    // LED FACE INTERACTIONS
    // ========================================

    const ledFaces = document.querySelectorAll('.led-face');
    
    ledFaces.forEach(face => {
        face.addEventListener('mouseenter', () => {
            ledFaces.forEach(f => {
                if (f !== face) {
                    f.style.opacity = '0.4';
                }
            });
        });

        face.addEventListener('mouseleave', () => {
            ledFaces.forEach(f => {
                f.style.opacity = '1';
            });
        });
    });


    // ========================================
    // PERFORMANCE OPTIMIZATIONS
    // ========================================

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Scroll-dependent code here
                ticking = false;
            });
            ticking = true;
        }
    });
});