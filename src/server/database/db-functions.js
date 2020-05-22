// Connect to DB
const db = require('./db-connect')
var firebase = require("firebase-admin");

// Add a new document in collection "cities" with ID 'LA'
// Valid way to send data to a users collection

// db.db.collection('users').doc().set(data);

// getUsers()
// var usersRef = ref.child("users");

// Valid example of querying data
exports.getUsers = () => {
  let usersRef = db.db.collection('users');
  usersRef.where('id', '==', '69').get()
  .then(snapshot => {
    if(snapshot.empty) {
      console.log('No matching documents')
      return
    }

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });

  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
}

exports.sendMessage = (message) => {
  // Send message logic
  console.log(message);
  message['timestamp'] = new Date()
  let messageRef = db.db.collection('messages');
  let response = messageRef.doc().set(message)
  .then(() => true)
  .catch(err => {
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
      messages.push(doc.data())
    });

    messages = messages.sort(function(a,b) {
      return new Date(b.timestamp._seconds) - new Date(a.timestamp._seconds);
    });
    console.log(messages);
    
    return messages
  })
  .catch(err => {
    console.log(err);
    
    return err.message
  });
  
  return messages
}