import React from 'react'
import ReactDOM from 'react-dom'
import EnzymeToJson from 'enzyme-to-json';
import { mount, configure } from 'enzyme';
import Toolbar from '../toolbar'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Toolbar test', () => {

  it('renders the ui as expected', () => {
    const tree = mount(<Toolbar />)
    expect(EnzymeToJson(tree)).toMatchSnapshot(); 
  });

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Toolbar />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

})