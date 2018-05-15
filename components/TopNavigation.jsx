import React from 'react'
import { css } from 'react-emotion'
import { Link } from 'react-router-dom'
import colors from '../styles/colors'

const nav = css`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 3rem;
    margin-bottom: 1rem;

    a {
        color: ${ colors.white };
        text-decoration: none;
        margin-left: 2rem;
        
        &:hover {
            color: ${ colors.gray }
        }
    }
`

const brand = css`
    a {
        margin-left: 0;
    }
`

const TopNavigation = ({ isAuthenticated }) => (
    <div className={ nav }>
        <h2 className={ brand }><Link to="/">Retro • Spec</Link></h2>
        <div>
            <Link to="/boards">Boards</Link>
            { !isAuthenticated &&
                <Link to="/login">Login</Link>
            }
        </div>
    </div>
)

export default TopNavigation
