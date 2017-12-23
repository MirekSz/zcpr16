import React from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Rx from 'rxjs';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CalendarItem from './CalendarItem';

const dataSource = ['Urlop', 'Święto', 'Opieka', 'Chorobowe'];

let days = [];
for (let i = 0; i <= 31; i++) {
    let day = {day: i, offReason: '', offHours: 0, workHours: 8};
    days.push(day);
}

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {days, project: 'Next Verto', time: 0};
        this.add$ = new Rx.Subject();
        this.add$.debounceTime(500).distinctUntilChanged().subscribe((val) => {
            this.setState({project: val.project});
        });
    }

    componentWillUpdate() {
        this.time = Date.now();
    }

    componentDidUpdate(prevProps, prevState) {
        this.refreshTimes(this.state.time === prevState.time);
    }

    refreshTimes(hasTimeChanged) {
        if (hasTimeChanged) {
            this.setState({
                time:
                Date.now() - this.time,
            });
        }
        console.log('this.state.time: ', this.state.time);

    }

    componentDidCatch(error, info) {
        debugger
    }

    onOffReasonChange(day, value) {
        day.offReason = value;
        day.workHours = 0;
        day.offHours = 8;
        const index = days.indexOf(day);
        if (index > -1) {
            days[index] = Object.assign({}, day);
        }
        this.setState({days});
    };

    handleProjectInput(event) {
        this.add$.next({project: event.target.value, stateHolder: this});
    };


    render() {
        let rows = [];
        for (let day of days) {
            rows.push(<CalendarItem key={day.day} day={day} project={this.state.project}
                                    onOffReasonChange={this.onOffReasonChange.bind(this)}/>
            )
        }
        return (
            <MuiThemeProvider>
                <div>
                    <input id="demo" onChange={this.handleProjectInput.bind(this)}/>
                    <TextField floatingLabelText="Projekt" defaultValue={this.state.project}
                               onChange={this.handleProjectInput.bind(this)} id="project" name="project"/>
                    <div className="projName">{this.state.project}</div>
                    <h3 className="times pull-right">Last Update Time: {this.state.time}</h3>
                    <Table>
                        <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Dzien</TableHeaderColumn>
                                <TableHeaderColumn>Projekt</TableHeaderColumn>
                                <TableHeaderColumn>Czas pracy</TableHeaderColumn>
                                <TableHeaderColumn>Czas nieobecnosci</TableHeaderColumn>
                                <TableHeaderColumn>Przyczyna nieobecnosci</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {rows}
                        </TableBody>
                    </Table>
                </div>
            </MuiThemeProvider>
        )
    }

}

