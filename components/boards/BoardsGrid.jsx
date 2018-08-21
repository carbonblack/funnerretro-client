import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'react-emotion'
import { Link } from 'react-router-dom'
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
    `,
    blankBoardInner: css`
        background: ${ colors.lightBlueNew };
    `,
    addBoard: css`
        color: ${ colors.white };
        background: ${ colors.darkBlue };
    `
}

const BoardsGrid = ({ boards }) => {
    const numberOfBlankBoards = boards.length > 15 ? 0 : 14 - boards.length

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
                <div key={ `board-${ board.id }` } className={ styles.boardContainer }>
                    <Link to={ `/board/${ board.id }` }>
                        <div className={ styles.boardInner }>
                            <p>{ board.content.name }</p>
                        </div>
                    </Link>
                </div>
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
    boards: PropTypes.array.isRequired
}

export default BoardsGrid
