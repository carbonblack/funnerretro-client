import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { Link } from 'react-router-dom'
import brandLogo from 'assets/retrospec_logo.svg'
import colors from 'styles/colors'

const nav = css`
    width: 5.1rem;
    height: 4.7rem;
    background-color: ${ colors.white };
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.5);
    margin: 0 2.6rem 1.5rem;
`

const brand = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    img {
        width: 3.1rem;
    }
`

const TopNavigation = ({ shouldShow }) => {
    if(shouldShow)
        return (
            <div className={ nav }>
                <Link className={ brand } to="/"><img src={ brandLogo } /></Link>
            </div>
        )

    return null
}

TopNavigation.propTypes = {
    shouldShow: PropTypes.bool
}

export default TopNavigation
