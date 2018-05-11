import React from 'react'

const Card = ({ card }) => (
    <div>
        <p>{ card.text }</p>
        <p>{ card.votes }</p>
    </div>
)

export default Card
