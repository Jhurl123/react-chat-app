const MESSAGES = [
  {
    id: 1,
    convoId: 1,
    content: 'Testerroo',
    userId: '343',
    users: [
      '123',
      '456'
    ],
    unread: [
      '456'
    ],
    timestamp: new Date()
  },
  {
    id: 2,
    convoId: 1,
    content: 'Testerroo',
    userId: '343',
    users: [
      '123',
      '456'
    ],
    unread: [
      '456'
    ],
    timestamp: new Date()
  },
  {
    id: 3,
    convoId: 1,
    content: 'Testerroo',
    userId: '343',
    users: [
      '123',
      '456'
    ],
    unread: [
      '456'
    ],
    timestamp: new Date()
  }
]

const CONVERSATIONS = [
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
    userIds: [
      343,
      3432
    ],
    excerpt: "This is the last message we sent...",
    timestamp: "1231231231"
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
    userIds: [
      343,
      3432
    ],
    excerpt: "No, this is...",
    timestamp: "1231231231"
  }
]

export {
  MESSAGES,
  CONVERSATIONS
}
  