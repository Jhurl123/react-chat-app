const express = require('express');
let bodyParser = require("body-parser");
const router = express.Router();
const db = require('../database/db-connect')
const convFunctions = require('../database/conversation-functions')

router.post('/start_conversation', async (req, res) => {
  try {
    const { users } = req.body
    
    let conversationId = await convFunctions.startConversation(users)

    if( conversationId ) res.status(200).send({conversationId})

  }
  catch(err) {
    console.log(err);
    res.status(500).send("Could not start conversation")
  }
})

module.exports = router;