import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import board from 'reducers/board'

const reducers = combineReducers({
    board,
    routing: routerReducer
})
  
export default reducers
