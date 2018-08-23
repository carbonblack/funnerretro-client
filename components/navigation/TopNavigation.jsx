import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { Link } from 'react-router-dom'
import brandLogo from 'assets/wolfpack_logo.svg'
import colors from 'styles/colors'

const styles = {
    container: css`
        display: flex;
        justify-content: space-between;
        color: ${ colors.white };
        margin: 0 2.6rem 1.5rem;
    `,
    nav: css`
        width: 5.1rem;
        height: 4.7rem;
        background-color: ${ colors.white };
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
    `,
    brand: css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

        img {
            width: 4rem;
        }
    `,
    user: css`
        margin-top: 1rem;
    `
}

const TopNavigation = ({ username }) => (
    <div className={ styles.container }>
        <div className={ styles.nav }>
            <Link className={ styles.brand } to="/"><img src={ brandLogo } /></Link>
        </div>
        <p className={ styles.user }>{ username }</p>
    </div>
)

TopNavigation.propTypes = {
    username: PropTypes.string
}

export default TopNavigation
