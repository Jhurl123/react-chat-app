import React from 'react'

export default React.createContext({
  messages: [],
  conversations: [],
  sendMessage: () => {},
  activateConversation: () => {},
  getConversations: () => {},
  client: () => {},
  error: () => {}
})
