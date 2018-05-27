import React, { Component } from 'react'
import { css } from 'react-emotion'
import New from '../shared/New'
import Actions from '../shared/Actions'

const header = css`
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-bottom: 1rem;
`

const ColumnHeader = ({ name, id, editing, onSave, onEdit, onDelete }) => {
    const actions = [
        { text: 'Edit', action: () => onEdit(id) },
        { text: 'Delete', action: () => onDelete(id) }
    ]

    if(editing) {
        return (
            <div>
                <New value={ name } onSubmit={ val => onSave(val) } submitLabel="Save" />
            </div>
        )
    }

    return (
        <div className={ header }>
            <h3>{ name }</h3>
            <Actions actions={ actions } />
        </div>
    )
}

export default ColumnHeader
