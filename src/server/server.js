const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const path = require('path');
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser')
const app = express();
const bodyParser = require('body-parser')
// const socketClient = require('./socket-client')
app.use(bodyParser.json());
app.use(cookieParser())

const dbRoutes = require('./routes/db-routes')
const convRoutes = require('./routes/conversation-routes')

// Create server connection
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT)
const io = require('socket.io')(server, { origins: '*:*'})
io.on('connection', function (client) {

  let socketMessages = [];

  client.on('connect', function () {
    console.log('client connected boiii...', client.id)
    // handleDisconnect()
  })

  client.on('join', () => console.log("testseresr"))

  client.on('setMessages', (messages) => {
    socketMessages = messages
    client.emit('updateMessages', socketMessages)
  })

  client.on('setConversations', (conversations) => {
    socketConversations = conversations
    client.emit('updateConversations', socketConversations)
  })

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

// app.use(express.static(path.join(__dirname, '../../build/')));
// The above is the correct bath to serve files from
app.use(express.static(path.join(__dirname, '../../build/')));


app.use(dbRoutes)
app.use(convRoutes)


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'))
  // res.sendFile(path.join(__dirname, '../../src/index.html'));
});