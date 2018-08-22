import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import board from 'reducers/board'
import templates from 'reducers/templates'
import groups from 'reducers/groups'
import user from 'reducers/user'

const reducers = combineReducers({
    board,
    groups,
    templates,
    user,
    routing: routerReducer
})
  
export default reducers
