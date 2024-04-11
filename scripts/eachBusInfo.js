var storedRouteDocId = localStorage.getItem('routeDocId');

// Get a reference to the document with the id routeDocId in the busroutes collection
const docRef = db.collection('busroutes').doc(storedRouteDocId);

// Get the document
docRef.get().then((doc) => {
  if (doc.exists) {
    // Get the Name field of the document
    const name = doc.data().Name;

    // Set the text of the h1 tag to the Name field of the document
    document.getElementById('route-title').textContent = name;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});

// Function to create a button for each stop
function createStopButton(stopName) {
  const button = document.createElement('button');
  button.classList.add('stop-button');
  button.textContent = stopName;
  return button;
}

// Function to populate the stops
// function populateStops() {
//   const stopsContainer = document.getElementById('stopsContainer');
//   const stopButtonTemplate = document.getElementById('stopButtonTemplate').content;

//   if (storedRouteDocId) {
//     const stopsRef = db.collection('busroutes').doc(storedRouteDocId).collection('stops');
//     stopsRef.get().then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         const stopButton = stopButtonTemplate.querySelector('button').cloneNode(true);
//         stopButton.textContent = doc.id;
//         stopsContainer.appendChild(stopButton);
//       });
//     }).catch((error) => {
//       console.error("Error getting documents: ", error);
//     });
//   } else {
//     console.error('No storedRouteDocId found in local storage.');
//   }
// }

function populateStops() {
  const stopsContainer = document.getElementById('stopsContainer');
  const stopButtonTemplate = document.getElementById('stopButtonTemplate').content;

  // Remove any existing buttons
  while (stopsContainer.firstChild) {
    stopsContainer.removeChild(stopsContainer.firstChild);
  }

  if (storedRouteDocId) {
    const stopsRef = db.collection('busroutes').doc(storedRouteDocId).collection('stops');
    stopsRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const stopButton = stopButtonTemplate.querySelector('button').cloneNode(true);
        stopButton.textContent = doc.id;
        stopButton.id = 'stop' + doc.id;

        // Set the onclick event for the button
        stopButton.onclick = function () {
          window.location.href = 'eachstopinfo.html?stopDocID=' + doc.id;
          localStorage.setItem('stopDocId', doc.id);
        };

        // Create a div for the square
        const square = document.createElement('div');
        square.style.width = '20px';
        square.style.height = '20px';
        square.style.display = 'inline-block';
        square.style.marginRight = '10px';

        // Set the square's color based on the value of the selected time field
        const selectedTime = localStorage.getItem('selectedTime');

        const timeValue = doc.data()[selectedTime.charAt(0).toUpperCase() + selectedTime.slice(1)];
        if (timeValue === '0') {
          square.style.backgroundColor = 'green';
        } else if (timeValue === '1') {
          square.style.backgroundColor = 'yellow';
        } else if (timeValue === '2') {
          square.style.backgroundColor = 'red';
        }

        // Append the square to the button
        stopButton.prepend(square);

        stopsContainer.appendChild(stopButton);
      });
    }).catch((error) => {
      console.error("Error getting documents: ", error);
    });
  } else {
    console.error('No storedRouteDocId found in local storage.');
  }
}


// Function to populate the iframes  using Google Maps API
function populateGoogleMaps() {

  if (storedRouteDocId === "bus110Data") {
    const iframeContainer = document.getElementById('iframeContainer');
    const iframeHTML = `
        <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d41684.55180076159!2d-122.98625453668225!3d49.23309527134242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x5486783c829e3e25%3A0x1fb66ff727045f2a!2sLougheed%20Station%20%40%20Bay%203%2C%20Burnaby%2C%20BC!3m2!1d49.247609999999995!2d-122.8949399!4m5!1s0x5486765ec222daf3%3A0x9e700bc3aaf32bef!2sMetrotown%20Station%20%40%20Bay%201%2C%20Burnaby%2C%20BC!3m2!1d49.226276999999996!2d-123.003299!5e0!3m2!1sen!2sca!4v1712342023049!5m2!1sen!2sca"
        width="600vw" height="450vh" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      `;

    // Insert the iframe into the iframe container
    iframeContainer.innerHTML = iframeHTML;
  } else if (storedRouteDocId === "bus130Data") {
    const iframeContainer = document.getElementById('iframeContainer');
    const iframeHTML = `
        <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d41656.889054947205!2d-123.10337883629313!3d49.26586918540035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x5486765ebf836389%3A0xbc868784e89beba9!2sMetrotown%20Station%20%40%20Bay%204%2C%20Metropolis%20at%20Metrotown%2C%20Burnaby%2C%20BC!3m2!1d49.225794!2d-123.002518!4m5!1s0x5486708c5a614839%3A0x3f568ef06d08057c!2sPhibbs%20Exchange%20%40%20Bay%201%2C%20North%20Vancouver%2C%20BC!3m2!1d49.304939999999995!2d-123.02830999999999!5e0!3m2!1sen!2sca!4v1712342157741!5m2!1sen!2sca"
        width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      `;

    // Insert the iframe into the iframe container
    iframeContainer.innerHTML = iframeHTML;
  } else if (storedRouteDocId === "bus222Data") {
    const iframeContainer = document.getElementById('iframeContainer');
    const iframeHTML = `
        <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d41656.889054947205!2d-123.07705478629313!3d49.26586918540035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x5486765ebe5384c7%3A0x30de4974e65cb11!2sMetrotown%20Station%20%40%20Bay%205%2C%20Burnaby%2C%20BC%20V5H%204J5!3m2!1d49.225919999999995!2d-123.00276!4m5!1s0x5486708c5a614839%3A0x3f568ef06d08057c!2sPhibbs%20Exchange%20%40%20Bay%201%2C%20North%20Vancouver%2C%20BC!3m2!1d49.304939999999995!2d-123.02830999999999!5e0!3m2!1sen!2sca!4v1712340875520!5m2!1sen!2sca"
        width="600vw" height="450vh" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      `;

    // Insert the iframe into the iframe container
    iframeContainer.innerHTML = iframeHTML;
  } else if (storedRouteDocId === "bus25Data") {
    const iframeContainer = document.getElementById('iframeContainer');
    const iframeHTML = `
        <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d83333.91338470577!2d-123.20540932462866!3d49.25394324829286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x5486772fd2168b2f%3A0xa7bc49fde152895d!2sBrentwood%20Station%20%40%20Bay%205%2C%20Burnaby%2C%20BC!3m2!1d49.266329999999996!2d-123.0046301!4m5!1s0x548672b76315cc3d%3A0x6d9f0636b2efc036!2sUBC%20Exchange%20%40%20Unloading%20Only%2C%20Greater%20Vancouver%20A%2C%20BC!3m2!1d49.267741799999996!2d-123.24775269999999!5e0!3m2!1sen!2sca!4v1712342272247!5m2!1sen!2sca"
        width="600vw" height="450vh" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      `;

    // Insert the iframe into the iframe container
    iframeContainer.innerHTML = iframeHTML;
  }

}

