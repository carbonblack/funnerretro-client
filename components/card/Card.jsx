import React, { Component } from 'react'
import { css, cx } from 'react-emotion'
import FontAwesome from 'react-fontawesome'
import colors from '../../styles/colors'
import { actionButton } from '../../styles/button'
import New from '../shared/New'

const baseCardContainer = css`
    background: ${ colors.white };
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid ${ colors.black };
`

const cardContainer = isDragging => css`
    cursor: move;
    opacity: ${ isDragging ? 0 : 1 };
`

const blurCard = css`
    filter: blur(5px);
`

const text = css`
    margin-bottom: 0.25rem;
`

const votes = css`
    margin-left: 0.25rem;
    font-style: bold;
    font-size: 18px;
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
        this.props.onEdit(this.props.card.id)
    }

    onSave(val) {
        this.props.onTextChange(this.props.card.id, val)
        this.setState({
            editing: false
        })
    }

    render() {
        const { card, isDragging, onDelete, onUpVote, onDownVote, onSave } = this.props

        if(this.state.editing) {
            return (
                <div className={ cx(baseCardContainer, cardContainer(isDragging)) }>
                    <New value={ card.content.text } onSubmit={ val => this.onSave(val) } submitLabel="Save" />
                </div>
            )
        }

        if(card.blur) {
            return (
                <div className={ cx(baseCardContainer, blurCard) }>
                    <p className={ text }>{ card.content.text }</p>
                </div>
            )
        }

        return (
            <div className={ cx(baseCardContainer, cardContainer(isDragging)) }>
                <p className={ text }>{ card.content.text }</p>
                <span className={ votes }>{ card.content.votes }</span>
                <button className={ actionButton } onClick={ () => onUpVote(card.id) }>
                    <FontAwesome name="thumbs-o-up" />
                </button>
                <button className={ actionButton } onClick={ () => onDownVote(card.id) }>
                    <FontAwesome name="thumbs-o-down" />
                </button>
                <button className={ actionButton } onClick={ () => this.onEdit() }>
                    <FontAwesome name="pencil" />
                </button>
                <button className={ actionButton } onClick={ () => onDelete(card.id) }>
                    <FontAwesome name="trash-o" />
                </button>
            </div>
        )
    }
}

export default Card
