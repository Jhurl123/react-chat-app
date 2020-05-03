import React, { useEffect, useState }from 'react'
import { makeStyles } from "@material-ui/core/styles";
import ChatConversation from './chatConversation';

const useStyles = makeStyles((theme) => ({
  chatList: {
    borderRight: '1px solid #d3d3d3',
    height: '80vh',
    overflowY: 'scroll'
  }
}))

const CONVERSATIONS = [
  {
    id: 3,
    users: [
      {
        id: 343,
        name: "Justin H."
      },
      {
        id: 3432,
        name: "Abby H."
      }
    ],
    excerpt: "This is the last message we sent...",
    time: "8:30pm"
  },
  {
    id: 4,
    users: [
      {
        id: 343,
        name: "Justin H."
      },
      {
        id: 3432,
        name: "Abby H."
      }
    ],
    excerpt: "This is the last message we sent...",
    time: "8:30pm"
  },
  {
    id: 5,
    users: [
      {
        id: 343,
        name: "Espresso H."
      }
    ],
    excerpt: "This is the last message we sent...",
    time: "8:30pm"
  },
  {
    id: 3432,
    users: [
      {
        id: 2132,
        name: "Crush H."
      }
    ],
    excerpt: "This is the last message we sent...",
    time: "8:30pm"
  },
  {
    id: 3432,
    users: [
      {
        id: 2132,
        name: "Crush H."
      }
    ],
    excerpt: "This is the last message we sent...",
    time: "8:30pm"
  },
  {
    id: 3432,
    users: [
      {
        id: 2132,
        name: "Crush H."
      }
    ],
    excerpt: "This is the last message we sent...",
    time: "8:30pm"
  },
  {
    id: 3432,
    users: [
      {
        id: 2132,
        name: "Crush H."
      }
    ],
    excerpt: "This is the last message we sent...",
    time: "8:30pm"
  },
  {
    id: 3432,
    users: [
      {
        id: 2132,
        name: "Crush H."
      }
    ],
    excerpt: "This is the last message we sent...",
    time: "8:30pm"
  },
  {
    id: 3432,
    users: [
      {
        id: 2132,
        name: "Crush H."
      }
    ],
    excerpt: "This is the last message we sent...",
    time: "8:30pm"
  }
]

const ChatList = (props) => {

  const classes = useStyles()
  return (
    <div className={classes.chatList}>
      {CONVERSATIONS && (
        CONVERSATIONS.map(convo => <ChatConversation key={convo.id} info={convo} />)
      )}

    </div>
  )
}

export default ChatList