import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { css, cx } from 'react-emotion'
import colors from 'styles/colors'

const container = css`
    display: flex;
    flex-direction: column;
    margin: 0 6rem;

    a {
        text-decoration: none;
    }
`

const inner = css`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
`

const boardContainer = css`
    color: ${ colors.black };
    padding: 0.5rem;
    font-family: 'Abel', sans-serif;
    width: calc(20% - 1rem);
`

const boardInner = css`
    padding: 1rem 2rem;
    background: ${ colors.white };
    color: ${ colors.darkBlue };
    height: 200px;
    border-radius: 2px;
    text-transform: uppercase;
`

const addBoard = css`
    color: ${ colors.white };
    background: ${ colors.darkBlue };
`

const header = css`
    width: 100%;

    h1 {
        color: ${ colors.logoOrange };
        font-family: 'GraphiqueProNextCo';
    }
`

class Boards extends Component {
    componentDidMount() {
        this.props.load()
    }

    render() {
        const { boards } = this.props
        
        return (
            <div className={ container }>
                <div className={ inner }>
                    <div className={ header }>
                         <h1>Hello</h1>
                    </div>
                    <div className={ boardContainer }>
                        <Link to="/board/new">
                            <div className={ cx(boardInner, addBoard) }>
                                <h2>+ Add board</h2>
                            </div>
                        </Link>
                    </div>
                    { boards.map(board => (
                        <div key={ `board-${ board.id }` } className={ boardContainer }>
                            <div className={ boardInner }>
                                <h2>{ board.content.name }</h2>
                            </div>
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
