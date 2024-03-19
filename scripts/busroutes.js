// Import Firebase configuration from firebaseAPI_BWS
var firebaseConfig = require('./firebaseAPI_BWS');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

// Array of bus data fields and corresponding element IDs
var busDataFields = ['bus25Data', 'bus110Data', 'bus122Data', 'bus130Data', 'bus222Data'];

busDataFields.forEach(function(field) {
  db.collection('busroutes').doc(field)
    .get()
    .then(function(doc) {
      document.getElementById(field).innerText = JSON.stringify(doc.data());
    })
});
