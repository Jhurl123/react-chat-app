const io = require('socket.io-client')
const PORT = process.env.PORT || 8080;

export default function () {
  const socket = io.connect(`http://localhost:${PORT}`)

  const connectSocket = () => {
    socket.emit('join', 'test')
  }

  const sendMessage = (message) => {
    console.log(message);
    
    socket.emit('sendMessage', message)
  }

  const receiveMessage = (message) => {
    socket.emit('receiveMessage', message)
  }

  const getMessages = (id) => {
    socket.emit('getMessages', {id: 1})
  }

  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })

  return {
    connectSocket,
    sendMessage,
    receiveMessage
  }
}
