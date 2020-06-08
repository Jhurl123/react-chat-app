import React from 'react'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'
import ChatControls from '../chatControls'

describe('Chat controls test', () => {

  it('renders the ui as expected', () => {
    const tree = renderer
    .create(<ChatControls />)
    .toJSON();
    expect(tree).toMatchSnapshot();  
  });

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatControls />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  
})