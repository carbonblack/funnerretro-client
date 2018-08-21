import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from 'components/Home'
import BoardsContainer from 'containers/BoardsContainer'
import BoardContainer from 'containers/BoardContainer'
import BoardFormContainer from 'containers/NewBoardContainer'
import TopNavigation from 'components/navigation/TopNavigation'

const Routes = () => (
    <Fragment>
        <TopNavigation />
        <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/board/new" component={ BoardFormContainer } />
            <Route path="/board/:id" component={ BoardContainer } />
            <Route path="/boards/:id?" component={ BoardsContainer } />
        </Switch>
    </Fragment>
)

export default Routes
