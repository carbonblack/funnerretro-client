import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import { css } from 'react-emotion'
import colors from '../styles/colors'
import history from '../history'
import Routes from './Routes'

const Root = ({ store, isAuthenticated }) => (
    <Provider store={store}>
        <div>
            <Router history={ history }>
                <Routes />
            </Router>
        </div>
    </Provider>
)

export default Root
