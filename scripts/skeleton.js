function loadSkeleton() {
  console.log($('#navbarPlaceholder').load('./text/navbar.html'));
  console.log($('#footerPlaceholder').load('./text/footer.html'));
}
loadSkeleton();

document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.getElementById('burgerMenu');
  const menu = document.getElementById('menu');

  burgerMenu.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent the click event from propagating to the document body
      toggleMenu();
  });

  document.body.addEventListener('click', function () {
      if (!menu.classList.contains('hidden')) {
          toggleMenu();
      }
  });

  // Prevent clicks inside the menu from closing it
  menu.addEventListener('click', function (event) {
      event.stopPropagation();
  });

  function toggleMenu() {
      menu.classList.toggle('hidden');
      if (menu.classList.contains('hidden')) {
          menu.style.right = '-250px';
      } else {
          menu.style.right = '0';
      }
  }
});
