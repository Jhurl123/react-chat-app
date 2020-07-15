import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import ChatList from "../chatList/chatList";
import MessagePane from "../message/messagePane";
import ChatControls from "../chatControls/chatControls";
import MessageContext from "../../Context/messageContext";
import StaticConversation from "../chatList/conversationList";
import socket from "../../server/socket-client";
import SignUpModal from "./signUpModal";

const useStyles = makeStyles((theme) => ({
  pane: {
    minHeight: "80vh",
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  conversationList: {
    position: "absolute",
    width: "100%",
    transform: "translateX(-1200%)",
    [theme.breakpoints.up("md")]: {
      position: "relative",
      transform: "translateX(0)",
    },
  },
  listOpen: {
    width: "100%",
    position: "relative",
    transform: "translateX(0)",
  },
  MessagePane: {
    [theme.breakpoints.down("md")]: {
      position: "relative",
      height: "calc(90vh - 80px)",
      width: "100%",
    },
  },
}));

const WindowPane = (props) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [apiError, setApiError] = useState("");
  const [user, setUser] = useState(false);
  const [activeConversation, setActiveConversation] = useState("")
  const { menuStatus } = props;
  const currentUser = JSON.parse(localStorage.getItem('user')) || {}

  // Use this hook to populate messages and conversation list
  useEffect(() => {

    if (localStorage.getItem("user")) {
      setUser(true);

    }
    loadUserData()
  }, [])

  const loadUserData = async () => {

    if (localStorage.getItem("user")) {
      const userId = currentUser.userId
      const allConversations = await getConversations(userId)
      socket.addUser(userId)
      const allMessages = await getMessages(); 

      setConversationOnRender(allConversations, allMessages)
      
    }
  }

  const setConversationOnRender = (allConversations, allMessages) => {
    if(allConversations.length && allMessages.length) {
      let messageFound = false   
      
      allConversations.some(convo => {  
        if(messageFound) return true
        allMessages.some(message => {
          if(message.convoId === convo.id) {
            
            setActiveConversation(convo.id)
            messageFound = true
            return true
          }
        })
      })
    }
  }     
  /**
   * Send a new message to the database
   * 
   * @param {object} message - Message object containing {
   * {
      message: {
        convoId: 1,
        content: message,
        userId: currentUser.userId
      },
      userToken: currentUser.token
    }
   * @param {object} newConversation - new conversation object to add to state
  */
  const addMessage = async (message, newConversation = {}) => {
    // Clear alert message
    setApiError("");
    console.log(message);
    

    await fetch("/send_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server Couldn't insert message!");
        }
        return response.json();
      })
      .then( async (data) => {
        
        message.message['id'] = data.id
        setMessages((prevState) => [message.message, ...prevState])

        // Need two scenarios - new conversation as well as update 
        if(Object.keys(newConversation).length) {
          setActiveConversation(newConversation.id)
          let newUsers = newConversation.users.map(user => user.id)
          socket.startConversation(newUsers, newConversation, message);
          
        }
        else {
          socket.sendMessage(getReceivingIds(activeConversation), message)
          setConversations(prevState => {
            const newConversation = prevState.filter(convo => convo.id === activeConversation)
            const newList = prevState.filter(convo => convo.id !== activeConversation)
            return [newConversation[0], ...newList]
          })
        }

      })
      .catch((error) => {
        console.log(error.message);
        setApiError(error.message);
      });
  };

  const getMessages = async (id = "") => {
    
    setApiError("");

    const userId = id ? id : currentUser.userId
    
    try {
      const response = await fetch("/get_messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId: userId}),
      });
      const queriedMessages = await response.json();


      setMessages(queriedMessages);
      
      socket.setMessages(queriedMessages);
      socket.messageListener(queriedMessages, setMessages);
      
      return queriedMessages
    } 
    catch (err) {
      // display error if it exists
      setApiError("Sorry, couldn't grab these messages");
    }
  };

  const getConversations = async (userId) => {

    setApiError("");
    try {
      const response = await fetch("/get_conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId}),
      });
      
      const convResponse = await response.json();
      const allConversations = convResponse.conversations      
      
      setConversations(allConversations);
      socket.setConversations(allConversations);
      socket.conversationListener(allConversations, setConversations);
      
      return allConversations
    } catch (err) {
      // display error if it exists
      setApiError("Sorry, couldn't grab these conversations");
    }
  }

  /**
   * Add a new conversation to the conversation list
   *
   * @param {array} userIds - array of userIds in the new conversation
   * @param {object} message - Message object
   *
   * */
  const startConversation = async (newConversation, messageBody) => {
    
    // Format the object to be inserted into the db
    const userIds = newConversation.users.map(user => user.id)

    const timestamp = new Date()
    
    let message = {
      message: {
        convoId: newConversation.id,
        content: messageBody,
        userId: currentUser.userId,
        sendingUser: currentUser,
        users: userIds,
        timestamp: (timestamp.getTime() / 1000)
      },
      userToken: currentUser.token,
    };

    setActiveConversation(newConversation.id)
    socket.setConversations([newConversation, ...conversations]);

    addMessage(message, newConversation);
  };

  //Used as prop
  const activateConversation = conversationId => {   
    setActiveConversation(conversationId)
  }

  const getReceivingIds = (convoId) => {
    let activeConvo = conversations.filter(convo => convo.id === convoId)[0]
    
    return activeConvo.users.filter(user => user.id !== currentUser.userId).map(user => user.id)
  }

  // Need to fuigure out how to change conversations/messages shown in the message pane
  const value = {
    messages: messages,
    conversations: conversations,
    startConversation,
    getConversations,
    activateConversation,
    sendMessage: addMessage,
    client: socket,
    error: setApiError,
  };

  return (
    <MessageContext.Provider value={value}>
      <div className={classes.pane}>
        {!user && <SignUpModal getMessages={getMessages} />}
        <Container style={{ padding: 0 }}>
          <Grid container>
            <Grid
              item
              className={`${classes.conversationList} ${
                props.menuStatus ? classes.listOpen : ""
              }`}
              sm={12}
              md={12}
              lg={4}
            >
              <ChatList 
                setActiveConversation={activateConversation} 
                toggled={menuStatus}
                activeConversation={activeConversation} 
              />
            </Grid>
            <Grid
              item
              className={classes.MessagePane}
              md={12}
              lg={8}
              style={{
                position: "relative",
                display: props.menuStatus ? "none" : "block",
              }}
            >
              <MessagePane activeConversation={activeConversation} error={apiError} />
              <ChatControls activeConversation={activeConversation} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </MessageContext.Provider>
  );
};

export default WindowPane;
