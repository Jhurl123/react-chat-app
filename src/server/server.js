const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT)
const io = require('socket.io')(server, { origins: '*:*'})

io.on('connection', function (client) {

  client.on('connect', function () {
    console.log('client connected boiii...', client.id)
    // handleDisconnect()
  })

  client.on('join', () => console.log("testseresr"))
  
  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    // handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
