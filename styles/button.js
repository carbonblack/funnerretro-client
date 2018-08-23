import { css } from 'react-emotion'
import colors from 'styles/colors'

export const baseButton = css`
    color: ${ colors.white };
    background: ${ colors.darkBlue };
    padding: 0.5rem 1.25rem;
    font-size: 0.9rem;
    transition: 0.2s;
    text-decoration: none;
    border: 0;
    border-radius: 5px;
    word-break: normal;

    &:active, :focus, :visited {
        outline: none;
    }

    :hover {
        background: ${ colors.lessDarkBlue };
    }

    :focus {
        background: ${ colors.lightBlue };
    }
`

export const actionButton = css`
    font-size: 0.9rem;
    color: ${ colors.white };
    border: 0;
    background: transparent;

    &:active, :focus, :visited {
        outline: none;
    }

    &:hover {
        color: ${ colors.evenLighterBlue };
    }

    :focus {
        color: ${ colors.lighterBlue };
    }
`

export const actionButtonDark = css`
    ${ actionButton };
    color: ${ colors.darkBlue };
    
    :hover {
        color: ${ colors.mediumBlue };
    }

    :focus {
        color: ${ colors.lightBlue };
    }
`
