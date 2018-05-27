import React, { Component } from 'react'
import { css } from 'react-emotion'
import FontAwesome from 'react-fontawesome'
import ColumnContainer from '../../containers/ColumnContainer'
import { actionButton } from '../../styles/button'
import NewColumn from '../column/NewColumn'
import colors from '../../styles/colors'

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
    background: ${ colors.offWhite };
    border: 5px solid ${ colors.black };
    padding: 1rem 2rem;
`

const button = css`
    ${ actionButton }
    margin-left: 1rem;
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

        return (
            <div>
                <div className={ header }>
                    <div className={ innerHeader }>
                        <h2>{ name }</h2>
                        <button onClick={ () => this.props.onDelete(id) } className={ button }>
                            <FontAwesome name="trash-o" />
                        </button>
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
