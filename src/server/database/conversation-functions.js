const db = require('./db-connect')

exports.startConversation = async (users, userIds, message) => {

  if(message.length > 25) {
    // Don't let the excerpt overflow
    excerpt = message.substring(0, 25) + '...'
  }
  else {
    excerpt = message
  }

  const timestamp = new Date()

  // At this point the data will already be formatted as it should be, if not, throw error
  // Shouild return the conversation ids
  let conversationRef = db.db.collection('conversations')
  let addConversation = conversationRef.add({users, userIds, timestamp})
  .then( ref => {

    let conversation = {
      id: ref.id,
      users,
      excerpt: excerpt
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
  let conversationQuery = conversationRef.where('userIds', 'array-contains', userId).orderBy('timestamp').get()  
    .then(snapshot => {
      if(snapshot.empty) {
        
        return []
      }
      else {
        let conversations = []

        snapshot.forEach(doc => {
          const data = doc.data() 
          let conversation = {
            id: doc.id,
            users: data.users,
            excerpt: data.excerpt,
            timestamp: data.timestamp,
          } 
          conversations.push(conversation)
        })

        conversations = conversations.sort(function(a,b) {
          return new Date(b.timestamp._seconds) - new Date(a.timestamp._seconds);
        });
        
        return conversations
      }
    })
    .catch( err => {
      console.log(err);
      
      throw Error(err)
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

  const timestamp = new Date()

  try {
    let conversationRef = db.db.collection('conversations').doc(message.convoId)
    conversationRef.update({excerpt, timestamp})
    return true
  }
  catch(err) {
    throw Error(err)
  }

}

