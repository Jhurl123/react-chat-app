import React from 'react'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'
import { mount, configure, shallow } from 'enzyme';
import ChatInput from '../chatInput';
import Adapter from 'enzyme-adapter-react-16';
 
configure({ adapter: new Adapter() });

describe('Chat Input Tests', () => {

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatInput />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<ChatInput />)
      .toJSON();
      expect(tree).toMatchSnapshot();  
  })

  it('input is created as expected', () => {
    const wrapper = mount(<ChatInput />);
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    expect(input.prop('type')).toEqual('text');
    expect(input.prop('name')).toEqual('message');
  })

  it('submits add message form', () => {

      const userObject = {userId: '123', token: '123123123123123'}
      const fakeEvent = { preventDefault: () => {} };
      const chatComponent = shallow(<ChatInput userObject={userObject}/>);
      const text = chatComponent.find('input')
      text.value = 'test'
      expect(chatComponent.find('form').length).toBe(1);
      chatComponent.find('form').simulate('submit', fakeEvent);

  })
});