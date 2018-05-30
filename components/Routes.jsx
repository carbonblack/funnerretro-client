import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Home from './Home'
import BoardsContainer from '../containers/BoardsContainer'
import BoardContainer from '../containers/BoardContainer'
import BoardFormContainer from '../containers/NewBoardContainer'
import TopNavigation from './TopNavigation'

const Routes = ({ location }) => (
    <div>
        <TopNavigation shouldShow={ location.pathname !== '/' } />
        <div>
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route path="/board/new" component={ BoardFormContainer } />
                <Route path="/board/:id" component={ BoardContainer } />
                <Route path="/boards" component={ BoardsContainer } />
            </Switch>
        </div>
    </div>
)

export default withRouter(Routes)
