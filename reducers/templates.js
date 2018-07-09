import * as actionTypes from 'constants/actionTypes'

const initialState = {
    templates: []
}

const template = (state = initialState, action) => {
    switch(action.type) {
    case actionTypes.RECEIVE_TEMPLATES:
        return {
            ...state,
            templates: action.templates
        }
    default:
        return state
    }
}

export default template
