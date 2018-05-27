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

class ColumnHeader extends Component {
    render() {
        const { name, id, editing, onSave } = this.props

        const actions = [
            { text: 'Edit', action: (id) => this.props.onEdit(id) },
            { text: 'Delete', action: (id) => this.props.onDelete(id) }
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
                <Actions id={ id } actions={ actions } />
            </div>
        )
    }
}

export default ColumnHeader
