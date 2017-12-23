import React from 'react'
import {store} from './Reducers';
import {Provider, connect} from 'react-redux';
import {applyMiddleware, compose, bindActionCreators} from 'redux';


let Table = ({items = []}) => {
    let rows = items.map((el) => {
        return (<tr>
            <td>{el.id}</td>
            <td>{el.name}</td>
            <td>{el.age}</td>
        </tr>)
    });
    return (<table>
        <tr>
            <th>id</th>
            <th>name</th>
            <th>age</th>
        </tr>
        {rows}
    </table>);
};

let AddAction = (props) => {
    return <div>
        <button onClick={props.add}>add</button>
    </div>
};

class TableContainer extends React.Component {
    componentDidMount() {
        this.props.loadData(this.props.table);
    }

    render() {
        let form = "";
        if (this.props.form) {
            form = "form"
        }
        let items = this.props.items[this.props.table];
        return (<div><Table items={items}/>{form}<AddAction add={this.props.add.bind(this, this.props.table)}/></div>)
    }
}

const mapStateToProps = (state, props) => {
        return {
            items: state[props.table], form: state[props.table].form
        }
    }
;
export const loadData = (tableName) => {
    return dispatch => {
        return new Promise((res) => {
            setTimeout(() => {
                dispatch({
                    type: 'LOAD_DATA',
                    name: tableName
                });
                res(dispatch);
            }, 1000);
        })
    }
};
export const add = (tableName) => {
    return dispatch => {
        dispatch({
            type: 'ADD',
            name: tableName
        });
    };
};
const mapDispatchToProps = dispatch => bindActionCreators({loadData, add}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableContainer);
