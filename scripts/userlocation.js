firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    function success(pos) {
      //obtaining the users location
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      console.log(pos);
      //updating the db with the user location
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

    if (!navigator.geolocation) {
      throw new Error("No geolocation available");
    }

    navigator.geolocation.watchPosition(success, error, options);
  }
});