import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import colors from 'styles/colors'

const styles = {
    boardContainer: css`
        color: ${ colors.black };
        padding: 0.5rem;
        width: calc(20% - 1rem);
        min-width: 12.5rem;
    `,
    boardInner: css`
        padding: 4rem 2rem;
        background: ${ colors.white };
        color: ${ colors.darkBlue };
        height: 7rem;
        border-radius: 7px;
        text-transform: uppercase;
        font-size: 1.4rem;
        overflow: hidden;
        word-break: break-all;
        position: relative;
    `,
    deleteButton: css`
        background: ${ colors.logoOrange };
        color: ${ colors.white };
        border-radius: 50%;
        padding: 1rem;
        font-size: 1rem;
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
    `
}

const BoardGridElement = ({ board, editing, onDelete }) => {
    if (!editing) {
        return (
            <div key={ `board-${ board.id }` } className={ styles.boardContainer }>
                <Link to={ `/board/${ board.id }` }>
                    <div className={ styles.boardInner }>
                        <p>{ board.content.name }</p>
                    </div>
                </Link>
            </div>
        )
    } else {
        return (
            <div key={ `board-${ board.id }` } className={ styles.boardContainer }>
                <Link to={ `/board/${ board.id }` }>
                    <div className={ styles.boardInner }>
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
