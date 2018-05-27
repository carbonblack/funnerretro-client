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

const actions = css`
    position: relative;
    margin-left: 2rem;
    display: flex;
    align-content: center;
`

const action = css`
    ${ actionButton }
    padding: 0.5rem 0.25rem;
`

const actionsInner = css`
    position: absolute;
    top: 1.5rem;
    right: 0;
    background: ${ colors.white };
    box-shadow: 0px 2px 5px 2px ${ colors.gray };
    padding: 0.5rem 1rem;
`

class Board extends Component {
    constructor() {
        super()

        this.state = {
            shouldShowActions: false
        }
    }

    componentDidMount() {
        this.props.load()
    }

    componentWillUnmount() {
        this.props.unload()
    }

    onDelete(id) {
        this.setState({
            shouldShowActions: false
        })

        this.props.onDelete(id)
    }

    render() {
        const { name, id, columns, onNewColumn } = this.props

        return (
            <div>
                <div className={ header }>
                    <div className={ innerHeader }>
                        <h2>{ name }</h2>
                        <div className={ actions }>
                            <button onClick={ () => this.setState({ shouldShowActions: !this.state.shouldShowActions }) } className={ actionButton }>
                                <FontAwesome name="ellipsis-v" />
                            </button>
                            {this.state.shouldShowActions && 
                                <div className={ actionsInner }>
                                    <button onClick={ () => this.onDelete(id) } className={ action }>Delete</button>
                                </div>
                            }
                        </div>
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
