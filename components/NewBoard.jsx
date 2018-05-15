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
    margin-top: -3rem;
`

const inner = css`
    ${ container };
    max-width: 50%;
`

const header = css`
    color: ${ colors.white };
    margin-bottom: 1rem;
`

const NewBoard = ({ onSubmit }) => (
    <div className={ container }>
        <div className={ inner }>
            <h2 className={ header }>Create a new retro board</h2>
            <New placeholder="Board name" submitLabel="Create" onSubmit={ boardName => onSubmit(boardName) } />
        </div>
    </div>
)

export default NewBoard
