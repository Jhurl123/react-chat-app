import React, { useState, useContext } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import EmailIcon from '@material-ui/icons/Email'
import IconButton from '@material-ui/core/IconButton'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import MessageContext from '../../Context/messageContext'


const useStyles = makeStyles((theme) => ({
  ChatInput: {
    alignSelf: 'flex-start',
    borderRadius: '15px',
    width: '100%',
    padding: '.5rem',
    fontSize: '18px',
    border: 'none',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '65%'
    }
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

    let newMessage = {
      message: {
        convoId: activeConversation,
        content: message,
        userId: userObject.userId,
        users: userIds
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
        />
        <IconButton className={classes.icon} onClick={handleSubmit} aria-label="Send Message" size="medium" color="primary" style={{marginLeft: '.5rem'}}>
          <EmailIcon />
        </IconButton>

        {/* <IconButton aria-label="Attach a File" size="medium" color="primary" style={{marginLeft: '.5rem'}}>
          <AttachFileIcon />
        </IconButton> */}
      </form>
    </div>
  )
}

export default ChatInput