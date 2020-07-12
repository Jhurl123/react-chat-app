import React, { useContext, useCallback } from 'react'
import Message from './message'
import { makeStyles } from '@material-ui/core'
import MessageContext from '../../Context/messageContext'


const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    maxHeight: 'calc(80vh - 120px)',
    margin: 0,
    padding: '0 1.5rem',
    paddingBottom: '3rem',
    width: '100%',
    overflow: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column-reverse',
    [theme.breakpoints.down("md")]: {
      paddingBottom: '0'
    }
  }
}))

const MessageList = (props) => {

  const classes = useStyles()
  const messageContext = useContext(MessageContext)
  const { userObject, activeConversation } = props
  let messages = messageContext.messages || []

  const messageListEl = useCallback(node => {
    if (node !== null) {
      node.scrollTop = node.scrollHeight
    }
  });
  
  return (
    <ul className={classes.container} ref={messageListEl}>
      {messages && 
        messages.filter(message => message.convoId === activeConversation).map(message =>  (
          <Message key={message.id} user={message.sendingUser} class={userObject.userId === message.userId ? 'sent' : 'received'}>{message.content}</Message>
        ))}
    </ul>
  )
}

export default MessageList