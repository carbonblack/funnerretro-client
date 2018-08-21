import * as actionTypes from 'constants/actionTypes'

const initialState = {
    groups: [],
    isFetching: false,
    fetchingError: null
}

const groups = (state = initialState, action) => {
    switch(action.type) {
    case actionTypes.RECEIVE_GROUPS:
        return {
            ...state,
            groups: action.groups,
            isFetching: false,
            fetchingError: null
        }
    case actionTypes.FETCH_GROUPS:
        return {
            ...state,
            isFetching: true,
            fetchingError: null
        }
    case actionTypes.FETCH_GROUPS_ERROR:
        return {
            ...state,
            isFetching: false,
            fetchingError: action.error
        }
    default:
        return state
    }
}

export default groups
