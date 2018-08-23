import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'react-emotion'
import FontAwesome from 'react-fontawesome'
import colors from 'styles/colors'
import { actionButtonDark } from 'styles/button'
import New from 'components/shared/NewNew'
import Actions from 'components/shared/Actions'

const baseCardContainer = css`
    background: ${ colors.white };
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 7px;
    word-break: break-all;
    user-select: text;

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
    ${ actionButtonDark }
    padding-left: 0;
`

class Card extends Component {
    state = {
        editing: false
    }

    onEdit = () => {
        const { card, onEdit } = this.props

        this.setState({
            editing: true
        })
        onEdit(card.id)
    }

    onSave = val => {
        this.setState({
            editing: false
        })
        this.props.onTextChange(this.props.card.id, val)
    }

    render() {
        const { card, isDragging, onDelete, onVote } = this.props

        const actions = [
            { text: 'Edit', action: this.onEdit },
            { text: 'Delete', action: () => onDelete(card.id) }
        ]

        if(this.state.editing) {
            return (
                <div className={ cx(baseCardContainer, cardContainer(isDragging)) }>
                    <New
                        showInput={ true }
                        value={ card.content.text }
                        onSubmit={ val => this.onSave(val) }
                        onCancel={ () => this.onSave(card.content.text) }
                        submitLabel='Add'
                        errorLabel='Card text must not be empty'
                    />
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
                        <button className={ actionButtonDark } onClick={ () => onVote(card.id, -1) }>
                            <FontAwesome name="thumbs-o-down" />
                        </button>
                    </div>
                    <Actions actions={ actions } dark={ true } />
                </div>
            </div>
        )
    }
}

Card.propTypes = {
    onEdit: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
    onTextChange: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onVote: PropTypes.func.isRequired
}

export default Card
