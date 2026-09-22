// ==========================================
// LUMORA X1 — COMPLETE SCRIPT.JS
// ==========================================

"use strict";


// ==========================================
// 1. SELECT IMPORTANT ELEMENTS
// ==========================================

const body = document.body;

const pageLoader =
    document.getElementById("pageLoader");

const header =
    document.getElementById("header");

const menuButton =
    document.getElementById("menuButton");

const navbar =
    document.getElementById("navbar");

const scrollProgress =
    document.getElementById("scrollProgress");

const currentYear =
    document.getElementById("currentYear");

const cameraFlash =
    document.getElementById("cameraFlash");


// ==========================================
// 2. PAGE LOADER
// ==========================================

window.addEventListener("load", () => {

    body.classList.add("page-loaded");

    setTimeout(() => {

        if (pageLoader) {
            pageLoader.classList.add("hidden");
        }

    }, 1700);

});


// ==========================================
// 3. CURRENT YEAR
// ==========================================

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


// ==========================================
// 4. STICKY HEADER
// ==========================================

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


// ==========================================
// 5. MOBILE NAVIGATION
// ==========================================

function closeMobileMenu() {

    if (!menuButton || !navbar) return;

    menuButton.classList.remove("active");
    navbar.classList.remove("active");

    body.classList.remove("menu-open");

    menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

}

if (menuButton && navbar) {

    menuButton.addEventListener("click", () => {

        const menuOpened =
            navbar.classList.toggle("active");

        menuButton.classList.toggle(
            "active",
            menuOpened
        );

        body.classList.toggle(
            "menu-open",
            menuOpened
        );

        menuButton.setAttribute(
            "aria-label",
            menuOpened
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });

}

document.querySelectorAll(
    ".nav-link, .nav-button"
).forEach((link) => {

    link.addEventListener(
        "click",
        closeMobileMenu
    );

});

window.addEventListener("resize", () => {

    if (window.innerWidth > 850) {
        closeMobileMenu();
    }

});

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeMobileMenu();
        closeVideoModal();
    }

});


// ==========================================
// 6. SMOOTH SCROLL
// ==========================================

const internalLinks =
    document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const targetElement =
            document.querySelector(targetId);

        if (!targetElement) return;

        event.preventDefault();

        targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


// ==========================================
// 7. PAGE SCROLL PROGRESS
// ==========================================

function updateScrollProgress() {

    if (!scrollProgress) return;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        documentHeight > 0
            ? (window.scrollY / documentHeight) * 100
            : 0;

    scrollProgress.style.width =
        `${percentage}%`;

}

window.addEventListener(
    "scroll",
    updateScrollProgress
);

updateScrollProgress();


// ==========================================
// 8. SCROLL REVEAL ANIMATION
// ==========================================

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -45px 0px"
        }

    );

revealElements.forEach((element, index) => {

    const delay =
        Math.min((index % 4) * 0.09, 0.27);

    element.style.transitionDelay =
        `${delay}s`;

    revealObserver.observe(element);

});


// ==========================================
// 9. ACTIVE NAVIGATION LINK
// ==========================================

const pageSections =
    document.querySelectorAll(
        "main section[id]"
    );

const navigationLinks =
    document.querySelectorAll(".nav-link");

function updateActiveNavigation() {

    let currentSection = "home";

    pageSections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 190;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });

    navigationLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();


// ==========================================
// 10. CUSTOM CURSOR
// ==========================================

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorCircle =
    document.querySelector(".cursor-circle");

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

document.addEventListener(
    "mousemove",
    (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        if (cursorDot) {

            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;

        }

    }
);

function animateCursor() {

    if (!cursorCircle) return;

    cursorX +=
        (mouseX - cursorX) * 0.13;

    cursorY +=
        (mouseY - cursorY) * 0.13;

    cursorCircle.style.left =
        `${cursorX}px`;

    cursorCircle.style.top =
        `${cursorY}px`;

    requestAnimationFrame(animateCursor);

}

animateCursor();

const cursorHoverElements =
    document.querySelectorAll(
        "a, button, .gallery-card, .feature-card"
    );

cursorHoverElements.forEach((element) => {

    element.addEventListener(
        "mouseenter",
        () => {

            if (cursorCircle) {

                cursorCircle.classList.add(
                    "hovered"
                );

            }

        }
    );

    element.addEventListener(
        "mouseleave",
        () => {

            if (cursorCircle) {

                cursorCircle.classList.remove(
                    "hovered"
                );

            }

        }
    );

});

document.addEventListener("mouseleave", () => {

    if (cursorDot) {
        cursorDot.style.opacity = "0";
    }

    if (cursorCircle) {
        cursorCircle.style.opacity = "0";
    }

});

