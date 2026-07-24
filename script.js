document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* ==============================
           HERO SLIDER
        ============================== */

        const slides =
            document.querySelectorAll(
                ".hero-slide"
            );

        let currentSlide = 0;

        function showNextSlide() {

            if (slides.length <= 1) {
                return;
            }

            slides[currentSlide]
                .classList.remove("active");

            currentSlide =
                (currentSlide + 1)
                % slides.length;

            slides[currentSlide]
                .classList.add("active");
        }

        if (slides.length > 1) {

            setInterval(
                showNextSlide,
                5500
            );

        }


        /* ==============================
           HEADER SCROLL
        ============================== */

        const header =
            document.getElementById(
                "header"
            );

        function handleHeader() {

            if (!header) return;

            if (window.scrollY > 30) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        }

        handleHeader();

        window.addEventListener(
            "scroll",
            handleHeader,
            { passive: true }
        );


        /* ==============================
           MOBILE MENU
        ============================== */

        const menuButton =
            document.getElementById(
                "menuButton"
            );

        const nav =
            document.getElementById(
                "nav"
            );

        if (menuButton && nav) {

            menuButton.addEventListener(
                "click",
                function () {

                    nav.classList.toggle(
                        "open"
                    );

                    menuButton.classList.toggle(
                        "active"
                    );

                    document.body
                        .classList.toggle(
                            "menu-open",
                            nav.classList.contains(
                                "open"
                            )
                        );

                }
            );

        }


        /* ==============================
           SMOOTH SCROLL
        ============================== */

        const internalLinks =
            document.querySelectorAll(
                'a[href^="#"]'
            );

        internalLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const id =
                            link.getAttribute(
                                "href"
                            );

                        if (
                            !id ||
                            id === "#"
                        ) {

                            return;

                        }

                        const target =
                            document.querySelector(
                                id
                            );

                        if (!target) return;

                        event.preventDefault();

                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;

                        const position =
                            target
                                .getBoundingClientRect()
                                .top
                            +
                            window.pageYOffset
                            -
                            headerHeight;

                        window.scrollTo({

                            top: position,

                            behavior:
                                "smooth"

                        });


                        if (nav) {

                            nav.classList.remove(
                                "open"
                            );

                        }

                        if (menuButton) {

                            menuButton
                                .classList.remove(
                                    "active"
                                );

                        }

                        document.body
                            .classList.remove(
                                "menu-open"
                            );

                    }
                );

            }
        );


        /* ==============================
           ACTIVE NAV LINK
        ============================== */

        const navLinks =
            document.querySelectorAll(
                ".nav-link"
            );

        const sections =
            document.querySelectorAll(
                "main section[id]"
            );

        function updateActiveLink() {

            let current =
                "home";

            const position =
                window.scrollY + 180;

            sections.forEach(
                function (section) {

                    const top =
                        section.offsetTop;

                    const height =
                        section.offsetHeight;

                    if (
                        position >= top &&
                        position <
                        top + height
                    ) {

                        current =
                            section.id;

                    }

                }
            );

            navLinks.forEach(
                function (link) {

                    link.classList.remove(
                        "active"
                    );

                    if (
                        link.getAttribute(
                            "href"
                        ) ===
                        "#" + current
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                }
            );

        }

        window.addEventListener(
            "scroll",
            updateActiveLink,
            { passive: true }
        );

        updateActiveLink();


        /* ==============================
           REVEAL ANIMATION
        ============================== */

        const reveals =
            document.querySelectorAll(
                ".reveal"
            );

        if (
            "IntersectionObserver"
            in window
        ) {

            const observer =
                new IntersectionObserver(

                    function (
                        entries,
                        observerInstance
                    ) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target
                                        .classList.add(
                                            "visible"
                                        );

                                    observerInstance
                                        .unobserve(
                                            entry.target
                                        );

                                }

                            }
                        );

                    },

                    {
                        threshold: 0.1,

                        rootMargin:
                            "0px 0px -30px 0px"
                    }

                );

            reveals.forEach(
                function (element) {

                    observer.observe(
                        element
                    );

                }
            );

        } else {

            reveals.forEach(
                function (element) {

                    element.classList.add(
                        "visible"
                    );

                }
            );

        }


        /* ==============================
           WHATSAPP ENQUIRY
        ============================== */

        const form =
            document.getElementById(
                "enquiryForm"
            );

        const status =
            document.getElementById(
                "formStatus"
            );

        function showStatus(
            message,
            type
        ) {

            if (!status) return;

            status.textContent =
                message;

            status.className =
                "form-status show "
                + type;

        }


        if (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    const name =
                        document
                            .getElementById(
                                "name"
                            )
                            .value
                            .trim();

                    const phone =
                        document
                            .getElementById(
                                "phone"
                            )
                            .value
                            .trim();

                    const service =
                        document
                            .getElementById(
                                "service"
                            )
                            .value;

                    const message =
                        document
                            .getElementById(
                                "message"
                            )
                            .value
                            .trim();


                    if (!name) {

                        showStatus(
                            "Please enter your name.",
                            "error"
                        );

                        return;

                    }


                    const cleanPhone =
                        phone.replace(
                            /\D/g,
                            ""
                        );


                    if (
                        cleanPhone.length < 10
                    ) {

                        showStatus(
                            "Please enter a valid phone number.",
                            "error"
                        );

                        return;

                    }


                    if (!service) {

                        showStatus(
                            "Please select a security service.",
                            "error"
                        );

                        return;

                    }


                    let text =
`Hello Soma Security Services,

I would like to enquire about your security services.

Name: ${name}
Phone: ${phone}
Service Required: ${service}`;


                    if (message) {

                        text +=
`

Requirement Details:
${message}`;

                    }


                    text +=
`

Please contact me regarding this requirement.

Thank you.`;


                    const url =
                        "https://wa.me/919657914714?text="
                        +
                        encodeURIComponent(
                            text
                        );


                    showStatus(
                        "Opening WhatsApp...",
                        "success"
                    );


                    setTimeout(
                        function () {

                            window.open(
                                url,
                                "_blank"
                            );

                        },
                        300
                    );

                }
            );

        }


        /* ==============================
           PHONE INPUT
        ============================== */

        const phoneInput =
            document.getElementById(
                "phone"
            );

        if (phoneInput) {

            phoneInput.addEventListener(
                "input",
                function () {

                    phoneInput.value =
                        phoneInput.value.replace(
                            /[^0-9+\s()-]/g,
                            ""
                        );

                }
            );

        }


        /* ==============================
           RESIZE
        ============================== */

        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth > 900
                ) {

                    if (nav) {

                        nav.classList.remove(
                            "open"
                        );

                    }

                    if (menuButton) {

                        menuButton
                            .classList.remove(
                                "active"
                            );

                    }

                    document.body
                        .classList.remove(
                            "menu-open"
                        );

                }

            }
        );

    }
);
