"use strict";

// const { compileString } = require("sass");

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const logo = document.querySelector(".nav__logo");
const navLinks = document.querySelector(".nav__links");
const sections = document.querySelectorAll(".section");
const sectionsHr = document.querySelectorAll(".section-hr");
const allHr = document.querySelectorAll(".hr");
const firstLetter = document
    .querySelector(".section-about")
    .querySelector(".first-letter");
const firstLetterBackground = document
    .querySelector(".section-about")
    .querySelector(".first-letter--background");
const offerContainer = document.querySelector(".section-offer__container");

//Show nav
window.addEventListener("load", function() {

    setTimeout(() => {
        nav.classList.remove("hidden")
    }, 2000);
    
})

//Hover nav__links
const handleHover = function (e) {
    e.preventDefault();

    if (e.target.classList.contains("nav__link")) {
        logo.style.transform = `scale(${this})`;
    }
};

nav.addEventListener("mouseover", handleHover.bind(1.1));
nav.addEventListener("mouseout", handleHover.bind(1));

//Scroll into sections
navLinks.addEventListener("click", function (e) {
    e.preventDefault();

    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");

        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
});

//Sticky nav
const addSticky = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(addSticky, {
    root: null,
    threshold: 0,
});

headerObserver.observe(header);

//Reveal hr
const revealHr = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.querySelector(".hr").classList.remove("hr--hidden");
    observer.unobserve(entry.target);
};

const sectionHrObserver = new IntersectionObserver(revealHr, {
    root: null,
    threshold: 0.7,
});

allHr.forEach((hr) => hr.classList.add("hr--hidden"));
sectionsHr.forEach((sectionHr) => {
    sectionHrObserver.observe(sectionHr);
});

//Reveal sections
const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    // firstLetter.classList.add("first-letter-animation");
    firstLetterBackground.classList.add("first-letter--background-animation");
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.17,
});

sections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
});


//Slider
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
const dotContainer = document.querySelector(".dots");


let curSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
    slides.forEach((_, i) => {
        dotContainer.insertAdjacentHTML(
            "beforeend",
            `
            <button class="dots__dot" data-slide="${i}"></button>
            `
        );
    });
};

const activateDot = function (slide) {
    document
        .querySelectorAll(".dots__dot")
        .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add("dots__dot--active");
};

const goToSlide = function (slide) {
    slides.forEach(
        (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
};

const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
        curSlide = 0;
    } else {
        curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
};

const prevSlide = function () {
    if (curSlide === 0) {
        curSlide = maxSlide - 1;
    } else {
        curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
};

const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
};

init();


btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
    }
});

document.addEventListener("keydown", function (e) {
    e.key === "ArrowRight" && nextSlide();
    e.key === "ArrowLeft" && prevSlide();
});


//Open contact-modal
const btnLogo = document.querySelector(".footer__logo");
const overlayBackground = document.querySelector(".overlay");
const contactModal = document.querySelector(".contact-modal")

const openModal = (background, modal) => {
    background.classList.remove("hidden");
    modal.classList.remove("hidden");
    modal.classList.add("contact-modal-open")
}
  
    
btnLogo.addEventListener("click", openModal.bind(this, overlayBackground, contactModal))


//Close contact-modal

const closeModal = (background, modal) => {
    background.classList.add("hidden");
    modal.classList.add("hidden");
}

contactModal.addEventListener("click", function(e) {
    if (e.target.classList.contains("btn-close")) {
        closeModal(overlayBackground, contactModal)
    }
})

overlayBackground.addEventListener("click", function() {
    closeModal(overlayBackground, contactModal)
})

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && !contactModal.classList.contains("hidden")) {
        closeModal(overlayBackground, contactModal)
    }
})
