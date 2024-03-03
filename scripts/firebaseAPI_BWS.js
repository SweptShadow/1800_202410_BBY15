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
const storage = firebase.storage();
