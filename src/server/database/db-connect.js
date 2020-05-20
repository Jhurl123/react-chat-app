var firebase = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

// Connect to the firestore db
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://whats-popping-2b040.firebaseio.com/"
});

let db = firebase.firestore();

exports.db = db