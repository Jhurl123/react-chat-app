import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  message: {
    listStyleType: 'none',
    padding: '1rem',
    borderRadius: '20px',
    color: '#000000',
    maxWidth: '45%',
    margin: '.25rem 0'
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#5CDF69',
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#1e96f1',
    color: '#ffffff'
  }
}))

const Message = (props) => {
  const classes = useStyles()
  return (
    <li className={`${classes.message} ${classes[props.class]}` }>
      {props.children}
    </li>
  )
}

export default Message