import React from 'react'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'
import NoMessagePrompt from '../noMessagePrompt'

describe('No Message Prompt tests', () => {

  it('renders the ui as expected', () => {
    const tree = renderer
    .create(<NoMessagePrompt />)
    .toJSON();
    expect(tree).toMatchSnapshot();  
  });

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NoMessagePrompt />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

})