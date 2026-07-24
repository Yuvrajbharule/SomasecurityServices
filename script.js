"use strict";

/* =========================================================
   SOMA SECURITY SERVICES
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. HERO IMAGE SLIDER
    ===================================================== */

    const slides = document.querySelectorAll(".hero .slide");
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {

        if (!slides.length) return;

        slides.forEach((slide) => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

    function nextSlide() {

        if (!slides.length) return;

        currentSlide = (currentSlide + 1) % slides.length;

        showSlide(currentSlide);
    }

    function startSlider() {

        if (slides.length <= 1) return;

        slideInterval = setInterval(nextSlide, 5500);
    }

    if (slides.length) {

        showSlide(0);

        startSlider();

    }


    /* =====================================================
       2. MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");

            mainNav.classList.toggle("active");

            document.body.classList.toggle(
                "menu-open",
                mainNav.classList.contains("active")
            );

        });

    }


    /* =====================================================
       3. CLOSE MOBILE MENU AFTER LINK CLICK
    ===================================================== */

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (mainNav) {
                mainNav.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }

            document.body.classList.remove("menu-open");

        });

    });


    /* =====================================================
       4. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (!mainNav || !menuToggle) return;

        const clickedInsideNav =
            mainNav.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (
            mainNav.classList.contains("active") &&
            !clickedInsideNav &&
            !clickedMenuButton
        ) {

            mainNav.classList.remove("active");

            menuToggle.classList.remove("active");

            document.body.classList.remove("menu-open");

        }

    });


    /* =====================================================
       5. CLOSE MENU WITH ESC KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") return;

        if (mainNav) {
            mainNav.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");
        }

        document.body.classList.remove("menu-open");

    });


    /* =====================================================
       6. STICKY HEADER EFFECT
    ===================================================== */

    const header =
        document.querySelector(".main-header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       7. SMOOTH SCROLL
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((anchor) => {

        anchor.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {

                if (targetId === "#") {

                    event.preventDefault();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }

                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


    /* =====================================================
       8. ACTIVE NAVIGATION LINK ON SCROLL
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    function updateActiveNavigation() {

        if (!sections.length) return;

        const scrollPosition =
            window.scrollY + 180;

        let currentSection = "home";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                currentSection = sectionId;

            }

        });

        navLinks.forEach((link) => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       9. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {

                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px 0px"

                }

            );

        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       10. STAGGER ANIMATION
    ===================================================== */

    const staggerContainers = [

        ".services-grid",
        ".stats-grid",
        ".why-features",
        ".process-grid"

    ];

    staggerContainers.forEach(
        (selector) => {

            const container =
                document.querySelector(selector);

            if (!container) return;

            const revealChildren =
                container.querySelectorAll(
                    ".reveal"
                );

            revealChildren.forEach(
                (element, index) => {

                    element.style.transitionDelay =
                        `${index * 80}ms`;

                }
            );

        }
    );


    /* =====================================================
       11. WHATSAPP ENQUIRY FORM
    ===================================================== */

    const enquiryForm =
        document.getElementById(
            "enquiryForm"
        );

    if (enquiryForm) {

        enquiryForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const nameInput =
                    document.getElementById(
                        "name"
                    );

                const phoneInput =
                    document.getElementById(
                        "phone"
                    );

                const serviceInput =
                    document.getElementById(
                        "service"
                    );

                const messageInput =
                    document.getElementById(
                        "message"
                    );


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";

                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";

                const service =
                    serviceInput
                        ? serviceInput.value
                        : "";

                const message =
                    messageInput
                        ? messageInput.value.trim()
                        : "";


                /* -----------------------------
                   BASIC VALIDATION
                ----------------------------- */

                if (!name) {

                    showFormMessage(
                        "Please enter your name.",
                        "error"
                    );

                    nameInput?.focus();

                    return;

                }


                if (!phone) {

                    showFormMessage(
                        "Please enter your phone number.",
                        "error"
                    );

                    phoneInput?.focus();

                    return;

                }


                const cleanPhone =
                    phone.replace(/\D/g, "");


                if (
                    cleanPhone.length < 10
                ) {

                    showFormMessage(
                        "Please enter a valid phone number.",
                        "error"
                    );

                    phoneInput?.focus();

                    return;

                }


                if (!service) {

                    showFormMessage(
                        "Please select a security service.",
                        "error"
                    );

                    serviceInput?.focus();

                    return;

                }


                /* -----------------------------
                   CREATE WHATSAPP MESSAGE
                ----------------------------- */

                let whatsappMessage =

`Hello Soma Security Services,

I would like to enquire about your security services.

Name: ${name}
Phone: ${phone}
Service Required: ${service}`;

                if (message) {

                    whatsappMessage +=

`

Requirement Details:
${message}`;

                }

                whatsappMessage +=

`

Please contact me with more information.

Thank you.`;


                const businessNumber =
                    "919657914714";


                const whatsappURL =
                    `https://wa.me/${businessNumber}?text=${encodeURIComponent(
                        whatsappMessage
                    )}`;


                showFormMessage(
                    "Opening WhatsApp...",
                    "success"
                );


                /* Open WhatsApp */

                setTimeout(() => {

                    window.open(
                        whatsappURL,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }, 350);

            }
        );

    }


    /* =====================================================
       12. FORM STATUS MESSAGE
    ===================================================== */

    function showFormMessage(
        message,
        type = "success"
    ) {

        if (!enquiryForm) return;

        let statusMessage =
            enquiryForm.querySelector(
                ".form-status"
            );

        if (!statusMessage) {

            statusMessage =
                document.createElement(
                    "div"
                );

            statusMessage.className =
                "form-status";

            enquiryForm.appendChild(
                statusMessage
            );

        }

        statusMessage.textContent =
            message;

        statusMessage.className =
            `form-status ${type}`;

        statusMessage.classList.add(
            "show"
        );


        clearTimeout(
            statusMessage.hideTimer
        );


        statusMessage.hideTimer =
            setTimeout(() => {

                statusMessage.classList.remove(
                    "show"
                );

            }, 5000);

    }


    /* =====================================================
       13. PHONE INPUT - ALLOW VALID CHARACTERS
    ===================================================== */

    const phoneInput =
        document.getElementById("phone");

    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            function () {

                this.value =
                    this.value.replace(
                        /[^0-9+\s()-]/g,
                        ""
                    );

            }
        );

    }


    /* =====================================================
       14. PREVENT RAPID FORM SUBMISSION
    ===================================================== */

    let lastSubmitTime = 0;

    if (enquiryForm) {

        enquiryForm.addEventListener(
            "submit",
            () => {

                lastSubmitTime =
                    Date.now();

            }
        );

    }


    /* =====================================================
       15. HERO PARALLAX EFFECT
       Desktop only
    ===================================================== */

    let ticking = false;

    function heroParallax() {

        const hero =
            document.querySelector(".hero");

        if (!hero) return;

        if (
            window.innerWidth <= 768
        ) {

            slides.forEach((slide) => {

                slide.style.transform = "";

            });

            return;

        }

        const scrollY =
            window.scrollY;

        const heroHeight =
            hero.offsetHeight;

        if (
            scrollY <= heroHeight
        ) {

            slides.forEach((slide) => {

                slide.style.transform =
                    `scale(1.05) translateY(${scrollY * 0.08}px)`;

            });

        }

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    () => {

                        heroParallax();

                        ticking = false;

                    }
                );

                ticking = true;

            }

        },

        { passive: true }

    );


    /* =====================================================
       16. BACK TO NORMAL ON WINDOW RESIZE
    ===================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );

            resizeTimer =
                setTimeout(() => {

                    /*
                    Close mobile navigation
                    when switching to desktop
                    */

                    if (
                        window.innerWidth > 992
                    ) {

                        if (mainNav) {

                            mainNav.classList.remove(
                                "active"
                            );

                        }

                        if (menuToggle) {

                            menuToggle.classList.remove(
                                "active"
                            );

                        }

                        document.body.classList.remove(
                            "menu-open"
                        );

                    }

                    heroParallax();

                }, 150);

        }
    );


    /* =====================================================
       17. INITIAL PAGE SETUP
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});
