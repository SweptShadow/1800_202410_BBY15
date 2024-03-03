function loadSkeleton() {
  console.log($('#navbarPlaceholder').load('./text/nav_after_login.html'));
  console.log($('#footerPlaceholder').load('./text/footer.html'));
}
loadSkeleton();