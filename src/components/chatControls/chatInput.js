import React, { useState, useContext } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import EmailIcon from '@material-ui/icons/Email'
import IconButton from '@material-ui/core/IconButton'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import MessageContext from '../../Context/messageContext'


const useStyles = makeStyles((theme) => ({
  ChatInput: {
    borderRadius: '15px',
    width: '75%',
    padding: '.5rem',
    fontSize: '18px',
    border: 'none',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '65%'
    }
  }
}))

const ChatInput = (props) => {

  const [message, setMessage] = useState("")

  const messageContext = useContext(MessageContext)
  const classes = useStyles()
  const { userObject, activeConversation } = props

  const handleSubmit = (event) => {
    event.preventDefault()
    
    // Set error here
    if(!userObject.hasOwnProperty('token')) {
      messageContext.error('You are not authorized to perform this action!')
      return
    }

    // Temporary variable to sit in place of any response from the server
    let newMessage = {
      message: {
        convoId: activeConversation,
        content: message,
        userId: userObject.userId
      },
      userToken: userObject.token
    }

    messageContext.sendMessage(newMessage)
    setMessage('')
  }

  return (
    <div >
      <form onSubmit={handleSubmit} style={{ padding: '.9rem'}}>
        <input 
          className={classes.ChatInput}
          type="text"
          autoComplete="off"
          value={message} 
          name="message"
          placeholder="Send a message"
          onChange={ e => setMessage(e.target.value)}
        />
        <IconButton onClick={handleSubmit} aria-label="Send Message" size="medium" color="primary" style={{marginLeft: '.5rem'}}>
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