
import React from 'react';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { mount, configure  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MessageList from '../messageList'
import MessageContext from '../../../Context/messageContext';

import localStorage from './localStorage'
window.localStorage = localStorage
window.localStorage.setItem('user', JSON.stringify({userName: 'test', userId: '123'}))

configure({ adapter: new Adapter() });

const currentUser = JSON.parse(window.localStorage.getItem('user'))

const MESSAGES = [
  {
    id: 1,
    convoId: 1,
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
    convoId: 1,
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
    convoId: 1,
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

describe('Message List Tests', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MessageList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MessageList />)
      .toJSON();
      expect(tree).toMatchSnapshot();  
  });

  it('renders a list of messages from context', () => {

    const wrapper = mount(
      <MessageContext.Provider
        value={{
          messages: MESSAGES
        }}
      >
        <MessageList userObject={currentUser}/>
      </MessageContext.Provider>
    )
    
    console.log(wrapper);
    
    expect(wrapper.find('li').at('1').text()).toEqual('Testerroo')
  })
})