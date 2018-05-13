import React from 'react'
import { css } from 'react-emotion'
import colors from '../constants/colors'
import Card from './Card'

const columnContainer = css`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    background: ${ colors.gray };
    padding: 1rem 0.5rem 0 0.5rem;
    width: 300px;
`

const Column = ({ column }) => (
    <div className={ columnContainer }>
        { column.cards.map(card => <Card key={ `card-${card.id}` } card={ card } />) }
    </div>
)

export default Column
