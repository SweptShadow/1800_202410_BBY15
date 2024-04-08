var storedRouteDocId = localStorage.getItem('routeDocId');
var storedStopDocId = localStorage.getItem('stopDocId');
// var storedStopDocId = localStorage.getItem('stopDocID');
console.log(storedRouteDocId + ' ' + storedStopDocId);

function getRouteName(id) {
  db.collection("busroutes")
    .doc(id)
    .get()
    .then((thisRoute) => {
      var routeName = thisRoute.data().name;
      document.getElementById("routeName").innerHTML = routeName;
    });
}

getRouteName(storedRouteDocId);

//Add this JavaScript code to make stars clickable
//Select all elements with the class name "star" and store them in the "stars" variable
const stars = document.querySelectorAll('.star');
stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    for (let i = 0; i <= index; i++) {
      document.getElementById(`star${i + 1}`).textContent = 'star';
    }
  });
});

function writeReview() {
  console.log("inside write review");
  let routeBusy = document.getElementById("busy").value;
  let routeRecommend = document.querySelector('input[name="recommend"]:checked').value;
  // let reviewTime = document.getElementById("time").value;

  console.log(routeBusy, routeRecommend);

  var user = firebase.auth().currentUser;
  if (user) {
    var currentUser = db.collection("users").doc(user.uid);
    var userID = user.uid;

    const reviewsRef = db.collection('busroutes').doc(storedRouteDocId)
      .collection('stops').doc(storedStopDocId).collection('reviews').add({
        storedRouteDocId: storedRouteDocId,
        userID: userID,
        busy: routeBusy,
        recommend: routeRecommend,
        // time: reviewTime,
        // rating: routeRating,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        window.location.href = "thanks.html";
      });
  } else {
    console.log("No user is signed in");
    window.location.href = 'review.html';
  }
}
