import React from 'react';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Modal from '@material-ui/core/Modal';
import NewConversationModal from '../NewConversationModal'

describe('NewConversationModal Component', () => {

  const open = false
  const toggleModal = jest.fn()

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<NewConversationModal open={open} toggleModal={toggleModal} />)
      .toJSON();
      expect(tree).toMatchSnapshot();  
  });

  it('renders the UI with text content', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewConversationModal open={open} toggleModal={toggleModal} />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
})