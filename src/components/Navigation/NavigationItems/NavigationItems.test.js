import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter : new Adapter()});

describe('<navigationItems/>',()=>{

  let wrapper = null;
  beforeEach(()=>{
    wrapper = shallow(<NavigationItems />);
  })

  it('should render two  <navigationItem/> element if not authenticated',() => {
       
       expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three  <navigationItem/> element if is authenticated',() => {
     //wrapper = shallow(<NavigationItems isAuthenticated />);
     wrapper.setProps({isAuthenticated:true})
   expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should contain logout   <navigationItem/> element if is authenticated',() => {
    //wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({isAuthenticated:true})
    expect(wrapper.contains(<NavigationItem link="/logout">logout</NavigationItem>)).toEqual(true);
    });



});