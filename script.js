document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const appLogo = document.getElementById('app-logo');
    const footerLogo = document.getElementById('footer-logo');
    const icon = themeToggle.querySelector('i');

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeUI(newTheme);
    });

    function updateThemeUI(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            if (appLogo) appLogo.src = 'teravox_logo_v3.png';
            if (footerLogo) footerLogo.src = 'teravox_logo_v3.png';
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            if (appLogo) appLogo.src = 'teravox_logo_light.png';
            if (footerLogo) footerLogo.src = 'teravox_logo_light.png';
        }
    }

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const menuIcon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const menuIcon = mobileBtn.querySelector('i');
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll Animations using CSS classes
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Observe all elements with animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
        // Stagger cards within grids
        const parent = el.parentElement;
        if (parent && (parent.classList.contains('services-grid') || parent.classList.contains('testimonials-grid'))) {
            const siblings = Array.from(parent.querySelectorAll('.animate-on-scroll'));
            const index = siblings.indexOf(el);
            el.style.transitionDelay = `${index * 0.08}s`;
        }
        observer.observe(el);
    });

    // Also animate hero content immediately (it's above fold)
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('animate-on-scroll');
        setTimeout(() => heroContent.classList.add('visible'), 100);
    }
});
