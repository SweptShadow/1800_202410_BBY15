//Array of bus data fields and corresponding element IDs
var busDataFields = ['bus25Data', 'bus110Data', 'bus122Data', 'bus130Data', 'bus222Data'];

busDataFields.forEach(function (field) {
  db.collection('busroutes').doc(field)
    .get()
    .then(function (doc) {
      var data = doc.data();
      var text = '';
      for (var key in data) {
        text += key + ': ' + data[key] + '\n';
      }
      document.getElementById(field).innerText = text;
    })
});

//Get template and container
var template = document.getElementById('savedCardTemplate');
var container = document.getElementById('button-container');

//Get bus routes from Firestore (modified 1800 demo code)
db.collection("busroutes").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    //Cloning the template
    let newcard = template.content.cloneNode(true);

    //Get the elements in the template
    var button = newcard.querySelector('.button-30');
    var routeStart = newcard.querySelector('.route-start');
    var routeEnd = newcard.querySelector('.route-end');
    var readMore = newcard.querySelector('.card-href');
    var bookmark = newcard.querySelector('.material-icons');

    //Set data from Firestore 
    var data = doc.data();
    button.textContent = 'Bus #' + data.Code;
    button.id = 'bus' + data.Code;
    button.onclick = function () {
      window.location.href = 'eachbusinfo.html?busRoutesDocID=bus' + data.Code;
    };
    routeStart.textContent = data.Route_start;
    routeEnd.textContent = data.Route_end;
    readMore.href = 'eachbusinfo.html?busRoutesDocID=bus' + data.Code;
    bookmark.id = 'save-bus' + data.Code;
    bookmark.onclick = function () {
      saveBookmark('bus' + data.Code);
    };

    //Attach newcard to the container
    container.appendChild(newcard);
  });
});

function saveBookmark(busId) {
  var uid = firebase.auth().currentUser.uid;
  //Get reference to the user's document in Firestore
  var userDocRef = db.collection('users').doc(uid);
  // Get the current bookmarks
  userDocRef.get().then((doc) => {  // Added this line to get the current bookmarks
    var bookmarks = doc.data().bookmarks;
    if (bookmarks.includes(busId)) {
      //If the busId is already bookmarked, remove it
      userDocRef.update({
        bookmarks: firebase.firestore.FieldValue.arrayRemove(busId)
      })
        .then(() => {
          console.log('Bookmark removed successfully');  
          document.getElementById('save-' + busId).innerText = 'bookmark_border';
        })
        .catch((error) => {
          console.error('Error removing bookmark: ', error);  
        });
    } else {
      //Add the busId to the 'bookmark' field
      userDocRef.update({
        bookmarks: firebase.firestore.FieldValue.arrayUnion(busId)
      })
        .then(() => {
          console.log('Bookmark saved successfully');
          document.getElementById('save-' + busId).innerText = 'bookmark';
        })
        .catch((error) => {
          console.error('Error saving bookmark: ', error);
        });
    }
  })
    .catch((error) => {
      //Handle errors when getting the bookmarks
      console.error('Error getting bookmarks: ', error);
    });
}

function searchFirebase() {
  const searchTerm = document.getElementById('searchInput').value.trim();

  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';

  db.collection('busroutes').where('Code', '==', searchTerm).get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const li = document.createElement('li');
        li.textContent = doc.id + ': ' + JSON.stringify(doc.data());
        searchResults.appendChild(li);
      });

      if (querySnapshot.empty) {
        const li = document.createElement('li');
        li.textContent = 'No results found';
        searchResults.appendChild(li);
      }
    })
    .catch(error => {
      console.error('Error searching documents: ', error);
    });
}