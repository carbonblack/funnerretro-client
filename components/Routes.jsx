import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import BoardsContainer from 'containers/BoardsContainer'
import BoardContainer from 'containers/BoardContainer'
import BoardFormContainer from 'containers/NewBoardContainer'
import TopNavigation from 'components/navigation/TopNavigation'

class Routes extends Component {
    componentDidMount() {
        this.props.load()
    }

    render() {
        const { username } = this.props

        return (
            <Fragment>
                <TopNavigation username={ username } />
                <Switch>
                    <Route exact path="/" render={ () => (<Redirect to="/boards/0"/>) } />
                    <Route path="/board/new" component={ BoardFormContainer } />
                    <Route path="/board/:id" component={ BoardContainer } />
                    <Route path="/boards/:id?" component={ BoardsContainer } />
                </Switch>
            </Fragment>
        )
    }
}

Routes.propTypes = {
    username: PropTypes.string,
    load: PropTypes.func.isRequired
}

Routes.defaultProps = {
    username: ''
}

export default Routes
