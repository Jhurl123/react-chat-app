const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const path = require('path');
const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser')
const socketEvents = require('./socket-connect')
app.use(bodyParser.json());

const dbRoutes = require('./routes/db-routes')

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

  client.on('sendMessage', message => socketMessages.push(message))

  client.on('setMessages', (messages) => {
    console.log(messages);
    socketMessages = messages
  })

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    // handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

// app.use(express.static(path.join(__dirname, '../../build/')));
// The above is the correct bath to serve files from
app.use(express.static(path.join(__dirname, '../../build/')));


app.use(dbRoutes);


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'))
  // res.sendFile(path.join(__dirname, '../../src/index.html'));
});