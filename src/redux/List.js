import React from 'react'
import {render} from 'react-dom'
import {increment, incrementAsync, decrement, decrementAsync} from './Actions'
import {applyMiddleware, compose, bindActionCreators} from 'redux'
import {Provider, connect} from 'react-redux';
import {store} from './Reducers'
import Crud from './Crud'

const Home = props => (
    <div>
        <h1>Home</h1>
        <p>Welcome home! {props.count}</p>
        <button onClick={() => props.incrementAsync(2)}>Go to about page via redux</button>
    </div>
);

const mapStateToProps = state => {
        return {
            count: state.counter.count,
        }
    }
;

const mapDispatchToProps = dispatch => bindActionCreators({
    increment,
    incrementAsync,
    decrement,
    decrementAsync,
}, dispatch);

let ConnectedHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);


let Hello = ({name, l}) => {
    let list = [];
    for (var i = 0; i < l; i++) {
        list.push(<li>{name} {i} <a href="#">usun</a></li>);
    }
    return list;
};
store.dispatch(incrementAsync(2)).then(incrementAsync(3));

class Co2 extends React.Component {
    render() {
        return (<div>sad {console.log('C2', new Date())}</div>);
    }
}

let Co = ({name}) => {
    return (<div>sad {name}{console.log(new Date())}</div>);
};
console.log('Co: ', Co);

class Mouse extends React.Component {
    state = {x: 0, y: 0}

    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }

    render() {
        return (
            <div style={{height: '200px'}} onMouseMove={this.handleMouseMove}>
                {this.props.render(this.state)}
            </div>
        )
    }
}

render(
    <Provider store={store}>
        <div>
            <Mouse render={({x, y}) => (
                <h1>The mouse position is ({x}, {y})</h1>
            )}/>
            <Co name="mirek"/>
            <Crud table="users"/>
            <ConnectedHome/>
            <Hello name="mirek" l="3"/>
        </div>
    </Provider>,
    document.getElementById('redux')
)
;
