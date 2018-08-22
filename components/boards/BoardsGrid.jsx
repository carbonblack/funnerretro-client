import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'react-emotion'
import { Link } from 'react-router-dom'
import { sharedStyles } from 'styles/boardGrid' 
import colors from 'styles/colors'
import BoardGridElement from 'components/boards/BoardGridElement'

const styles = {
    blankBoardInner: css`
        background: ${ colors.lightBlueNew };
    `,
    addBoard: css`
        color: ${ colors.white };
        background: ${ colors.darkBlue };
    `
}

const BoardsGrid = ({ boards, editing, onDelete }) => {
    const numberOfBlankBoards = boards.length > 14 ? boards.length % 5 : 14 - boards.length
    
    return (
        <Fragment>
            <div className={ sharedStyles.boardContainer }>
                <Link to="/board/new">
                    <div className={ cx(sharedStyles.boardInner, styles.addBoard) }>
                        <p>+ Add board</p>
                    </div>
                </Link>
            </div>
            { boards.map(board => (
                <BoardGridElement key={ `board-${ board.id }` } board={ board } editing={ editing } onDelete={ onDelete } />
            )) }
            { Array.from(Array(numberOfBlankBoards).keys()).map(i => (
                <div key={ `blank-board-${ i }` } className={ sharedStyles.boardContainer }>
                    <div className={ cx(sharedStyles.boardInner, styles.blankBoardInner) }></div>
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
