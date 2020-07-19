import React from 'react';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ModalCloseButton from '../modalCloseButton'

describe('ModalCloseButton Component', () => {

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<ModalCloseButton />)
      .toJSON();
      expect(tree).toMatchSnapshot();  
  });

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ModalCloseButton />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
})