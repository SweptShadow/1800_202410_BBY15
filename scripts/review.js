var storedRouteDocId = localStorage.getItem('routeDocId');
var storedStopDocId = localStorage.getItem('stopDocId');
console.log(storedRouteDocId + ' ' + storedStopDocId);

function getRouteName(id) {
  db.collection("busroutes")
    .doc(id)
    .get()
    .then((thisRoute) => {
      var routeName = thisRoute.data().name;
      document.getElementById("routeName").innerHTML = storedStopDocId;
    });
}

getRouteName(storedRouteDocId);

//Write Review function
function writeReview() {
  console.log("inside write review");
  let routeBusy = document.querySelector('input[name="busy"]:checked').value;
  let routeRecommend = document.querySelector('input[name="recommend"]:checked').value;
  let reviewTime = document.querySelector('input[name="time"]:checked').value;

  var user = firebase.auth().currentUser;
  if (user) {
    var currentUser = db.collection("users").doc(user.uid);
    var userID = user.uid;

    const reviewsRef = db.collection('busroutes').doc(storedRouteDocId)
      .collection('stops').doc(storedStopDocId).collection('reviews').add({
        stopRoute: storedRouteDocId,
        stop: storedStopDocId,
        userID: userID,
        busy: routeBusy,
        recommend: routeRecommend,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        time: reviewTime
      }).then(() => {
        window.location.href = "thanks.html";
      });
  } else {
    console.log("No user is signed in");
    window.location.href = 'review.html';
  }
}
