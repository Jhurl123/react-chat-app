import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    width: "80%",
    margin: "0 auto"
  },
  root: {
    backgroundColor: 'rgba(255,255,255,1)'
  }
}));

const EmailModal = (props) => {

  const classes = useStyles();
  const [open, setModal] = useState(true)
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)

  const handleClose = () => {
    setModal(prevState => !prevState)
  }

  const handleEmailSubmit = (event) => {
    event.preventDefault()
    // Send verification
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    re.test(email);

    if(re.test(email)) {
      setError(false)

      handleClose()
      // Send email to db, display generated code
      // Eventually move the handleClose function to a button in the modal
      // that shows only when the code is shown and copied
      
    }
    else {
      // throw validation errors
      setError(true)
    }
    
  }

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Enter your Email</h2>
      <p style={{marginBottom: '30px'}}>Enter your email to get your unique chat code</p>
      <form
        onSubmit={event => handleEmailSubmit(event)}
      >
        <TextField
          error={ error && error }
          style={{width: "100%"}}
          id="userEmail" 
          label=" Enter Email" 
          size="medium" 
          variant="outlined" 
          onChange={e => setEmail(e.target.value)}
          helperText={ error && "Invalid Email Address"}
        />
      </form>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      disableBackdropClick={true}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps= {{
        timeout: 500
      }}
    >
      <Fade in={open}>
        {body}
      </Fade>
    </Modal>
  )
}

export default EmailModal