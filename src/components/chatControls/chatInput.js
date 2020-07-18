import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles"
import EmailIcon from '@material-ui/icons/Email'
import IconButton from '@material-ui/core/IconButton'
import MessageContext from '../../Context/messageContext'


const useStyles = makeStyles((theme) => ({
  ChatInput: {
    alignSelf: 'flex-start',
    borderRadius: '15px',
    width: '100%',
    padding: '.5rem',
    fontSize: '18px',
    border: 'none',
    margin: '0 auto'
  },
  icon: {
    marginLeft: '0.5rem',
    alignSelf: 'flex-start',
    padding: '9px 12px 9px 12px',
  }
}))

const ChatInput = (props) => {

  const [message, setMessage] = useState("")

  const messageContext = useContext(MessageContext)
  const classes = useStyles()
  const { userObject, activeConversation } = props
  const conversations = messageContext.conversations
  const currentUser = JSON.parse(localStorage.getItem('user'))
  
  const handleSubmit = (event) => {
    event.preventDefault()
    
    if(message.length == 0 ) return
    // Set error here
    if(!userObject.hasOwnProperty('token')) {
      messageContext.error('You are not authorized to perform this action!')
      return
    }

    const users = conversations.filter(convo => convo.id === activeConversation)
    
    const userIds = users[0].users.map(user => user.id) 
    const timestamp = new Date()

    console.log(timestamp.getTime());
    
    console.log(Math.round((timestamp.getTime() / 1000)));
    const unreadUsers = userIds.filter(user => user !== currentUser.userId)
    
    let newMessage = {
      message: {
        convoId: activeConversation,
        content: message,
        userId: userObject.userId,
        sendingUser: userObject,
        users: userIds,
        unread: unreadUsers,
        timestamp: Math.round((timestamp.getTime() / 1000))
      },
      userToken: userObject.token
    }
    
    messageContext.sendMessage(newMessage)
    setMessage('')
  }

  return (
    <div >
      <form onSubmit={handleSubmit} style={{ padding: '.9rem', display: 'flex'}}>
        <input 
          className={classes.ChatInput}
          type="text"
          autoComplete="off"
          value={message} 
          name="message"
          placeholder="Send a message"
          onChange={ e => setMessage(e.target.value)}
          disabled={activeConversation ? false : true}
        />
        <IconButton className={classes.icon} onClick={handleSubmit} aria-label="Send Message" size="medium" color="primary" style={{marginLeft: '.5rem'}}>
          <EmailIcon />
        </IconButton>

      </form>
    </div>
  )
}

ChatInput.propTypes = {
  activeConversation: PropTypes.string,
  userObject: PropTypes.object
}

export default ChatInput