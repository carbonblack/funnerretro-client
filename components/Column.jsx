import React from 'react'
import { css } from 'react-emotion'
import colors from '../styles/colors'
import FontAwesome from 'react-fontawesome'
import CardContainer from '../containers/CardContainer'
import New from './New'

const columnContainer = css`
    display: flex;
    flex-direction: column;
    height: auto;
    margin-left: 1rem;
    width: 325px;
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

const button = css`
    font-size: 1rem;
    color: ${ colors.mediumGray };
    border: 0;
    background: transparent;
    margin-bottom: 1rem;

    &:active, :focus, :visited {
        outline: none;
    }

    &:hover {
        color: ${ colors.darkGray };
    }
`

const header = css`
    display: flex;
    justify-content: space-between;
`

const Column = ({ column, onNewCard, moveCard, onDelete }) => (
    <div className={ columnContainer }>
        <div className={ inner }>
            <div className={ header }>
                <h3 className={ title }>{ column.name }</h3>
                <button onClick={ () => onDelete(column.id) } className={ button }>
                    <FontAwesome name="trash-o" />
                </button>
            </div>
            { column.cards.map(((card, index) => (
                <CardContainer key={ `card-${card.id}` } card={ card } columnId={ column.id } moveCard={ (dragIndex, hoverIndex) => moveCard(column.id, dragIndex, hoverIndex) } index={ index } /> 
            )))}
            <div>
                <New placeholder="New card" onSubmit={ (value) => onNewCard(value, column.id) } />
            </div>
        </div>
    </div>
)

export default Column
