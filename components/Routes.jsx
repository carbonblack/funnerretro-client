import React, { Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import BoardsContainer from 'containers/BoardsContainer'
import BoardContainer from 'containers/BoardContainer'
import BoardFormContainer from 'containers/NewBoardContainer'
import TopNavigation from 'components/navigation/TopNavigation'

const Routes = () => (
    <Fragment>
        <TopNavigation />
        <Switch>
            <Route exact path="/" render={ () => (<Redirect to="/boards/0"/>) } />
            <Route path="/board/new" component={ BoardFormContainer } />
            <Route path="/board/:id" component={ BoardContainer } />
            <Route path="/boards/:id?" component={ BoardsContainer } />
        </Switch>
    </Fragment>
)

export default Routes
