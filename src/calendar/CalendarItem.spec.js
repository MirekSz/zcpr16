import React from 'react';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
import CalendarItem from './CalendarItem';
import {expect} from 'chai';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';

it('renders without crashing', () => {
    let day = {day: 1}
    let wrapper = mount(<MuiThemeProvider><CalendarItem day={day}/></MuiThemeProvider>)
    ;

    expect(wrapper.html()).contains('1');
});

it('renders with project name', () => {
    let day = {day: 1}
    let projectName = 'VERTO';

    let wrapper = mount(<MuiThemeProvider><CalendarItem day={day} project={projectName}/></MuiThemeProvider>);
    expect(wrapper.find("td.project").html()).contains(projectName);
});

it('renders with input', () => {
    let called = false;
    let onOffReasonChange = () => {
        called = true;
    };
    let day = {day: 1};
    let projectName = 'VERTO';

    let wrapper = mount(<MuiThemeProvider><CalendarItem day={day} project={projectName}
                                                        onOffReasonChange={onOffReasonChange}/></MuiThemeProvider>);
    let input = wrapper.find('input');

    let reason = 'Chorobowe';
    input.first().simulate('change', {target: {value: reason}});
    input.first().simulate('change');
    input.first().simulate('blur');

    expect(day.offReason).to.be.eq(reason);
    expect(called).to.be.true;
});
it('renders with autocomplete', () => {
    let called = false;
    let onOffReasonChange = () => {
        called = true;
    };
    let day = {day: 1};
    let projectName = 'VERTO';

    let wrapper = mount(<MuiThemeProvider><CalendarItem day={day} project={projectName}
                                                        onOffReasonChange={onOffReasonChange}/></MuiThemeProvider>);
    let input = wrapper.find(AutoComplete);

    expect(input).to.have.length(1);
});