function populateStopsMaps() {
  var storedTimeOfDay = localStorage.getItem('selectedTime');
  // Get the container
  const stopsMapContainer = document.getElementById('stopsMap');

  // Check if the map is already loaded
  const existingMap = document.getElementById('stops-map');
  if (existingMap) {
    // If the map is already loaded, do nothing and return
    return;
  }

  // If the map is not loaded, proceed with loading the map
  let stopsMapHTML;

  if (storedRouteDocId === "bus25Data") {

    if (storedTimeOfDay === 'morning') {

      stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/025Morning.png" alt="Map of busy stops for Bus #110 morning hours">`;

    } else if (storedTimeOfDay === 'afternoon') {

      stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/025Afternoon.png" alt="Map of busy stops for Bus #110 mid-day hours">`;

    } else if (storedTimeOfDay === 'evening') {

      stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/025Evening.png" alt="Map of busy stops for Bus #110 evening hours">`;

    } else {

      stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/025Night.png" alt="Map of busy stops for Bus #110 night hours">`;

    }

  } else if (storedRouteDocId === "bus110Data") {

    if (storedTimeOfDay === 'morning') {

      stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/110Morning.png" alt="Map of busy stops for Bus #110 morning hours">`;

    } else if (storedTimeOfDay === 'afternoon') {

      stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/110Afternoon.png" alt="Map of busy stops for Bus #110 mid-day hours">`;

    } else if (storedTimeOfDay === 'evening') {

      stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/110Evening.png" alt="Map of busy stops for Bus #110 evening hours">`;

    } else {

      stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/110Night.png" alt="Map of busy stops for Bus #110 night hours">`;

    }

  } else if (storedRouteDocId === "bus130Data") {

    if (storedTimeOfDay === 'morning') {

      stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/130Morning.png" alt="Map of busy stops for Bus #110 morning hours">`;

    } else if (storedTimeOfDay === 'afternoon') {

      stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/130Afternoon.png" alt="Map of busy stops for Bus #110 mid-day hours">`;

    } else if (storedTimeOfDay === 'evening') {

      stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/130Evening.png" alt="Map of busy stops for Bus #110 evening hours">`;

    } else {

      stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/130Night.png" alt="Map of busy stops for Bus #110 night hours">`;

    }

  } else if (storedRouteDocId === "bus222Data") {

    if (storedTimeOfDay === 'morning') {

      stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/222Morning.png" alt="Map of busy stops for Bus #222 morning hours">`;

    } else if (storedTimeOfDay === 'afternoon') {

      stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/222Afternoon.png" alt="Map of busy stops for Bus #222 mid-day hours">`;

    } else if (storedTimeOfDay === 'evening') {

      stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/222Evening.png" alt="Map of busy stops for Bus #222 evening hours">`;

    } else {

      stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/222Night.png" alt="Map of busy stops for Bus #222 night hours">`;

    }

  }

  if (stopsMapHTML) {
    const mapDiv = document.createElement('div');
    mapDiv.innerHTML = stopsMapHTML;

    // Append the new div to the container
    stopsMapContainer.appendChild(mapDiv);
  }
}


function removeStopsMaps() {
  // Get the container
  const stopsMapContainer = document.getElementById('stopsMap');

  // Get the last child of the container
  const lastChild = stopsMapContainer.lastChild;

  // Check if the last child is a div (and not the button)
  if (lastChild && lastChild.nodeName === 'DIV') {
    // Remove the last child (the div)
    stopsMapContainer.removeChild(lastChild);
  }
}



// Call the functions when the window loads
window.onload = function () {
  populateGoogleMaps();
  updateTimeOfDay('morning');
};

function updateTimeOfDay(timeOfDay) {
  localStorage.setItem('selectedTime', timeOfDay);
  populateStops();
  const existingMap = document.getElementById('stops-map');
  if (existingMap) {
    removeStopsMaps();
    populateStopsMaps();
  }
}

function loadImage(timeOfDay) {
  var imageNumber = '#'; // Replace with the actual number or logic to determine the image number
  var imageUrl = timeOfDay + 'bus' + imageNumber;
  document.getElementById('stopsMap').style.backgroundImage = 'url(' + imageUrl + ')';
}