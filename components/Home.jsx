import React from 'react'
import { css, cx } from 'react-emotion'
import { Link } from 'react-router-dom'
import { baseButton } from '../styles/button'
import colors from '../styles/colors'
import logoImg from '../assets/logo.png'

const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: ${ colors.white };
`

const actions = css`
    display: flex;
    justify-content: center;
    width: 40%;
    margin-top: 1rem;
`

const button = css`
    ${ baseButton }
    text-transform: uppercase;
    font-weight: bold;
    padding: 0.75rem 1rem;
`

const firstButton = css`
    margin-right: 1rem;
`

const Home = () => (
    <div className={ container }>
        <img src={ logoImg } />
        <div className={ actions }>
            <Link className={ cx(button, firstButton) } to="/board/new">Create a new board</Link>
            <Link className={ button } to="/boards">All boards</Link>
        </div>
    </div>
)

export default Home
