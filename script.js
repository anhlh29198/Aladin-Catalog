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

// function nextPartner