import React, { useState, useContext, useRef, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import MessageContext from '../../../Context/messageContext'
import { Alert, AlertTitle } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  usernameInput: {
    margin: '0 auto'
  },
  messageInput: {
    width: '500px',
    marginTop: '2rem',
  },
  submitButton: {
    marginTop: '2rem',
    paddingLeft: '2rem',
    paddingRight: '2rem'
  },
  errorMessage: {
    margin: '0 auto 2rem 0'
  }
}))
const NewConversationForm = (props) => {

  const { closeModal } = props
  const userNameInput = useRef(null)
  const classes = useStyles()
  const messageContext = useContext(MessageContext)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [foundUsers, setFoundUsers] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [apiError, setApiError] = useState('')

  const conversations = messageContext.conversations
  const currentUserId =  JSON.parse(localStorage.getItem('user')).userId

  useEffect(() => {
    userNameInput.current.focus()
  }, [])

  // Submit form if enter is pressed inside of text message field
  const formEnter = (event) => {
    if(event.keyCode == 13) {
      handleFormSubmit()
    }
  }

  const handleFormSubmit = (event) => {
    // Will need to send the message and add a conversation to the list
    if(event) event.preventDefault()
    const conversationExists = checkExistingConversations()
    

    // Hve confirmed that this works in my testing
    
    // Ignore this until  I can add conversation ids to the front/back end
    if( !conversationExists ) {
      startConversation(selectedUsers)
    }
    else {
    //   let message = {
    //     message: {
    //       convoId: newConversation.id,
    //       content: messageBody,
    //       userId: userObject.userId,
    //     },
    //     userToken: userObject.token,
    //   };
    //   messageContext.addMessage(newMessage)
    }

  }

  const checkExistingConversations = () => {

    const selectedIds = selectedUsers.map(user => user.id)
    console.log(selectedIds);
    
    const containsAllUsers = conversations.map(conversation =>  {
      return conversation.users.every(user => {
        return selectedIds.includes(user.id)
      })
    })
    console.log(containsAllUsers.filter(Boolean));
    
      
    
    // const userIds = users.map(user => user[0].id)
    
    // const containsAllUsers = users.every(user => selectedIds.includes(user..id))

    return containsAllUsers.filter(Boolean)[0]
  } 

  // Insert new conversation into front/backend
  const startConversation = async users => {

    users.push(currentUserId)
    // Lets have the user ids and names  send to the database
    await fetch('/start_conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({users})
    })
    .then(res =>  {
      if (!res.ok) {
        throw new Error('Server Error');
      }
      return res.json()

    })
    .then(data => {
      messageContext.startConversation(data.conversation, newMessage )
      closeModal()
    })

    // At this point we will check to see if the conversation exists yet
    // If it does, add the message to the message list and update the conversation list so that the newest message is the last one showing
    // If it does not, add a new one to the database


    //Give conversation id?
      // This wqould involve creating a new conversation collection in the database
      // then, give the converrsation id back in response, then add the new conversation to the conversation array
      // This would allow me to be able to ensure that an ID is present
    
    // No conversation id
      // start 
    
  }



  const searchForUsers = async userName => {

    if(!userName.length) return

    await fetch('/username_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userName})
    })
    .then(response =>  {
      if (!response.ok) {
        throw new Error('Server Error');
      }
      return response.json()

    })
    .then(data => {
      if(data.length) {
        setFoundUsers(data)
      }
      else {
        setFoundUsers([])
      }
    })
    .catch(err => {
      if(err) setApiError(err.message)

    })
    
  }

  return (
    <div>
      <form
        onSubmit={event => handleFormSubmit(event)}
      >
        {apiError && (
          <Alert className={classes.errorMessage} severity="error">
            <AlertTitle>Error</AlertTitle>
            { apiError }
          </Alert>
        )}
        <Autocomplete
          id="username"
          multiple
          options={foundUsers}
          onChange={(event, newValue) => {
            setSelectedUsers(newValue);
            setFoundUsers([])
          }}
          onInputChange={(event, newInputValue) => {
            searchForUsers(newInputValue)
          }}
          getOptionLabel={(option) => option.name}
          className={classes.usernameInput}
          style={{ width: 500 }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => <TextField {...params} inputRef={userNameInput} label="Username" variant="outlined" />}
        />

        <TextField
          id="message-input"
          label="Send Message"
          multiline
          rows={3}
          className={classes.messageInput}
          onKeyDown={event => formEnter(event)}
          onChange={event => setNewMessage(event.target.value)}
          variant="outlined"
        />

        <Button 
          onSubmit={event => handleFormSubmit(event)}
          type="submit"
          className={classes.submitButton}
          variant='contained' 
          color='primary'
        >
          Send Message
        </Button>
      </form>
    </div>
  )
}

export default NewConversationForm