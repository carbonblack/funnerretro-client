import React, { Component } from 'react'
import { css } from 'react-emotion'
import ColumnContainer from '../containers/ColumnContainer'
import New from './New'

const columnsContainer = css`
    display: flex;
    overflow-x: auto;
    margin-top: 1rem;
`

const newColumnContainer = css`
    margin-left: 1rem;
`

class Board extends Component {
    componentDidMount() {
        this.props.load()
    }

    render() {
        const { name, columns, onNewColumn } = this.props

        return (
            <div>
                <h2>{ name }</h2>
                <div className={ columnsContainer }>
                    { columns.map(column => <ColumnContainer key={ `column-${column.id}` } column={ column } />) }
                    <div className={ newColumnContainer }>
                        <New placeholder="New column" onSubmit={ value => onNewColumn(value) } />
                    </div>
                </div>
            </div>
        )
    }
}

export default Board
