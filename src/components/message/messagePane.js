import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from '@material-ui/lab'
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
  },
  errorMessage: {
    width: "70%",
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)'
  }
}))

const MessagePane = (props) => {

  const classes = useStyles()
  const userObject = JSON.parse(localStorage.getItem('user'))
  const { error } = props
  
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
      <MessageList userObject={userObject}/>
    </div>
  )
}

export default MessagePane