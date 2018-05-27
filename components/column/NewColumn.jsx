import React, { Component } from 'react'
import { css, cx } from 'react-emotion'
import { baseButton } from '../../styles/button'
import colors from '../../styles/colors'

const container = css`
    display: flex;
    flex-direction: column;
    background: ${ colors.offWhite };
    padding: 1rem;
    height: fit-content;
`

const form = css`
    display: flex;
    justify-content: space-between;
    margin: 0;
`

const inputStyles = error => css`
    flex-grow: 1;
    margin-right: 0.5rem;
    padding: 0.75rem;

    &:focus {
        outline: none;
    }
`

const cancelButton = css`
    margin-right: 0.5rem;
`

const error = css`
    color: ${ colors.pink };
    flex-basis: 100%;
    margin-top: 1rem;
`

class NewColumn extends Component {
    constructor() {
        super()

        this.state = {
            shouldShowNewColumnInput: false,
            name: '',
            error: null
        }
    }

    onCancel() {
        this.setState({ 
            shouldShowNewColumnInput: false, 
            error: null, 
            name: '' 
        })
    }

    onSubmit(e) {
        e.stopPropagation()
        e.preventDefault()

        if(this.state.name === '') {
            this.setState({
                error: 'Column name must not be empty'
            })
            return
        }

        this.setState({
            name: '',
            error: null
        })

        this.props.onSubmit(this.state.name)
    }

    render() {
        const { placeholder, submitLabel } = this.props

        if(this.state.shouldShowNewColumnInput) {
            return (
                <div className={ container }>
                    <form className={ form } onSubmit={ () => false }>
                        <input
                            className={ inputStyles(this.state.error) }
                            value={ this.state.name }
                            placeholder={ placeholder } 
                            onChange={ e => this.setState({ name: e.target.value }) } 
                        />
                        <a className={ cx(baseButton, cancelButton) } onClick={ () => this.onCancel() }>Cancel</a>
                        <button className={ baseButton } onClick={ e => this.onSubmit(e) }>{ submitLabel }</button>
                    </form>
                    { this.state.error && <p className={ error }>{ this.state.error }</p> }
                </div>
            )
        } else {
            return (
                <button className={ baseButton } onClick={ () => this.setState({ shouldShowNewColumnInput: true }) }>Create a new column</button>
            )
        }
    }
}

export default NewColumn
