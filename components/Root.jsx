import React from 'react'
import { Provider, connect } from 'react-redux'
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

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps)(Root)
