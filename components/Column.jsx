import React from 'react'
import Card from './Card'

const Column = ({ column }) => (
    <div>
        { column.cards.map(card => <Card key={ `card-${card.id}` } card={ card } />) }
    </div>
)

export default Column
