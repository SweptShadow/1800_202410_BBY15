import { db } from './firebaseAPI_BWS';
import { getUserId } from './authentication';

// Function to get user's current location
function getUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Function to update user location data in Firestore
async function updateUserLocation(userId, location) {
  await db.collection('users').doc(userId).set({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  }, { merge: true });
}

// Main function to get user location and update Firestore
async function trackUserLocation() {
  const userId = getUserId(); // get user ID from authentication module
  const location = await getUserLocation();
  await updateUserLocation(userId, location);
}
