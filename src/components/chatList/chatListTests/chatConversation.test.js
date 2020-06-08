import React from 'react';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ChatConversation from '../chatConversation'
import messageContext from '../../../Context/messageContext';

describe('Chat Conversation Tests', () => {

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
    excerpt: "This is the last message we sent...",
    time: "8:30pm"
  }

  it('renders the ui as expected', () => {
    const tree = renderer
    .create(<ChatConversation />)
    .toJSON();
    expect(tree).toMatchSnapshot();  
  });

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatConversation />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders the UI with props', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatConversation info={CONVERSATION} />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  // Will need to get a test on the click behavior of this element when implemented
})