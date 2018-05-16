import React from 'react'
import { css } from 'react-emotion'
import { Link } from 'react-router-dom'
import colors from '../styles/colors'

const nav = css`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 3rem;
    margin-bottom: 1rem;

    background: ${ colors.offWhite };
    box-shadow: 0px 1px 3px 0px ${ colors.lightGray };

    a {
        color: ${ colors.pink };
        text-decoration: none;
        margin-left: 2rem;
        
        &:hover {
            color: ${ colors.lightPink };
        }
    }
`

const links = css`
    display: flex;
    align-items: center;
`

const brand = css`
    a {
        margin-left: 0;
    }
`

const TopNavigation = ({ isAuthenticated }) => (
    <div className={ nav }>
        <h2 className={ brand }><Link to="/">Retro • Spec</Link></h2>
        <div className={ links }>
            <Link to="/boards">Boards</Link>
            { !isAuthenticated &&
                <Link to="/login">Login</Link>
            }
        </div>
    </div>
)

export default TopNavigation
