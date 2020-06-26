import React, { useEffect, useState, useContext }from 'react'
import { makeStyles } from "@material-ui/core/styles";
import ChatConversation from './chatConversation';
import ChatAdd from './chatAdd'
import NewConversationModal from './modal/newConversationModal'

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

  const { setActiveConversation } = props
  
  // Move this to the conversation list component when prototyping is over
  const conversations = messageContext.conversations
  const messages = messageContext.messages

  let [displayConversations, setDisplayconvo] = useState([]) 
  let [modalOpen, setModalOpen] = useState(false)

  useEffect(()=> {

    if(conversations.length && messages.length) {
      setDisplayconvo(conversations.map(convo => {
        let message = messages.filter(message => convo.id === message.convoId)

        if (!message.length) return undefined
        
        if(message.length > 25) {
          // Don't let the excerpt overflow
          convo.excerpt = message[0].content.substring(0, 25) + '...'
        }
        return convo
      }).filter(convo => convo !== undefined))
    }
    
  }, [conversations, messages]);

  const openModal = () =>  {
    setModalOpen(prevState => !prevState)
  }
  
  return (
    <div className={`${classes.chatList}`} >
      <ChatAdd openModal={openModal} />
      <NewConversationModal toggleModal={openModal} open={modalOpen} />
      {displayConversations && (
        displayConversations.map(convo => <ChatConversation 
                                            activateConversation={setActiveConversation} 
                                            key={convo.id} 
                                            id={convo.id} 
                                            info={convo} 
                                          />)
      )}
    </div>
  )
}

export default ChatList