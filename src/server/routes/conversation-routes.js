const express = require('express');
let bodyParser = require("body-parser");
const router = express.Router();
const db = require('../database/db-connect')
const convFunctions = require('../database/conversation-functions')

router.post('/get_conversations', async (req, res) => {

  try {
    const { userId } = req.body
    let conversations = await convFunctions.getConversations(userId)
    if( conversations ) res.status(200).send({conversations})
  }
  catch(err) {
    console.log(err);
    res.status(500).send("Could not get conversations")
  }
  
})

router.post('/start_conversation', async (req, res) => {

  try {
    const { users, message, userIds } = req.body
    let conversation = await convFunctions.startConversation(users, userIds, message)
    if( conversation ) res.status(200).send({conversation})

  }
  catch(err) {
    console.log(err);
    res.status(500).send("Could not start conversation")
  }

})

module.exports = router;