import React, { Component } from 'react'
import { css } from 'react-emotion'
import colors from '../../styles/colors'
import BoardsTable from './BoardsTable'

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

const header = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
`

const headerInner = css`
    background: ${ colors.offWhite };
    border: 5px solid ${ colors.black };
    padding: 1rem 2rem;
    border-radius: 2px;
    text-transform: uppercase;
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
                    <BoardsTable boards={ this.props.boards } onDelete={ (id) => this.props.onDelete(id) } />
                </div>
            </div>
        )
    }
}

export default Boards
