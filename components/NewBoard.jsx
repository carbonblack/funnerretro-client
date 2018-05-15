import React from 'react'
import New from './New'

const NewBoard = ({ onSubmit }) => (
    <div>
        <New placeholder="New board" onSubmit={ (boardName) => onSubmit(boardName) } />
    </div>
)

export default NewBoard
