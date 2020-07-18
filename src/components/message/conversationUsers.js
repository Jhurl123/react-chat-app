import React, { useEffect, useState, useContext } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import MessageContext from '../../Context/messageContext'

const useStyles = makeStyles((theme) => ({
  users: {
    background: '#e3e3e3',
    borderBottom: '3px solid #ffffff',
    display: 'flex',
    fontSize: '1.3rem',
    padding: '.5rem',
    paddingLeft: '2rem',
    width: '100%',
    zIndex: '2',
    wordSpacing: '6px',
    [theme.breakpoints.down("sm")]: {
      fontSize: '.9rem'
    }
  }
}))

const ConversationUsers = (props) => {

  const { activeConversation } = props
  const [users, setUsers] = useState('')
  const classes = useStyles()
  const messageContext = useContext(MessageContext)
  const currentUser = JSON.parse(localStorage.getItem('user'))
  let conversations = messageContext.conversations || []

  useEffect(() => {

    let activeConvo = conversations.filter(convo => convo.id === activeConversation)
    
    if(activeConvo.length) {
      let activeUsers = activeConvo[0].users.map(user => user.name)
      activeUsers = activeUsers.filter(user => user !== currentUser.userName)
      setUsers(activeUsers.join(', '))
    }


  }, [activeConversation, conversations])

  return (
    <div className={classes.users}>
      <p><strong>{users}</strong></p>
    </div>
  )
}

ConversationUsers.propTypes = {
  activeConversation: PropTypes.string
}

export default ConversationUsers