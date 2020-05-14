import React, { useEffect, useState, useContext }from 'react'
import { makeStyles } from "@material-ui/core/styles";
import ChatConversation from './chatConversation';
import MessageContext from '../../Context/messageContext'

const useStyles = makeStyles((theme) => ({
  chatList: {
    borderRight: '1px solid #d3d3d3',
    height: '80vh',
    overflowY: 'scroll',
  },

}))

const ChatList = (props) => {

  const classes = useStyles()
  const messageContext = useContext(MessageContext)
  
  // Move this to the conversation list component when prototyping is over
  const conversations = messageContext.conversations
  const messages = messageContext.messages
  let [displayConversations, setDisplayconvo] = useState([]) 

  useEffect(()=> {

    if(conversations.length) {
      
      setDisplayconvo(conversations.map(convo => {
        let message = messages.filter(message => convo.id === message.convoId)
        // Don't let the excerpt overflow
        convo.excerpt = message[0].content.substring(0, 25) + '...'
        return convo
      }))
    }
    
  }, [conversations, messages]);
  
  return (
    <div className={`${classes.chatList}`} >
      {displayConversations && (
        displayConversations.map(convo => <ChatConversation key={convo.id} info={convo} />)
      )}

    </div>
  )
}

export default ChatList