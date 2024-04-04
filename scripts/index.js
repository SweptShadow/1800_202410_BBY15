firebase.auth().onAuthStateChanged((user) => {

    setTimeout(() => {
        if (user) {

            window.location.assign("landing.html");
    
        } else  {
    
            window.location.assign("login.html");
    
        }
    }, 1200);

});