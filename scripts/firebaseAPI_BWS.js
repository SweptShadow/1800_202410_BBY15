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
//const db = firebase.firestore();
//const storage = firebase.storage();

var db = firebase.firestore();

// Fetch data and populate the containers in landing
db.collection("collectionName").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());

    // Get the container element
    var container = document.getElementById(doc.id);

    // Check if the container exists
    if (container) {
      // Populate the container with data pulled
      container.innerHTML = JSON.stringify(doc.data());
    }
  });
});