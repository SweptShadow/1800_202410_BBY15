function populateBookmarks() {
  var uid = firebase.auth().currentUser.uid;
  //Get reference to the user's document in Firestore
  var userDocRef = db.collection('users').doc(uid);
  //Get the current bookmarks
  userDocRef.get().then((doc) => {
    var bookmarks = doc.data().bookmarks;
    //Get the template and the container
    var template = document.getElementById('bookmarkCardTemplate');
    var container = document.getElementById('bookmarkCardGroup');
    //Clear the container
    container.innerHTML = '';
    //For each bookmark...
    bookmarks.forEach((bookmark) => {
      //Clone the template
      var clone = template.content.cloneNode(true);
      //Populate the clone with the bookmark data
      clone.querySelector('.title').textContent = bookmark;
      //Populate other elements in the clone here...
      //Append the clone to the container
      container.appendChild(clone);
    });
  })
    .catch((error) => {
      //Handle errors when getting the bookmarks
      console.error('Error getting bookmarks: ', error);
    });
}
