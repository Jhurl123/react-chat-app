
const io = require('socket.io-client')
const PORT = process.env.PORT || 8080;

const socket = io.connect(`http://localhost:${PORT}`)

const sendMessage = message => {
  socket.emit('sendMessage', () => message)
}

const setMessages = messages => {
  socket.emit('setMessages', { messages })
}

export default {
  sendMessage,
  setMessages
}


