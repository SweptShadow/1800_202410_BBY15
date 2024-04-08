firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    function success(pos) {
      //obtaining the users location
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      console.log(pos);
      //updating the db with the user
      db.collection("users").doc(user.uid).update({
        latitude: lat,
        longitude: lng
      });

    }

    function error(err) {

      if (err.code === 1) {
        alert("Please allow location access");
      } else {
        alert("Position Unavailable");
      }

    }

    const options = {

      enableHighAccuracy: true,
      timeout: 5000

    };

    // if (!navigator.geolocation) {
    //   throw new Error("No geolocation available");
    // }

    navigator.geolocation.watchPosition(success, error, options);
  }
});

// var currentX;
// var currentY;
// function getUserLocation() {
//   if ("geolocation" in navigator) {
//     // Check if geolocation is supported/enabled on the current device
//     navigator.geolocation.getCurrentPosition(
//       function (position) {
//         // This is a success callback, executed when location is successfully retrieved
//         console.log("Latitude:", position.coords.latitude);
//         console.log("Longitude:", position.coords.longitude);
//         currentX = position.coords.latitude;
//         currentY = position.coords.longitude;
//       }
//     );
//   } else {
//     // Geolocation is not supported by this browser
//     console.log("Geolocation is not supported by your browser");
//   }
// }
// getUserLocation();

// function getDistance() {
//   //var xyArray = [];
//   db.collection('busroutes').document(currentRoute).collection('stops')
//     .get()
//     .then(snap => {
//       snap.forEach(doc => {
//         let docID = doc.id;
//         p1x = doc.data().latitude;
//         p1y = doc.data().longitude;
//         d = calculateDistance(p1x, p1y, currentX, currentY);
//         db.collection('busroutes').doc(currentRoute).collection('stops').document(doc.id)
//           .update({
//             distance_from_user: d
//           })
//       })
//       //console.log(xyArray);
//       ///return xyArray;
//     })
// }
// getDistance();

// function calculateDistance(lat1, lon1, lat2, lon2) {
//   // Convert degrees to radians
//   function toRadians(degrees) {
//     return degrees * Math.PI / 180;
//   }

//   // Radius of the earth in kilometers
//   var R = 6371;

//   // Difference in coordinates
//   var deltaLat = toRadians(lat2 - lat1);
//   var deltaLon = toRadians(lon2 - lon1);

//   // Current latitudes in radians
//   var lat1Rad = toRadians(lat1);
//   var lat2Rad = toRadians(lat2);

//   // Haversine formula
//   var a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
//     Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   var distance = R * c;

//   return distance;
// }

//have to activate
// function displayCardsDynamically(busstops) {
//   // Ensure the getDistance function has been called and the distances are updated before calling this function.
//   let cardTemplate = document.getElementById("stopButtonTemplate");

//   db.collection(busstops).document(currentRoute).collection('stops')
//     .orderBy("distance_from_user", "desc") // Sort by distance from user in descending order
//     .get()
//     .then(snap => {
//       snap.forEach(doc => {
//         var title = doc.data().name;
//         var details = doc.data().details;
//         var hikeCode = doc.data().code;
//         var hikeLength = doc.data().length;
//         var docID = doc.id;
//         let newcard = cardTemplate.content.cloneNode(true);

//         newcard.querySelector('.card-title').innerHTML = title;
//         newcard.querySelector('.card-length').innerHTML = hikeLength + "km";
//         newcard.querySelector('.card-text').innerHTML = details;
//         newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`;
//         newcard.querySelector('a').href = "eachHike.html?docID=" + docID;
//         newcard.querySelector('i').id = 'save-' + docID;
//         newcard.querySelector('i').onclick = () => saveBookmark(docID);

//         document.getElementById(collection + "-go-here").appendChild(newcard);
//       });
//     });
// }
