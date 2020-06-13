import React from 'react';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ChatAdd from '../chatAdd'

describe('Chat Add Tests', () => {

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatAdd />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
  it('renders the ui as expected', () => {
    const tree = renderer
    .create(<ChatAdd />)
    .toJSON();
    expect(tree).toMatchSnapshot();  
  })

})