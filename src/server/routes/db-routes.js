const express = require('express');
let bodyParser = require("body-parser");
const router = express.Router();
const db = require('../database/db-connect')
const dbFunctions = require('../database/db-functions')
const socketEvents = require('../socket-connect')
const userFunctions = require('../database/user-functions')
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
    let response = await dbFunctions.sendMessage(req.body)
    socketEvents.sendMessage(req.body)
    const authToken = req.cookies['authToken']
    const validateJWT = JWT.verify(authToken, process.env.JSON_SECRET)

    
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
    
    // UN wasn't found in the database and pw was created correctly
    if (!userNameRes && passwordRes ) {
      const userRes = await userFunctions.insertUser({userName, password: passwordRes})
      res.status(200).json({status: 'User Successfully added', passed: true})
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
module.exports = router;