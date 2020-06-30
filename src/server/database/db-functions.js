// Connect to DB
const db = require('./db-connect')
var firebase = require("firebase-admin")
const JWT = require('jsonwebtoken');

// Add a new document in collection "cities" with ID 'LA'
// Valid way to send data to a users collection

// db.db.collection('users').doc().set(data);

// getUsers()
// var usersRef = ref.child("users");

exports.sendMessage = async (newMessage) => {

  const { userToken, message } = newMessage
  let validJWT = await validateJWT(userToken)
  message['timestamp'] = new Date()

  if(!validJWT) return

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
      message['id'] = doc.id
      messages.push(message)
    });

    messages = messages.sort(function(a,b) {
      return new Date(b.timestamp._seconds) - new Date(a.timestamp._seconds);
    });
    
    return messages
  })
  .catch(err => {
    console.log(err);
    
    return err.message
  });
  
  return messages
}

const validateJWT = async (token) => {

  let validJWT = false

  // Verify that the user is signed in and valid
  await JWT.verify(token, process.env.JSON_SECRET,  (err, token) => {

    if(err) {
      validJWT = false
      throw Error('You aren\'t authorized to perform this action')
    }
    else {
      validJWT = true
    }
  })

  return validJWT
}