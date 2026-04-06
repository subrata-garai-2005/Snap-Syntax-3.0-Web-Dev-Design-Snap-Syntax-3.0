
document.addEventListener('DOMContentLoaded', () => {
    const cursorGlow = document.getElementById('cursor-glow');
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;
        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();


    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        const scrollY = window.scrollY;


        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }


        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (scrollY >= sectionTop) {
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const menuToggle = document.getElementById('menu-toggle');
    const navLinksContainer = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('open');
        document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
    });

    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('open');
            document.body.style.overflow = '';
        });
    });


    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));


    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(element, target) {
        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const easeOut = t => 1 - Math.pow(1 - t, 4);

        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOut(progress);
            current = Math.floor(easedProgress * target);
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }


    function addTiltEffect(element, intensity = 15) {
        if (!element) return;

        const inner = element.querySelector('.tilt-card-inner') ||
            element.querySelector('.service-card-inner') ||
            element.querySelector('.portfolio-card-inner') ||
            element.querySelector('.testimonial-content');

        if (!inner) return;

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -intensity;
            const rotateY = ((x - centerX) / centerX) * intensity;

            inner.style.transform = `
                perspective(800px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.02, 1.02, 1.02)
            `;
        });

        element.addEventListener('mouseleave', () => {
            inner.style.transform = '';
            inner.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                inner.style.transition = '';
            }, 500);
        });

        element.addEventListener('mouseenter', () => {
            inner.style.transition = 'none';
        });
    }


    addTiltEffect(document.getElementById('about-card'), 12);


    document.querySelectorAll('.service-card').forEach(card => {
        addTiltEffect(card, 8);
    });


    document.querySelectorAll('.portfolio-card').forEach(card => {
        addTiltEffect(card, 6);
    });

    document.querySelectorAll('.testimonial-card').forEach(card => {
        addTiltEffect(card, 5);
    });

    const heroScene = document.getElementById('hero-scene');
    if (heroScene) {
        const cube = heroScene.querySelector('.cube');

        document.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const deltaX = (e.clientX - centerX) / centerX;
            const deltaY = (e.clientY - centerY) / centerY;

            if (cube) {
                const extraRotateX = deltaY * 15;
                const extraRotateY = deltaX * 15;
                cube.style.animationPlayState = 'paused';
                const currentAngle = (Date.now() / 1000 * (360 / 15)) % 360;
                cube.style.transform = `rotateX(${-20 + extraRotateX}deg) rotateY(${currentAngle + extraRotateY}deg)`;
            }
        });

        document.addEventListener('mouseleave', () => {
            if (cube) {
                cube.style.animationPlayState = 'running';
                cube.style.transform = '';
            }
        });
    }

    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 8;
            const xOffset = x * speed;
            const yOffset = y * speed;
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btnSpan = submitBtn.querySelector('span');
            const originalText = btnSpan.textContent;
            submitBtn.disabled = true;
            btnSpan.textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                btnSpan.textContent = '✓ Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                submitBtn.style.opacity = '1';

                // Reset after 3s
                setTimeout(() => {
                    btnSpan.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });

        contactForm.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('focus', function () {
                this.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', function () {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }

    document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
            btn.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                btn.style.transition = '';
            }, 400);
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'none';
        });
    });
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.25);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out forwards;
                pointer-events: none;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);


    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const lines = heroTitle.querySelectorAll('.title-line');
        lines.forEach((line, i) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(30px)';
            line.style.transition = `opacity 0.7s ease ${i * 0.15 + 0.3}s, transform 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.15 + 0.3}s`;
        });

        // Trigger after a small delay
        setTimeout(() => {
            lines.forEach(line => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            });
        }, 100);
    }
    const navCta = document.getElementById('nav-cta');
    if (navCta) {
        navCta.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }


    const badge = document.querySelector('.hero-badge');
    if (badge) {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(10px)';
        setTimeout(() => {
            badge.style.transition = 'all 0.6s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 200);
    }


    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.classList.add('visible');
            el.style.transition = 'none';
        });
    }


    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const btn = document.getElementById('form-submit');
        const originalBtnText = btn.innerHTML;
        btn.innerHTML = '<span>Sending...</span>';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        const serviceID = 'service_axd78kh';
        const templateID = 'template_99z0z6t';
        const templateParams = {
            to_name: "Admin",
            from_name: document.getElementById("name").value,
            from_email: document.getElementById("email").value,
            project_type: document.getElementById("project-type").value,
            message: document.getElementById("message").value,
            time: new Date().toLocaleString('en-IN')
        };

        emailjs.send(serviceID, templateID, templateParams)
            .then(() => {
                alert("Message Sent Successfully! 🚀");
                document.getElementById('contact-form').reset();
            })
            .catch((err) => {
                alert("Send failed... Please try again.");
                console.error("EmailJS Error:", err);
            })
            .finally(() => {
                // Restore Button
                btn.innerHTML = originalBtnText;
                btn.style.opacity = '1';
                btn.disabled = false;
            });
    });
});
