import React from 'react';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ConversationUsers from '../conversationUsers'
import localStorage from './localStorage'

window.localStorage = localStorage

window.localStorage.setItem('user', JSON.stringify({userName: 'test'}))
describe('Message Pane Conversation Users Component', () => {

  it('renders as expected', () => {
    const tree = renderer
    .create(<ConversationUsers />)
    .toJSON();
    expect(tree).toMatchSnapshot();  
  })

  it('renders with Id', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ConversationUsers activeConversation={123}/> , div);
    ReactDOM.unmountComponentAtNode(div);
  })
})