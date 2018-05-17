import React, { Component } from 'react'
import { connect } from 'react-redux'
import { css } from 'react-emotion'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import FontAwesome from 'react-fontawesome'
import colors from '../../styles/colors'
import { vote } from '../../actions/board'
import New from '../shared/New'

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

class Card extends Component {
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

    onSave(val) {
        this.props.onTextChange(this.props.card.id, val)
        this.setState({
            editing: false
        })
    }

    render() {
        const { card, isDragging, onDelete, onVote, onSave } = this.props

        if(this.state.editing) {
            return (
                <div className={ cardContainer(isDragging) }>
                    <New value={ card.text } onSubmit={ val => this.onSave(val) } submitLabel="Save" />
                </div>
            )
        }

        return (
            <div className={ cardContainer(isDragging) }>
                <p className={ text }>{ card.text }</p>
                <button className={ button } onClick={ () => onVote(card.id) }>
                    <FontAwesome name="thumbs-o-up" />
                    <span className={ votes }>{ card.votes }</span>
                </button>
                <button className={ button } onClick={ () => this.onEdit() }>
                    <FontAwesome name="pencil" />
                </button>
                <button onClick={ () => onDelete(card.id) } className={ button }>
                    <FontAwesome name="trash-o" />
                </button>
            </div>
        )
    }
}

export default Card
