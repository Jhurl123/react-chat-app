import React from 'react';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Message from '../message'
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import localStorage from './localStorage'
window.localStorage = localStorage
window.localStorage.setItem('user', JSON.stringify({userName: 'test', userId: '123'}))

const currentUser = JSON.parse(window.localStorage.getItem('user'))
const receivedUser = {userName: 'NewTest', userId: '24'}
const MESSAGE = {
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
}

const RECEIVEDMESSAGE = {
  id: 2,
  convoId: 1,
  content: 'Testerroo',
  userId: '24',
  sendingUser: receivedUser,
  users: [
    '123',
    '456'
  ],
  unread: [
    '456'
  ],
  timestamp: new Date()
}
describe('Message Component', () => {

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<Message message={MESSAGE} time={{_seconds: '123123'}} user={currentUser} />)
      .toJSON();
      expect(tree).toMatchSnapshot();  
  });

  it('renders the UI with text content', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Message message={MESSAGE} time={{_seconds: '123123'}} user={currentUser}>This is the text content</Message>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders a text in a message', () => {

    const wrapper = mount(
      <Message message={MESSAGE} time={{_seconds: '123123'}} user={currentUser}>This is the text content</Message>
    )
    expect(wrapper.find('span').text()).toEqual('This is the text content')
  })

  it('renders the a user on a message recived', () => {
    
    const wrapper = mount(
      <Message message={RECEIVEDMESSAGE} time={{_seconds: '123123'}} user={receivedUser}>This is the text content</Message>
    )

    expect(wrapper.find('div').text()).toBeTruthy()
  })
  
})