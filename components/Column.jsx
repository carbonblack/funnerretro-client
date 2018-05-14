import React from 'react'
import { connect } from 'react-redux'
import { css } from 'react-emotion'
import colors from '../constants/colors'
import { createCard, moveCard } from '../actions/board'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card'
import New from './New'

const columnContainer = css`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    background: ${ colors.gray };
    padding: 1rem 0.5rem 0 0.5rem;
    width: 300px;
`

const Column = ({ column, onNewCard, moveCard }) => (
    <div className={ columnContainer }>
        <h2>{ column.name }</h2>
        { column.cards.map(((card, index) => (
            <Card key={ `card-${card.id}` } card={ card } columnId={ column.id } moveCard={ (dragIndex, hoverIndex) => moveCard(column.id, dragIndex, hoverIndex) } index={ index } /> 
        )))}
        <div>
            <New placeholder="New card" onSubmit={ (value) => onNewCard(value, column.id) } />
        </div>
    </div>
)

const mapDispatchToProps = (dispatch, ownProps) => ({
    onNewCard: (value) => {
        dispatch(createCard(value, ownProps.column.id))
    },
    moveCard: (columnId, dragIndex, hoverIndex) => {
        dispatch(moveCard(columnId, dragIndex, hoverIndex))
    }
})

export default DragDropContext(HTML5Backend)(connect(null, mapDispatchToProps)(Column))
