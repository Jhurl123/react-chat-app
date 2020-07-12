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
  },
  sender: {
    fontSize: '1.1rem',
    marginBottom: '.5rem',
    paddingBottom: '.5rem',
    borderBottom: '1px solid #000000',
  }
}))

const Message = (props) => {
  const classes = useStyles()
  const user = JSON.parse(localStorage.getItem('user'))
  
  return (
    <li className={`${classes.message} ${classes[props.class]}` }>
      {(props.user.userId !== user.userId &&
        <div className={classes.sender}>
          {props.user.userName}
        </div>
      )}
      {props.children}
    </li>
  )
}

export default Message