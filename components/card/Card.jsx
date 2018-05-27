import React, { Component } from 'react'
import { css, cx } from 'react-emotion'
import FontAwesome from 'react-fontawesome'
import colors from '../../styles/colors'
import { actionButton } from '../../styles/button'
import New from '../shared/New'
import Actions from '../shared/Actions'

const baseCardContainer = css`
    background: ${ colors.white };
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid ${ colors.black };

    form {
        margin: 0;
    }
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

const actionsContainer = css`
    display: flex;
    justify-content: space-between;
`

const firstActionButton = css`
    ${ actionButton }
    padding-left: 0;
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
        this.setState({
            editing: false
        })
        this.props.onTextChange(this.props.card.id, val)
    }

    render() {
        const { card, isDragging, onDelete, onVote } = this.props

        const actions = [
            { text: 'Edit', action: () => this.onEdit(card.id) },
            { text: 'Delete', action: () => onDelete(card.id) }
        ]

        if(this.state.editing) {
            return (
                <div className={ cx(baseCardContainer, cardContainer(isDragging)) }>
                    <New value={ card.content.text } onSubmit={ val => this.onSave(val) } submitLabel="Save" />
                </div>
            )
        }

        if(card.content.blur) {
            return (
                <div className={ baseCardContainer }>
                    <div className={ blurCard }>
                        <p className={ text }>{ card.content.text }</p>
                    </div>
                </div>
            )
        }

        return (
            <div className={ cx(baseCardContainer, cardContainer(isDragging)) }>
                <p className={ text }>{ card.content.text }</p>
                <div className={ actionsContainer }>
                    <div>
                        <button className={ firstActionButton } onClick={ () => onVote(card.id, 1) }>
                            <FontAwesome name="thumbs-o-up" />
                        </button>
                        <span>{ card.content.votes }</span>
                        <button className={ actionButton } onClick={ () => onVote(card.id, -1) }>
                            <FontAwesome name="thumbs-o-down" />
                        </button>
                    </div>
                    <Actions actions={ actions } />
                </div>
            </div>
        )
    }
}

export default Card
