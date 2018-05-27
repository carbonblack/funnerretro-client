import React, { Component } from 'react'
import { css } from 'react-emotion'
import colors from '../../styles/colors'
import CardContainer from '../../containers/CardContainer'
import New from '../shared/New'
import ColumnHeader from './ColumnHeader'

const columnContainer = css`
    display: flex;
    flex-direction: column;
    height: auto;
    margin-left: 1rem;
    margin-bottom: 1rem;
    width: 325px;
`

const inner = css`
    padding: 1rem 0.5rem;
`

class Column extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editing: false
        }
    }

    onEdit() {
        this.setState({
            editing: true
        })
    }

    onSave(name) {
        this.props.onNameChange(this.props.column.id, name)
        this.setState({
            editing: false
        })
    }

    render() {
        const { column, onNewCard, moveCard, onDelete } = this.props

        return (
            <div className={ columnContainer }>
                <div className={ inner }>
                    <ColumnHeader 
                        name={ column.content.name }
                        id={ column.id }
                        editing={ this.state.editing }
                        onDelete={ id => onDelete(id) }
                        onSave={ val => this.onSave(val) }
                        onEdit={ () => this.onEdit() }
                    />
                    { column.cards.map(((card, index) => (
                        <CardContainer
                            key={ `card-${card.id}` }
                            card={ card }
                            columnId={ column.id }
                            moveCard={ (dragIndex, hoverIndex) => moveCard(column.id, dragIndex, hoverIndex) }
                            index={ index }
                        /> 
                    )))}
                    <div>
                        <New placeholder="New card" submitLabel="Add" onSubmit={ (value) => onNewCard(value, column.id) } />
                    </div>
                </div>
            </div>
        )
    }
}

export default Column
