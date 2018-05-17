import React from 'react'
import { css } from 'react-emotion'
import FontAwesome from 'react-fontawesome'
import colors from '../styles/colors'
import New from './New'

const header = css`
    display: flex;
    justify-content: space-between;
`

const title = css`
    margin-bottom: 1rem;
`

const button = css`
    font-size: 1rem;
    color: ${ colors.mediumGray };
    border: 0;
    background: transparent;
    margin-bottom: 1rem;

    &:active, :focus, :visited {
        outline: none;
    }

    &:hover {
        color: ${ colors.darkGray };
    }
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
