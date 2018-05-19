import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from '../history'
import Routes from './Routes'

const Root = ({ store }) => (
    <Provider store={store}>
        <div>
            <Router history={ history }>
                <Routes />
            </Router>
        </div>
    </Provider>
)

export default Root
