var storedRouteDocId = localStorage.getItem('routeDocId');
var storedStopDocId = localStorage.getItem('stopDocId');

console.log(storedRouteDocId);

// Function to redirect user to reviews page
function redirectToReview() {
  // Get the URL from the search bar
  let params = new URL(window.location.href);
  // Get the document ID from the URL parameters
  let ID = params.searchParams.get("docID");
  // Store the document ID in local storage under a key that reflects the current context
  localStorage.setItem('stopDocID', ID);
  // Redirect to the review.html page
  window.location.href = 'review.html';
}

// MODIFIED DEMO CODE!
// Function to populate the reviews
function populateReviews() {
  // Reference to the Firestore collection where reviews are stored
  const reviewsRef = db.collection('busroutes').doc(storedRouteDocId)
    .collection('stops').doc(storedStopDocId).collection('reviews');

  // Get the reviews from Firestore
  reviewsRef.get().then((querySnapshot) => {
    const reviewCardGroup = document.getElementById('reviewCardGroup');
    const reviewCardTemplate = document.getElementById('reviewCardTemplate').content;

    querySnapshot.forEach((doc) => {
      const review = doc.data();
      const reviewCard = reviewCardTemplate.cloneNode(true);
      // let reviewCreatorId = review.userID;

      // Populate the card with review data
      reviewCard.querySelector('.route-name').textContent = review.stop;
      reviewCard.querySelector('.busy-level').textContent = review.busy;
      reviewCard.querySelector('.recommend-status').textContent = review.recommend ? 'Yes' : 'No';
      reviewCard.querySelector('.time-of-review').textContent = review.timestamp.toDate();
        
      // Append the populated card to the review card group
      reviewCardGroup.appendChild(reviewCard);
    });
  });
}

populateReviews();

// Function to populate the stop name
function populateStopName() {

  //Check if the stopName is not null or undefined
  if (stopName) {
    //Find the span element by its ID
    var spanElement = document.getElementById('stopName');

    //Update the text content of the span element
    spanElement.textContent = storedStopDocId;
  } else {
    console.log('No stop name found in local storage.');
  }
}

populateStopName();
