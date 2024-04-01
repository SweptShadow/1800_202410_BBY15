//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyBXJ7xXN8R3_4lFKMMG6Lr2ObdoQi5sSyU",
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

// Array of bus data fields and corresponding element IDs
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