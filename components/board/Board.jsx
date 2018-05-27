import React, { Component } from 'react'
import { css } from 'react-emotion'
import ColumnContainer from '../../containers/ColumnContainer'
import NewColumn from '../column/NewColumn'
import colors from '../../styles/colors'
import Actions from '../shared/Actions'

const columnsContainer = css`
    display: flex;
    overflow-x: auto;
    margin-top: 2rem;
`

const newColumnContainer = css`
    margin-left: 1rem;
`

const header = css`
    display: flex;
    justify-content: center;
`

const innerHeader = css`
    display: flex;
    justify-content: space-between;
    min-width: 10%;
    background: ${ colors.offWhite };
    border: 5px solid ${ colors.black };
    padding: 1rem 2rem;
`

class Board extends Component {
    componentDidMount() {
        this.props.load()
    }

    componentWillUnmount() {
        this.props.unload()
    }

    render() {
        const { name, id, columns, onNewColumn } = this.props

        const actions = [
            { text: 'Delete', action: (id) => this.props.onDelete(id) }
        ]

        return (
            <div>
                <div className={ header }>
                    <div className={ innerHeader }>
                        <h2>{ name }</h2>
                        <Actions id={ id } actions={ actions } />
                    </div>
                </div>
                <div className={ columnsContainer }>
                    { columns.map(column => <ColumnContainer key={ `column-${column.id}` } column={ column } />) }
                    <div className={ newColumnContainer }>
                        <NewColumn placeholder="Column name" submitLabel="Create" onSubmit={ value => onNewColumn(value) } />
                    </div>
                </div>
            </div>
        )
    }
}

export default Board
