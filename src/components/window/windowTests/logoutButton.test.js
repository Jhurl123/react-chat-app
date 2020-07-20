import React from 'react'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'
import LogoutButton from '../logoutButton'
import Menu from '@material-ui/core/Menu';

import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import localStorage from '../../message/messageTests/localStorage'
window.localStorage = localStorage

describe('Log out Button tests', () => {

  it('renders the ui as expected', () => {
    const tree = renderer
    .create(<LogoutButton />)
    .toJSON();
    expect(tree).toMatchSnapshot();  
  });

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LogoutButton />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('displays logout button', () => {

    window.localStorage.setItem('user', JSON.stringify({userName: 'test', userId: '123'}))
    const wrapper = mount(
      <LogoutButton />
    )
    expect(wrapper.find(<Menu />)).toBeTruthy()
  })

  it('does not display logout button', () => {
    window.localStorage.removeItem('user')
    const wrapper = mount(
      <LogoutButton />
    )
    expect(wrapper.find(<Menu />)).toMatchObject({})
  })

})