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
    `,
    groups: css`
        margin-bottom: 1rem;
        select {
            width: 250px;
            height: 30px;
            overflow: hidden;

            :active, :focus {
                outline: none;
            }
        }
    `
}

class BoardForm extends Component {
    state = {
        template: 'empty',
        value: this.props.value ? this.props.value : '',
        group: this.props.groups.length > 0 ? this.props.groups[0].id : '',
        error: null
    }

    componentDidMount() {
        this.props.load()
    }

    onNameChange = value => this.setState({ value: value })

    onGroupChange = value => this.setState({ group: value })

    onSubmit = e => {
        const { value, template, group } = this.state

        e.stopPropagation()
        e.preventDefault()

        if(value === '') {
            this.setState({
                error: 'Field must not be empty'
            })
            return
        }

        this.setState({
            value: '',
            error: null
        })
        this.props.onSubmit(value, template, group)
    }

    render() {
        const { templates, groups } = this.props
        const { value, error, template } = this.state

        return (
            <div className={ styles.container }>
                <div className={ styles.container }>
                    <div className={ styles.content }>
                        <h1 className={ styles.header }>Create a new retro board</h1>
                        <div className={ styles.inputContainer }>
                            <form className={ styles.formContainer } onSubmit={ () => false }>
                                <input value={ value } className={ cx(styles.inputStyles, { [styles.inputErrorStyles]: error }) } placeholder='Board name' onChange={ e => this.onNameChange(e.target.value) } />
                                <button className={ baseButton } onClick={ e => this.onSubmit(e) }>Create</button>
                                { error && <p className={ styles.errorContainer }>{ error }</p> }
                            </form>
                        </div>
                        <div className={ styles.groups }>
                            <h2 className={ styles.header }>Workspace</h2>
                            <select value={ this.state.group } onChange={ e => this.onGroupChange(e.target.value) }>
                                { groups.map(g => (
                                    <option key={ `option-${ g.id }` } value={ g.id }>{ g.name }</option>
                                )) }
                            </select>
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
    templates: PropTypes.array,
    value: PropTypes.string,
    groups: PropTypes.array
}

BoardForm.defaultProps = {
    templates: [],
    groups: [],
    value: ''
}

export default BoardForm
