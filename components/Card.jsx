import React from 'react'
import { css } from 'react-emotion'
import colors from '../constants/colors'

const cardContainer = css`
    background: ${ colors.white };
    margin-bottom: 1rem;
    padding: 0.25rem;
`

const Card = ({ card }) => (
    <div className={ cardContainer }>
        <p>{ card.text }</p>
        <p>{ card.votes }</p>
    </div>
)

export default Card
