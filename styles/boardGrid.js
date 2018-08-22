import { css } from 'react-emotion'
import colors from 'styles/colors'

export const sharedStyles = {
    boardContainer: css`
        color: ${ colors.black };
        padding: 0.5rem;
        width: calc(20% - 1rem);
        min-width: 12.5rem;
    `,
    boardInner: css`
        padding: 4rem 2rem;
        background: ${ colors.white };
        color: ${ colors.darkBlue };
        height: 7rem;
        border-radius: 7px;
        text-transform: uppercase;
        font-size: 1.4rem;
        overflow: hidden;
        word-break: break-word;
        position: relative;
    `,
}
