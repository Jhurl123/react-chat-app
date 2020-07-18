import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import ChatInput from "../chatControls/chatInput";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#f5f2f2',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    borderBottomRightRadius: '10px',
    [theme.breakpoints.down("md")]: {
      borderBottomLeftRadius: '10px',
    }
  }
}))

const ChatControls = (props) => {

  const classes = useStyles()
  const userObject = JSON.parse(localStorage.getItem('user')) || {}
  const { activeConversation } = props

  return (
    <div className={classes.container}>
      <Grid item xs={12}>
        <ChatInput activeConversation={activeConversation} userObject={userObject}/>
      </Grid>
    </div>
  )
  
}

ChatControls.propTypes = {
  activeConversation: PropTypes.string
}

export default ChatControls