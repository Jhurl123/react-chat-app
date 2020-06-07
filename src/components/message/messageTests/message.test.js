import React from 'react';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Message from '../message'

describe('Message Component', () => {

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<Message />)
      .toJSON();
      expect(tree).toMatchSnapshot();  
  });

  it('renders the UI with text content', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Message>This is the text content</Message>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
})