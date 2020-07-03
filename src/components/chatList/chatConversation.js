import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core'
import StyledBadge from '../badge/styledBadge'
import Tooltip from '@material-ui/core/Tooltip'

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
  const { info, activateConversation, activeConversation, id } = props
  
  // Need to use the messages here, and show the excerpt of the last message sent using context
 // TODO New message indicator here - Use Styled badge 
  return (
    <div>
      {info && (
        <div className={`${classes.conversation} ${activeConversation == id ? classes.activeConversation : ''}`} onClick={()=> activateConversation(id)}>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            variant="dot"
          >
          </StyledBadge>
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

export default ChatConversation