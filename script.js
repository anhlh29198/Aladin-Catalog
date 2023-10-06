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
checkPage();
//technology logo touch slider
const sliders = document.querySelectorAll(".slider");
sliders.forEach(slider => {
    const slides = Array.from(slider.querySelectorAll("div"));

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
        slide.addEventListener("pointerup", pointerUp);
        slide.addEventListener("pointerleave", pointerUp);
        slide.addEventListener("pointermove", pointerMove);
    });
    // make responsive to changes
    slider.addEventListener("resize", setPositionByIndex);

    window.oncontextmenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    function pointerDown(index) {
        return function (e) {
            currentIndex = index;
            startPos = e.clientX;
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
        currentTranslate = currentIndex * -slider.getBoundingClientRect().width;
        prevTranslate = currentTranslate;
        setSliderPosition();
    }
    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }
});
// fallback for touch slider
// const containers = document.querySelectorAll(".container");
// containers.forEach(container => {
//     const leftArrow = container.querySelector(".arrowLeft");
//     const rightArrow = container.querySelector(".arrowRight");
//     const slides = container.querySelector(".slider").querySelectorAll("div");

//     let i = 0;
//     leftArrow.addEventListener("click", () => {
//         if (i > 0) {
//             i--;
//         }
//         else {
//             i = slides.length - 1;
//         }
//         slides.forEach((slide) => {
//             slide.style.transform =  `translate(-${i*100}%)`;
//         });
//     });

//     rightArrow.addEventListener("click", () => {
//         if (i < slides.length - 1) {
//             i++;
//         }
//         else {
//             i = 0;
//         }
//         slides.forEach((slide) => {
//             slide.style.transform =  `translate(-${i*100}%)`;
//         });
//     });
// });
//partner-logo auto play
function autoPartnerLogo() {
    const slides = document.querySelectorAll(".partner-logo");
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
const slideShows = document.querySelectorAll(".slideShow");
slideShows.forEach((slideShow) => {
    const interval = 5000;
    let i = 0;
    let slideInterval = setInterval(next, interval);
    const slides = slideShow.querySelectorAll(".slide");
    const navigation = slideShow.querySelectorAll("button.navigation");
    const leftBtn = slideShow.querySelector(".leftArrow");
    const rightBtn = slideShow.querySelector(".rightArrow");
    function next() {
        navigation.forEach(btn => {
            btn.classList.remove("show");
        });
        if (i < slides.length - 1) {
            i++;
        }
        else {
            i = 0;
        }
        slides.forEach((slide) => {
            slide.style.transform =  `translate(-${i*100}%)`;
        });
        navigation[i].classList.add("show");
    }
    function prev() {
        navigation.forEach(btn => {
            btn.classList.remove("show");
        });
        if (i > 0) {
            i--;
        }
        else {
            i = slides.length - 1;
        }
        slides.forEach((slide) => {
            slide.style.transform =  `translate(-${i*100}%)`;
        });
        navigation[i].classList.add("show");
    }
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
    navigation.forEach((btn, index) => {
        navigation[index].addEventListener("click", () => {
            navigation.forEach((btn) => {
                btn.classList.remove("show");
            });
            slides.forEach((slide) => {
                i = index;
                slide.style.transform =  `translate(-${index*100}%)`;
            });
            navigation[index].classList.add("show");
            clearInterval(slideInterval);
            slideInterval = setInterval(next, interval);
        });
    });
    const images = slideShow.querySelectorAll("img");
    images.forEach((image) => {
        image.addEventListener("pointerover", () => {
            clearInterval(slideInterval);
        });

        image.addEventListener("pointerout", () => {
            slideInterval = setInterval(next, interval);
        });
    });
});
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