import React, { Component } from 'react'
import { css, cx } from 'react-emotion'
import FontAwesome from 'react-fontawesome'
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
    background: ${ colors.offWhite };
    border: 4px solid ${ colors.black };
    padding: 1rem 1rem 0 1rem;
`

const newCardContainer = css`
    display: flex;
    margin-bottom: 1rem
`

const newCardButton = css`
    font-size: 18px;
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
        const { column, onNewCard, moveCard, onDelete, hoverCard } = this.props

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
                    <div className={ cx(newCardContainer) }>
                        { /*<New placeholder="New card" submitLabel="Add" onSubmit={ (value) => onNewCard(value, column.id) } /> */ }
                        <button className={ newCardButton } onClick={ () => onNewCard("test jim", column.id) }>
                            <FontAwesome name="plus"/> New card
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Column
