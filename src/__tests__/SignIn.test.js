import React from 'react';
import { shallow, mount } from "enzyme";
import SignIn from '../views/SignIn';
import FormField from '../components/FormField'
import Progress from '../components/Progress'



describe("SignIn", () => {
  it("renders", () => {
    const wrapper = mount(<SignIn />);
    expect(wrapper.exists()).toBe(true);
    let emailForm = wrapper.find(FormField).at(0)
    let passForm = wrapper.find(FormField).at(1)
    let progressBar = wrapper.find(Progress).at(0)
    expect(emailForm.exists()).toBe(true);
    expect(passForm.exists()).toBe(true);
    expect(progressBar.exists()).toBe(true);
  })
  it("sends back password from input Password and trigger score change", () => {
    const wrapper = mount(<SignIn />);
    let emailForm = wrapper.find(FormField).at(0)
    let passForm = wrapper.find(FormField).at(1)
    let progressBar = wrapper.find(Progress).at(0)

    expect(progressBar.find('span').text()).toEqual('Strengh : Invalid')

    emailForm.find('input').simulate('change', {target: {value: "ABCDE@abc.com"}});
    passForm.find('input').simulate('change', {target: {value: "ABCDE"}});

    expect(wrapper.find(FormField).at(0).find('input').props().value).toEqual('ABCDE@abc.com')
    expect(wrapper.find(FormField).at(1).find('input').props().value).toEqual('ABCDE')
    expect(progressBar.find('span').text()).toEqual('Strengh : Too Weak')

  })
  it("test some passwords", () => {
    const wrapper = mount(<SignIn />);
    let passForm = wrapper.find(FormField).at(1)
    let progressBar = wrapper.find(Progress).at(0)
    expect(progressBar.find('span').text()).toEqual('Strengh : Invalid')

    passForm.find('input').simulate('change', {target: {value: "ABCDE"}});
    expect(progressBar.find('span').text()).toEqual('Strengh : Too Weak')

    passForm.find('input').simulate('change', {target: {value: "abcHJU67"}});
    expect(progressBar.find('span').text()).toEqual('Strengh : Acceptable')

    passForm.find('input').simulate('change', {target: {value: "abcHJU67&;"}});
    expect(progressBar.find('span').text()).toEqual('Strengh : Strong')
  })
  it("trigger submit", () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const wrapper = mount(<SignIn />);
    let emailForm = wrapper.find(FormField).at(0)
    let passForm = wrapper.find(FormField).at(1)

    wrapper.find('form').simulate('submit');
    expect(wrapper.find('button').text()).toEqual('Submit')

    emailForm.find('input').simulate('change', {target: {value: "toto@test.com"}});
    passForm.find('input').simulate('change', {target: {value: "abcHJU67&;"}});

    wrapper.find('form').simulate('submit');
    expect(wrapper.find('button').text()).toEqual('Submitted !')
  })
});
