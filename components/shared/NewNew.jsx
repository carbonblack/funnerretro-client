import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'react-emotion'
import { baseButton } from 'styles/button'
import colors from 'styles/colors'

const styles = {
    container: css`
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        width: 18.75rem;
        margin-bottom: 1rem;
        height: fit-content;
    `,
    form: css`
        display: flex;
        justify-content: space-between;
        margin: 0;
    `,
    inputStyles: css`
        margin-right: 0.5rem;
        padding: 0.5rem;
        border-radius: 5px;
        font-size: 0.8rem;
        width: 100%;

        &:focus {
            outline: none;
        }
    `,
    grayBorder: css`
        border: 1px solid ${ colors.mediumGray };
    `,
    errorBorder: css`
        border: 1px solid ${ colors.red };
        box-shadow: 0 0 4px 0 ${ colors.red };
    `,
    cancelButton: css`
        margin-right: 0.5rem;
    `,
    errorContainer: css`
        color: ${ colors.red };
        flex-basis: 100%;
        margin-top: 1rem;
    `
}

class New extends Component {
    state = {
        shouldShowInput: this.props.showInput,
        val: '',
        error: ''
    }

    onCancel = () => {
        this.props.onCancel()
        
        this.setState({ 
            shouldShowInput: false, 
            error: '', 
            val: '' 
        })
    }

    onSubmit = e => {
        e.stopPropagation()
        e.preventDefault()

        const { onSubmit, errorLabel } = this.props
        const { val } = this.state

        if(val === '') {
            this.setState({
                error: errorLabel
            })
            return
        }

        this.setState({
            val: '',
            error: null
        })

        onSubmit(val)
    }

    render() {
        const { placeholder, submitLabel, label } = this.props
        const { shouldShowInput, val, error } = this.state

        if(shouldShowInput) {
            return (
                <div className={ styles.container }>
                    <form className={ styles.form } onSubmit={ () => false }>
                        <input
                            className={ cx(styles.inputStyles, { [styles.errorBorder]: error, [styles.grayBorder]: !error }) }
                            value={ val }
                            placeholder={ placeholder } 
                            onChange={ e => this.setState({ val: e.target.value }) } 
                        />
                        <button type='reset' className={ cx(baseButton, styles.cancelButton) } onClick={ this.onCancel }>Cancel</button>
                        <button type='submit' className={ baseButton } onClick={ e => this.onSubmit(e) }>{ submitLabel }</button>
                    </form>
                    { error && <p className={ styles.errorContainer }>{ error }</p> }
                </div>
            )
        } else {
            return (
                <div className={ styles.container }>
                    <button className={ baseButton } onClick={ () => this.setState({ shouldShowInput: true }) }>{ label }</button>
                </div>
            )
        }
    }
}

New.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    submitLabel: PropTypes.string,
    errorLabel: PropTypes.string,
    showInput: PropTypes.bool
}

New.defaultProps = {
    placeholder: '',
    submitLabel: '',
    errorLabel: '',
    label: 'Add',
    showInput: false
}

export default New
