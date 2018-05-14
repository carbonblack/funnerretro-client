import React from 'react'
import { connect } from 'react-redux'
import { css } from 'react-emotion'
import colors from '../constants/colors'
import { createCard } from '../actions/board'
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

const Column = ({ column, onNewCard }) => (
    <div className={ columnContainer }>
        { column.cards.map(card => <Card key={ `card-${card.id}` } card={ card } />) }
        <div>
            <New placeholder="New card" onSubmit={ (value) => onNewCard(value, column.id) } />
        </div>
    </div>
)

const mapDispatchToProps = (dispatch, ownProps) => ({
    onNewCard: (value) => {
        dispatch(createCard(value, ownProps.column.id))
    } 
})

export default connect(null, mapDispatchToProps)(Column)
