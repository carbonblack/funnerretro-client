import React, { Component } from 'react'
import { connect } from 'react-redux'
import { css } from 'react-emotion'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import FontAwesome from 'react-fontawesome'
import colors from '../../styles/colors'
import { vote } from '../../actions/board'

const cardContainer = isDragging => css`
    background: ${ colors.white };
    margin-bottom: 1rem;
    padding: 0.5rem;
    cursor: move;
    opacity: ${ isDragging ? 0 : 1 };
`

const text = css`
    margin-bottom: 0.25rem;
`

const votes = css`
    margin-left: 0.25rem;
`

const button = css`
    font-size: 0.9rem;
    color: ${ colors.mediumGray };
    border: 0;

    &:active, :focus, :visited {
        outline: none;
    }

    &:hover {
        color: ${ colors.darkGray };
    }
`

const Card = ({ card, isDragging, onDelete, onVote }) => (
    <div className={ cardContainer(isDragging) }>
        <p className={ text }>{ card.text }</p>
        <button className={ button } onClick={ () => onVote(card.id) }>
            <FontAwesome name="thumbs-o-up" />
            <span className={ votes }>{ card.votes }</span>
        </button>
        <button onClick={ () => onDelete(card.id) } className={ button }>
            <FontAwesome name="trash-o" />
        </button>
    </div>
)

export default Card
