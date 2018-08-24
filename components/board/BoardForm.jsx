import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'react-emotion'
import colors from 'styles/colors'
import { sharedStyles } from 'styles/boardGrid' 
import { baseButton } from 'styles/button'

const styles = {
    container: css`
        display: flex;
        flex-direction: column;
        margin: 0 2.1rem 2rem;
    `,
    inputContainer: css`
        width: 30%;
        min-width: 300px;
        margin-bottom: 2rem;
    `,
    header: css`
        margin-bottom: 1rem;
        text-transform: uppercase;
        color: ${ colors.orange };
    `,
    content: css`
        padding: 2rem 4rem;
        border-radius: 2px;
    `,
    templateContainer: css`
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
    `,
    description: css`
        margin-left: 3rem;
        margin-top: 0.25rem;
        font-size: 0.8rem;
        font-family: 'Open Sans', sans-serif;
        text-transform: none;
    `,
    templateButton: css`
        width: 100%;
        height: 100%;
    `,
    outer: css`
        padding: 4px;
        background-color: ${ colors.white };
        border-radius: 7px;
    `,
    active: css`
        background-color: ${ colors.orange };
        box-shadow: 0 0 4px 0 ${ colors.orange };
    `,
    formContainer: css`
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    `,
    errorContainer: css`
        color: ${ colors.red };
        flex-basis: 100%;
        margin-top: 0.5rem;
    `,
    inputStyles: css`
        flex-grow: 1;
        border: 1px solid ${ colors.mediumGray };
        margin-right: 0.5rem;
        padding: 0.5rem;
        border-radius: 5px;
        font-size: 0.8rem;

        &:focus {
            outline: none;
        }
    `,
    inputErrorStyles: css`
        border: 1px solid ${ colors.red };
        box-shadow: 0 0 4px 0 ${ colors.red };
    `
}

class BoardForm extends Component {
    state = {
        template: 'empty',
        value: this.props.value ? this.props.value : '',
        error: null
    }

    componentDidMount() {
        this.props.load()
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
        const { templates } = this.props
        const { value, error, template } = this.state

        return (
            <div className={ styles.container }>
                <div className={ styles.container }>
                    <div className={ styles.content }>
                        <h1 className={ styles.header }>Create a new retro board</h1>
                        <div className={ styles.inputContainer }>
                            <form className={ styles.formContainer } onSubmit={ () => false }>
                                <input value={ value } className={ cx(styles.inputStyles, { [styles.inputErrorStyles]: error }) } placeholder='Board name' onChange={ e => this.onChange(e.target.value) } />
                                <button className={ baseButton } onClick={ e => this.onSubmit(e) }>Create</button>
                                { error && <p className={ styles.errorContainer }>{ error }</p> }
                            </form>
                        </div>
                        { templates.length > 0 && 
                            <Fragment>
                                <h2 className={ styles.header }>Template</h2>
                                <ul className={ styles.templateContainer }>
                                    {this.props.templates.map((t, index) => (
                                        <li className={ sharedStyles.boardContainer } key={ `template-${ index }` }>
                                            <div className={ cx(styles.outer, { [styles.active]: template === t.id }) }>
                                                <div className={ sharedStyles.boardInner } onClick={ () => this.setState({ template: t.id }) }>
                                                    <h3>{ t.name }</h3>
                                                    <p className={ styles.description }>{ t.description }</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </Fragment>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

BoardForm.propTypes = {
    load: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    templates: PropTypes.array
}

BoardForm.defaultProps = {
    templates: []
}

export default BoardForm
