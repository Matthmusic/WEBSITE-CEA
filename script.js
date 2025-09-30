// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.querySelector('.theme-toggle');
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Update icon based on current theme
        this.updateThemeIcon();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        this.updateThemeIcon();
        this.updateLogos();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);

        // Add animation class to the toggle buttons
        this.themeToggle.classList.add('animating');
        this.themeToggle.addEventListener('animationend', () => this.themeToggle.classList.remove('animating'), { once: true });

        // Badge changement de thème
        if (window.badgeManager) {
            window.badgeManager.earnBadge('theme-switcher');
        }
    }

    updateThemeIcon() {
        const icon = this.themeToggle.querySelector('i');
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }

    updateLogos() {
        const navLogo = document.getElementById('navLogo');
        const footerLogo = document.getElementById('footerLogo');

        if (this.currentTheme === 'dark') {
            // Mode sombre : utiliser CEAHB.svg
            if (navLogo) navLogo.src = 'ico/CEAHB.svg';
            if (footerLogo) footerLogo.src = 'ico/CEAHB.svg';
        } else {
            // Mode clair : utiliser CEAHN.svg
            if (navLogo) navLogo.src = 'ico/CEAHN.svg';
            if (footerLogo) footerLogo.src = 'ico/CEAHN.svg';
        }
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('#nav-menu-list'); // Cible le menu unique
        this.navLinks = document.querySelectorAll('.nav-link'); // Cible tous les liens
        this.init();
    }

    init() {
        // Hamburger menu toggle
        this.hamburger.addEventListener('click', () => this.toggleMobileMenu());

        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Navbar scroll effect
        window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 100));

        // Smooth scrolling for navigation links
        this.setupSmoothScrolling();
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        const isExpanded = this.navMenu.classList.contains('active');
        this.hamburger.setAttribute('aria-expanded', isExpanded);
    }

    closeMobileMenu() {
        if (this.navMenu.classList.contains('active')) {
            this.navMenu.classList.remove('active');
            this.hamburger.classList.remove('active');
            this.hamburger.setAttribute('aria-expanded', 'false');
        }
    }

    handleOutsideClick(e) {
        // Vérifie si le menu est ouvert
        if (!this.navMenu.classList.contains('active')) {
            return;
        }

        // Vérifie si le clic est à l'extérieur du menu et du hamburger
        const isClickInsideMenu = this.navMenu.contains(e.target);
        const isClickOnHamburger = this.hamburger.contains(e.target);

        if (!isClickInsideMenu && !isClickOnHamburger) {
            this.closeMobileMenu();
        }
    }

    handleScroll() {
        // Update active nav link based on scroll position
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Animation Management
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupFloatingCardAnimations();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Add animation class to elements
        const animatedElements = document.querySelectorAll('.service-card, .team-member, .project-card, .client-category, .stat-item');
        animatedElements.forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = +element.getAttribute('data-count');
        const duration = 2000; // Durée de l'animation en ms
        let start = null;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);

            // Applique une fonction d'easing (ease-out) pour un effet plus doux
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easedProgress * target);

            element.textContent = currentValue;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = target; // Assure que la valeur finale est exacte
            }
        };
        window.requestAnimationFrame(step);
    }

    setupFloatingCardAnimations() {
        // L'animation est maintenant entièrement gérée par le CSS.
        // Plus besoin de code JavaScript pour cette partie.
    }

}

