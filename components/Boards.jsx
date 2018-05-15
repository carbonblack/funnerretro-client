import React, { Component } from 'react'
import { css } from 'react-emotion'
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
    background: ${ colors.white };
    margin-left: 1rem;
    padding: 0.5rem;
    border-radius: 2px;
    color: ${ colors.darkGray };
`

const header = css`
    text-align: center;
    color: ${ colors.white };
`

class Boards extends Component {
    componentDidMount() {
        this.props.load()
    }

    render() {
        return (
            <div className={ container }>
                <h2 className={ header }>All Retro Boards</h2>
                <div className={ inner }>
                    {this.props.boards.map(board => (
                        <Link key={ `board-${ board.id }` } to={`/board/${ board.id }`}>
                            <div className={ boardContainer }>
                                <h3>{ board.name }</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }
}

export default Boards
