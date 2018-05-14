import React, { Component } from 'react'
import { css } from 'react-emotion'
import colors from '../constants/colors'

const container = css`
    display: flex;
    justify-content: space-between;
`

const inputStyles = css`
    flex-grow: 1;
    border: 1px solid ${ colors.mediumGray };
    margin-right: 0.5rem;
    padding: 0.5rem;
`

const submit = css`
    color: ${ colors.white };
    background: ${ colors.orange };
    border: 0;
    border-radius: 2px;
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
`

class New extends Component {
    constructor() {
        super()
        this.state = {
            value: ''
        }
    }

    onChange(value) {
        this.setState({
            value: value
        })
    }

    onSubmit(e) {
        e.stopPropagation()
        e.preventDefault()
        this.props.onSubmit(this.state.value)
    }

    render() {
        const { placeholder } = this.props

        return (
            <div>
                <form className={ container } onSubmit={ () => false }>
                    <input className={ inputStyles } placeholder={ placeholder } onChange={ e => this.onChange(e.target.value) } />
                    <button className={ submit } onClick={ e => this.onSubmit(e) }>Create</button>
                </form>
            </div>
        )
    }
}

export default New
