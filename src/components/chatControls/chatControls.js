import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core'
import ChatInput from "../chatControls/chatInput";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#f5f2f2',
    minHeight: '80px',
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

  return (
    <div className={classes.container}>
      <Grid item xs={12}>
        <ChatInput />
      </Grid>
    </div>
  )
}

export default ChatControls