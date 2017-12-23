import {createStore, combineReducers} from 'redux'
import {applyMiddleware, compose, bindActionCreators} from 'redux'
import thunk from 'redux-thunk';
import {users} from './CrudR';


const counter = (state = {count: 500}, action) => {
    switch (action.type) {
        case 'HELLO_WORLD':
            console.log('reducer: helloWorld');
            return Object.assign({}, state, {message: 'Hello, World!'});
        case 'INCREMENT_REQUESTED':
            return {
                ...state,
                isIncrementing: true
            };
        case 'INCREMENT':
            let number = action.payload == null ? 1 : action.payload;
            return {
                ...state,
                count: state.count + (number),
                isIncrementing: !state.isIncrementing
            };
        default:
            return state
    }
};

const helloReducer = combineReducers({
    counter,
    users
});

const enhancers = [];
const middleware = [
    thunk
];

const devToolsExtension = window.devToolsExtension;

if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

export const store = createStore(
    helloReducer,
    {},
    composedEnhancers
);
