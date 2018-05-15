import React, { Component } from 'react'
import { css } from 'react-emotion'
import ColumnContainer from '../containers/ColumnContainer'
import New from './New'
import colors from '../styles/colors'

const columnsContainer = css`
    display: flex;
    overflow-x: auto;
    margin-top: 1rem;
`

const newColumnContainer = css`
    margin-left: 1rem;
`

const header = css`
    text-align: center;
    color: ${ colors.white };
`

class Board extends Component {
    componentDidMount() {
        this.props.load()
    }

    render() {
        const { name, columns, onNewColumn } = this.props

        return (
            <div>
                <h2 className={ header }>{ name }</h2>
                <div className={ columnsContainer }>
                    { columns.map(column => <ColumnContainer key={ `column-${column.id}` } column={ column } />) }
                    <div className={ newColumnContainer }>
                        <New placeholder="New column" submitLabel="Create" onSubmit={ value => onNewColumn(value) } />
                    </div>
                </div>
            </div>
        )
    }
}

export default Board
