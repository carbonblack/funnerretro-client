import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import colors from 'styles/colors'
import { sharedStyles } from 'styles/boardGrid'

const styles = {
    deleteButton: css`
        background: ${ colors.orange };
        color: ${ colors.white };
        border-radius: 50%;
        padding: 1rem;
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        font-size: 1.25rem;
    `
}

const BoardGridElement = ({ board, editing, onDelete }) => {
    if (!editing) {
        return (
            <div key={ `board-${ board.id }` } className={ sharedStyles.boardContainer }>
                <Link to={ `/board/${ board.id }` }>
                    <div className={ sharedStyles.boardInner }>
                        <p>{ board.content.name }</p>
                    </div>
                </Link>
            </div>
        )
    } else {
        return (
            <div key={ `board-${ board.id }` } className={ sharedStyles.boardContainer }>
                <Link to={ `/board/${ board.id }` }>
                    <div className={ sharedStyles.boardInner }>
                        <button className={ styles.deleteButton } onClick={ () => onDelete(board.id) } >
                            <FontAwesome name="trash-o" />
                        </button>
                        <p>{ board.content.name }</p>
                    </div>
                </Link>
            </div>
        )
    }
}

BoardGridElement.propTypes = {
    board: PropTypes.object.isRequired,
    editing: PropTypes.bool,
    onDelete: PropTypes.func.isRequired
}

BoardGridElement.defaultProps = {
    editing: false
}

export default BoardGridElement