// Contact Form Management
class ContactFormManager {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupFormValidation();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const inputs = this.form.querySelectorAll('input, textarea');
        let isFormValid = true;
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) return;

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(this.form);
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();

            if (response.ok) {
                this.showSuccessMessage();
                this.form.reset();
                // Effacer les messages d'erreur des champs après succès
                inputs.forEach(input => this.clearFieldError(input));
            } else {
                // Affiche l'erreur renvoyée par le serveur PHP
                this.showErrorMessage(result.message || 'Une erreur serveur est survenue.');
            }

        } catch (error) {
            console.error('Erreur lors de l\'envoi du formulaire:', error);
            this.showErrorMessage('Impossible de contacter le serveur. Veuillez réessayer.');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        // Validation rules
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Ce champ est requis';
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Veuillez entrer une adresse email valide';
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.closest('.form-group').classList.add('has-error');

        // Create error message element
        const errorEl = document.createElement('div');
        errorEl.className = 'field-error';
        errorEl.textContent = message;

        field.parentNode.appendChild(errorEl);
    }

    clearFieldError(field) {
        field.closest('.form-group').classList.remove('has-error');
        const errorEl = field.parentNode.querySelector('.field-error');
        if (errorEl) {
            errorEl.remove();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showSuccessMessage() {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
        `;

        this.form.insertBefore(successDiv, this.form.firstChild);

        // Lancer les confettis
        this.launchConfetti();

        // Badge envoi formulaire
        if (window.badgeManager) {
            window.badgeManager.earnBadge('form-sender');
        }

        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    showErrorMessage(message = 'Une erreur est survenue. Veuillez réessayer.') {
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            ${message}
        `;

        this.form.insertBefore(errorDiv, this.form.firstChild);

        // Remove error message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    launchConfetti() {
        const colors = ['#ff914d', '#ff751f', '#7a2f00', '#00ff00', '#74b9ff'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                this.createConfetti(colors);
            }, i * 30);
        }
    }

    createConfetti(colors) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        // Position aléatoire en haut de l'écran
        const startX = Math.random() * window.innerWidth;
        const endX = startX + (Math.random() - 0.5) * 200;
        const rotation = Math.random() * 360;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        const duration = Math.random() * 2 + 2;

        confetti.style.left = startX + 'px';
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.backgroundColor = color;
        confetti.style.setProperty('--end-x', endX + 'px');
        confetti.style.setProperty('--rotation', rotation + 'deg');
        confetti.style.setProperty('--duration', duration + 's');

        document.body.appendChild(confetti);

        // Retirer le confetti après l'animation
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Utility Functions
class Utils {
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    static getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Page Performance Management
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.setupLazyLoading();
        this.handleImageErrors();
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" for better performance
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyElements = document.querySelectorAll('[data-src]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyElements.forEach(img => imageObserver.observe(img));
        }
    }

    handleImageErrors() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', () => {
                // Ajoute une classe à l'image pour la masquer via CSS
                img.classList.add('img-error');
                console.warn(`Image non trouvée, affichage du placeholder : ${img.src}`);
            });
        });
    }
}

// Mode AutoCAD
class AutoCADManager {
    constructor() {
        this.isActive = localStorage.getItem('autocad-mode') === 'true';
        this.cursor = null;
        this.clickSound = new Audio('sounds/autocad-click.mp3'); // Chemin vers votre fichier son
        this.konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.konamiIndex = 0;
        this.secretClicks = 0;
        this.init();
    }

    init() {
        // Ajouter le toggle
        this.addToggle();

        // Appliquer l'état initial
        if (this.isActive) {
            this.enableAutoCADMode();
        }

        // Easter eggs
        this.initEasterEggs();
    }

    initEasterEggs() {
        // Konami Code pour activer mode AutoCAD
        document.addEventListener('keydown', (e) => {
            if (e.key === this.konami[this.konamiIndex]) {
                this.konamiIndex++;
                if (this.konamiIndex === this.konami.length) {
                    this.activateKonamiEasterEgg();
                    this.konamiIndex = 0;
                }
            } else {
                this.konamiIndex = 0;
            }
        });

        // Triple-clic sur le logo
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.addEventListener('click', () => {
                this.secretClicks++;
                if (this.secretClicks === 3) {
                    this.activateLogoEasterEgg();
                    this.secretClicks = 0;
                }
                setTimeout(() => { this.secretClicks = 0; }, 2000);
            });
        }

