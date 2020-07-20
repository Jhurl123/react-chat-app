const getConversations = async (userId) => {

  try {
    const response = await fetch("/get_conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId}),
    })
    
    const convResponse = await response.json()
    return convResponse.conversations 

  }
  catch(err) {
    console.log(err);
    
  }
}

const getMessages = async (id = "") => {
    
  const userId = '343'
  
  try {
    const response = await fetch("/get_messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId: userId}),
    })
    const queriedMessages = await response.json()
    
    return queriedMessages
  } 
  catch (err) {
    // display error if it exists
    // setApiError("Sorry, couldn't grab these messages")
  }
}

export {
  getConversations,
  getMessages
}