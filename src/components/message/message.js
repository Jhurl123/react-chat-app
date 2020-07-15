import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  messageHalf: {
    display: 'flex',
    listStyleType: 'none',
    margin: '.5rem 0',
    maxWidth: '50%',
    position: 'relative',
    width: '100%',
  },
  message: {
    padding: '1rem',
    borderRadius: '20px',
    color: '#000000',
    display: 'block',
    minHeight: '50px'
  },
  received: {
    alignSelf: 'flex-start',
    marginBottom: '1.35rem',
    '& span': {
      backgroundColor: '#5CDF69',
    }
  },
  sent: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    textAlign: 'right',
    '& span': {
      backgroundColor: '#1e96f1',
      color: '#ffffff',
    }
  },
  subInfo: {
    color: '#525151',
    position: 'absolute',
    bottom: '-16px',
    left: '5px',
    fontSize:'14px',
    width: '100%',
  }
}))



const Message = (props) => {
  const classes = useStyles()
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const [formattedDate, setFormattedDate] = useState('')
  const {message, time, user} = props
  
  useEffect(() => {

    // console.log(message);
    const seconds = time.hasOwnProperty('_seconds') ? time._seconds : time
    
    if(message.userId !== currentUser.userId ) {
      const date = new Date(seconds * 1000).toISOString().substr(0, 10);
      setFormattedDate(formatDDMMM(date))
    }  
  })

  const formatDDMMM = (seconds) => {
    var months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
    var b = seconds.split(/\D/);
    return b[2] + ' ' + months[b[1]-1];
  }
  
  // console.log(formatDDMMM('2016-10-14'));
  return (
    <li className={`${classes.messageHalf} ${classes[props.class]}`}>
      <span className={`${classes.message}`}>
        {props.children}
      </span>
      {(user.userId !== currentUser.userId && formattedDate) && (
          <div className={classes.subInfo}>
            {user.userName + " - " + formattedDate}
          </div>
      )}
    </li>
  )
}

export default Message