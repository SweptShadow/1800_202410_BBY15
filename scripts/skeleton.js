function loadSkeleton() {
  $('#navbarPlaceholder').load('./text/navbar.html', function () {
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

  $('#footerPlaceholder').load('./text/footer.html', function () {
    function homeFunction() {
      alert("Home button clicked");
    }

    function routesFunction() {
      alert("Routes button clicked");
    }

    function returnFunction() {
      alert("Return button clicked");
    }

    // Attach the functions to window objects so they can be accessed globally
    window.homeFunction = homeFunction;
    window.routesFunction = routesFunction;
    window.returnFunction = returnFunction;
  });
}
loadSkeleton();
