import React, { useState, useContext } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  addContainer: {
    alignItems: 'center',
    backgroundColor: '#049404',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    height: '60px',
    position: 'absolute',
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

const ChatAdd = (props) => {
  const classes = useStyles()

  return (
    <button className={classes.addContainer} onClick={() => props.openModal()} aria-label="Open a new Conversation">
      <AddIcon className={classes.addIcon} fontSize="large" />
      <span className={classes.convPrompt}>
        Start Conversation
      </span>
    </button>
  )
}

ChatAdd.propTypes = {
  openModal: PropTypes.func
}

export default ChatAdd