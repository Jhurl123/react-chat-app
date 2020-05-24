
const io = require('socket.io-client')
const PORT = process.env.PORT || 8080;

const socket = io.connect(`http://localhost:${PORT}`)

const sendMessage = message => {
  socket.emit('sendMessage', () => message)
}

const setMessages = messages => {
  socket.emit('setMessages', { messages })
}

const messageListener = messages => {
  socket.on('updateMessages', () => console.log("This is shit"))
}

export default {
  socket,
  sendMessage,
  setMessages,
  messageListener
}


