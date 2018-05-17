import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import { css } from 'react-emotion'
import colors from '../styles/colors'
import TopNavigation from './TopNavigation'
import Home from './Home'
import BoardsContainer from '../containers/BoardsContainer'
import BoardContainer from '../containers/BoardContainer'
import NewBoardContainer from '../containers/NewBoardContainer'
import history from '../history'

const Root = ({ store, isAuthenticated }) => (
    <Provider store={store}>
        <div>
            <Router history={ history }>
                <div>
                    <TopNavigation isAuthenticated={ isAuthenticated }/>
                    <div>
                        <Switch>
                            <Route exact path="/" component={ Home } />
                            <Route path="/board/new" component={ NewBoardContainer } />
                            <Route path="/board/:id" component={ BoardContainer } />
                            <Route path="/boards" component={ BoardsContainer } />
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    </Provider>
)

export default Root
