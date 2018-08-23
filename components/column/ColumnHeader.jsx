import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import New from 'components/shared/NewNew'
import Actions from 'components/shared/Actions'
import colors from 'styles/colors'

const header = css`
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-bottom: 1rem;
    color: ${ colors.white };
`

const ColumnHeader = ({ name, id, editing, onSave, onEdit, onDelete }) => {
    const actions = [
        { text: 'Edit', action: () => onEdit(id) },
        { text: 'Delete', action: () => onDelete(id) }
    ]

    if(editing) {
        return (
            <Fragment>
                <New
                    value={ name }
                    onSubmit={ val => onSave(val) }
                    submitLabel='Save'
                    errorLabel='Column name must not be empty'
                    showInput={ true }
                />
            </Fragment>
        )
    }

    return (
        <div className={ header }>
            <h3>{ name }</h3>
            <Actions actions={ actions } />
        </div>
    )
}

ColumnHeader.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    editing: PropTypes.bool,
    onSave: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

ColumnHeader.defaultProps = {
    name: '',
    editing: false
}

export default ColumnHeader
