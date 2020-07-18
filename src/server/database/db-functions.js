const db = require('./db-connect')
const JWT = require('jsonwebtoken');

exports.sendMessage = async (newMessage) => {

  const { userToken, message } = newMessage
  let validJWT = await validateJWT(userToken)
  message['timestamp'] = new Date()

  if(!validJWT) return

  let messageRef = db.db.collection('messages');
  let response = messageRef.add(message)
  .then((data) => {

    if(!data) throw Error()

    message['id'] = data.id
    
    this.markUnread(message)
    
    return data.id

  })
  .catch(err => {
    console.log(err);
    
    throw Error(err)

  })

  return response
}

exports.getMessages = (id) => {
  
  let messageRef = db.db.collection('messages');

  let messages = messageRef.where('users', 'array-contains', id).orderBy('users').orderBy('timestamp').get()
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

exports.markRead = (message) => {

  try {
    let messageRef = db.db.collection('messages').doc(message.id)
    messageRef.update({unread: message.unread})
    return true
  }
  catch(err) {
    throw Error(err)
  }

}

exports.markUnread = (message) => {
  
  try {
    const unreadUsers = message.users.filter(user => user !== message.userId)

    let messageRef = db.db.collection('messages').doc(message.id)
    messageRef.update({unread: unreadUsers})
    return true
  }
  catch(err) {
    throw Error(err)
  }

}