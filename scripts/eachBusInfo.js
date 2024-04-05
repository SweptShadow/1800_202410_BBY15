var storedRouteDocId = localStorage.getItem('routeDocId');

console.log(storedRouteDocId);



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

// Call populateStops when the window loads
window.onload = populateStops;