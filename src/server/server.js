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
const convRoutes = require('./routes/conversation-routes');
const { useIsFocusVisible } = require('@material-ui/core');

// Create server connection
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT)
const io = require('socket.io')(server, { origins: '*:*'})
let clients = {};
io.on('connection', function (client) {

  client.on('connect', function () {
    // clients.push(client.id)
    // console.log(clients)
    console.log('client connected boiii...', client.id)
    // handleDisconnect()
  })

  client.on('addUser', (userId) => {    
    clients[userId] = client
  })

  client.on('sendMessage', ({userIds, message}) => {
    userIds.forEach(id => clients[id].emit('updateMessages', message))
  })

  // client.on('setConversations', (conversations) => {
  //   socketConversations = conversations
  //   client.emit('updateConversations', socketConversations)
  // })

  client.on('startConversations', ({userIds, conversation}) => {

    console.log(conversation);
    
    userIds.forEach(id => clients[id].emit('updateConversations', conversation))
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