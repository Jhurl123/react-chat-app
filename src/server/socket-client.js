
const io = require('socket.io-client')
const PORT = process.env.PORT || 8080;

const socket = io()

const sendMessage = (userIds, message) => {
  socket.emit('sendMessage', {userIds, message})
}

const setMessages = messages => {
  socket.emit('setMessages', messages )
}

const addUser = userId => {
  socket.emit('addUser', userId)
  addUserConnect(userId)
}

const addUserConnect = (userId) => {
  
  socket.on('addUserConnect', () => {
    socket.emit('addUser', userId)
  })
}

const messageListener = (messages, cb) => {
  console.log("Called the message Listener")
  socket.on('updateMessages', (message) => { 

    const userId = JSON.parse(localStorage.getItem('user')).userId
    
    if(message.message.userId !== userId) {

      cb(prevState =>  {
        console.log(prevState);
        
        return [message.message, ...prevState]
      })
    }
  })
}

const conversationListener = (conversations, cb) => {
  console.log("Called the conversations Listener")
  socket.on('updateConversations', (conversation) =>  {
    console.log("This conversation listener was called");  
    console.log(conversations);
    
    cb([conversation, ...conversations])
  })
}

const setConversations = conversations => {
  socket.emit('setConversations', conversations)
}

const startConversation = (userIds, conversation, message) => {
  socket.emit('sendMessage', {userIds, message})
  socket.emit('startConversations', {userIds, conversation})
}


export default {
  socket,
  addUser,
  addUserConnect,
  sendMessage,
  setMessages,
  messageListener,
  conversationListener,
  setConversations,
  startConversation
}


