import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'react-emotion'
import { baseButton } from 'styles/button'
import onClickOutside from 'react-onclickoutside'
import colors, { cardColorOptions } from 'styles/colors'

const styles = {
    container: css`
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
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
        flex-grow: 1;
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
        background: ${ colors.lightBlue };
        text-align: left;
    `,
    colorOptions: css`
        display: flex;
        justify-content: space-between;
        margin: 0.5rem;
    `,
    colorOption: css`
        border: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;

        :focus, :active {
            outline: none;
        }
    `,
    colorOptionContainer: (active, color) => css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        padding: 1px;
        background-color: ${ active ? colors.darkBlue : color };
        box-shadow: ${ active ? `0 0 4px 0 ${ colors.darkBlue }` : '' };
    `
}

class CardForm extends Component {
    state = {
        shouldShowInput: this.props.showInput,
        val: this.props.value,
        color: this.props.color,
        error: ''
    }

    handleClickColor = (c) => this.setState({ color: c });

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

    onSubmit = () => {
        const { onSubmit, errorLabel } = this.props
        const { val, color } = this.state

        if(val === '') {
            this.setState({
                error: errorLabel
            })
            return
        }

        this.setState({
            shouldShowInput: false,
            color: '',
            val: '',
            error: null
        })

        onSubmit(val, color)
    }

    render() {
        const { submitLabel } = this.props
        const { shouldShowInput, val, error, color } = this.state

        if(shouldShowInput) {
            return (
                <div className={ styles.container }>
                    <form className={ styles.form } onSubmit={ () => false }>
                        <div className={ styles.inputContainer }>
                            <input
                                className={ cx(styles.inputStyles, { [styles.errorBorder]: error, [styles.grayBorder]: !error }) }
                                value={ val }
                                placeholder='Card text' 
                                onChange={ e => this.setState({ val: e.target.value }) } 
                            />
                            <div className={ styles.colorOptions }>
                                { cardColorOptions.map(c => (
                                    <span key={ `color-${ c }` } className={ styles.colorOptionContainer(color === c, c) }>
                                        <button type="button" onClick={ () => this.handleClickColor(c) } className={ styles.colorOption } style={ { backgroundColor: c } }></button>
                                    </span>
                                )) }
                            </div>
                        </div>
                        <button type='submit' className={ baseButton } onClick={ this.onSubmit }>{ submitLabel }</button>
                    </form>
                    { error && <p className={ styles.errorContainer }>{ error }</p> }
                </div>
            )
        } else {
            return (
                <div className={ styles.container }>
                    <button className={ cx(baseButton, styles.button) } onClick={ () => this.setState({ shouldShowInput: true }) }>+ Add card</button>
                </div>
            )
        }
    }
}

CardForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    submitLabel: PropTypes.string,
    errorLabel: PropTypes.string,
    showInput: PropTypes.bool,
    value: PropTypes.string,
    color: PropTypes.string,
    onCancel: PropTypes.func
}

CardForm.defaultProps = {
    submitLabel: '',
    errorLabel: '',
    showInput: false,
    value: '',
    color: '',
    onCancel: () => {}
}

export { CardForm }

export default onClickOutside(CardForm)
