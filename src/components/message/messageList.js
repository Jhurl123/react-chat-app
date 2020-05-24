import React, { useContext, useCallback } from 'react'
import Message from './message'
import { makeStyles } from '@material-ui/core'
import MessageContext from '../../Context/messageContext'


const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    maxHeight: 'calc(80vh - 80px)',
    margin: 0,
    padding: '0 1.5rem',
    paddingBottom: '3rem',
    width: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse'
  }
}))

const MessageList = (props) => {

  const classes = useStyles()
  const messageContext = useContext(MessageContext)

  let messages = messageContext.messages || []

  const messageListEl = useCallback(node => {
    if (node !== null) {
      console.log("Tewt this node");
      console.log(node.scrollHeight);
      
      node.scrollTop = node.scrollHeight
    }
  });
  
  return (
    <ul className={classes.container} ref={messageListEl}>
      {messages && 
        messages.map(message =>  (
          <Message key={message.id} class={message.class}>{message.content}</Message>
        ))}
    </ul>
  )
}

export default MessageList