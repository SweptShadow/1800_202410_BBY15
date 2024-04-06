var storedRouteDocId = localStorage.getItem('routeDocId');

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

    if (storedRouteDocId) {
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

// Function to populate the iframe
function populateGoogleMaps() {

    if (storedRouteDocId === "bus110Data") {
        const iframeContainer = document.getElementById('iframeContainer');
        const iframeHTML = `
        <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d41684.55180076159!2d-122.98625453668225!3d49.23309527134242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x5486783c829e3e25%3A0x1fb66ff727045f2a!2sLougheed%20Station%20%40%20Bay%203%2C%20Burnaby%2C%20BC!3m2!1d49.247609999999995!2d-122.8949399!4m5!1s0x5486765ec222daf3%3A0x9e700bc3aaf32bef!2sMetrotown%20Station%20%40%20Bay%201%2C%20Burnaby%2C%20BC!3m2!1d49.226276999999996!2d-123.003299!5e0!3m2!1sen!2sca!4v1712342023049!5m2!1sen!2sca"
        width="600vw" height="450vh" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      `;

        // Insert the iframe into the iframe container
        iframeContainer.innerHTML = iframeHTML;
    }

    if (storedRouteDocId === "bus130Data") {
        const iframeContainer = document.getElementById('iframeContainer');
        const iframeHTML = `
        <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d41656.889054947205!2d-123.10337883629313!3d49.26586918540035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x5486765ebf836389%3A0xbc868784e89beba9!2sMetrotown%20Station%20%40%20Bay%204%2C%20Metropolis%20at%20Metrotown%2C%20Burnaby%2C%20BC!3m2!1d49.225794!2d-123.002518!4m5!1s0x5486708c5a614839%3A0x3f568ef06d08057c!2sPhibbs%20Exchange%20%40%20Bay%201%2C%20North%20Vancouver%2C%20BC!3m2!1d49.304939999999995!2d-123.02830999999999!5e0!3m2!1sen!2sca!4v1712342157741!5m2!1sen!2sca"
        width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      `;

        // Insert the iframe into the iframe container
        iframeContainer.innerHTML = iframeHTML;
    }

    if (storedRouteDocId === "bus222Data") {
        const iframeContainer = document.getElementById('iframeContainer');
        const iframeHTML = `
        <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d41656.889054947205!2d-123.07705478629313!3d49.26586918540035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x5486765ebe5384c7%3A0x30de4974e65cb11!2sMetrotown%20Station%20%40%20Bay%205%2C%20Burnaby%2C%20BC%20V5H%204J5!3m2!1d49.225919999999995!2d-123.00276!4m5!1s0x5486708c5a614839%3A0x3f568ef06d08057c!2sPhibbs%20Exchange%20%40%20Bay%201%2C%20North%20Vancouver%2C%20BC!3m2!1d49.304939999999995!2d-123.02830999999999!5e0!3m2!1sen!2sca!4v1712340875520!5m2!1sen!2sca"
        width="600vw" height="450vh" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      `;

        // Insert the iframe into the iframe container
        iframeContainer.innerHTML = iframeHTML;
    }

    if (storedRouteDocId === "bus25Data") {
        const iframeContainer = document.getElementById('iframeContainer');
        const iframeHTML = `
        <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d83333.91338470577!2d-123.20540932462866!3d49.25394324829286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x5486772fd2168b2f%3A0xa7bc49fde152895d!2sBrentwood%20Station%20%40%20Bay%205%2C%20Burnaby%2C%20BC!3m2!1d49.266329999999996!2d-123.0046301!4m5!1s0x548672b76315cc3d%3A0x6d9f0636b2efc036!2sUBC%20Exchange%20%40%20Unloading%20Only%2C%20Greater%20Vancouver%20A%2C%20BC!3m2!1d49.267741799999996!2d-123.24775269999999!5e0!3m2!1sen!2sca!4v1712342272247!5m2!1sen!2sca"
        width="600vw" height="450vh" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      `;

        // Insert the iframe into the iframe container
        iframeContainer.innerHTML = iframeHTML;
    }

}

// function populateStopsMaps() {

//     const stopsMapContainer = document.getElementById('stopsMap');
//     const stopsMapHTML = `<img class="draggable" id="stops-map" src="./images/222.png" alt="Map of busy stops for Bus #222">`;

//     stopsMapContainer.innerHTML = stopsMapHTML;

// }

// Call the functions when the window loads
window.onload = function () {
    populateStops();
    populateGoogleMaps();
    // populateStopsMaps();
};

document.addEventListener('DOMContentLoaded', (event) => {
    const mapImage = document.getElementById('mapImage');
    const container = document.getElementById('container');
    let isDragging = false;
    let x = 0;
    let y = 0;

    mapImage.addEventListener('mousedown', (e) => {
        isDragging = true;
        x = e.clientX - mapImage.offsetLeft;
        y = e.clientY - mapImage.offsetTop;
        mapImage.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let dx = e.clientX - x;
            let dy = e.clientY - y;

            // Get the boundaries of the container
            const containerRect = container.getBoundingClientRect();
            const imageRect = mapImage.getBoundingClientRect();

            // Calculate the new position of the image
            let newLeft = dx;
            let newTop = dy;

            // Check if the image is within the boundaries
            if (newLeft > 0) newLeft = 0;
            if (newTop > 0) newTop = 0;
            if (newLeft < containerRect.width - imageRect.width) newLeft = containerRect.width - imageRect.width;
            if (newTop < containerRect.height - imageRect.height) newTop = containerRect.height - imageRect.height;

            // Set the new position of the image
            mapImage.style.left = newLeft + 'px';
            mapImage.style.top = newTop + 'px';
        }
    });

    document.addEventListener('mouseup', (e) => {
        isDragging = false;
        mapImage.style.cursor = 'grab';
    });

    // Prevent the default drag behavior
    mapImage.ondragstart = function () { return false; };
});

