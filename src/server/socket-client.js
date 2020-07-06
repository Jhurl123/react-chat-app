
const io = require('socket.io-client')
const PORT = process.env.PORT || 8080;

const socket = io()

const sendMessage = (userIds, message) => {
  console.log(userIds);
  console.log(message);
  

  socket.emit('sendMessage', {userIds, message})
}

const setMessages = messages => {
  socket.emit('setMessages', messages )
}

const addUser = userId => {
  socket.emit('addUser', userId)
}

const messageListener = (messages, cb) => {
  console.log("Called the message Listener")
  socket.on('updateMessages', (message) => { 

    cb(prevState => {
      console.log(prevState);
      console.log(message);
      
      return [message.message, ...prevState]
    })
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


