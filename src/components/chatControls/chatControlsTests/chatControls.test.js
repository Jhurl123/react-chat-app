import React from 'react'
import renderer from 'react-test-renderer'
import ChatControls from '../chatControls'
import { mount } from 'enzyme';

describe('Chat controls test', () => {

  it('renders the ui as expected', () => {
    const tree = renderer
    .create(<ChatControls />)
    .toJSON();
    expect(tree).toMatchSnapshot();  
  });
})