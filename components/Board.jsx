import React from 'react'
import { connect } from 'react-redux'
import Column from './Column'

const Board = ({ name, columns }) => (
    <div>
        <h2>{ name }</h2>
        { columns.map(column => <Column key={ `column-${column.id}` } column={ column } />) }
    </div>
)

const mapStateToProps = state => ({
    name: state.board.name,
    columns: state.board.columns
})

export default connect(mapStateToProps)(Board)
