const db = require('./db-connect')

exports.startConversation = async users => {

  // At this point the data will already be formatted as it should be, if not, throw error
  // Shouild return the conversation ids
  let conversationRef = db.db.collection('conversations')
  let addConversation = conversationRef.add({users})
  .then( ref => {
    let conversation = {
      id: ref.id,
      users,
      timestamp: new Date()
    }
    return conversation
  })
  .catch( err => {
    throw Error(err)
  })

  return addConversation
    

}

exports.getConversations = async userId => {
  
  let conversationRef = db.db.collection('conversations')
  let conversationQuery = conversationRef.where('users', 'array-contains', userId).get()  
    .then(snapshot => {
      if(snapshot.empty) {
        return false
      }
      else {
        let conversations = []

        snapshot.forEach(doc => {
          const data = doc.data() 
          let conversation = {
            id: doc.id,
            users: data.users
          } 
          conversations.push(conversation)
        })
        
        return conversations
      }
    })

    return conversationQuery
}

exports.addExcerpt = async message => {

  let excerpt = ''
  console.log(message);
  

  if(message.content.length > 25) {
    // Don't let the excerpt overflow
    excerpt = message.content.substring(0, 25) + '...'
  }
  else {
    excerpt = message.content
  }

  try {
    let conversationRef = db.db.collection('conversations').doc(message.convoId)
    conversationRef.update({excerpt})
    return true
  }
  catch(err) {
    throw Error(err)
  }

}