import React from 'react'

export default React.createContext({
  messages: [],
  conversations: [],
  sendMessage: () => {},
  client: () => {}
})
