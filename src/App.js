import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Calendar from './calendar/Calendar';
import List from './redux/List';

injectTapEventPlugin();

class App extends Component {
    componentDidCatch(error, info) {
        debugger
    }

    render() {
        if (1212 > 1) {
//            return null;
        }
        return (
            <MuiThemeProvider>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro container">
                        <Calendar/>
                    </p>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App;
