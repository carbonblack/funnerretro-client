import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import Home from './Home'
import Login from './Login'

const Root = ({ store }) => (
    <Provider store={store}>
        <div>
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route path="/login" component={ Login } />
                </Switch>
            </HashRouter>
        </div>
    </Provider>
)

export default Root
