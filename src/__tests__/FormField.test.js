import React from 'react';
import {mount } from "enzyme";
import FormField from '../components/FormField'

const props = {
  id: 'email',
  name: 'email',
  type: 'email',
  value: ''
}


describe("FormField", () => {
  it("renders", () => {
    const mockFn = jest.fn();
    const wrapper = mount(<FormField {...props} onChange={mockFn}/>);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input').props().value).toEqual('')
  })
  it("setProps", () => {
    const wrapper = mount(<FormField {...props} />);
    wrapper.setProps({value:'toto@test.com'})

    expect(wrapper.find('input').props().value).toEqual('toto@test.com')
  })
  it("call onChangeMethod with right arg", () => {
    const mockFn = jest.fn();
    const wrapper = mount(<FormField {...props} onChange={mockFn}/>);

    wrapper.find('input').simulate('change', {target: {value: "toto@test.com"}});
    expect(mockFn).toBeCalledWith({"email":"toto@test.com"});

  })

});
