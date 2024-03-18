// Fetch data and populate the containers in landing
db.collection("busroutes").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());

    // Get the container element
    var container = document.getElementById(doc.id);

    // Check if the container exists
    if (container) {
      // Populate the container with data pulled
      container.innerHTML = JSON.stringify(doc.data());
    }
  });
});