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
    // When the backend is built out, messages will be a list of messages with a certain convoId, not a lst of all message
    loadUserData()

  }, [conversations])

  const loadUserData = async () => {
    if (localStorage.getItem("user")) {
      await getConversations(currentUser.userId)
      
      getMessages();      
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
        response.json();
      })
      .then( async (data) => {
        // Send the message to the client
        setMessages((prevState) => {
          socket.setMessages([message.message, ...prevState]);
          return [message.message, ...prevState]
        })

        let messageContent = message.message.content
        const excerpt = messageContent.length >= 25 ? messageContent.substring(0, 25) + '...' : messageContent

        // Need two scenarios - new conversation as well as update 
        if(Object.keys(newConversation).length) {
          newConversation['excerpt'] = excerpt
          setConversations(prevState => [newConversation, ...prevState])
        }
        else {

          console.log(conversations);
          
          let lastConversation = addExcerptToLastConversation(message.message.convoId,excerpt)
          lastConversation.then(lastConvo => {
            console.log(lastConvo);
            
            setConversations(prevState =>  {
              console.log(prevState);
              
              return [lastConvo, ...prevState.filter(convo => convo.id !== lastConvo.id)]
            })
          })
        }
      })
      .catch((error) => {
        setApiError(error.message);
      });
  };

  const addExcerptToLastConversation = (convoId, excerpt) => {

    return new Promise(resolve => {
      
      const lastConversation = conversations.filter(convo => { 
        return convo.id === convoId
      })[0]
      lastConversation['excerpt'] = excerpt
      resolve(lastConversation)

    })
  }

  const getMessages = async () => {
    
    setApiError("");
    
    try {
      const response = await fetch("/get_messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId: currentUser.userId}),
      });
      const messages = await response.json();
      
      setMessages(messages);
      console.log(messages);
      
      socket.setMessages(messages);
      socket.messageListener(messages, setMessages);
    } 
    catch (err) {
      // display error if it exists
      setApiError("Sorry, couldn't grab these messages");
    }
  };

  const getConversations = async (userId) => {
    
    if(conversations.length) return

    setApiError("");
    try {
      const response = await fetch("/get_conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId}),
      });
      
      const allConversations = await response.json();
      console.log(allConversations.conversations)
      setConversations(allConversations.conversations);
      setActiveConversation(allConversations.conversations[0].id)

      socket.setConversations(conversations);
      socket.conversationListener(conversations, setConversations);
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
    let message = {
      message: {
        convoId: newConversation.id,
        content: messageBody,
        userId: currentUser.userId,
        users: userIds,
      },
      userToken: currentUser.token,
    };

    setActiveConversation(newConversation.id)
    // example functionality 
    // socket.setMessages([message, ...messages]);
    socket.setConversations([newConversation, ...conversations]);
    addMessage(message, newConversation);
  };

  //Used as prop
  const activateConversation = conversationId => {   
    setActiveConversation(conversationId)
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
