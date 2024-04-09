//----------------------------------------------------------
// This function is the only function that's called.
// This strategy gives us better control of the page.
//----------------------------------------------------------
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            getBookmarks(user)
        } else {
            console.log("No user is signed in");
        }
    });
}
doAll();

//----------------------------------------------------------
// This function takes input param User's Firestore document pointer
// and retrieves the "saved" array (of bookmarks) 
// and dynamically displays them in the gallery
//----------------------------------------------------------
function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {

            // Get the Array of bookmarks
            var bookmarks = userDoc.data().bookmarks;
            console.log(bookmarks);

            // Get pointer the new card template
            let newcardTemplate = document.getElementById("savedCardTemplate");

            // Iterate through the ARRAY of bookmarked hikes (document ID's)
            bookmarks.forEach(thisRouteID => {

                if (thisRouteID != "x") {

                    thisRouteID = thisRouteID + 'Data';

                    console.log(thisRouteID);
                    db.collection("busroutes").doc(thisRouteID).get().then(doc => {
                        var title = doc.data().Name;
                        var routeStart = doc.data().Route_start;
                        var routeEnd = doc.data().Route_end;
                        var busDocID = "bus" + doc.data().Code + "Data"
                        var title = doc.data().Name;


                        //clone the new card
                        let newcard = newcardTemplate.content.cloneNode(true);
                        var button = newcard.querySelector('.button-30');

                        //update title and some pertinant information
                        newcard.querySelector('.card-title').innerHTML = title;
                        newcard.querySelector('.route-start').innerHTML = routeStart;
                        newcard.querySelector('.route-end').innerHTML = routeEnd;
                        button.onclick = function () {
                            window.location.href = 'eachbusInfo.html?busRoutesDocID=bus' + doc.data().Code;
                            localStorage.setItem('routeDocId', busDocID);
                        };

                        //Finally, attach this new card to the gallery
                        routeCardGroup.appendChild(newcard);
                    })

                }


            });
        })
}