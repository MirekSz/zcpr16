import React from 'react';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
import Calendar from './Calendar';
import {expect} from 'chai';
import AutoComplete from 'material-ui/AutoComplete';

it('renders Calendar', () => {
    let wrapper = shallow(
        <div>
            <Calendar/>
        </div>
    );
    console.log(wrapper.debug());
    expect(wrapper.html()).contains('1');
});

it('should set project name', () => {
    let wrapper = shallow(
        <Calendar/>
    );
    wrapper.instance().handleProjectInput({target: {value: 'HCM'}});

    return waitSomeTime().then(() => {
        wrapper.update();
        console.log('as', wrapper.instance().state.project);
        expect(wrapper.find('.projName').text()).to.be.contains('HCM');
    });
});


it('should set project name by input', () => {
    let wrapper = shallow(
        <Calendar/>
    );
    wrapper.find("#demo").simulate('change', {target: {value: 'HCM'}});

    return waitSomeTime().then(() => {
        wrapper.update();
        console.log('as', wrapper.instance().state.project);
        expect(wrapper.find('.projName').text()).to.be.contains('HCM');
    });
});


function waitSomeTime() {
    return new Promise((res, rej) => {
        setTimeout(function () {
            res();
        }, 2000)
    });
}
