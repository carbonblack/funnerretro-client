import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import colors from 'styles/colors'
import CardContainer from 'containers/CardContainer'
import New from 'components/shared/New'
import ColumnHeader from 'components/column/ColumnHeader'

const styles = {
    columnContainer: css`
        display: flex;
        flex-direction: column;
        height: auto;
        margin: 0 0.5rem 1rem;
        width: 325px;
    `,
    inner: css`
        background: ${ colors.white };
        padding: 1rem 1rem 0 1rem;
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
        const { column, onNewCard, moveCard, onDelete } = this.props
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
                        <New placeholder="New card" submitLabel="Add" onSubmit={ value => onNewCard(value, column.id) } />
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
