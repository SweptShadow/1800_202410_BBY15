function loadSkeleton() {
  $('#navbarPlaceholder').load('./text/navbar.html', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const menu = document.getElementById('navLinks');

    // Ensure correct initial state
    if (!menu.classList.contains('menu-hidden')) {
        menu.classList.add('menu-hidden');
    }
    burgerMenu.addEventListener('click', function () {
        menu.classList.toggle('menu-hidden');
    });
  });
  $('#footerPlaceholder').load('./text/footer.html');
}
loadSkeleton();
