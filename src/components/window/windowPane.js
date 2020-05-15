import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid } from '@material-ui/core'
import ChatList from '../chatList/chatList'
import MessagePane from '../message/messagePane'
import ChatControls from '../chatControls/chatControls'
import MessageContext from '../../Context/messageContext'
import StaticMessages from '../message/testMessages'
import StaticConversation from "../chatList/conversationList"
import socket from '../../server/socket-connect'

const useStyles = makeStyles((theme) => ({
  pane: {
    minHeight: '80vh',
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
  },
  conversationList: {
    position: 'absolute',
    width: '100%',
    transform: 'translateX(-1200%)',
    [theme.breakpoints.up("md")]: {
      position: 'relative',
      transform: 'translateX(0)',
    }
  },
  listOpen: {
    width: '100%',
    transform: 'translateX(0)',
  },
  MessagePane: {
    [theme.breakpoints.down("md")]: {
      position: 'relative',
      height: 'calc(90vh - 80px)',
      width: '100%'
    }
  }
}))

const WindowPane = (props) => {

  const classes = useStyles()
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState('')

  const { menuStatus } = props

  // Common parent of the message list and the input
  // Use Context to add messages to the pane
  

  // Use this function to update the messages in the current conversation.
  const addMessage = message => setMessages(prevState => [message, ...prevState])


  // Use this hook to populate messages and conversation list
  useEffect(() => {
    
    // When the backend is built out, messages will be a list of messages with a certain convoId, not a lst of all messages
    setMessages(StaticMessages)
    setConversations(StaticConversation)
    socket().connectSocket()

  }, [])

  // Need to fuigure out how to change conversations/messages shown in the message pane
  const value = {
    messages: messages,
    conversations: conversations,
    sendMessage: addMessage,
    client: socket
  }

  return (
    
    <MessageContext.Provider value={value}>
      <div className={classes.pane}>
        <Container style={{padding: 0}}>
          <Grid container>
            <Grid item className={`${classes.conversationList} ${props.menuStatus ? classes.listOpen : ''}`} sm={12} md={12} lg={4}>
              <ChatList toggled={menuStatus}/>
            </Grid>
            <Grid item className={classes.MessagePane} sm={12} md={12} lg={8} style={{position: "relative", display: props.menuStatus ? 'none': 'block' }}>
              <MessagePane />
              <ChatControls/>
            </Grid>
          </Grid>
        </Container>
      </div>
    </MessageContext.Provider>
  )
}

export default WindowPane