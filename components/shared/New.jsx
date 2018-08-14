import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { baseButton } from 'styles/button'
import colors from 'styles/colors'

const container = css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

const inputStyles = error => css`
    flex-grow: 1;
    border: 1px solid ${ error ? colors.pink : colors.mediumGray };
    margin-right: 0.5rem;
    padding: 0.5rem;

    &:focus {
        outline: none;
    }
`

const errorContainer = css`
    color: ${ colors.pink };
    flex-basis: 100%;
    margin-top: 0.5rem;
`

class New extends Component {
    state = {
        value: this.props.value ? this.props.value : '',
        error: null
    }

    onChange = value => this.setState({ value: value })

    onSubmit = e => {
        e.stopPropagation()
        e.preventDefault()

        if(this.state.value === '') {
            this.setState({
                error: 'Field must not be empty'
            })
            return
        }

        this.setState({
            value: '',
            error: null
        })
        this.props.onSubmit(this.state.value)
    }

    render() {
        const { placeholder, submitLabel } = this.props
        const { value, error } = this.state

        return (
            <form className={ container } onSubmit={ () => false }>
                <input value={ value } className={ inputStyles(error) } placeholder={ placeholder } onChange={ e => this.onChange(e.target.value) } />
                <button className={ baseButton } onClick={ e => this.onSubmit(e) }>{ submitLabel }</button>
                { error && <p className={ errorContainer }>{ error }</p> }
            </form>
        )
    }
}

New.propTypes = {
    value: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    submitLabel: PropTypes.string
}

New.defaultProps = {
    value: '',
    placeholder: '',
    submitLabel: ''
}

export default New