        // Clic long sur le bouton AutoCAD (2s)
        const autocadBtn = document.querySelector('.autocad-toggle');
        if (autocadBtn) {
            let pressTimer;
            let progressRing;

            autocadBtn.addEventListener('mousedown', (e) => {
                // Créer l'anneau de progression
                progressRing = document.createElement('div');
                progressRing.className = 'long-press-ring';
                autocadBtn.appendChild(progressRing);

                // Animer l'anneau
                setTimeout(() => progressRing.classList.add('active'), 10);

                pressTimer = setTimeout(() => {
                    this.activateLongPressEasterEgg();
                    if (progressRing) progressRing.remove();
                }, 2000);
            });

            autocadBtn.addEventListener('mouseup', () => {
                clearTimeout(pressTimer);
                if (progressRing) {
                    progressRing.remove();
                    progressRing = null;
                }
            });

            autocadBtn.addEventListener('mouseleave', () => {
                clearTimeout(pressTimer);
                if (progressRing) {
                    progressRing.remove();
                    progressRing = null;
                }
            });
        }
    }

    activateKonamiEasterEgg() {
        // Active le mode AutoCAD avec effet spécial SANS toggle normal
        // Juste activer le mode directement
        if (!this.isActive) {
            this.isActive = true;
            localStorage.setItem('autocad-mode', 'true');
            document.documentElement.setAttribute('data-autocad', 'true');

            // Créer le curseur manuellement si pas déjà fait
            if (!this.cursor) {
                this.createCursor();
            }

            // Badge découverte mode CAD
            if (window.badgeManager) {
                window.badgeManager.earnBadge('cad-discoverer');
            }
        }

        this.showEasterEggMessage('🎮 Konami Code activé ! Mode AutoCAD ON');
        this.createMatrixRain();

        // Badge Konami
        if (window.badgeManager) {
            window.badgeManager.earnBadge('konami-master');
        }

        console.log('🎮 Konami Mode AutoCAD activé');
    }

    activateLogoEasterEgg() {
        // Fait tourner tous les logos
        this.showEasterEggMessage('🔄 Logos en folie !');
        const logos = document.querySelectorAll('.logo, .footer-logo');
        logos.forEach(logo => {
            logo.style.animation = 'spin-crazy 2s ease-in-out';
        });
    }

    activateLongPressEasterEgg() {
        // Message secret des fondateurs
        this.showEasterEggMessage('⚡ "La tension monte, l\'intensité aussi !" - Les fondateurs de CEA', 5000);
        this.createElectricSparks();

        // Effet flash éclair
        this.createLightningFlash();
    }

    createLightningFlash() {
        const flash = document.createElement('div');
        flash.className = 'lightning-flash';
        document.body.appendChild(flash);

        setTimeout(() => flash.classList.add('active'), 10);
        setTimeout(() => {
            flash.classList.remove('active');
            setTimeout(() => flash.remove(), 500);
        }, 200);
    }

    showEasterEggMessage(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'easter-egg-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    createMatrixRain() {
        const chars = '01CEA⚡HTA HTB';
        for (let i = 0; i < 30; i++) {
            const drop = document.createElement('div');
            drop.className = 'matrix-drop';
            drop.textContent = chars[Math.floor(Math.random() * chars.length)];
            drop.style.left = Math.random() * 100 + '%';
            drop.style.animationDuration = (Math.random() * 2 + 1) + 's';
            document.body.appendChild(drop);

            setTimeout(() => drop.remove(), 3000);
        }
    }

    createElectricSparks() {
        // Créer des éclairs pendant 3 secondes
        const duration = 3000;
        const interval = 100;
        const sparksPerWave = 5;

        const createWave = () => {
            for (let i = 0; i < sparksPerWave; i++) {
                const spark = document.createElement('div');
                spark.className = 'electric-spark';
                spark.style.left = Math.random() * 100 + '%';
                spark.style.top = Math.random() * 100 + '%';
                spark.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
                document.body.appendChild(spark);

                setTimeout(() => spark.remove(), 1000);
            }
        };

        let elapsed = 0;
        const sparkInterval = setInterval(() => {
            createWave();
            elapsed += interval;
            if (elapsed >= duration) {
                clearInterval(sparkInterval);
            }
        }, interval);
    }

    addToggle() {
        const toggle = document.querySelector('.autocad-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleMode());
        }
    }

    toggleMode() {
        // Joue le son du clic
        this.clickSound.currentTime = 0; // Rembobine le son au début (utile si on clique vite)
        this.clickSound.play();

        this.isActive = !this.isActive;
        localStorage.setItem('autocad-mode', this.isActive);

        if (this.isActive) {
            this.enableAutoCADMode();
        } else {
            this.disableAutoCADMode();
        }
    }

    enableAutoCADMode() {
        document.documentElement.setAttribute('data-autocad', 'true');
        this.createCursor();
        console.log('🎯 Mode AutoCAD activé');

        // Badge découverte mode CAD
        if (window.badgeManager) {
            window.badgeManager.earnBadge('cad-discoverer');
        }
    }

    disableAutoCADMode() {
        document.documentElement.removeAttribute('data-autocad');
        this.removeCursor();
        console.log('✨ Mode AutoCAD désactivé');
    }

    createCursor() {
        if (this.cursor) return;

        // Créer le conteneur de curseur
        const cursorContainer = document.createElement('div');
        cursorContainer.id = 'autocad-cursor';

        // Ligne horizontale
        const horizontal = document.createElement('div');
        horizontal.className = 'crosshair-horizontal';

        // Ligne verticale
        const vertical = document.createElement('div');
        vertical.className = 'crosshair-vertical';

        // Carré central
        const center = document.createElement('div');
        center.className = 'crosshair-center';

        cursorContainer.appendChild(horizontal);
        cursorContainer.appendChild(vertical);
        cursorContainer.appendChild(center);
        document.body.appendChild(cursorContainer);

        this.cursor = { container: cursorContainer, horizontal, vertical, center };
        this.bindCursorEvents();
    }

    removeCursor() {
        if (this.cursor) {
            this.cursor.container.remove();
            this.cursor = null;
        }
    }

    bindCursorEvents() {
        if (!this.cursor) return;

        document.addEventListener('mousemove', (e) => {
            if (!this.isActive) return;

            this.cursor.horizontal.style.top = `${e.clientY}px`;
            this.cursor.vertical.style.left = `${e.clientX}px`;
            this.cursor.center.style.top = `${e.clientY - 5.5}px`;
            this.cursor.center.style.left = `${e.clientX - 5.5}px`;
        });
    }
}

