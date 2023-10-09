//animate hamburger menu
function animateMenu() {
    const hamburgerMenu = document.querySelector(".hamburgerMenu");
    hamburgerMenu.addEventListener("click", () => {
        hamburgerMenu.classList.toggle("active");
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
        // window resize hide hamburger menu
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 720) {
                hamburgerMenu.classList.remove("active");
                hamburgerLine.forEach((line) => {
                    line.classList.remove("active");
                });
                sidebar.classList.remove("active");
                main.forEach(section => {
                    section.classList.remove("active");
                });
            }
        }); 
    });
}
animateMenu();
//check page for menu
function checkPage() {
    const sidebarMenu = document.querySelectorAll("li.sidebarMenu");
    const footerMenu = document.querySelectorAll("li.footerMenu");
    const navMenu = document.querySelectorAll("li.navMenu");
    const pathArray = document.location.href.split("/");
    const location = pathArray[pathArray.length-1];
    switch (location) {
        case "index.html":
            sidebarMenu[0].classList.toggle("active");
            footerMenu[0].classList.toggle("active");
            navMenu[0].classList.toggle("active");
            break;
        case "products.html":
            sidebarMenu[1].classList.toggle("active");
            footerMenu[1].classList.toggle("active");
            navMenu[1].classList.toggle("active");
            break;
        case "organization.html":
            sidebarMenu[2].classList.toggle("active");
            footerMenu[2].classList.toggle("active");
            navMenu[2].classList.toggle("active");
            break;
        case "contact.html":
            sidebarMenu[3].classList.toggle("active");
            footerMenu[3].classList.toggle("active");
            navMenu[3].classList.toggle("active");
            break;
    }
}
checkPage();
//technology logo touch slider
// const sliders = document.querySelectorAll(".slider");
// sliders.forEach(slider => {
//     const slides = Array.from(slider.querySelectorAll("div"));

//     let isDragging = false;
//     let startPos = 0;
//     let currentTranslate = 0;
//     let prevTranslate = 0;
//     let animationID;
//     let currentIndex = 0;

//     slides.forEach((slide, index) => {
//         const slideImage = slide.querySelector("img");
//         // disable default image drag
//         slideImage.addEventListener("dragstart", (e) => e.preventDefault());
//         // pointer events
//         slide.addEventListener("pointerdown", pointerDown(index));
//         slide.addEventListener("pointerup", pointerUp);
//         slide.addEventListener("pointerleave", pointerUp);
//         slide.addEventListener("pointermove", pointerMove);
//     });
//     // make responsive to changes
//     slider.addEventListener("resize", setPositionByIndex);

//     window.oncontextmenu = function (event) {
//         event.preventDefault();
//         event.stopPropagation();
//         return false;
//     }
//     function pointerDown(index) {
//         return function (e) {
//             currentIndex = index;
//             startPos = e.clientX;
//             isDragging = true;
//             animationID = requestAnimationFrame(animation);
//             slider.classList.add('grabbing');
//         }
//     }
//     function pointerMove(e) {
//         if (isDragging) {
//             const currentPos = e.clientX;
//             currentTranslate = prevTranslate + currentPos - startPos;
//         }
//     }
//     function pointerUp() {
//         cancelAnimationFrame(animationID);
//         isDragging = false;
//         const movedBy = currentTranslate - prevTranslate;
        
//         // if moved enough negative then snap to next slide if there is one
//         if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex++;
    
//         // if moved enough positive then snap to previous slide if there is one
//         if (movedBy > 100 && currentIndex > 0) currentIndex--;
//         setPositionByIndex();
    
