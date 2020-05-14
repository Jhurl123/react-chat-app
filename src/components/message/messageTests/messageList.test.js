
import React from 'react';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Message from '../message'
import MessageList from '../messageList'

const Messages = [
  <Message class={'sent'} />,
  <Message class={'sent'} />,
  <Message class={'sent'}/>
]

describe('Message List Tests', () => {
  it('renders without crashing', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');

    // render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(<MessageList />, div);

    // clean up code
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MessageList />)
      .toJSON();
      expect(tree).toMatchSnapshot();  
    });
})