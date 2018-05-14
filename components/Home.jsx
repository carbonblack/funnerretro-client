import React from 'react'
import { css } from 'react-emotion'
import colors from '../constants/colors'
import BoardContainer from '../containers/BoardContainer';

const backdrop = css`
    background: linear-gradient(141deg, ${ colors.blue } 0%, ${ colors.lightBlue } 51%, ${ colors.mediumBlue } 75%);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
`

const Home = ({}) => (
    <div>
        <div className={ backdrop }></div>
        <BoardContainer />
    </div>
)

export default Home
