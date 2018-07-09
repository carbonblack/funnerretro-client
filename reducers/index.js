import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import board from 'reducers/board'
import templates from 'reducers/templates'

const reducers = combineReducers({
    board,
    templates,
    routing: routerReducer
})
  
export default reducers
