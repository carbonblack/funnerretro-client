import { css } from 'react-emotion'
import colors from './colors'

export const baseButton = css`
    border: 0;
    border-radius: 2px;
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    transition: 0.2s;
    text-decoration: none;
    background: ${ colors.pink };
    color: ${ colors.white };

    &:hover {
        color: ${ colors.white };
        background: ${ colors.lightPink };
    }
`

export const actionButton = css`
    font-size: 0.9rem;
    color: ${ colors.mediumGray };
    border: 0;
    background: transparent;
    padding: 0 0.5rem;

    &:active, :focus, :visited {
        outline: none;
    }

    &:hover {
        color: ${ colors.darkGray };
    }
`
