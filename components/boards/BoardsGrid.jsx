import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'react-emotion'
import { Link } from 'react-router-dom'
import colors from 'styles/colors'
import BoardGridElement from 'components/boards/BoardGridElement'

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
    blankBoardInner: css`
        background: ${ colors.lightBlueNew };
    `,
    addBoard: css`
        color: ${ colors.white };
        background: ${ colors.darkBlue };
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

const BoardsGrid = ({ boards, editing, onDelete }) => {
    const numberOfBlankBoards = boards.length > 14 ? boards.length % 5 : 14 - boards.length
    
    return (
        <Fragment>
            <div className={ styles.boardContainer }>
                <Link to="/board/new">
                    <div className={ cx(styles.boardInner, styles.addBoard) }>
                        <p>+ Add board</p>
                    </div>
                </Link>
            </div>
            { boards.map(board => (
                <BoardGridElement key={ `board-${ board.id }` } board={ board } editing={ editing } onDelete={ onDelete } />
            )) }
            { Array.from(Array(numberOfBlankBoards).keys()).map(i => (
                <div key={ `blank-board-${ i }` } className={ styles.boardContainer }>
                    <div className={ cx(styles.boardInner, styles.blankBoardInner) }></div>
                </div>
            )) }
        </Fragment>
    )
}

BoardsGrid.propTypes = {
    boards: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    editing: PropTypes.bool
}

BoardsGrid.defaultProps = {
    editing: false
}

export default BoardsGrid
