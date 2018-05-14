import React from 'react'
import { connect } from 'react-redux'
import { css } from 'react-emotion'
import { createColumn } from '../actions/board'
import Column from './Column'
import New from './New'

const columnsContainer = css`
    display: flex;
    overflow-x: auto;
    margin-top: 1rem;
`

const newColumnContainer = css`
    margin-left: 1rem;
`

const Board = ({ name, columns, onNewColumn }) => (
    <div>
        <h2>{ name }</h2>
        <div className={ columnsContainer }>
            { columns.map(column => <Column key={ `column-${column.id}` } column={ column } />) }
            <div className={ newColumnContainer }>
                <New placeholder="New column" onSubmit={ value => onNewColumn(value) } />
            </div>
        </div>
    </div>
)

const mapStateToProps = state => ({
    name: state.board.name,
    columns: state.board.columns
})

const mapDispatchToProps = dispatch => ({
    onNewColumn: (value) => {
        dispatch(createColumn(value))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)
