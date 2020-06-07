
import React from 'react';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { mount, configure  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Message from '../message'
import MessageList from '../messageList'
import messageContext from '../../../Context/messageContext';

configure({ adapter: new Adapter() });

const MESSAGES = [
  {
    id: 1,
    content: 'Testerroo'
  },
  {
    id: 2,
    content: 'Testerroo'
  },
  {
    id: 3,
    content: 'Testerroo'
  }
]

const userObject = {
  userId: '123',
}

describe('Message List Tests', () => {
  it('renders without crashing', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');

    // render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(<MessageList />, div);

    // clean up code
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<MessageList />)
      .toJSON();
      expect(tree).toMatchSnapshot();  
  });

  it('renders a list of messages from context', () => {

    const wrapper = mount(
      <messageContext.Provider
        value={{
          messages: MESSAGES
        }}
      >
        <MessageList userObject={userObject}/>
      </messageContext.Provider>
    )
    
    expect(wrapper.find('li').at('1').text()).toEqual('Testerroo')
  })
})