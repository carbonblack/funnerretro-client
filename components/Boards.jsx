import React, { Component } from 'react'
import { css } from 'react-emotion'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import colors from '../styles/colors'

const container = css`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;

    a {
        text-decoration: none;
    }
`

const inner = css`
    display: flex;
`

const boardContainer = css`
    display: flex;
    background: ${ colors.offWhite };
    border: 4px solid ${ colors.black };
    margin-left: 1rem;
    padding: 0.5rem;
    border-radius: 2px;
    color: ${ colors.black };
`

const header = css`
    display: flex;
    justify-content: center;
    align-items: center;
`

const headerInner = css`
    background: ${ colors.offWhite };
    border: 4px solid ${ colors.black };
    padding: 1rem 2rem;
    border-radius: 2px;
`

const button = css`
    font-size: 0.9rem;
    color: ${ colors.mediumGray };
    border: 0;
    background: transparent;

    &:active, :focus, :visited {
        outline: none;
    }

    &:hover {
        color: ${ colors.darkGray };
    }
`

class Boards extends Component {
    componentDidMount() {
        this.props.load()
    }

    render() {
        return (
            <div className={ container }>
                <div className={ header }>
                    <h2 className={ headerInner }>All Retro Boards</h2>
                </div>
                <div className={ inner }>
                    {this.props.boards.map(board => (
                        <div key={ `board-${ board.id }` } className={ boardContainer }>
                            <Link to={`/board/${ board.id }`}>
                                <h3>{ board.name }</h3>
                            </Link>
                            <button onClick={ () => this.props.onDelete(board.id) } className={ button }>
                                <FontAwesome name="trash-o" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Boards
