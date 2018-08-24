import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'react-emotion'
import { baseButton } from 'styles/button'
import onClickOutside from 'react-onclickoutside'
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
    containerThin: css`
        width: 16.75rem;
        margin-bottom: 0;
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
    `,
    button: css`
        text-align: left;
    `,
}

class SingleTextInputForm extends Component {
    state = {
        shouldShowInput: this.props.showInput,
        val: this.props.value,
        error: ''
    }

    handleClickOutside = () => {
        this.setState({ 
            shouldShowInput: false, 
            error: '', 
            val: '' 
        })

        if (this.state.shouldShowInput) {
            this.props.onCancel()
        }
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
        const { placeholder, submitLabel, label, thin } = this.props
        const { shouldShowInput, val, error } = this.state

        if(shouldShowInput) {
            return (
                <div className={ cx(styles.container, { [styles.containerThin]: thin }) }>
                    <form className={ styles.form } onSubmit={ () => false }>
                        <input
                            className={ cx(styles.inputStyles, { [styles.errorBorder]: error, [styles.grayBorder]: !error }) }
                            value={ val }
                            placeholder={ placeholder } 
                            onChange={ e => this.setState({ val: e.target.value }) } 
                        />
                        <button type='submit' className={ baseButton } onClick={ e => this.onSubmit(e) }>{ submitLabel }</button>
                    </form>
                    { error && <p className={ styles.errorContainer }>{ error }</p> }
                </div>
            )
        } else {
            return (
                <div className={ styles.container }>
                    <button className={ cx(baseButton, styles.button) } onClick={ () => this.setState({ shouldShowInput: true }) }>{ label }</button>
                </div>
            )
        }
    }
}

SingleTextInputForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    submitLabel: PropTypes.string,
    errorLabel: PropTypes.string,
    showInput: PropTypes.bool,
    value: PropTypes.string,
    thin: PropTypes.bool
}

SingleTextInputForm.defaultProps = {
    placeholder: '',
    submitLabel: '',
    errorLabel: '',
    label: 'Add',
    showInput: false,
    value: '',
    thin: false,
    onCancel: () => {}
}

export { SingleTextInputForm }

export default onClickOutside(SingleTextInputForm)
