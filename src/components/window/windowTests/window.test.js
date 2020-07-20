import React from 'react'
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom'
import EnzymeToJson from 'enzyme-to-json';
import { mount, configure } from 'enzyme';
import Window from '../window'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Window test', () => {

  it('renders the ui as expected', () => {
    const tree = mount(<Window />)
    expect(EnzymeToJson(tree)).toMatchSnapshot(); 
  });

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Window />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

})

