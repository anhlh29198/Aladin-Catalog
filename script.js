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

const sidebarMenu = document.querySelectorAll(".sidebarMenu");

function checkPage() {
    switch (document.location.href) {
        case "http://127.0.0.1:5500/index.html":
            sidebarMenu[0].classList.toggle("active");
            break;
        case "http://127.0.0.1:5500/products.html":
            sidebarMenu[1].classList.toggle("active");
            break;
        case "http://127.0.0.1:5500/organization.html":
            sidebarMenu[2].classList.toggle("active");
            break;
        case "http://127.0.0.1:5500/contact.html":
            sidebarMenu[3].classList.toggle("active");
            break;
    }
}

window.onload = checkPage;
