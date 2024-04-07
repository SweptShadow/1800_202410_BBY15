//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyDxMxHoVQ-D4yMcApt2e6ptrZ79C0o_Mpk",
  authDomain: "bus-w-us.firebaseapp.com",
  projectId: "bus-w-us",
  storageBucket: "bus-w-us.appspot.com",
  messagingSenderId: "1019919123496",
  appId: "1:1019919123496:web:6c9d4776d24644723c211d"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var currentUser;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    currentUser = db.collection("users").doc(user.uid); //global
    console.log(currentUser);
  } else {
    // No user is signed in.
    console.log("No user is signed in");
    window.location.href = "login.html";
  }
});

//Array of bus data fields and corresponding element IDs (code for offline mode feature which we didn't have time to implement)
// var busDataFields = ['bus25Data', 'bus110Data', 'bus122Data', 'bus130Data', 'bus222Data'];

// busDataFields.forEach(function (field) {
//   db.collection('busroutes').doc(field)
//     .get()
//     .then(function (doc) {
//       var data = doc.data();
//       var text = '';
//       for (var key in data) {
//         text += key + ': ' + data[key] + '\n';
//       }
//       document.getElementById(field).innerText = text;
//     })
// });

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
    var busDocID = "bus" + data.Code + "Data"
    button.textContent = 'Bus #' + data.Code;
    button.id = 'bus' + data.Code;
    button.onclick = function () {
      window.location.href = 'eachbusinfo.html?busRoutesDocID=bus' + data.Code;
      localStorage.setItem('routeDocId', busDocID);
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
    
    currentUser.get().then(userDoc => {
      //get the user name
      var bookmarks = userDoc.data().bookmarks;
      if (bookmarks.includes('bus110')) {
        document.getElementById('save-' + 'bus110').innerText = 'bookmark';
      }
      if (bookmarks.includes('bus130')) {
        document.getElementById('save-' + 'bus130').innerText = 'bookmark';
      }
      if (bookmarks.includes('bus222')) {
        document.getElementById('save-' + 'bus222').innerText = 'bookmark';
      }
      if (bookmarks.includes('bus25')) {
        document.getElementById('save-' + 'bus25').innerText = 'bookmark';
      }
    })
  });
});


//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the hike to the "bookmarks" array
// Then it will change the bookmark icon from the hollow to the solid version. 
//-----------------------------------------------------------------------------
function saveBookmark(routeID) {
  // Manage the backend process to store the hikeDocID in the database, recording which hike was bookmarked by the user.
  currentUser.update({
    // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
    // This method ensures that the ID is added only if it's not already present, preventing duplicates.
    bookmarks: firebase.firestore.FieldValue.arrayUnion(routeID)
  })
    // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
    .then(function () {
      console.log("bookmark has been saved for" + routeID);
      let iconID = 'save-' + routeID;
      //console.log(iconID);
      //this is to change the icon of the hike that was saved to "filled"
      document.getElementById(iconID).innerText = 'bookmark';
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

function saveRouteDocID(routeDocID) {
  localStorage.setItem('routeDocId', routeDocID);
  alert("stored");
  window.location.href = 'eachbusinfo.html?busRoutesDocID=bus222'
}