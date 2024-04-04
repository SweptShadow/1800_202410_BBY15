function loadSkeleton() {
  $('#navbarPlaceholder').load('./text/navbar.html', function () {
    const menu = document.getElementById('navLinks');

    //Ensure correct initial state
    if (!menu.classList.contains('menu-hidden')) {
      menu.classList.add('menu-hidden');
    }
  });
  $('pagefooterPlaceholder').load('./text/pagefooter.html');
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

function saveBookmark(busRoutesDocID) {
  //Manage the backend process to store the hikeDocID in the database, recording which hike was bookmarked by the user.
  currentUser.update({
    //Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
    //Method ensures that the ID is added only if it's not already present, preventing duplicates.
    bookmarks: firebase.firestore.FieldValue.arrayUnion(busRoutesDocID)
  })
    //Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
    .then(function () {
      console.log("bookmark has been saved for" + busRoutesDocID);
      let iconID = 'save-' + busRoutesDocID;
      //console.log(iconID) to change the icon of the hike that was saved to "filled"
      document.getElementById(iconID).innerText = 'bookmark';
    });
}

currentUser.get().then(userDoc => {
  //get the user name
  var bookmarks = userDoc.data().bookmarks;
  if (bookmarks.includes(docID)) {
    document.getElementById('save-' + docID).innerText = 'bookmark';
  }
})
