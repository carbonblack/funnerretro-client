import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'react-emotion'
import New from 'components/shared/New'
import colors from 'styles/colors'
import { sharedStyles } from 'styles/boardGrid' 


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
    `
}

class BoardForm extends Component {
    state = {
        template: 'empty'
    }

    componentDidMount() {
        this.props.load()
    }

    render() {
        const { onSubmit, templates } = this.props

        return (
            <div className={ styles.container }>
                <div className={ styles.container }>
                    <div className={ styles.content }>
                        <h1 className={ styles.header }>Create a new retro board</h1>
                        <div className={ styles.inputContainer }>
                            <New placeholder="Board name" submitLabel="Create" onSubmit={ boardName => onSubmit(boardName, this.state.template) } />
                        </div>
                        { templates.length > 0 && 
                            <Fragment>
                                <h2 className={ styles.header }>Template</h2>
                                <ul className={ styles.templateContainer }>
                                    {this.props.templates.map((template, index) => (
                                        <li className={ sharedStyles.boardContainer } key={ `template-${ index }` }>
                                            <div className={ cx(styles.outer, { [styles.active]: this.state.template === template.id }) }>
                                                <div className={ sharedStyles.boardInner } onClick={ () => this.setState({ template: template.id }) }>
                                                    <h3>{ template.name }</h3>
                                                    <p className={ styles.description }>{ template.description }</p>
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
