import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'react-emotion'
import FontAwesome from 'react-fontawesome'
import colors from 'styles/colors'
import { actionButtonDark } from 'styles/button'
import CardForm from 'components/card/CardForm'
import Actions from 'components/shared/Actions'

const styles = {
    colorOptions: css`
        border-radius: 50%;
        min-width: 1rem;
        height: 1rem;
        margin-left: auto;
    `,
    topContainer: css`
        display: flex;
    `
}

const baseCardContainer = css`
    background: ${ colors.white };
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 7px;
    word-break: break-word;
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
    margin-right: 0.5rem;
`

const actionsContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
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

    onSave = (val, color) => {
        this.setState({
            editing: false
        })
        this.props.onTextChange(this.props.card.id, val, color)
    }

    render() {
        const { card, isDragging, onDelete, onVote, username } = this.props

        const actions = [
            { text: 'Edit', action: this.onEdit },
            { text: 'Delete', action: () => onDelete(card.id) }
        ]

        if(this.state.editing) {
            return (
                <div className={ cx(baseCardContainer, cardContainer(isDragging)) }>
                    <CardForm
                        value={ card.content.text }
                        color={ card.content.color }
                        showInput={ true }
                        placeholder="New card"
                        onSubmit={ (value, color) => this.onSave(value, color) }
                        onCancel={ () => this.onSave(card.content.text, card.content.color) }
                        submitLabel='Save'
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
                <div className={ styles.topContainer }>
                    <p className={ text }>{ card.content.text }</p>
                    <span className={ styles.colorOptions } style={ { backgroundColor: card.content.color } }></span>
                </div>
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
                { card.creator === username && <Actions actions={ actions } dark={ true } /> }
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
    onVote: PropTypes.func.isRequired,
    username: PropTypes.string
}

export default Card
