import React from 'react'
import { css } from 'react-emotion'
import { Link } from 'react-router-dom'
import brandLogo from '../assets/icon.png'
import colors from '../styles/colors'

const nav = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 3rem;
    margin-bottom: 2rem;

    background: ${ colors.blue };

    a {
        color: ${ colors.white };
        text-decoration: none;
        font-family: 'Dosis', sans-serif;
        font-weight: bold;
        text-transform: uppercase;
        padding: 1rem 2rem;
        
        &:hover {
            background: ${ colors.lightBlue };
            color: ${ colors.white };
            transition: 0.2s;
        }
    }
`

const links = css`
    display: flex;
`

const brand = css`
    width: 1.5rem;
    padding: 0 1rem;
`

const TopNavigation = ({ shouldShow }) => {
    if(shouldShow) {
        return (
            <div className={ nav }>
                <Link to="/">RetroSpec</Link>
                <div className={ links }>
                    <Link to="/boards">All Boards</Link>
                    <Link to="/board/new">Create Board</Link>
                </div>
            </div>
        )
    }

    return null
}

export default TopNavigation
