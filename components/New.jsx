import React, { Component } from 'react'
import { css } from 'react-emotion'
import colors from '../styles/colors'

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
    background: ${ colors.pink };
    border: 0;
    border-radius: 2px;
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;

    &:hover {
        background: ${ colors.lightPink };
    }
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
        this.setState({
            value: ''
        })
        this.props.onSubmit(this.state.value)
    }

    render() {
        const { placeholder, submitLabel } = this.props

        return (
            <div>
                <form className={ container } onSubmit={ () => false }>
                    <input value={ this.state.value } className={ inputStyles } placeholder={ placeholder } onChange={ e => this.onChange(e.target.value) } />
                    <button className={ submit } onClick={ e => this.onSubmit(e) }>{ submitLabel }</button>
                </form>
            </div>
        )
    }
}

export default New
