import React from 'react'
import { css, cx } from 'react-emotion'
import { Link } from 'react-router-dom'
import colors from '../constants/colors'
import BoardContainer from '../containers/BoardContainer';

const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: ${ colors.white };
    margin-top: -3rem;
`

const actions = css`
    display: flex;
    justify-content: center;
    width: 20%;
    margin-top: 1rem;
`

const button = css`
    color: ${ colors.white };
    background: ${ colors.orange };
    border: 0;
    border-radius: 2px;
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    text-decoration: none;

    &:hover {
        background: ${ colors.mediumOrange };
    }
`

const firstButton = css`
    margin-right: 1rem;
`

const Home = ({}) => (
    <div className={ container }>
        <h1>Welcome to Retro • Spec</h1>
        <div className={ actions }>
            <Link className={ cx(button, firstButton) } to="/board/new">Create a new board</Link>
            <Link className={ button } to="/boards">All boards</Link>
        </div>
    </div>
)

export default Home
