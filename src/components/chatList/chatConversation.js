import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core'
import StyledBadge from '../badge/styledBadge'
import Tooltip from '@material-ui/core/Tooltip'
import MessageContext from '../../Context/messageContext'

const useStyles = makeStyles((theme) => ({

  conversation: {
    maxWidth: '100%',
    display: 'flex',
    padding: '1.15rem .75rem 1.15rem 1.5rem',
    borderBottom: '1px solid #d3d3d3',
    justifyContent: 'space-evenly',
    cursor: 'pointer',
    minHeight: '90px',
    [theme.breakpoints.down("md")]: {
      justifyContent: 'space-around'
    }
  },
  activeConversation: {
    backgroundColor: '#e6e2e2',
  },
  green: {
    backgroundColor: 'green',
    color: '#ffffff',
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  badge: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
    margin: '8px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 1.3rem',
    width: '100%',
    '& h4': {
      margin: '0 0 .5rem 0',
      alignSelf: 'flex-start'
    },
    '& p': {
      margin: 0
    },
  }

}))

const ToolTipStyled = withStyles({
  tooltip: {
    fontSize: '1rem',
  }
})(Tooltip);

const ChatConversation = (props) => {

  const classes = useStyles()
  const messageContext = useContext(MessageContext)
  const { info, activeConversation, activateConversation, convoChange, id, lastSender } = props
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const [isRead, setReadStatus] = useState(true)
  const [excerpt, setExcerpt] = useState('')
  
  const conversations = messageContext.conversations
  const setConversations = messageContext.setConversations

  useEffect(() => {

    if(messageUnread()) {
      setReadStatus(false)
    }
  },[info])

  useEffect(() => {
    let users = info.users
    
    console.log("Read status changes at line 77");
    setReadStatus(false)

  },[convoChange])

  const messageUnread = () => {
    let users = false

    if(info.unread) {
      // Temporary check
      if(!Array.isArray(info.unread)) return false
      console.log(info.unread);
      
      users = info.unread.filter(unread => unread.user === currentUser.userId)
      console.log(users);
      
    }
    
    return users.length ? true : false
  }

  const readConversation = async (id) => {

    activateConversation(id)

    if(!Array.isArray(info.unread)) return false
    
    info.unread = info.unread.filter(unread => unread.user !== currentUser.userId)
    
    await fetch('/read_conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({conversation: info})
    })
    .then(res =>  {
      if (!res.ok) {
        throw new Error('Server Error');
      }
      return res.json()

    })
    .then(data => {
      setReadStatus(true)

    })
  }

  // Need to use the messages here, and show the excerpt of the last message sent using context
 // TODO New message indicator here - Use Styled badge 
  return (
    <div>
      {info && (
        <div 
          className={`${classes.conversation} ${activeConversation == id ? classes.activeConversation : ''}`} 
          onClick={()=> readConversation(id)}
        >
          {!isRead && (
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              variant="dot"
            >
            </StyledBadge>
          )}
          
          <div className={classes.info}>
            <ToolTipStyled title={`Users: ${info.users.allUsers}`} placement="top" arrow>
              <h4>{info.users.userString}</h4>
            </ToolTipStyled>
            <p>{info.excerpt}</p>
          </div>
          <span>{info.time}</span>
      </div>
      )}
    </div>
  )
}

// const { info, activeConversation, activateConversation, convoChange, id, lastSender } = props
ChatConversation.propTypes = {
  info: PropTypes.func,
  activeConversation: PropTypes.string,
  activateConversation: PropTypes.func,
  convoChange: PropTypes.bool,
  id: PropTypes.string
}

export default ChatConversation