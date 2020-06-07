import React from 'react';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import MessagePane from '../messagePane'

describe('Message Pane component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MessagePane />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the ui as expected', () => {
    const tree = renderer
    .create(<MessagePane />)
    .toJSON();
    expect(tree).toMatchSnapshot();  
  })

  it('renders the error message when passed', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MessagePane error={'Couldn\'t send this message!'}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders the ui as expected when error is passed', () => {
    const tree = renderer
    .create(<MessagePane error={'Couldn\'t send this message!'} />)
    .toJSON();
    expect(tree).toMatchSnapshot();  
  })
})