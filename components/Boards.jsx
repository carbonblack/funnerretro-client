import React, { Component } from 'react'
import { css } from 'react-emotion'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import colors from '../styles/colors'

const container = css`
    display: flex;
    flex-direction: column;

    a {
        text-decoration: none;
    }
`

const inner = css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const boardContainer = css`
    padding: 0 1rem;
`

const decoration = css`
    content: "";
    position: absolute;
    top: 0;
    width: 10px;
    height: 100%;
    background: ${ colors.lightPink };
`

const boardInner = css`
    display: flex;
    background: ${ colors.offWhite };
    border: 4px solid ${ colors.black };
    padding: 1rem 2rem;
    border-radius: 2px;
    position: relative;

    a {
        color: ${ colors.black };
    }

    &:before {
        ${ decoration };
        left: 0;
    }

    &:after {
        ${ decoration };
        right: 0;
    }
`

const header = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
`

const headerInner = css`
    background: ${ colors.offWhite };
    border: 4px solid ${ colors.black };
    padding: 1rem 2rem;
    border-radius: 2px;
    text-transform: uppercase;
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
                            <div className={ boardInner }>
                                <Link to={`/board/${ board.id }`}>
                                    <p>{ board.name }</p>
                                </Link>
                                <button onClick={ () => this.props.onDelete(board.id) } className={ button }>
                                    <FontAwesome name="trash-o" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Boards
