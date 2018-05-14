import React from 'react'
import { css } from 'react-emotion'
import { Link } from 'react-router-dom'
import colors from '../constants/colors'
import BoardContainer from '../containers/BoardContainer';

const Home = ({}) => (
    <div>
        <h2></h2>
        <div>
            <Link to="/boards/new"></Link>
            <Link to="/boards"></Link>
        </div>
    </div>
)

export default Home
