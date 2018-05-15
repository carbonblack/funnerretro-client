import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import { css } from 'react-emotion'
import colors from '../styles/colors'
import TopNavigation from './TopNavigation'
import Home from './Home'
import Login from './Login'
import BoardsContainer from '../containers/BoardsContainer'
import BoardContainer from '../containers/BoardContainer'
import NewBoardContainer from '../containers/NewBoardContainer'
import history from '../history'

const backdrop = css`
    background: linear-gradient(141deg, ${ colors.blue } 0%, ${ colors.lightBlue } 51%, ${ colors.mediumBlue } 100%);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
`

const Root = ({ store, isAuthenticated }) => (
    <Provider store={store}>
        <div>
            <div className={ backdrop }></div>
            <Router history={ history }>
                <div>
                    <TopNavigation isAuthenticated={ isAuthenticated }/>
                    <div>
                        <Switch>
                            <Route exact path="/" component={ Home } />
                            <Route path="/board/new" component={ NewBoardContainer } />
                            <Route path="/board/:id" component={ BoardContainer } />
                            <Route path="/boards" component={ BoardsContainer } />
                            <Route path="/login" component={ Login } />
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    </Provider>
)

export default Root
