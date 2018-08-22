import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'react-emotion'
import { baseButton } from 'styles/button'
import colors from 'styles/colors'

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

const inputStyles = css`
    flex-grow: 1;
    margin-right: 0.5rem;
    padding: 0.75rem;

    &:focus {
        outline: none;
    }
`

const pinkBorder = css`
    border: 1px solid ${ colors.pink };
`

const grayBorder = css`
    border: 1px solid ${ colors.mediumGray };
`

const cancelButton = css`
    margin-right: 0.5rem;
`

const errorContainer = css`
    color: ${ colors.pink };
    flex-basis: 100%;
    margin-top: 1rem;
`

class ColumnForm extends Component {
    state = {
        shouldShowColumnFormInput: false,
        name: '',
        error: null
    }

    onCancel = () => {
        this.setState({ 
            shouldShowColumnFormInput: false, 
            error: null, 
            name: '' 
        })
    }

    onSubmit = e => {
        e.stopPropagation()
        e.preventDefault()

        const { onSubmit } = this.props
        const { name } = this.state

        if(name === '') {
            this.setState({
                error: 'Column name must not be empty'
            })
            return
        }

        this.setState({
            name: '',
            error: null
        })

        onSubmit(name)
    }

    render() {
        const { placeholder, submitLabel } = this.props
        const { shouldShowColumnFormInput, name, error } = this.state

        if(shouldShowColumnFormInput) {
            return (
                <div className={ container }>
                    <form className={ form } onSubmit={ () => false }>
                        <input
                            className={ cx(inputStyles, { [pinkBorder]: error, [grayBorder]: !error }) }
                            value={ name }
                            placeholder={ placeholder } 
                            onChange={ e => this.setState({ name: e.target.value }) } 
                        />
                        <a className={ cx(baseButton, cancelButton) } onClick={ this.onCancel }>Cancel</a>
                        <button className={ baseButton } onClick={ e => this.onSubmit(e) }>{ submitLabel }</button>
                    </form>
                    { error && <p className={ errorContainer }>{ error }</p> }
                </div>
            )
        } else {
            return (
                <button className={ baseButton } onClick={ () => this.setState({ shouldShowColumnFormInput: true }) }>Create a new column</button>
            )
        }
    }
}

ColumnForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    submitLabel: PropTypes.string
}

ColumnForm.defaultProps = {
    placeholder: '',
    submitLabel: ''
}

export default ColumnForm
