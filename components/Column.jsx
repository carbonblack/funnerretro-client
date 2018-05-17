import React, { Component } from 'react'
import { css } from 'react-emotion'
import colors from '../styles/colors'
import FontAwesome from 'react-fontawesome'
import CardContainer from '../containers/CardContainer'
import New from './New'
import ColumnHeader from './ColumnHeader'

const columnContainer = css`
    display: flex;
    flex-direction: column;
    height: auto;
    margin-left: 1rem;
    width: 325px;
`

const inner = css`
    background: ${ colors.gray };
    border: 4px solid ${ colors.black };
    padding: 1rem 0.5rem 0 0.5rem;
    border-radius: 2px;
`

class Column extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: props.column.name,
            editing: false
        }
    }

    onChange(val) {
        this.setState({
            name: val
        })
    }

    onEdit() {
        this.setState({
            editing: true
        })
    }

    onSave() {
        this.props.onNameChange(this.props.column.id, this.state.name)
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
                        name={ column.name }
                        id={ column.id }
                        editing={ this.state.editing }
                        onDelete={ id => onDelete(id) }
                        onChange={ val => this.onChange(val) }
                        onSave={ () => this.onSave() }
                        onEdit={ () => this.onEdit() }
                    />
                    { column.cards.map(((card, index) => (
                        <CardContainer key={ `card-${card.id}` } card={ card } columnId={ column.id } moveCard={ (dragIndex, hoverIndex) => moveCard(card.id, column.id, dragIndex, hoverIndex) } index={ index } /> 
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
