import React from 'react'
import { css } from 'react-emotion'
import New from './New'
import colors from '../styles/colors'

const container = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    margin-top: -4rem;
`

const inner = css`
    ${ container };
    max-width: 50%;
`

const header = css`
    margin-bottom: 2rem;
    text-transform: uppercase;
`

const content = css`
    background: ${ colors.offWhite };
    border: 4px solid ${ colors.black };
    padding: 2rem 4rem;
    border-radius: 2px;
`

const NewBoard = ({ onSubmit }) => (
    <div className={ container }>
        <div className={ inner }>
            <div className={ content }>
                <h2 className={ header }>Create a new retro board</h2>
                <New placeholder="Board name" submitLabel="Create" onSubmit={ boardName => onSubmit(boardName) } />
            </div>
        </div>
    </div>
)

export default NewBoard
