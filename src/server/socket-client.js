
const io = require('socket.io-client')
const PORT = process.env.PORT || 8080;

const socket = io()

const sendMessage = message => {
  socket.emit('sendMessage', () => message.message)
}

const setMessages = messages => {
  socket.emit('setMessages', messages )
}

const addUser = userName => {
  socket.emit('addUser', userName)
}

const messageListener = (messages, cb) => {
  console.log("Called the message Listener")
  socket.on('updateMessages', (messages) => { 
    console.log("Update messages was called");
    
    cb(messages)
  })
}

const conversationListener = (conversations, cb) => {
  console.log("Called the conversations Listener")
  socket.on('updateConversations', (conversations) =>  {
    console.log("This conversation listener was called");  
    cb(conversations)
  })
}

const setConversations = conversations => {
  socket.emit('setConversations', conversations)
}

export default {
  socket,
  addUser,
  sendMessage,
  setMessages,
  messageListener,
  conversationListener,
  setConversations
}


