import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MessageList from "./messageList";

const useStyles = makeStyles((theme) => ({
  MessagePane: {
    width: '100%',
    height: '100%',
    display: 'flex',
    paddingTop: '.5rem',
    [theme.breakpoints.down("md")]: {
      height: 'calc(80vh - 80px)',
    }
  }
}))

const MessagePane = (props) => {

  const classes = useStyles()

  return (
    <div className={classes.MessagePane}>
      <MessageList />
    </div>
  )
}

export default MessagePane