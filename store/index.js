import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import { routerMiddleware } from 'react-router-redux'
import history from '../history'

const configureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    return createStore(
        reducers,
        composeEnhancers(
            applyMiddleware(routerMiddleware(history), thunk)
        )
    )
}

export default configureStore
