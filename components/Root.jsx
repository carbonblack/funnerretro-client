import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from '../history'
import RoutesContainer from 'containers/RoutesContainer'

const Root = ({ store }) => (
    <Provider store={ store }>
        <Router history={ history }>
            <RoutesContainer />
        </Router>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root
