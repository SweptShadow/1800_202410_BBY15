function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            getName(user);
        } else {
            console.log("No user is signed in");
        }
    });
}
doAll();

function getName(user) {
    var docRef = db.collection("users").doc(user.uid);
    docRef.get().then((doc) => {
        if (doc.exists) {
            // Get the user's name
            var name = doc.data().name;

            // Write the user's name into the HTML element with id "welcome"
            document.getElementById("welcome").innerText = name;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}