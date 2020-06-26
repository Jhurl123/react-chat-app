const express = require('express');
let bodyParser = require("body-parser");
const router = express.Router();
const db = require('../database/db-connect')
const dbFunctions = require('../database/db-functions')
const socketEvents = require('../socket-connect')
const userFunctions = require('../database/user-functions')
const convFunctions = require('../database/conversation-functions')
const JWT = require('jsonwebtoken')

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
    const { message } = req.body

    let response = await dbFunctions.sendMessage(req.body)
    socketEvents.sendMessage(req.body)
    const authToken = req.cookies['authToken']
    const validateJWT = JWT.verify(authToken, process.env.JSON_SECRET)

    // Add the excerpt from the message to its conversation
    convFunctions.addExcerpt(message)
    
    res.send(true)
  }
  catch (err) {
    console.log(err);
    
    res.status(500).send('Could not insert new message')
  }
})

router.post('/user_signup', async (req, res) => {
  try {

    const { userName, password } = req.body
    
    const userNameRes = await userFunctions.checkForUsername(userName)
    const passwordRes = await userFunctions.hashPassword(password)
    // Insert the token here
    
    // UN wasn't found in the database and pw was created correctly
    if (!userNameRes && passwordRes ) {
      const userRes = await userFunctions.insertUser({userName, password: passwordRes})

      console.log(userRes);
      

      // Create token here
      let resObject = {
        status: 'User Successfully added', 
        passed: true,
        userId: userRes.userId,
        token: userRes.token
      }
      console.log(resObject);
      
      res.status(200).json(resObject)
    }
    else if(userNameRes) {
      res.status(200).json({statusCode: 'EXISTS', status: 'Username already Exists!', passed: false})
    }
  }
  catch(err) {
    res.status(500).send(err.message)
  }
})

router.post('/user_login', async (req, res) => {
  try {

    const { userName, password } = req.body
    const loginCheck = await userFunctions.verifyCredentials(userName, password)
  
    res.cookie("authToken", loginCheck.token)
    res.status(200).send(loginCheck)
    
  }
  catch (err) {
    res.status(500).send(err.message)
  }

})

router.post('/username_search', async (req, res) => {

  try {

    const { userName } = req.body
    const foundUserNames = await userFunctions.searchUsernames(userName)

    res.status(200).send(foundUserNames)
    
  }
  catch(err) {
    console.log(err);
    
  }
})
module.exports = router;