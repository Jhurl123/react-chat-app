import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab'
import { Transition } from 'react-transition-group';
import IconButton from "@material-ui/core/IconButton"
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    textAlign: 'center', 
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    overflow: 'hidden',
    boxShadow: theme.shadows[5],
    transition: 'all 300ms linear',
    padding: theme.spacing(2, 4, 3),
  },
  header: {
    marginBottom: '1rem', 
    fontSize: '2.5rem',
    color: '#333'
  },
  intro: {
    fontSize: '1.2rem',
    marginBottom: '1.5rem'
  },
  form: {
    transition: 'all 300ms linear',
    textAlign: 'left'
  },
  input: {
    '&.exited input': {
      color: 'red',
      zIndex: -1
    },
    width: '80%',
    marginBottom: '1.2rem',
  },
  root: {
    backgroundColor: 'rgba(255,255,255,1)'
  },
  button: {
    display: 'block',
    margin: '0 auto 2rem auto',
    padding: '1rem',
    width: '100%',
    transition: 'all 100ms linear'
  },
  separator: {
    fontSize: '2.5rem',
    margin: '1rem 0'
  },
  error: {
    marginBottom: '1.5rem',
    textAlign: 'left',
  },
  errorTitle: {
    textAlign: 'left',
    fontWeight: 'bold'
  },
  backButton: {
    marginRight: 'auto',
    marginBottom: '1rem',
  }
}));

const SignUpModal = (props) => {

  const classes = useStyles();
  const [open, setModal] = useState(true)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [authChoice, setAuthChoice] = useState('')
  const [error, setError] = useState('')
  const [formSubmit, setFormSubmit] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleClose = () => {
    setModal(prevState => !prevState)
  }

  // Change this to the login function and have a separate login function
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    setApiError('')

    if(!formSubmit) return
    
    const response = await fetch(`/${authChoice}`,
      { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userName, password})
      }).then(response => {
        if (!response.ok) throw new Error('Server Error');

        return response.json()
      }).then(data => {

        if(data['statusCode'] === 'EXISTS') {        
          setApiError(data.status)
          return false       
        }
        
        return data

      }). catch(err => {
        console.log(err)
      })
    

    // Test if response from server is good, then return, or set error
    if(response.passed) {

      localStorage.setItem('userId', response.userId)
      setError(false)
      setApiError(false)
      handleClose()
    }
    else {
      // throw validation errors
      setError(true)
      setApiError(response.message)
    }
    
  }

  const handleSignup = () => {
    if(authChoice !== 'user_signup')  {
      setAuthChoice(prevState => prevState == 'user_signup' ? '' : 'user_signup')
    }
    else {
      setFormSubmit(true)
      setError('')
    }
    
    // Use the signup route
    //hnadle the transitio
  }

  const handleLogin = () => {
    if(authChoice !== 'user_login') {
      setAuthChoice(prevState => prevState === 'user_login' ? '' : 'user_login')
    }
    else {
      setFormSubmit(true)
      setError('')
    }
  }
  
  const transitionStyles = {
    entering: { opacity: .5 },
    entered:  { opacity: 1, position: 'relative', zIndex: 1 },
    exiting:  { opacity: .1 },
    exited:   { opacity: 0, position: 'absolute' },
  }

  const body = (
    <div className={classes.paper}>
      <h2 id='simple-modal-title' className={classes.header}>Welcome!</h2>
      <p className={classes.intro}>Log in or sign up to send messages to anyone whos username you have!</p>
      {apiError &&
        <div>
          <Alert className={classes.error} severity='error'>
            <AlertTitle className={classes.errorTitle}>Error</AlertTitle>
            { apiError }
          </Alert>
        </div>
      }
    
        <div>
          <form
            onSubmit={event => handleFormSubmit(event)}
            className={classes.form}
          >
            <Transition in={authChoice !== ''} timeout={300}>
              {state => (
                <div style={{...transitionStyles[state]}}>
                  <IconButton 
                    aria-label="Go Back" 
                    color="primary"
                    className={classes.backButton}
                    onClick={e => {
                      setAuthChoice('')
                      setFormSubmit(false)
                      setError('')
                      setApiError('')
                    }}
                  >
                    <KeyboardBackspaceIcon fontSize="large" />
                  </IconButton>
                  <TextField
                    className={classes.input}
                    error={ error !== ''}
                    style={{width: '100%'}}
                    id='userName' 
                    type='text'
                    name='userName'
                    label=' Enter User Name' 
                    size='medium' 
                    disabled={state === 'exited' ? 'disabled' : ''}
                    variant='outlined' 
                    onChange={e => setUserName(e.target.value)}
                    helperText={ error && 'Invalid Username'}
                  />
                  <TextField
                    className={classes.input}
                    error={ error !== '' }
                    style={{width: '100%'}}
                    id='password' 
                    type='password'
                    name='password'
                    label='Enter Password'
                    size='medium' 
                    variant='outlined' 
                    disabled={state === 'exited' ? 'disabled' : ''}
                    onChange={e => setPassword(e.target.value)}
                    helperText={ error && 'Invalid Password'}
                  />
                </div>
              )}
            </Transition>
          {authChoice !== 'user_login' && (
            <Button 
              onClick={() => handleSignup()} 
              type="submit"
              className={classes.button} 
              variant='contained' 
              color='primary'
            >
              Sign up
            </Button>
            )}
            {authChoice !== 'user_signup' && (
              <Button
                onClick={() => handleLogin()} 
                type="submit"
                className={classes.button} 
                variant='outlined' 
                color='primary'
              >
                Log in
              </Button> 
            )}
          </form>
        </div>
    </div>
  )

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
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

export default SignUpModal