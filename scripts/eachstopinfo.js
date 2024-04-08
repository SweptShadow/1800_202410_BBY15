var storedRouteDocId = localStorage.getItem('stopDocId');

console.log(storedRouteDocId);

// Function to create a button for each stop
function createStopButton(stopName) {
  const button = document.createElement('button');
  button.classList.add('stop-button');
  button.textContent = stopName;
  return button;
}

// Function to populate the stops
function populateStops() {
  const stopsContainer = document.getElementById('stopsContainer');
  const stopButtonTemplate = document.getElementById('stopButtonTemplate').content;
  const stopNameSpan = document.getElementById('stopName'); // Get the span element

  if (storedRouteDocId) {
    if (typeof stopDocId !== 'undefined') {
      stopNameSpan.textContent = storedRouteDocId; // Populate the span with stopDocId
    } else {
      console.error('stopDocId is not defined.');
    }
    const stopsRef = db.collection('busroutes').doc(storedRouteDocId).collection('stops');
    stopsRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const stopButton = stopButtonTemplate.querySelector('button').cloneNode(true);
        stopButton.textContent = doc.id;
        stopsContainer.appendChild(stopButton);
      });
    }).catch((error) => {
      console.error("Error getting documents: ", error);
    });
  } else {
    console.error('No storedRouteDocId found in local storage.');
  }
}

// Call the functions when the window loads
window.onload = function () {
  populateStops();
};

function updateTimeOfDay(timeOfDay) {
  localStorage.setItem('selectedTime', timeOfDay);
  loadImage(timeOfDay);
}

function loadImage(timeOfDay) {
  var imageNumber = '#'; // Replace with the actual number or logic to determine the image number
  var imageUrl = timeOfDay + 'bus' + imageNumber;
  document.getElementById('stopsMap').style.backgroundImage = 'url(' + imageUrl + ')';
}

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

// Add this event listener to the button in your eachstopinfo.html
document.getElementById('writeReviewButton').addEventListener('click', redirectToReview);


function populateReviews() {
  // Reference to the Firestore collection where reviews are stored
  const reviewsRef = db.collection('busroutes').doc(currentRoute)
    .collection('stops').doc(currentStop).collection('reviews');

  // Get the reviews from Firestore
  reviewsRef.get().then((querySnapshot) => {
    const reviewCardGroup = document.getElementById('reviewCardGroup');
    const reviewCardTemplate = document.getElementById('reviewCardTemplate').content;

    querySnapshot.forEach((doc) => {
      const review = doc.data();
      const reviewCard = reviewCardTemplate.cloneNode(true);

      // Populate the card with review data
      reviewCard.querySelector('.route-name').textContent = review.routeName;
      reviewCard.querySelector('.busy-level').textContent = review.busy;
      reviewCard.querySelector('.recommend-status').textContent = review.recommend ? 'Yes' : 'No';
      reviewCard.querySelector('.time-of-review').textContent = review.time;

      // Append the populated card to the review card group
      reviewCardGroup.appendChild(reviewCard);
    });
  });
}

// Call this function when you want to populate the reviews
populateReviews();
