const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const path = require('path');
const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const dbRoutes = require('./routes/db-routes')

// Create server connection
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT)
const io = require('socket.io')(server, { origins: '*:*'})
io.on('connection', function (client) {

  // Include client files 
  // const dbFunctions = require('./socket-client')

  let messages = [];
  client.on('connect', function () {
    console.log('client connected boiii...', client.id)
    // handleDisconnect()
  })

  client.on('getMessages', (id) => dbFunctions.getMessages(id))

  client.on('join', () => console.log("testseresr"))

  client.on('sendMessage', (message) => messages.push(message))
  client.on('receiveMessage', (message) => messages.push(message))

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