// Function to redirect user to either landing page or login page depending on if they are logged in or not
firebase.auth().onAuthStateChanged((user) => {

    setTimeout(() => {
        if (user) {

            window.location.assign("landing.html");
    
        } else  {
    
            window.location.assign("login.html");
    
        }
    }, 1200);

});