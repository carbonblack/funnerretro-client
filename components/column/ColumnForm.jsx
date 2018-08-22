import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'react-emotion'
import { baseButton } from 'styles/button'
import colors from 'styles/colors'

const styles = {
    container: css`
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 18.75rem;
        height: fit-content;
    `,
    form: css`
        display: flex;
        justify-content: space-between;
        margin: 0;
    `,
    inputStyles: css`
        flex-grow: 1;
        margin-right: 0.5rem;
        padding: 0.5rem;
        border-radius: 5px;

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
                <div className={ styles.container }>
                    <form className={ styles.form } onSubmit={ () => false }>
                        <input
                            className={ cx(styles.inputStyles, { [styles.errorBorder]: error, [styles.grayBorder]: !error }) }
                            value={ name }
                            placeholder={ placeholder } 
                            onChange={ e => this.setState({ name: e.target.value }) } 
                        />
                        <button className={ cx(baseButton, styles.cancelButton) } onClick={ this.onCancel }>Cancel</button>
                        <button className={ baseButton } onClick={ e => this.onSubmit(e) }>{ submitLabel }</button>
                    </form>
                    { error && <p className={ styles.errorContainer }>{ error }</p> }
                </div>
            )
        } else {
            return (
                <div className={ styles.container }>
                    <button className={ baseButton } onClick={ () => this.setState({ shouldShowColumnFormInput: true }) }>+ Add Column</button>
                </div>
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
