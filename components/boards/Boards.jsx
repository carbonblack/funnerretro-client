import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { css, cx } from 'react-emotion'
import colors from 'styles/colors'

const styles = {
    container: css`
        display: flex;
        flex-direction: column;
        margin: 0 9rem 2rem;

        a {
            text-decoration: none;
        }
    `,
    inner: css`
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    `,
    boardContainer: css`
        color: ${ colors.black };
        padding: 0.5rem;
        font-family: 'Abel', sans-serif;
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
        font-size: 1.2rem;
        overflow: hidden;
        word-break: break-all;
    `,
    blankBoardInner: css`
        background: ${ colors.lightBlueNew };
    `,
    addBoard: css`
        color: ${ colors.white };
        background: ${ colors.darkBlue };
    `,
    header: css`
        width: 100%;
        color: ${ colors.white };
        padding: 0 0.5rem;
        display: flex;
        justify-content: space-between;
    `,
    headerText: css`
        color: ${ colors.logoOrange };
        font-size: 4rem;
        margin-bottom: 1rem;
    `,
    sorting: css`
        color: ${ colors.blueTextButton };

        span {
            padding-left: 1rem;
        }
    `
}

class Boards extends Component {
    componentDidMount() {
        this.props.load()
    }

    render() {
        const { boards } = this.props
        const numberOfBlankBoards = boards.length > 15 ? 0 : 14 - boards.length

        return (
            <div className={ styles.container }>
                <div className={ styles.inner }>
                    <div className={ styles.header }>
                         <h1 className={ styles.headerText }>Nic Cage</h1>
                    </div>
                    <div className={ styles.header }>
                        <h3>Boards</h3>
                        <h3 className={ styles.sorting }>Most Recent <span>A-Z</span></h3>
                    </div>
                    <div className={ styles.boardContainer }>
                        <Link to="/board/new">
                            <div className={ cx(styles.boardInner, styles.addBoard) }>
                                <h2>+ Add board</h2>
                            </div>
                        </Link>
                    </div>
                    { boards.map(board => (
                        <div key={ `board-${ board.id }` } className={ styles.boardContainer }>
                            <Link to={ `/board/${ board.id }` }>
                                <div className={ styles.boardInner }>
                                    <h2>{ board.content.name }</h2>
                                </div>
                            </Link>
                        </div>
                    )) }
                    { Array.from(Array(numberOfBlankBoards).keys()).map(i => (
                        <div key={ `blank-board-${ i }` } className={ styles.boardContainer }>
                            <div className={ cx(styles.boardInner, styles.blankBoardInner) }></div>
                        </div>
                    )) }
                </div>
            </div>
        )
    }
}

Boards.propTypes = {
    load: PropTypes.func.isRequired,
    boards: PropTypes.array
}

Boards.defaultProps = {
    boards: []
}

export default Boards
