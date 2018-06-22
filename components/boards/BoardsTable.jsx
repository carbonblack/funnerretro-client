import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import colors from '../../styles/colors'
import { actionButton } from '../../styles/button'

const table = css`
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: flex-start;
    padding: 2rem 4rem;
    background: ${ colors.white };
    border: 5px solid ${ colors.black };
`

const row = css`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${ colors.gray };
    padding: 1rem 0;
`

const boardContainer = css`
    padding: 0 1rem;
    margin-bottom: 2rem;
`

const boardInner = css`
    display: flex;
    background: ${ colors.offWhite };
    border: 5px solid ${ colors.black };
    padding: 1rem 2rem;
    border-radius: 2px;
    position: relative;
`

const createLink = css`
    color: ${ colors.pink };
`

const boardLink = css`
    color: ${ colors.black };
`

const BoardsTable = ({ boards, onDelete }) => {
    if(boards.length < 1) {
        return (
            <div className={ boardContainer }>
                <div className={ boardInner }>
                    <p>There are no boards right now. Be the first to <Link className={ createLink } to="/board/new">create one</Link>!</p>
                </div>
            </div>
        )
    }

    return (
        <div className={ table }>
            <div className={ row }>
                <h3>Name</h3>
            </div>
            {boards.map(board => (
                <div key={ `boards-row-${ board.id }` } className={ row }>
                    <Link className={ boardLink } to={`/board/${ board.id }`}>
                        <p>{ board.content.name }</p>
                    </Link>
                    <button onClick={ () => onDelete(board.id) } className={ actionButton }>
                        <FontAwesome name="trash-o" />
                    </button>
                </div>
            ))}
        </div>
    )
}

BoardsTable.propTypes = {
    boards: PropTypes.array,
    onDelete: PropTypes.func.isRequired
}

BoardsTable.defaultProps = {
    boards: []
}

export default BoardsTable
