import React, { useState, useContext } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  addContainer: {
    alignItems: 'center',
    backgroundColor: '#049404',
    cursor: 'pointer',
    display: 'flex',
    fontSize: '1.25rem',
    justifyContent: 'center',
    padding: '.65rem',
    width: '100%',
    '&:hover': {
      backgroundColor: "#037b03"
    }
  },
  addIcon: {
    color: '#fff',
  },
  convPrompt: {
    color: '#fff',
  }
}))

const ChatAdd = () => {
  const classes = useStyles()
  const openModal = () => {

  }

  return (
    <div className={classes.addContainer}>
      <IconButton className={classes.addIcon} onClick={openModal} aria-label="Open a new Conversation" size="medium">
        <AddIcon fontSize="large" />
      </IconButton>
      <span className={classes.convPrompt}>
        Start Conversation
      </span>
    </div>
  )
}

export default ChatAdd