//         slider.classList.remove('grabbing');
//     }
//     function animation() {
//         setSliderPosition();
//         if (isDragging) requestAnimationFrame(animation);
//     }
//     function setPositionByIndex() {
//         currentTranslate = currentIndex * -slider.getBoundingClientRect().width;
//         prevTranslate = currentTranslate;
//         setSliderPosition();
//     }
//     function setSliderPosition() {
//         slider.style.transform = `translateX(${currentTranslate}px)`;
//     }
// });
//partner-logo auto play
function autoPartnerLogo() {
    const slides = document.querySelectorAll(".partner-logo.smallScreen");
    const interval = 5000;
    let i = 0;
    let slideInterval = setInterval(nextLogo, interval);
    function nextLogo() {
        if (i < slides.length - 3) {
            i++;
        }
        else {
            i = 0;
        }
        slides.forEach((slide) => {
            slide.style.transform =  `translate(-${i*100}%)`;
        });
    }
}
autoPartnerLogo();
//product slide
function productSlide() {
    const slideShows = document.querySelectorAll(".slideShow");
    const products = document.querySelectorAll(".product");
    const sections = document.querySelectorAll(".overlay-here");
    slideShows.forEach((slideShow, index) => {
        const interval = 5000;
        let i = 0;
        let slideInterval = setInterval(next, interval);
        const slides = slideShow.querySelectorAll(".slide");
        const leftBtn = products[index].querySelector(".leftArrow");
        const rightBtn = products[index].querySelector(".rightArrow");
        // next slide
        function next() {
            if (i < slides.length - 1) {
                i++;
            }
            else {
                i = 0;
            }
            slides.forEach((slide) => {
                slide.style.transform =  `translate(-${i*100}%)`;
            });
        }
        // previous slide
        function prev() {
            if (i > 0) {
                i--;
            }
            else {
                i = slides.length - 1;
            }
            slides.forEach((slide) => {
                slide.style.transform =  `translate(-${i*100}%)`;
            });
        }
        // navigate product slides
        leftBtn.addEventListener("click", () => {
            prev();
            clearInterval(slideInterval);
            slideInterval = setInterval(next, interval);
        });
        rightBtn.addEventListener("click", () => {
            next();
            clearInterval(slideInterval);
            slideInterval = setInterval(next, interval);
        });
        // click overlay to close it
        const overlays = sections[index].querySelectorAll(".overlay");
        overlays.forEach(overlay => {
            overlay.addEventListener("click", () => {
                overlay.style.display = "none";
            });
        });
        // close overlay when width < 720px
        window.addEventListener("resize", () => {
            if (window.innerWidth < 720) {
                overlays.forEach(overlay => {
                    overlay.style.display = "none";
                });
            }
        });
        // mouse in image cause slideshow to pause, click image show overlay
        const images = slideShow.querySelectorAll("img");
        images.forEach((image, index) => {
            image.addEventListener("pointerover", () => {
                clearInterval(slideInterval);
            });
            image.addEventListener("pointerout", () => {
                slideInterval = setInterval(next, interval);
            });
            image.addEventListener("click", () => {
                if (window.innerWidth >= 720) {
                    overlays[index].style.display = "block";
                }
            }); 
        });
    });
}
productSlide();
// on page scroll
function onPageScroll() {
    window.addEventListener("load", () => {
        hidden.forEach((element) => element.classList.remove("show"));
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.target.classList.add("show", entry.isIntersecting);
        });
    });
    const hidden = document.querySelectorAll(".hidden");
    hidden.forEach((element) => observer.observe(element));
}
onPageScroll();
// form validation
function formValidation() {
    const formInputs = document.querySelectorAll(".form-input");
    const form = document.querySelector("form");
    // regular expression
    const nameRegExp = /[\w]{2,}/;
    const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // //check if the input is valid according to pattern
    function isValid(input, regExp) {
        return (regExp.test(input.value)) ? true : false;
    }
    // if form not meet requirement do not send
    form.addEventListener("submit", (e) => {
        formInputs.forEach(formInput => {
            const input = formInput.querySelector("input");
            const error = formInput.querySelector("span.error");
            if (input.value.length === 0 || input.value == null) {
                switch (input.id) {
                    case "fb-link": 
                    case "job":
                    case "organization":
                    case "message":
                    case "receive-mail":
                        return;
                    case "full-name":
                        input.className = "invalid";
                        error.textContent = "Your name is required";
                        break;
                    case "email":
                        input.className = "invalid";
                        error.textContent = "Your email is required";
                        break;
                    case "phone":
                        input.className = "invalid";
                        error.textContent = "Your phone number is required";
                        break;
                }
                e.preventDefault();
            }
            if (input.className === "invalid") {
                e.preventDefault();
            }  
        });
    });
    // check validation
    formInputs.forEach(formInput => {
        const input = formInput.querySelector("input");
        const error = formInput.querySelector("span.error");
        input.addEventListener("focus", () => {
            switch (input.id) {
                case "fb-link": 
                case "job":
                case "organization":
                case "message":
                case "receive-mail":
                    return;
            }
            input.className = "";
            error.textContent = "";
        });
        input.addEventListener("input", () => {
            switch (input.id) {
                case "full-name":
                case "user-email":
                case "phone":
                    if (input.value.length === 0) {
                        input.className = "";
                        error.textContent = "";
                    }
                    break;
            }
        });
        input.addEventListener("blur", () => {
            switch (input.id) {
                case "full-name":
                    if (isValid(input, nameRegExp)) {
                        input.className = "valid";
                        error.textContent = "";
                    }
                    else {
                        input.className = "invalid";
                        error.textContent = "Name is at least 2 characters";
                    }
                    if (input.value.length === 0) {
                        input.className = "";
                        error.textContent = "";
                    }
                    break;
                case "email":
                    if (isValid(input, emailRegExp)) {
                        input.className = "valid";
                        error.textContent = "";
                    }
                    else {
                        input.className = "invalid";
                        error.textContent = "Invalid Email";
                    }
                    if (input.value.length === 0) {
                        input.className = "";
                        error.textContent = "";
                    }
                    break;
                case "phone":
                    if (isValid(input, phoneRegExp)) {
                        input.className = "valid";
                        error.textContent = "";
                    }
                    else {
                        input.className = "invalid";
                        error.textContent = "Invalid Phone Number";
                    }
                    if (input.value.length === 0) {
                        input.className = "";
                        error.textContent = "";
                    }
                    break;
            }
        });  
    });
}
formValidation();

