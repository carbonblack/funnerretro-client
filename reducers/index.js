import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import board from 'reducers/board'
import templates from 'reducers/templates'
import groups from 'reducers/groups'

const reducers = combineReducers({
    board,
    groups,
    templates,
    routing: routerReducer
})
  
export default reducers
