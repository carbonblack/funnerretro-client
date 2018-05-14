import React from 'react'
import { connect } from 'react-redux'
import { css } from 'react-emotion'
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

const Board = ({ name, columns }) => (
    <div>
        <h2>{ name }</h2>
        <div className={ columnsContainer }>
            { columns.map(column => <Column key={ `column-${column.id}` } column={ column } />) }
            <div className={ newColumnContainer }>
                <New placeholder="New column" />
            </div>
        </div>
    </div>
)

const mapStateToProps = state => ({
    name: state.board.name,
    columns: state.board.columns
})

export default connect(mapStateToProps)(Board)
