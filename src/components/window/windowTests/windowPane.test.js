import React from 'react'
import ReactDOM from 'react-dom'
import EnzymeToJson from 'enzyme-to-json';
import { mount, configure } from 'enzyme';
import WindowPane from '../windowPane'
import Adapter from 'enzyme-adapter-react-16';
import { MESSAGES, CONVERSATIONS } from './paneTestData'

import localStorage from '../../message/messageTests/localStorage'
import { act } from 'react-test-renderer';
window.localStorage = localStorage
window.localStorage.setItem('user', JSON.stringify({userName: 'test', userId: '343'}))

configure({ adapter: new Adapter() });

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ conversations: CONVERSATIONS }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe('WindowPane test', () => {

  it('renders the ui as expected', () => {
    const tree = mount(<WindowPane />)
    expect(EnzymeToJson(tree)).toMatchSnapshot(); 
  });

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WindowPane />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

})