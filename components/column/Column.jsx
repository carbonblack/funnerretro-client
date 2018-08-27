import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import CardContainer from 'containers/CardContainer'
import ColumnHeader from 'components/column/ColumnHeader'
import CardForm from 'components/card/CardForm'
import CardUpload from 'components/card/CardUpload'

const styles = {
    columnContainer: css`
        display: flex;
        flex-direction: column;
        height: auto;
        margin: 0 1.5rem 1rem 0.5rem;
        width: 18.75rem;
    `,
    inner: css`
        padding: 1rem 0 0;
        border-radius: 7px;
    `,
    cards: css`
        max-height: 61vh;
    `
}

class Column extends Component {
    state = {
        editing: false
    }

    onEdit = () =>  this.setState({ editing: true })

    onSave = name => {
        const { column, onNameChange } = this.props

        onNameChange(column.id, name)
        this.setState({
            editing: false
        })
    }

    render() {
        const { column, onNewCard, moveCard, onDelete, onUpload } = this.props
        const { editing } = this.state

        return (
            <div className={ styles.columnContainer }>
                <div className={ styles.inner }>
                    <ColumnHeader 
                        name={ column.content.name }
                        id={ column.id }
                        editing={ editing }
                        onDelete={ id => onDelete(id) }
                        onSave={ val => this.onSave(val) }
                        onEdit={ this.onEdit }
                    />
                    <div>
                        <CardForm 
                            placeholder="New card"
                            submitLabel="Add"
                            onSubmit={ (value, color) => onNewCard(value, color) }
                            errorLabel='Card text must not be empty'
                        />
                    </div>
                    <div className={ styles.cards }>
                        { column.cards.map(((card, index) => (
                            <CardContainer
                                key={ `card-${card.id}` }
                                card={ card }
                                columnId={ column.id }
                                moveCard={ (dragIndex, hoverIndex) => moveCard(column.id, dragIndex, hoverIndex) }
                                index={ index }
                            />
                        )))}
                    </div>
                    { (!column.cards || column.cards.length === 0) && <CardUpload onUpload={ file => onUpload(column.id, file) } /> }
                </div>
            </div>
        )
    }
}

Column.propTypes = {
    onNameChange: PropTypes.func.isRequired,
    column: PropTypes.object,
    onNewCard: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired
}

Column.defaultProps = {
    column: {
        id: '',
        content: {
            name: ''
        },
        cards: []
    }
}

export default Column
