//animate menu
const hamburgerMenu = document.querySelector(".hamburgerMenu");
hamburgerMenu.addEventListener("click", () => {
    const hamburgerLine = document.querySelectorAll(".hamburgerMenu span");
    hamburgerLine.forEach((line) => {
        line.classList.toggle("active");
    });

    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("active");

    const main = document.querySelectorAll("section, footer");
    main.forEach(section => {
        section.classList.toggle("active");
    });
});
//check page for menu
function checkPage() {
    const sidebarMenu = document.querySelectorAll("li.sidebarMenu");
    const footerMenu = document.querySelectorAll("li.footerMenu");

    const pathArray = document.location.href.split("/");
    const location = pathArray[pathArray.length-1];
    switch (location) {
        case "index.html":
            sidebarMenu[0].classList.toggle("active");
            footerMenu[0].classList.toggle("active");
            break;
        case "products.html":
            sidebarMenu[1].classList.toggle("active");
            footerMenu[1].classList.toggle("active");
            break;
        case "organization.html":
            sidebarMenu[2].classList.toggle("active");
            footerMenu[2].classList.toggle("active");
            break;
        case "contact.html":
            sidebarMenu[3].classList.toggle("active");
            footerMenu[3].classList.toggle("active");
            break;
    }
    
}
window.onload = checkPage;
//technology logo touch slider
const sliders = document.querySelectorAll(".slider");
sliders.forEach(slider => {
    const slides = Array.from(slider.querySelectorAll("div"));

    console.log(slider.getBoundingClientRect().width);
    console.log(window.innerWidth);

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;

    slides.forEach((slide, index) => {
        const slideImage = slide.querySelector("img");
        // disable default image drag
        slideImage.addEventListener("dragstart", (e) => e.preventDefault());
        // pointer events
        slide.addEventListener("pointerdown", pointerDown(index));
        slide.addEventListener('pointerup', pointerUp);
        slide.addEventListener('pointerleave', pointerUp);
        slide.addEventListener('pointermove', pointerMove);
    });
    // make responsive to changes
    slider.addEventListener("resize", setPositionByIndex);

    function pointerDown(index) {
        return function (event) {
            currentIndex = index;
            startPos = event.clientX;
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            slider.classList.add('grabbing');
        }
    }

    function pointerMove(e) {
        if (isDragging) {
            const currentPos = e.clientX;
            currentTranslate = prevTranslate + currentPos - startPos;
        }
    }

    function pointerUp() {
        cancelAnimationFrame(animationID);
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;
        
        // if moved enough negative then snap to next slide if there is one
        if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex++;
    
        // if moved enough positive then snap to previous slide if there is one
        if (movedBy > 100 && currentIndex > 0) currentIndex--;
        
        setPositionByIndex();
    
        slider.classList.remove('grabbing');
    } 

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }
    
    function setPositionByIndex() {
        console.log(-slider.getBoundingClientRect().width);
        console.log(-window.innerWidth);
        currentTranslate = currentIndex * -slider.getBoundingClientRect().width;
        prevTranslate = currentTranslate;
        setSliderPosition();
    }
    
    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }
});
//partner-logo auto play
const partnerSlide = document.querySelectorAll(".partner-logo");
const intervalPartnerTime = 2000;
let indexPartner = 0;

window.onload = nextPartner;
let slidePartnerInterval = setInterval(nextPartner, intervalPartnerTime);

function nextPartner() {
    if (indexPartner < partnerSlide.length - 3) {
        indexPartner++;
    }
    else {
        indexPartner = 0;
    }
    partnerSlide.forEach((slide) => {
        slide.style.transform =  `translate(-${indexPartner*100}%)`;
    });
}
//products autoplay and slideshow
// const slideShows = document.querySelectorAll(".slideShow");






// slideShows.forEach((slideShow) => {
//     window.onload = nextProduct;
//     const intervalProductTime = 10000;
//     let slideProductInterval = setInterval(nextProduct, intervalProductTime);
//     let indexProduct = 0;

//     const slides = slideShow.querySelectorAll(".slide");

//     function nextProduct() {
//         console.log(slides);
//         slides[indexProduct].classList.remove("current");
//         (indexProduct < slides.length - 1) ? indexProduct++ : indexProduct = 0;
//         slides[indexProduct].classList.add("current");
//         console.log(slides);
//     }
// });

const testShow = document.querySelector(".services .slideShow");

const testSlides = testShow.querySelectorAll(".slide");
function next() {
    console.log(testSlides);
    testSlides[i].classList.remove("current");
    (i < testSlides.length - 1) ? i++ : i = 0;
    testSlides[i].classList.add("current");
    console.log(testSlides);
}

window.onload = next;
const interval = 4000;
let intervalSlide = setInterval(next, interval);
let i = 0;