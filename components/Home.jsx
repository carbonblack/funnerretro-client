import React from 'react'
import { css } from 'react-emotion'
import colors from '../constants/colors'
import Board from './Board'

const backdrop = css`
    background: linear-gradient(141deg, ${ colors.teal } 0%, ${ colors.lightBlue } 51%, ${ colors.blue } 75%);
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
        <Board />
    </div>
)

export default Home
