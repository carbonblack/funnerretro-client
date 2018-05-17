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
    margin-bottom: 1rem;

    background: ${ colors.offWhite };
    border-bottom: 4px solid ${ colors.black };

    a {
        color: ${ colors.black };
        text-decoration: none;
        
        &:hover {
            color: ${ colors.darkGray };
        }
    }
`

const links = css`
    display: flex;

    a {
        padding: 1rem;
        text-transform: uppercase;
        font-weight: bold;

        &:hover {
            background: ${ colors.lightPink };
            color: ${ colors.white };
            transition: 0.2s;
        }
    }
`

const brand = css`
    width: 1.5rem;
    padding: 0 1rem;
`

const TopNavigation = ({ shouldShow }) => {
    if(shouldShow) {
        return (
            <div className={ nav }>
                <Link to="/"><img src={ brandLogo } className={ brand } /></Link>
                <div className={ links }>
                    <Link to="/boards">Boards</Link>
                </div>
            </div>
        )
    }

    return null
}

export default TopNavigation
