// Wait for the DOM to load
// document.addEventListener('DOMContentLoaded', function() {
//   // Check if a user is signed in
//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in, call populateBookmarks
//       populateBookmarks(user.uid);
//     } else {
//       // No user is signed in.
//       console.log('No user is signed in');
//     }
//   });
// });

// function populateBookmarks(uid) {
//   var userDocRef = db.collection('users').doc(uid);
//   userDocRef.get().then((doc) => {
//     var data = doc.data();
//     if (data && data.bookmarks && Array.isArray(data.bookmarks.bookmarks)) {
//       var bookmarks = data.bookmarks.bookmarks;
//       var template = document.getElementById('bookmarkCardTemplate');
//       var container = document.getElementById('bookmarkCardGroup');
//       container.innerHTML = '';
//       bookmarks.forEach((bookmark) => {
//         var clone = template.content.cloneNode(true);
//         clone.querySelector('.title').textContent = bookmark;
//         container.appendChild(clone);
//       });
//     } else {
//       console.log('No bookmarks found for the user');
//     }
//   })
//   .catch((error) => {
//     console.error('Error getting bookmarks: ', error);
//   });
// }
