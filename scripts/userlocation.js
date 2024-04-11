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
        // alert("Please allow location access");
        return;
      } else {
        // alert("Position Unavailable");
        return;
      }

    }

    const options = {

      enableHighAccuracy: true,
      timeout: 5000

    };

    navigator.geolocation.watchPosition(success, error, options);
  }
});