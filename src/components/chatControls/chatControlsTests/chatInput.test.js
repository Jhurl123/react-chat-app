import React from 'react'
import renderer from 'react-test-renderer'
import { mount, configure  } from 'enzyme';
import ChatInput from '../chatInput';
import Adapter from 'enzyme-adapter-react-16';
 
configure({ adapter: new Adapter() });

describe('Chat Input Tests', () => {
  it('input is created as expected', () => {
    const wrapper = mount(<ChatInput />);
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    expect(input.prop('type')).toEqual('text');
    expect(input.prop('name')).toEqual('message');
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<ChatInput />)
      .toJSON();
      expect(tree).toMatchSnapshot();  
    });
});