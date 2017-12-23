export const increment = () => {
    return dispatch => {
        dispatch({
            type: 'INCREMENT_REQUESTED'
        });

        dispatch({
            type: 'INCREMENT'
        })
    }
};

export const incrementAsync = (val) => {
    return dispatch => {
        dispatch({
            type: 'INCREMENT_REQUESTED',

        });
        return new Promise((res) => {
            setTimeout(() => {
                dispatch({
                    type: 'INCREMENT',
                    payload: val
                });
                res(dispatch);
            }, 1000);
        })
    }
};

export const decrement = () => {
    return dispatch => {
        dispatch({
            type: 'DECREMENT_REQUESTED'
        });

        dispatch({
            type: 'DECREMENT'
        });
    }
};

export const decrementAsync = () => {
    return dispatch => {
        dispatch({
            type: 'DECREMENT_REQUESTED'

        });

        return setTimeout(() => {
            dispatch({
                type: 'DECREMENT'
            })
        }, 1000);
    }
};
//reselect, validation, crud test, filtering
