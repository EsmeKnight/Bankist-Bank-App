'use strict';

///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const allButtons = document.getElementsByTagName("button");
const allSections = document.querySelectorAll(".section")
const header = document.querySelector(".header");
const message = document.createElement("div");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav")
const allLazyImgs = document.querySelectorAll("img[data-src]")
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

// Modal window
const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
    btn.addEventListener("click", openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

////////////////////////////

// Nav
// event delegation - many links in the nav bar
document.querySelector(".nav__links").addEventListener("click", function (element) {
    element.preventDefault();
    if (element.target.classList.contains("nav__link")) {
        const id = element.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    };
});

// hover fade in/out

const handleHover = function (element, opacity) {
    console.log(this);
    if (element.target.classList.contains("nav__link")) {
        const hovered = element.target;
        const siblings = hovered.closest(".nav").querySelectorAll(".nav__link");
        const logo = hovered.closest(".nav").querySelector("img");
        siblings.forEach(el => {
            if (el !== hovered) {
                el.style.opacity = this;
            }
        });
        logo.style.opacity = this;
    }
}
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky navigation
// Intersection Observer API

const navbarHeight = nav.clientHeight;
const stickyNav = function (entries) {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) {
        nav.classList.add("sticky")
    } else {
        nav.classList.remove("sticky")
    }
}
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navbarHeight}px`,
});

headerObserver.observe(header)

// Reveal Sections
const revealSection = function (entries, observer) {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
})
allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add("section--hidden")
})

// Lazy Load Imgs
const revealImg = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function () {
        entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(revealImg,
    {
        root: null,
        threshold: 0,
        rootMargin: "200px"
    });
allLazyImgs.forEach(img => imgObserver.observe(img));


// Learn more scroll
btnScrollTo.addEventListener("click", function (e) {
    e.preventDefault();
    section1.scrollIntoView({ behavior: "smooth" }); // only works in modern browsers
})

// tabs
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// event delegation
tabsContainer.addEventListener("click", function (element) {
    const clicked = element.target.closest(".operations__tab");
    if (!clicked) return;
    // hide inactive tabs
    tabs.forEach(function (tab) {
        tab.classList.remove("operations__tab--active");
    });
    tabsContent.forEach(function (content) {
        content.classList.remove("operations__content--active");
    });
    // activate specified content
    clicked.classList.add("operations__tab--active");
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
})

// Slider
const slider = function () {
    let currentSlide = 0;
    const maxSlide = slides.length;

    //Functions
    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`);
        });
    };
    const activateDot = function (slide) {
        document.querySelectorAll(".dots__dot").forEach(dot => dot.classList.remove("dots__dot--active"));
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
    }

    const goToSlide = function (slide) {
        slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
    };

    // Next slide
    const nextSlide = function () {
        if (currentSlide === maxSlide - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        goToSlide(currentSlide);
        activateDot(currentSlide)
    };
    const prevSlide = function () {
        if (currentSlide === 0) {
            currentSlide === maxSlide - 1;
        } else {
            currentSlide--;
        }
        goToSlide(currentSlide);
        activateDot(currentSlide);
    };

    const init = function () {
        goToSlide(0);
        createDots()
        activateDot(0);
    };
    init();

    //Event handlers
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);

    document.addEventListener("keydown", function (e) {
        console.log(e);
        if (e.key === "ArrowLeft") {
            prevSlide();
        };
        e.key === "ArrowRight" && nextSlide();
    });

    dotContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("dots__dot")) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide)
        };
    });
};
slider();



//cookie message
message.classList.add("cookies-message");
// message.textContent = "We use cookies for improved functionality and analytics"
message.innerHTML = "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>"

// header.prepend(message);
header.append(message);

// Delete cookies message
document.querySelector(".btn--close-cookie").addEventListener("click", function () {
    message.remove();
});

