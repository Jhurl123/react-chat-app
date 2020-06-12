import React from 'react'
import renderer from 'react-test-renderer'
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom'
import EnzymeToJson from 'enzyme-to-json';
import { mount, configure, shallow } from 'enzyme';
import SignUpModal from '../signUpModal'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('Sign Up Modal test', () => {

  it('renders the ui as expected', () => {
    const tree = mount(<SignUpModal />)
    expect(EnzymeToJson(tree)).toMatchSnapshot(); 
  });

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SignUpModal />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  describe('User Functionality', () => {

    let wrapper

    beforeEach(() => {
      wrapper = mount(<SignUpModal />)
    })

    it('changes state to signup', () => {

      let wrapper = mount(<SignUpModal />)

     act( () => {
        wrapper.find('.signup-button').first().simulate('click')
      })
      expect(wrapper.find('.login-button').first()).toBeNull()
    })

  })
   

})