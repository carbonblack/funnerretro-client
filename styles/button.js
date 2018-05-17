import { css } from 'react-emotion'
import colors from './colors'

export const baseButton = css`
    color: ${ colors.black };
    background: ${ colors.offWhite };
    border: 2px solid ${ colors.black };
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    transition: 0.2s;
    text-decoration: none;

    &:hover {
        background: ${ colors.lightPink };
        color: ${ colors.white };
    }
`
