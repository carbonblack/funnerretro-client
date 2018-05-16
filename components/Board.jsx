import React, { Component } from 'react'
import { css } from 'react-emotion'
import FontAwesome from 'react-fontawesome'
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
    display: flex;
    justify-content: center;
`

const innerHeader = css`
    display: flex;
    background: ${ colors.gray };
    padding: 1rem 2rem;
    border-radius: 2px;
`

const button = css`
    font-size: 1.1rem;
    border: 0;
    background: transparent;
    margin-left: 1rem;

    &:active, :focus, :visited {
        outline: none;
    }

    &:hover {
        color: ${ colors.darkGray };
    }
`

class Board extends Component {
    componentDidMount() {
        this.props.load()
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
                        <New placeholder="New column" submitLabel="Create" onSubmit={ value => onNewColumn(value) } />
                    </div>
                </div>
            </div>
        )
    }
}

export default Board
