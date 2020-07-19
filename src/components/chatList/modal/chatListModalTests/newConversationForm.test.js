import React from 'react';
import ReactDOM from 'react-dom'
import jest from 'jest'
import renderer from 'react-test-renderer'
import NewConversationForm from '../newConversationForm'

describe('NewConversationForm Component', () => {

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<NewConversationForm />)
      .toJSON();
      expect(tree).toMatchSnapshot();  
  });

  it('renders the UI without crashing', () => {

    const handleClose = jest.fn()

    const div = document.createElement('div');
    ReactDOM.render(<NewConversationForm handleClose={handleClose} />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
})