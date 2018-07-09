import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import board from 'reducers/board'
import template from 'reducers/template'

const reducers = combineReducers({
    board,
    template,
    routing: routerReducer
})
  
export default reducers
