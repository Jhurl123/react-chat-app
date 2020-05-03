import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core'
import StyledBadge from '../badge/styledBadge'

const useStyles = makeStyles((theme) => ({

  conversation: {
    maxWidth: '100%',
    display: 'flex',
    padding: '1.15rem .75rem 1.15rem 1.5rem',
    borderBottom: '1px solid #d3d3d3',
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
    margin: '8px'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 1.3rem',
    '& h4': {
      margin: '0 0 .5rem 0'
    },
    '& p': {
      margin: 0
    },
  },

}))

const ChatConversation = (props) => {

  const classes = useStyles()
  const { info } = props

  return (
    <div className={classes.conversation}>
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
      >
        <Avatar className={classes.green}>JH</Avatar>
      </StyledBadge>
        <div className={classes.info}>
          <h4>{info.users[0].name}</h4>
          <p>{info.excerpt}</p>
        </div>
        <span>{info.time}</span>
    </div>
  )
}

export default ChatConversation