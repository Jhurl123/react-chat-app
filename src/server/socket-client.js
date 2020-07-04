
const io = require('socket.io-client')
const PORT = process.env.PORT || 8080;

const socket = io()

const sendMessage = message => {
  socket.emit('sendMessage', () => message.message)
}

const setMessages = messages => {
  socket.emit('setMessages', messages )
}

const messageListener = (messages, cb) => {
  console.log("Called the message Listener")
  socket.on('updateMessages', (messages) => cb(messages))
}

const conversationListener = (conversations, cb) => {
  console.log("Called the conversations Listener")
  socket.on('updateConversations', (conversations) => cb(conversations))
}

const setConversations = conversations => {
  socket.emit('setConversations', conversations)
}

export default {
  socket,
  sendMessage,
  setMessages,
  messageListener,
  conversationListener,
  setConversations
}


