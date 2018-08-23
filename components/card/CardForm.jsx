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
        padding: 0.5rem;
        border-radius: 5px;
        font-size: 0.8rem;
        width: 100%;

        &:focus {
            outline: none;
        }
    `,
    inputContainer: css`
        margin-right: 0.5rem;
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
    `,
    button: css`
        height: fit-content;
    `
}

class CardForm extends Component {
    state = {
        shouldShowInput: this.props.showInput,
        val: this.props.value,
        error: ''
    }

    onCancel = () => {
        this.setState({ 
            shouldShowInput: false, 
            error: '', 
            val: '' 
        })
    }

    onSubmit = e => {
        e.stopPropagation()
        e.preventDefault()

        const { onSubmit } = this.props
        const { val } = this.state

        if(val === '') {
            this.setState({
                error: 'Card text must not be empty'
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
        const { placeholder, submitLabel } = this.props
        const { shouldShowInput, val, error } = this.state

        if(shouldShowInput) {
            return (
                <div className={ styles.container }>
                    <form className={ styles.form } onSubmit={ () => false }>
                        <div className={ styles.inputContainer }>
                            <input
                                className={ cx(styles.inputStyles, { [styles.errorBorder]: error, [styles.grayBorder]: !error }) }
                                value={ val }
                                placeholder={ placeholder } 
                                onChange={ e => this.setState({ val: e.target.value }) } 
                            />
                            <p>Colors</p>
                        </div>
                        
                        <button type='reset' className={ cx(baseButton, styles.cancelButton, styles.button) } onClick={ this.onCancel }>Cancel</button>
                        <button type='submit' className={ cx(baseButton, styles.button) } onClick={ e => this.onSubmit(e) }>{ submitLabel }</button>
                    </form>
                    { error && <p className={ styles.errorContainer }>{ error }</p> }
                </div>
            )
        } else {
            return (
                <div className={ styles.container }>
                    <button className={ baseButton } onClick={ () => this.setState({ shouldShowInput: true }) }>+ Add Card</button>
                </div>
            )
        }
    }
}

CardForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    submitLabel: PropTypes.string,
    showInput: PropTypes.bool,
    value: PropTypes.string
}

CardForm.defaultProps = {
    submitLabel: '',
    showInput: false,
    value: '',
    onCancel: () => {}
}

export default CardForm
