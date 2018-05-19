import React, { Component } from 'react'
import { css, cx } from 'react-emotion'
import FontAwesome from 'react-fontawesome'
import ColumnContainer from '../../containers/ColumnContainer'
import { actionButton } from '../../styles/button'
import New from '../shared/New'
import colors from '../../styles/colors'

const columnsContainer = css`
    display: flex;
    overflow-x: auto;
    margin-top: 2rem;
`

const newColumnContainer = css`
    display: flex;
    margin-left: 1rem;
    background-color: red;
    padding: 1rem 1rem 0 1rem;
`

const newColumnInputButton = css`
    color: blue;
    font-size: 30px;
    margin-bottom: 1rem;
`

const newColumnCreateBox = css`
    margin-right: 0.2rem;
`

const inner = css`
    background: ${ colors.offWhite };
    border: 4px solid ${ colors.black };
    padding: 1rem 1rem 0 1rem;
    height: fit-content;
`

const header = css`
    display: flex;
    justify-content: center;
`

const innerHeader = css`
    display: flex;
    background: ${ colors.offWhite };
    border: 4px solid ${ colors.black };
    padding: 1rem 2rem;
`

const button = css`
    ${ actionButton }
    margin-left: 1rem;
`

class Board extends Component {
    constructor() {
        super()

        this.state = {
            showNewColumnInput: false
        }
    }

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
                    <div className={ cx(inner, newColumnContainer) }>
                        {
                            this.state.showNewColumnInput &&
                            <div className={newColumnCreateBox}>
                                <New placeholder="New column" submitLabel="Create"
                                    onSubmit={value => onNewColumn(value)}/>
                            </div>
                        }
                        <button onClick={ () => this.setState({ showNewColumnInput: !this.state.showNewColumnInput }) } className={ newColumnInputButton }>
                            {
                                (this.state.showNewColumnInput && <FontAwesome name="close"/>) || <FontAwesome name="plus"/>
                            }
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Board
