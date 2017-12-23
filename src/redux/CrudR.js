var usersDefault = [{id: 1, name: '2', age: 3}, {id: 4, name: '5', age: 6}];

export const users = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_DATA':
            return {[action.name]: usersDefault};
        case 'ADD':
            return {[action.name]: usersDefault, form: true};
        default:
            return state
    }
};

