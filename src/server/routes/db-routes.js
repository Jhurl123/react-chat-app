const express = require('express');
let bodyParser = require("body-parser");
const router = express.Router();
const db = require('../database/db-connect')
const dbFunctions = require('../database/db-functions')

router.get('/get_messages', async (req, res) => {
  let messages = await dbFunctions.getMessages()
  res.send(messages)
})

router.post('/send_message', async (req, res) => {  
  let response = await dbFunctions.sendMessage(req.body)

  if(response) { 
    res.send(true)
  }
  else {
    res.send(false)
  }
})

module.exports = router;