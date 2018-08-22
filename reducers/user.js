import * as actionTypes from 'constants/actionTypes'

const initialState = {
    username: ''
}

const user = (state = initialState, action) => {
    switch(action.type) {
    case actionTypes.RECEIVE_USERNAME:
        return {
            ...state,
            username: action.username
        }
    default:
        return state
    }
}

export default user
