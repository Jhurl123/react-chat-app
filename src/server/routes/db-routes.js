const express = require('express');
let bodyParser = require("body-parser");
const router = express.Router();
const db = require('../database/db-connect')
const dbFunctions = require('../database/db-functions')
const socketEvents = require('../socket-connect')

router.get('/get_messages', async (req, res) => {
  try {
    let messages = await dbFunctions.getMessages()
    res.send(messages)
  }
  catch(err) {
    console.log(err);
    
    res.status(500).send('Could not get all messages')
  }
})

router.post('/send_message', async (req, res) => { 
  
  try {
    let response = await dbFunctions.sendMessage(req.body)
    socketEvents.sendMessage(req.body)
    res.send(true)
  }
  catch (err) {
    console.log(err);
    
    res.status(500).send('Could not insert new message')
  }
})

module.exports = router;