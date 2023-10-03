const hamburgerMenu = document.querySelector(".hamburgerMenu");
const hamburgerLine = document.querySelectorAll(".hamburgerMenu span");
const sidebar = document.querySelector(".sidebar");
const main = document.querySelectorAll("section, footer");

hamburgerMenu.addEventListener("click", () => {
    hamburgerLine.forEach((line) => {
        line.classList.toggle("active");
    });
    sidebar.classList.toggle("active");
    main.forEach(section => {
        section.classList.toggle("active");
    });
});