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
    height: auto;
    margin-left: 1rem;
    width: 300px;
`

const inner = css`
    max-height: 100%;
    background: ${ colors.gray };
    padding: 1rem 0.5rem 0 0.5rem;
    border-radius: 2px;
`

const title = css`
    margin-bottom: 1rem;
`

const Column = ({ column, onNewCard, moveCard }) => (
    <div className={ columnContainer }>
        <div className={ inner }>
            <h3 className={ title }>{ column.name }</h3>
            { column.cards.map(((card, index) => (
                <Card key={ `card-${card.id}` } card={ card } columnId={ column.id } moveCard={ (dragIndex, hoverIndex) => moveCard(column.id, dragIndex, hoverIndex) } index={ index } /> 
            )))}
            <div>
                <New placeholder="New card" onSubmit={ (value) => onNewCard(value, column.id) } />
            </div>
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
