import React, { Component } from 'react'
import { css } from 'react-emotion'
import ColumnContainer from '../../containers/ColumnContainer'
import ColumnForm from '../column/ColumnForm'
import colors from '../../styles/colors'
import Actions from '../shared/Actions'

const columnsContainer = css`
    display: flex;
    margin-top: 2rem;
`

const ColumnFormContainer = css`
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
        const { name, id, columns, onColumnForm } = this.props

        const actions = [
            { text: 'Delete', action: () => this.props.onDelete(id) }
        ]

        return (
            <div>
                <div className={ header }>
                    <div className={ innerHeader }>
                        <h2>{ name }</h2>
                        <Actions actions={ actions } />
                    </div>
                </div>
                <div className={ columnsContainer }>
                    { columns.map(column => <ColumnContainer key={ `column-${column.id}` } column={ column } />) }
                    <div className={ ColumnFormContainer }>
                        <ColumnForm placeholder="Column name" submitLabel="Create" onSubmit={ value => onColumnForm(value) } />
                    </div>
                </div>
            </div>
        )
    }
}

export default Board
