import React from 'react'
import { css } from 'react-emotion'
import FontAwesome from 'react-fontawesome'
import colors from '../../styles/colors'
import { actionButton } from '../../styles/button'
import New from '../shared/New'

const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const title = css`
    margin-bottom: 1rem;
`

const button = css`
    ${ actionButton }
    margin-bottom: 1rem;
`

const ColumnHeader = ({ name, id, editing, onDelete, onEdit, onSave, onChange }) => {
    if(editing) {
        return (
            <div>
                <New value={ name } onSubmit={ val => onSave(val) } submitLabel="Save" />
            </div>
        )
    }

    return (
        <div className={ header }>
            <h3 className={ title }>{ name }</h3>
            <div>
                <button onClick={ () => onEdit(id) } className={ button }>
                    <FontAwesome name="pencil" />
                </button>
                <button onClick={ () => onDelete(id) } className={ button }>
                    <FontAwesome name="trash-o" />
                </button>
            </div>
        </div>
    )
}

export default ColumnHeader
