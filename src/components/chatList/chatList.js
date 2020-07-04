import React, { useEffect, useState, useContext }from 'react'
import { makeStyles } from "@material-ui/core/styles";
import ChatConversation from './chatConversation';
import ChatAdd from './chatAdd'
import NewConversationModal from './modal/newConversationModal'
import Toolbar from '../window/toolbar'

import MessageContext from '../../Context/messageContext'

const useStyles = makeStyles((theme) => ({
  chatList: {
    borderRight: '1px solid #d3d3d3',
    height: '80vh',
    overflowY: 'auto'
  },
  scrollContainer: {
    marginTop: '60px'
  }
}))

const ChatList = (props) => {

  const classes = useStyles()
  const messageContext = useContext(MessageContext)
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const { setActiveConversation, activeConversation } = props
  
  // Move this to the conversation list component when prototyping is over
  const conversations = messageContext.conversations
  const messages = messageContext.messages

  let [displayConversations, setDisplayConvo] = useState([]) 
  let [modalOpen, setModalOpen] = useState(false)

  useEffect(()=> {
    
    if(conversations.length && messages.length) {
      setDisplayConvo(conversations.map(convo => {

        convo.users['userString'] = formatUsernames(convo.users)
        convo.users['allUsers'] = getUsernames(convo.users)

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

  const formatUsernames = (users) => {

    let userNames = users.map(user => user.name)
    let headerNames = userNames.filter((name, index) => {
      return name !== currentUser.userName && index <= 3
    })
    let userNameString = headerNames.join(', ')
    userNameString = userNameString.length < 25 ? userNameString : userNameString.substring(0,25) + '...'
    return userNameString
  }

  const getUsernames = (users) => {
    let userNames = users.map(user => user.name)

    return userNames.join(', ')
  }

  const openModal = () =>  {
    setModalOpen(prevState => !prevState)
  }
  
  return (
    <div className={`${classes.chatList}`} >
      <ChatAdd openModal={openModal} />
      <div className={classes.scrollContainer}>
        <NewConversationModal toggleModal={openModal} open={modalOpen} />
        {displayConversations && (
          displayConversations.map(convo => <ChatConversation 
                                              activateConversation={setActiveConversation} 
                                              activeConversation={activeConversation}
                                              key={convo.id} 
                                              id={convo.id} 
                                              info={convo} 
                                            />)
        )}
      </div>
    </div>
  )
}

export default ChatList