const db = require('./db-connect')

exports.startConversation = async users => {

  // At this point the data will already be formatted as it should be, if not, throw error
  // Shouild return the conversation ids
  let conversationRef = db.db.collection('conversations')
  let addConversation = conversationRef.add({users})
  .then( ref => {
    console.log(ref.id);
    return ref.id
  })
  .catch( err => {
    throw Error(err)
  })

  return addConversation
    

}