// Gallery Management
class GalleryManager {
    constructor() {
        this.modal = document.getElementById('gallery-modal');
        if (!this.modal) return;

        this.modalImg = document.getElementById('gallery-image');
        this.closeBtn = this.modal.querySelector('.gallery-close');
        this.prevBtn = this.modal.querySelector('.gallery-prev');
        this.nextBtn = this.modal.querySelector('.gallery-next');
        this.counter = document.getElementById('gallery-counter');

        this.galleryImages = [];
        this.currentIndex = 0;

        this.init();
    }

    init() {
        const projectCards = document.querySelectorAll('.project-card[data-gallery]');
        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Évite d'ouvrir la galerie si on clique sur un lien ou bouton
                if (e.target.closest('a, button')) return;

                const galleryData = card.getAttribute('data-gallery');
                if (!galleryData) {
                    console.warn('Aucune donnée de galerie trouvée pour cette carte');
                    this.showError(card, 'Galerie non disponible');
                    return;
                }

                try {
                    this.galleryImages = JSON.parse(galleryData.replace(/'/g, '"'));

                    // Vérification de la validité des images
                    if (!Array.isArray(this.galleryImages) || this.galleryImages.length === 0) {
                        throw new Error('Aucune image dans la galerie');
                    }

                    // Précharger la première image avant d'ouvrir
                    this.preloadImage(this.galleryImages[0])
                        .then(() => this.open(0))
                        .catch(err => {
                            console.error('Erreur de chargement de l\'image:', err);
                            this.showError(card, 'Image non disponible');
                        });

                } catch (e) {
                    console.error("Erreur lors de l'analyse des données de la galerie :", e);
                    this.showError(card, 'Erreur de chargement de la galerie');
                }
            });
        });

        this.closeBtn.addEventListener('click', () => this.close());
        this.prevBtn.addEventListener('click', () => this.showPrev());
        this.nextBtn.addEventListener('click', () => this.showNext());

        // Navigation clavier
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('visible')) return;

            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.showPrev();
            if (e.key === 'ArrowRight') this.showNext();
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }

    open(index) {
        this.currentIndex = index;
        this.updateImage();
        this.modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('visible');
        document.body.style.overflow = 'auto';
    }

    showPrev() {
        this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.galleryImages.length - 1;
        this.updateImage();
    }

    showNext() {
        this.currentIndex = (this.currentIndex < this.galleryImages.length - 1) ? this.currentIndex + 1 : 0;
        this.updateImage();
    }

    updateImage() {
        const newSrc = this.galleryImages[this.currentIndex];

        // Afficher un loader pendant le chargement
        this.showLoader();

        this.preloadImage(newSrc)
            .then(() => {
                this.modalImg.src = newSrc;
                this.hideLoader();
                this.counter.textContent = `${this.currentIndex + 1} / ${this.galleryImages.length}`;
            })
            .catch(err => {
                console.error('Erreur de chargement de l\'image:', err);
                this.hideLoader();
                this.modalImg.alt = 'Image non disponible';
                this.counter.textContent = `Image ${this.currentIndex + 1} non disponible`;
            });
    }

    preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Impossible de charger: ${src}`));
            img.src = src;
        });
    }

    showLoader() {
        if (!this.loader) {
            this.loader = document.createElement('div');
            this.loader.className = 'gallery-loader';
            this.loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            this.modal.querySelector('.gallery-content').appendChild(this.loader);
        }
        this.loader.style.display = 'flex';
    }

    hideLoader() {
        if (this.loader) {
            this.loader.style.display = 'none';
        }
    }

    showError(card, message) {
        const errorEl = document.createElement('div');
        errorEl.className = 'gallery-error-toast';
        errorEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        card.appendChild(errorEl);

        setTimeout(() => {
            errorEl.classList.add('show');
        }, 10);

        setTimeout(() => {
            errorEl.classList.remove('show');
            setTimeout(() => errorEl.remove(), 300);
        }, 3000);
    }
}

// Badge System
class BadgeManager {
    constructor() {
        this.badges = {
            'first-visit': {
                name: 'Première Visite',
                icon: '🎉',
                description: 'Bienvenue sur CEA Ingénierie !',
                earned: false
            },
            'cad-discoverer': {
                name: 'Découvreur CAD',
                icon: '📐',
                description: 'Vous avez découvert le mode AutoCAD !',
                earned: false
            },
            'theme-switcher': {
                name: 'Caméléon',
                icon: '🌓',
                description: 'Vous aimez changer de thème !',
                earned: false
            },
            'konami-master': {
                name: 'Maître Konami',
                icon: '🎮',
                description: 'Code Konami activé !',
                earned: false
            },
            'form-sender': {
                name: 'Communicateur',
                icon: '📧',
                description: 'Message envoyé avec succès !',
                earned: false
            }
        };

        this.loadBadges();
        this.init();
    }

    init() {
        // Badge première visite
        if (!this.badges['first-visit'].earned) {
            setTimeout(() => {
                this.earnBadge('first-visit');
            }, 2000);
        }

        // Créer le panneau de badges
        this.createBadgePanel();
    }

    loadBadges() {
        const saved = localStorage.getItem('cea-badges');
        if (saved) {
            const savedBadges = JSON.parse(saved);
            Object.keys(savedBadges).forEach(key => {
                if (this.badges[key]) {
                    this.badges[key].earned = savedBadges[key].earned;
                }
            });
        }
    }

    saveBadges() {
        localStorage.setItem('cea-badges', JSON.stringify(this.badges));
    }

    earnBadge(badgeId) {
        if (!this.badges[badgeId] || this.badges[badgeId].earned) return;

        this.badges[badgeId].earned = true;
        this.saveBadges();
        this.showBadgeNotification(badgeId);
        this.updateBadgePanel();
    }

    showBadgeNotification(badgeId) {
        const badge = this.badges[badgeId];
        const notif = document.createElement('div');
        notif.className = 'badge-notification';
        notif.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-info">
                <div class="badge-name">Badge débloqué !</div>
                <div class="badge-desc">${badge.name}</div>
            </div>
        `;

        document.body.appendChild(notif);

        setTimeout(() => notif.classList.add('show'), 10);
        setTimeout(() => {
            notif.classList.remove('show');
            setTimeout(() => notif.remove(), 500);
        }, 4000);
    }

    createBadgePanel() {
        // Créer le bouton toggle
        const toggle = document.createElement('button');
        toggle.className = 'badge-toggle';
        toggle.title = 'Mes badges';
        toggle.innerHTML = `
            <i class="fas fa-trophy"></i>
            <span class="badge-count">${this.getEarnedCount()}</span>
        `;

        document.body.appendChild(toggle);

        // Créer le modal
        const modal = document.createElement('div');
        modal.className = 'badge-modal';
        modal.innerHTML = `
            <div class="badge-modal-overlay"></div>
            <div class="badge-modal-content">
                <div class="badge-modal-header">
                    <h3><i class="fas fa-trophy"></i> Mes Badges</h3>
                    <div class="badge-modal-actions">
                        <button class="badge-reset-btn" title="Réinitialiser les badges">
                            <i class="fas fa-redo"></i>
                        </button>
                        <button class="badge-modal-close" aria-label="Fermer">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="badge-list"></div>
            </div>
        `;

        document.body.appendChild(modal);

        const overlay = modal.querySelector('.badge-modal-overlay');
        const closeBtn = modal.querySelector('.badge-modal-close');
        const resetBtn = modal.querySelector('.badge-reset-btn');

        // Ouvrir le modal
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            this.updateBadgePanel();
        });

        // Fermer le modal
        const closeModal = () => {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        // Réinitialiser les badges
        resetBtn.addEventListener('click', () => {
            if (confirm('Voulez-vous vraiment réinitialiser tous vos badges ?')) {
                Object.keys(this.badges).forEach(key => {
                    this.badges[key].earned = false;
                });
                this.saveBadges();
                this.updateBadgePanel();
            }
        });

        // Fermer avec Échap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) {
                closeModal();
            }
        });

        this.updateBadgePanel();
    }

    updateBadgePanel() {
        const list = document.querySelector('.badge-list');
        const count = document.querySelector('.badge-count');

        if (!list || !count) return;

        count.textContent = this.getEarnedCount();

        list.innerHTML = Object.keys(this.badges).map(key => {
            const badge = this.badges[key];
            return `
                <div class="badge-item ${badge.earned ? 'earned' : 'locked'}">
                    <div class="badge-icon-big">${badge.earned ? badge.icon : '🔒'}</div>
                    <div class="badge-name">${badge.name}</div>
                    <div class="badge-desc">${badge.earned ? badge.description : '???'}</div>
                </div>
            `;
        }).join('');
    }

    getEarnedCount() {
        return Object.values(this.badges).filter(b => b.earned).length;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    const themeManager = new ThemeManager();
    const navigationManager = new NavigationManager();
    const animationManager = new AnimationManager();
    const contactFormManager = new ContactFormManager();
    const performanceManager = new PerformanceManager();
    const autocadManager = new AutoCADManager();
    const galleryManager = new GalleryManager();
    const badgeManager = new BadgeManager();

    // Make badgeManager global for other classes
    window.badgeManager = badgeManager;

    // Initialize stats counter animation
    initializeStatsCounter();

    // Add additional interactive features
    initializeInteractiveFeatures();

    // Add scroll-to-top button
    addScrollToTopButton();

    console.log('🚀 CEA Ingénierie website loaded successfully!');
});

// Animated stats counter
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        if (isNaN(target)) return; // Skip if target is not a number

        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(stat => animateCounter(stat));
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.expertise-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function initializeInteractiveFeatures() {
    // Add hover effects to cards
    // Cet effet est maintenant géré par la pseudo-classe CSS :hover pour de meilleures performances.

    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

function addScrollToTopButton() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';

    document.body.appendChild(scrollTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', Utils.throttle(() => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, 100));

    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add floating call button
    const callBtn = document.createElement('a');
    callBtn.href = 'tel:+33493872517';
    callBtn.className = 'floating-call-btn';
    callBtn.innerHTML = '<i class="fas fa-phone"></i>';
    callBtn.setAttribute('aria-label', 'Appeler CEA Ingénierie');

    document.body.appendChild(callBtn);
}