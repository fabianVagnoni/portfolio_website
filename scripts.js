function toggleMenu() {
    /* target element in webpage & using it */
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburguer-icon");
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}