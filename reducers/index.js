import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import board from './board'
import user from './user'

const reducers = combineReducers({
    board,
    user,
    routing: routerReducer
})
  
export default reducers
