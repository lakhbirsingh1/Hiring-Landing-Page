// custom.js

// -------------------- Swiper Initializations --------------------
document.addEventListener('DOMContentLoaded', () => {
    // Services Swiper
    const servicesSwiper = new Swiper(".services-swiper", {
        slidesPerView: 4,
        spaceBetween: 24,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        grabCursor: true,
        breakpoints: {
            1200: { slidesPerView: 4 },
            992: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            576: { slidesPerView: 1 },
        },
    });

    // Portfolio Swiper (continuous scroll)
    const experienceSwiper = new Swiper(".portfolio-swiper", {
        slidesPerView: 4,
        spaceBetween: 15,
        loop: true,
        speed: 30000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        grabCursor: true,
        freeMode: true,
    });

    // Reverse Direction Swiper
    const reverseSwiper = new Swiper(".reverse-swiper", {
        slidesPerView: 4,
        spaceBetween: 15,
        loop: true,
        speed: 30000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
        },
        grabCursor: true,
        freeMode: true,
    });

    // Testimonial Swiper
    const testimonialSwiper = new Swiper(".testimonial-swiper", {
        slidesPerView: 1,
        spaceBetween: 15,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 15 },
            992: { slidesPerView: 2, spaceBetween: 15 },
        },
    });
});

// -------------------- Navbar Scroll Effects --------------------
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('mainNavbar');
    const hero = document.getElementById('carouselExampleControls');
    const navbarCollapse = document.getElementById('navbarNav');
    let threshold = (hero ? hero.offsetHeight : 400) - 50;
    let scrollTimer;

    const logoLight = document.querySelector('.logo-light');
    const logoDark = document.querySelector('.logo-dark');

    function handleScroll() {
        const pastHero = window.scrollY > threshold;

        if (pastHero) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('nav-hidden');
            logoLight?.classList.add('d-none');
            logoDark?.classList.remove('d-none');
        } else {
            navbar.classList.remove('scrolled', 'nav-hidden');
            logoLight?.classList.remove('d-none');
            logoDark?.classList.add('d-none');
        }

        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            const dropdownOpen = document.querySelector('.dropdown.show') !== null;
            const collapseOpen = navbarCollapse && navbarCollapse.classList.contains('show');
            const hovering = navbar.matches(':hover');

            if (pastHero && !dropdownOpen && !collapseOpen && !hovering) {
                navbar.classList.add('nav-hidden');
            }
        }, 900);
    }

    navbar.addEventListener('mouseenter', () => navbar.classList.remove('nav-hidden'));
    navbar.addEventListener('mouseleave', () => {
        if (window.scrollY > threshold) {
            setTimeout(() => {
                if (!navbar.matches(':hover') && !document.querySelector('.dropdown.show') && !(navbarCollapse && navbarCollapse.classList.contains('show'))) {
                    navbar.classList.add('nav-hidden');
                }
            }, 600);
        }
    });

    if (navbarCollapse) {
        navbarCollapse.addEventListener('shown.bs.collapse', () => navbar.classList.remove('nav-hidden'));
        navbarCollapse.addEventListener('hidden.bs.collapse', () => {
            if (window.scrollY > threshold) setTimeout(() => navbar.classList.add('nav-hidden'), 700);
        });
    }

    document.querySelectorAll('.dropdown').forEach(dd => {
        dd.addEventListener('show.bs.dropdown', () => navbar.classList.remove('nav-hidden'));
        dd.addEventListener('hide.bs.dropdown', () => {
            if (window.scrollY > threshold) {
                setTimeout(() => {
                    if (!navbar.matches(':hover') && !(navbarCollapse && navbarCollapse.classList.contains('show'))) {
                        navbar.classList.add('nav-hidden');
                    }
                }, 500);
            }
        });
    });

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
        const newHero = document.getElementById('carouselExampleControls');
        if (newHero) threshold = newHero.offsetHeight - 50;
    });
});

// -------------------- Mobile Navbar Scroll --------------------
document.addEventListener("DOMContentLoaded", () => {
    const mobileNavbar = document.getElementById("mobileNavbar");
    const hero = document.querySelector(".hero") || document.getElementById("carouselExampleControls");
    let threshold = (hero ? hero.offsetHeight : 300) - 50;

    function updateNav() {
        if (window.scrollY > threshold) {
            mobileNavbar.classList.add("scrolled");
        } else {
            mobileNavbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNav);
    window.addEventListener("resize", () => {
        const newHero = document.querySelector(".hero") || document.getElementById("carouselExampleControls");
        threshold = (newHero ? newHero.offsetHeight : 300) - 50;
    });

    updateNav();


    const backToTopBtn = document.getElementById('backToTop');

    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // show after scrolling 300px
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
