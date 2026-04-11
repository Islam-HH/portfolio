import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fontsource/red-rose/400.css';
import '@fontsource/sansation/700.css';
import '@fontsource/sarabun/500.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

window.addEventListener('load', () => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
});

const header = document.getElementById('header');
const wonderFlow = document.getElementById('wonderFlow');
const sizzle = document.getElementById('sizzle');
const wonderFlowEnlarged = document.getElementById('wonderFlowEnlarged');
const sizzleEnlarged = document.getElementById('sizzleEnlarged');
const main = document.getElementById('main');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileNavMenu = document.getElementById('mobile-nav-menu');


function headerScrolled (header) {
    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
}

function initProjectDisplay() {
    const setup = (trigger, enlarged) => {
        if (!trigger || !enlarged) return;
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            enlarged.classList.replace('d-none', 'd-flex');
            main.classList.add('blurred');
        });
    };

    setup(wonderFlow, wonderFlowEnlarged);
    setup(sizzle, sizzleEnlarged);

    // Handle close buttons inside the enlarged views
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const enlarged = btn.closest('.projectEnlarged');
            enlarged.classList.replace('d-flex', 'd-none');
            main.classList.remove('blurred');
        });
    });
}

function initMobileNav() {
    if (!mobileNavToggle || !mobileNavMenu) return;

    mobileNavToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mobileNavMenu.classList.contains('d-none')) {
            mobileNavMenu.classList.replace('d-none', 'd-flex');
            mobileNavToggle.classList.replace('bi-list', 'bi-x');
        } else {
            mobileNavMenu.classList.replace('d-flex', 'd-none');
            mobileNavToggle.classList.replace('bi-x', 'bi-list');
        }
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNavMenu.classList.replace('d-flex', 'd-none');
            mobileNavToggle.classList.replace('bi-x', 'bi-list');
        });
    });
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navbar .nav-link');

    const options = {
        root: null,
        rootMargin: '-25% 0px -25% 0px', // Triggers when section occupies the middle 50% of screen
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    const id = link.getAttribute('href').substring(1);
                    link.classList.toggle('active', id === entry.target.id);
                });
                }
        });
    }, options);

    sections.forEach(section => observer.observe(section));
}

window.addEventListener('load', () => {
    if (header) headerScrolled(header);
    initProjectDisplay();
    initMobileNav();
    initScrollSpy();
});

window.addEventListener('scroll', () => {
    if (header) headerScrolled(header);
});

// Detect clicks outside to close enlarged projects
window.addEventListener('click', (e) => {
    const activeProject = document.querySelector('.projectEnlarged.d-flex');
    if (activeProject && !activeProject.contains(e.target)) {
        activeProject.classList.replace('d-flex', 'd-none');
        main.classList.remove('blurred');
    }

    // Close mobile nav if clicked outside
    if (mobileNavMenu && mobileNavMenu.classList.contains('d-flex') && !mobileNavMenu.contains(e.target) && !mobileNavToggle.contains(e.target)) {
        mobileNavMenu.classList.replace('d-flex', 'd-none');
        mobileNavToggle.classList.replace('bi-x', 'bi-list');
    }
});
