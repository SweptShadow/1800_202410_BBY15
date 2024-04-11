function loadSkeleton() {
  $('#navbarPlaceholder').load('./text/navbar.html', function () {
    const menu = document.getElementById('navLinks');

    //Ensure correct initial state
    if (!menu.classList.contains('menu-hidden')) {
      menu.classList.add('menu-hidden');
    }
  });
  $('#pagefooterPlaceholder').load('./text/pagefooter.html');
  $('#footerPlaceholder').load('./text/footer.html', function () {

    function homeFunction() {
      window.location.href = 'landing.html';
    }

    function routesFunction() {
      window.location.href = 'busRoutes.html';
    }

    function returnFunction() {
      window.history.back();
    }

    //Attach the functions to window objects so they can be accessed globally
    window.homeFunction = homeFunction;
    window.routesFunction = routesFunction;
    window.returnFunction = returnFunction;
  });
}
loadSkeleton();

//Bookmark toogle function
function toggleBookmark(busRoutesDocID) {
  if (currentUser) {
    currentUser.get().then(userDoc => {
      var bookmarks = userDoc.data().bookmarks;
      if (bookmarks.includes(busRoutesDocID)) {
        //If the bookmark is already present, remove it
        currentUser.update({
          bookmarks: firebase.firestore.FieldValue.arrayRemove(busRoutesDocID)
        }).then(function () {
          console.log("Bookmark has been removed for " + busRoutesDocID);
          let iconID = 'save-' + busRoutesDocID;
          document.getElementById(iconID).innerText = 'bookmark_border';
        });
      } else {
        //If the bookmark is not present, add it
        currentUser.update({
          bookmarks: firebase.firestore.FieldValue.arrayUnion(busRoutesDocID)
        }).then(function () {
          console.log("Bookmark has been saved for " + busRoutesDocID);
          let iconID = 'save-' + busRoutesDocID;
          document.getElementById(iconID).innerText = 'bookmark';
        });
      }
    })
  }
}
