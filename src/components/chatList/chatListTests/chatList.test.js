import React from 'react';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ChatList from '../chatList'
import { mount, configure  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import messageContext from '../../../Context/messageContext';
import localStorage from '../../message/messageTests/localStorage'

window.localStorage = localStorage
window.localStorage.setItem('user', JSON.stringify({userName: 'test'}))

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

const CONVERSATIONS = [{
  id: 4,
  users: [
    {
      id: 343,
      name: "Justin H."
    },
    {
      id: 3432,
      name: "Abby H."
    }
  ],
  excerpt: "This is the last message we sent...",
  time: "8:30pm"
}]

describe('Chat List tests', () => {

  it('renders the ui as expected', () => {
    const tree = renderer
    .create(<ChatList />)
    .toJSON();
    expect(tree).toMatchSnapshot();  
  });

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatList />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders with the messages and conversations context values', () => {
    const wrapper = mount(
      <messageContext.Provider
        value={{
          messages: MESSAGES,
          conversations: CONVERSATIONS
        }}
      >
        <ChatList />
      </messageContext.Provider>
    )
  })

})