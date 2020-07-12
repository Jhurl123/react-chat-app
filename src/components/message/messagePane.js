import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from '@material-ui/lab'
import MessageList from "./messageList";
import MessageContext from '../../Context/messageContext'
import ConversationUsers from './conversationUsers'

const useStyles = makeStyles((theme) => ({
  MessagePane: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down("md")]: {
      height: 'calc(80vh - 80px)',
    }
  },
  errorMessage: {
    left: '50%',
    marginTop: '1rem',
    padding: '1rem',
    position: 'absolute',
    transform: 'translateX(-50%)',
    width: "70%",
    zIndex: '100'
  }
}))

const MessagePane = (props) => {

  const classes = useStyles()
  const userObject = JSON.parse(localStorage.getItem('user'))
  const { error, activeConversation } = props
  const messageContext = useContext(MessageContext)
  const conversations = messageContext.conversations || []
  const messages = messageContext.messages || []

  const [showUsers, setShowUsers] = useState(false)
  useEffect(() => {
    
    setShowUsers((activeConversation && conversations.length && messages.length) ? true : false)

    console.log(showUsers);
    
  }, [activeConversation, conversations, messages, showUsers])

  return (
    <div className={classes.MessagePane}>
      {error &&
        <div>
          <Alert className={classes.errorMessage} severity="error">
            <AlertTitle>Error</AlertTitle>
            { error }
          </Alert>
        </div>
      }
      {showUsers && (
        <ConversationUsers activeConversation={activeConversation} />
      )}
      <MessageList activeConversation={activeConversation} userObject={userObject}/>
    </div>
  )
}

export default MessagePane