document.addEventListener("mouseenter", () => {

    if (cursorDot) {
        cursorDot.style.opacity = "1";
    }

    if (cursorCircle) {
        cursorCircle.style.opacity = "1";
    }

});


// ==========================================
// 11. HERO CAMERA 3D MOUSE MOVEMENT
// ==========================================

const heroCameraArea =
    document.getElementById("heroCameraArea");

const heroCamera =
    document.getElementById("heroCamera");

if (heroCameraArea && heroCamera) {

    heroCameraArea.addEventListener(
        "mousemove",
        (event) => {

            if (window.innerWidth <= 850) {
                return;
            }

            const area =
                heroCameraArea.getBoundingClientRect();

            const positionX =
                event.clientX - area.left;

            const positionY =
                event.clientY - area.top;

            const centerX =
                area.width / 2;

            const centerY =
                area.height / 2;

            const rotateY =
                ((positionX - centerX) / centerX) * 13;

            const rotateX =
                ((positionY - centerY) / centerY) * -9;

            heroCamera.style.animation = "none";

            heroCamera.style.transform =
                `rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );

    heroCameraArea.addEventListener(
        "mouseleave",
        () => {

            heroCamera.style.transform =
                "rotateX(0deg) rotateY(0deg)";

            setTimeout(() => {

                heroCamera.style.animation = "";

            }, 300);

        }
    );

}


// ==========================================
// 12. MAGNETIC BUTTON EFFECT
// ==========================================

const magneticButtons =
    document.querySelectorAll(
        ".magnetic-button"
    );

magneticButtons.forEach((button) => {

    button.addEventListener(
        "mousemove",
        (event) => {

            if (window.innerWidth <= 850) {
                return;
            }

            const buttonArea =
                button.getBoundingClientRect();

            const movementX =
                event.clientX -
                buttonArea.left -
                buttonArea.width / 2;

            const movementY =
                event.clientY -
                buttonArea.top -
                buttonArea.height / 2;

            button.style.transform =
                `translate(
                    ${movementX * 0.16}px,
                    ${movementY * 0.22}px
                )`;

        }
    );

    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "translate(0, 0)";

        }
    );

});


// ==========================================
// 13. SCROLL-DRIVEN CAMERA EXPLOSION
// ==========================================

const cameraExperience =
    document.querySelector(
        ".camera-experience"
    );

const cameraParts =
    document.querySelectorAll(
        ".camera-part"
    );

const experienceSteps =
    document.querySelectorAll(
        ".experience-step"
    );

let currentExperienceStep = 0;


// Keeps a number inside a specific range.

function clamp(value, minimum, maximum) {

    return Math.min(
        Math.max(value, minimum),
        maximum
    );

}


// Smooth animation curve.

function smoothStep(value) {

    const limitedValue =
        clamp(value, 0, 1);

    return (
        limitedValue *
        limitedValue *
        (3 - 2 * limitedValue)
    );

}


// Opens parts in the middle and assembles
// them again near the end.

function calculateExplosion(progress) {

    if (progress <= 0.12) {
        return progress / 0.12;
    }

    if (progress <= 0.72) {
        return 1;
    }

    return 1 -
        ((progress - 0.72) / 0.28);

}


function updateExperienceStep(progress) {

    let nextStep = 0;

    if (progress >= 0.82) {

        nextStep = 4;

    } else if (progress >= 0.61) {

        nextStep = 3;

    } else if (progress >= 0.40) {

        nextStep = 2;

    } else if (progress >= 0.19) {

        nextStep = 1;

    } else {

        nextStep = 0;

    }

    if (nextStep === currentExperienceStep) {
        return;
    }

    currentExperienceStep = nextStep;

    experienceSteps.forEach(
        (step, index) => {

            step.classList.toggle(
                "active",
                index === nextStep
            );

        }
    );

    triggerCameraFlash();

}


function updateCameraExperience() {

    if (!cameraExperience) return;

    const sectionTop =
        cameraExperience.offsetTop;

    const scrollableDistance =
        cameraExperience.offsetHeight -
        window.innerHeight;

    const travelledDistance =
        window.scrollY - sectionTop;

    const progress =
        clamp(
            travelledDistance /
            scrollableDistance,
            0,
            1
        );

    const explosionValue =
        smoothStep(
            calculateExplosion(progress)
        );

    cameraParts.forEach(
        (cameraPart, index) => {

            const distance =
                Number(
                    cameraPart.dataset.speed || 0
                );

            const movementX =
                distance * explosionValue;

            const smallMovementY =
                Math.sin(
                    progress * Math.PI +
                    index * 0.6
                ) *
                explosionValue *
                7;

            const rotation =
                distance === 0
                    ? 0
                    : explosionValue *
                      (index % 2 === 0 ? 3 : -3);

            cameraPart.style.transform =
                `translate(-50%, -50%)
                 translateX(${movementX}px)
                 translateY(${smallMovementY}px)
                 rotateY(${rotation}deg)`;

        }
    );

    updateExperienceStep(progress);

}


// Use requestAnimationFrame for smoother scroll.

let experienceFrameRequested = false;

function requestExperienceUpdate() {

    if (experienceFrameRequested) return;

    experienceFrameRequested = true;

    requestAnimationFrame(() => {

        updateCameraExperience();

        experienceFrameRequested = false;

    });

}

window.addEventListener(
    "scroll",
    requestExperienceUpdate,
    { passive: true }
);

window.addEventListener(
    "resize",
    requestExperienceUpdate
);

updateCameraExperience();


// ==========================================
// 14. CAMERA FLASH EFFECT
// ==========================================

function triggerCameraFlash() {

    if (!cameraFlash) return;

    cameraFlash.classList.remove("flash");

    void cameraFlash.offsetWidth;

    cameraFlash.classList.add("flash");

    setTimeout(() => {

        cameraFlash.classList.remove("flash");

    }, 600);

}


// Flash when user clicks a camera.

const clickableCameras =
    document.querySelectorAll(
        ".camera-model, .final-camera"
    );

clickableCameras.forEach((camera) => {

    camera.addEventListener(
        "click",
        triggerCameraFlash
    );

});


// ==========================================
// 15. VIDEO MODAL
// ==========================================

const videoModal =
    document.getElementById("videoModal");

const playButton =
    document.getElementById("playButton");

const bannerPlayButton =
    document.getElementById(
        "bannerPlayButton"
    );

const closeVideo =
    document.getElementById("closeVideo");


function openVideoModal() {

    if (!videoModal) return;

    videoModal.classList.add("active");

    videoModal.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add("modal-open");

    triggerCameraFlash();

}


function closeVideoModal() {

    if (!videoModal) return;

    videoModal.classList.remove("active");

    videoModal.setAttribute(
        "aria-hidden",
        "true"
    );

    body.classList.remove("modal-open");

}


if (playButton) {

    playButton.addEventListener(
        "click",
        openVideoModal
    );

}

if (bannerPlayButton) {

    bannerPlayButton.addEventListener(
        "click",
        openVideoModal
    );

}

if (closeVideo) {

    closeVideo.addEventListener(
        "click",
        closeVideoModal
    );

}

if (videoModal) {

    videoModal.addEventListener(
        "click",
        (event) => {

            if (event.target === videoModal) {
                closeVideoModal();
            }

        }
    );

}


// ==========================================
// 16. FEATURE CARDS 3D TILT
// ==========================================

const featureCards =
    document.querySelectorAll(
        ".feature-card"
    );

featureCards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            if (window.innerWidth <= 850) {
                return;
            }

            const cardArea =
                card.getBoundingClientRect();

            const positionX =
                event.clientX -
                cardArea.left;

            const positionY =
                event.clientY -
                cardArea.top;

            const centerX =
                cardArea.width / 2;

            const centerY =
                cardArea.height / 2;

            const rotateX =
                ((positionY - centerY) /
                    centerY) *
                -4;

            const rotateY =
                ((positionX - centerX) /
                    centerX) *
                4;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

        }
    );

});


// ==========================================
// 17. GALLERY MOUSE PARALLAX
// ==========================================

const galleryCards =
    document.querySelectorAll(
        ".gallery-card"
    );

galleryCards.forEach((card) => {

    const galleryArt =
        card.querySelector(".gallery-art");

    if (!galleryArt) return;

    card.addEventListener(
        "mousemove",
        (event) => {

            if (window.innerWidth <= 850) {
                return;
            }

            const cardArea =
                card.getBoundingClientRect();

            const positionX =
                event.clientX -
                cardArea.left;

            const positionY =
                event.clientY -
                cardArea.top;

            const movementX =
                ((positionX / cardArea.width) -
                    0.5) *
                14;

            const movementY =
                ((positionY / cardArea.height) -
                    0.5) *
                14;

            galleryArt.style.transform =
                `scale(1.08)
                 translate(
                    ${movementX}px,
                    ${movementY}px
                 )`;

        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            galleryArt.style.transform =
                "scale(1) translate(0, 0)";

        }
    );

});


// ==========================================
// 18. HERO BACKGROUND PARALLAX
// ==========================================

const floatingSpecifications =
    document.querySelectorAll(
        ".floating-spec"
    );

function updateHeroParallax() {

    const scrollPosition = window.scrollY;

    if (
        scrollPosition >
        window.innerHeight * 1.3
    ) {
        return;
    }

    floatingSpecifications.forEach(
        (item, index) => {

            const speed =
                0.04 + index * 0.025;

            item.style.marginTop =
                `${scrollPosition * speed}px`;

        }
    );

}

window.addEventListener(
    "scroll",
    updateHeroParallax,
    { passive: true }
);


// ==========================================
// 19. SPECIFICATION ITEMS HOVER
// ==========================================

const specificationItems =
    document.querySelectorAll(
        ".specification-item"
    );

specificationItems.forEach((item) => {

    item.addEventListener(
        "mouseenter",
        () => {

            specificationItems.forEach(
                (otherItem) => {

                    if (otherItem !== item) {
                        otherItem.style.opacity = "0.4";
                    }

                }
            );

        }
    );

    item.addEventListener(
        "mouseleave",
        () => {

            specificationItems.forEach(
                (otherItem) => {

                    otherItem.style.opacity = "1";

                }
            );

        }
    );

});


// ==========================================
// 20. CAMERA LENS FOLLOWS MOUSE
// ==========================================

const lensReflections =
    document.querySelectorAll(
        ".lens-reflection, .front-reflection"
    );

document.addEventListener(
    "mousemove",
    (event) => {

        if (window.innerWidth <= 850) {
            return;
        }

        const movementX =
            (event.clientX /
                window.innerWidth -
                0.5) *
            12;

        const movementY =
            (event.clientY /
                window.innerHeight -
                0.5) *
            12;

        lensReflections.forEach(
            (reflection) => {

                reflection.style.transform =
                    `translate(
                        ${movementX}px,
                        ${movementY}px
                     )
                     rotate(-35deg)`;

            }
        );

    }
);


// ==========================================
// 21. SHUTTER SOUND USING WEB AUDIO
// No audio file is required.
// ==========================================

function playShutterSound() {

    try {

        const AudioContextClass =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContextClass) return;

        const audioContext =
            new AudioContextClass();

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type = "square";

        oscillator.frequency.setValueAtTime(
            140,
            audioContext.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            45,
            audioContext.currentTime + 0.08
        );

        gain.gain.setValueAtTime(
            0.055,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.1
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.1
        );

    } catch (error) {

        // Website will continue working
        // if browser blocks Web Audio.

    }

}

clickableCameras.forEach((camera) => {

    camera.addEventListener(
        "click",
        playShutterSound
    );

});


// ==========================================
// 22. BUY BUTTON INTERACTION
// ==========================================

const buyButton =
    document.querySelector(
        "#buy .primary-button"
    );

if (buyButton) {

    buyButton.addEventListener(
        "click",
        () => {

            triggerCameraFlash();
            playShutterSound();

            const originalContent =
                buyButton.innerHTML;

            buyButton.innerHTML = `
                <span>Added to Selection</span>
                <i class="fa-solid fa-check"></i>
            `;

            setTimeout(() => {

                buyButton.innerHTML =
                    originalContent;

            }, 2200);

        }
    );

}


// ==========================================
// 23. FINAL CAMERA PARALLAX
// ==========================================

const buyCamera =
    document.querySelector(".buy-camera");

const finalCamera =
    document.querySelector(".final-camera");

if (buyCamera && finalCamera) {

    buyCamera.addEventListener(
        "mousemove",
        (event) => {

            if (window.innerWidth <= 850) {
                return;
            }

            const area =
                buyCamera.getBoundingClientRect();

            const rotateY =
                ((event.clientX -
                    area.left -
                    area.width / 2) /
                    (area.width / 2)) *
                10;

            const rotateX =
                ((event.clientY -
                    area.top -
                    area.height / 2) /
                    (area.height / 2)) *
                -7;

            finalCamera.style.animation = "none";

            finalCamera.style.transform =
                `rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );

    buyCamera.addEventListener(
        "mouseleave",
        () => {

            finalCamera.style.transform =
                "rotateX(0) rotateY(0)";

            setTimeout(() => {

                finalCamera.style.animation = "";

            }, 300);

        }
    );

}


// ==========================================
// 24. RESPECT REDUCED MOTION SETTING
// ==========================================

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

if (reducedMotion.matches) {

    cameraParts.forEach((part) => {

        part.style.transition = "none";

    });

}


// ==========================================
// 25. INITIAL WEBSITE UPDATE
// ==========================================

function initialUpdate() {

    updateHeader();
    updateScrollProgress();
    updateActiveNavigation();
    updateCameraExperience();
    updateHeroParallax();

}

initialUpdate();


// ==========================================
// WEBSITE READY
// ==========================================

console.log(
    "LUMORA X1 camera website loaded successfully."
);