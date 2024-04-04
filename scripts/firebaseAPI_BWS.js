//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
  
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
//const storage = firebase.storage();

const db = firebase.firestore();

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