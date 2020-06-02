// Connect to DB
const db = require('./db-connect')
var firebase = require("firebase-admin")
const JWT = require('jsonwebtoken');

// Add a new document in collection "cities" with ID 'LA'
// Valid way to send data to a users collection

// db.db.collection('users').doc().set(data);

// getUsers()
// var usersRef = ref.child("users");

exports.sendMessage = (message) => {
  // Send message logic
  console.log( "Database " + message);
  message['timestamp'] = new Date()

  let messageRef = db.db.collection('messages');
  let response = messageRef.doc().set(message)
  .then(() => true)
  .catch(err => {
    console.log(err);
    
    throw Error(err)
  })

  return response
}

exports.getMessages = (id) => {
  
  let messageRef = db.db.collection('messages');

  let messages = messageRef.get()
  .then(snapshot => {
    let messages = []

    if(snapshot.empty) {
      console.log('No matching documents')
      return []
    }
    
    snapshot.forEach(doc => {
      let message = doc.data()
      console.log(message);
      console.log(doc.id);
      
      
      message['id'] = doc.id
      messages.push(message)
    });

    messages = messages.sort(function(a,b) {
      return new Date(b.timestamp._seconds) - new Date(a.timestamp._seconds);
    });
    // console.log(messages);
    
    return messages
  })
  .catch(err => {
    console.log(err);
    
    return err.message
  });
  
  return messages
}