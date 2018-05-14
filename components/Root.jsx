import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import { css } from 'react-emotion'
import colors from '../constants/colors'
import TopNavigation from './TopNavigation'
import Home from './Home'
import Login from './Login'
import BoardsContainer from '../containers/BoardsContainer'

const backdrop = css`
    background: linear-gradient(141deg, ${ colors.blue } 0%, ${ colors.lightBlue } 51%, ${ colors.mediumBlue } 75%);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
`

const mainContent = css`
    margin: 2rem;
`

const Root = ({ store, isAuthenticated }) => (
    <Provider store={store}>
        <div>
            <div className={ backdrop }></div>
            <HashRouter>
                <div>
                    <TopNavigation isAuthenticated={ isAuthenticated }/>
                    <div className={ mainContent }>
                        <Switch>
                            <Route exact path="/" component={ Home } />
                            <Route path="/boards" component={ BoardsContainer } />
                            <Route path="/login" component={ Login } />
                        </Switch>
                    </div>
                </div>
            </HashRouter>
        </div>
    </Provider>
)

export default Root
