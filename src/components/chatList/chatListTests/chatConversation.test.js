import React from 'react';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { mount, configure  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChatConversation from '../chatConversation'
import MessageContext from '../../../Context/messageContext';

configure({ adapter: new Adapter() });

import localStorage from '../../message/messageTests/localStorage'
window.localStorage = localStorage
window.localStorage.setItem('user', JSON.stringify({userName: 'test', userId: '123'}))

describe('Chat Conversation Tests', () => {

  const currentUser = JSON.parse(window.localStorage.getItem('user'))

  const MESSAGES = [
    {
      id: 1,
      convoId: 4,
      content: 'Testerroo',
      userId: currentUser.userId,
      sendingUser: currentUser,
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
      convoId: 4,
      content: 'Testerroo',
      userId: currentUser.userId,
      sendingUser: currentUser,
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
      convoId: 4,
      content: 'Testerroo',
      userId: currentUser.userId,
      sendingUser: currentUser,
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

  const CONVERSATION = {
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
  }

  it('renders the ui as expected', () => {
    const componentWithContext = 
      <MessageContext.Provider value={{messages: MESSAGES}}>
        <ChatConversation info={CONVERSATION}/>
      </MessageContext.Provider>
    const tree = renderer 
    .create(componentWithContext)
    .toJSON();
    expect(tree).toMatchSnapshot();  
  });

  it('renders the UI without crashing', () => {
    const componentWithContext = 
      <MessageContext.Provider value={{messages: MESSAGES}}>
        <ChatConversation info={CONVERSATION}/>
      </MessageContext.Provider>
    const div = document.createElement('div');
    ReactDOM.render(componentWithContext, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders the UI with props', () => {
    
   const wrapper = mount(
     <MessageContext.Provider
      value={{
        messages: MESSAGES
      }}
    >
      <ChatConversation info={CONVERSATION} />
    </MessageContext.Provider>
   )

   expect(wrapper.find('div').at('1').exists()).toBeTruthy()
    
  })

  // Will need to get a test on the click behavior of this element when implemented
})