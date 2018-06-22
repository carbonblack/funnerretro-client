import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import New from '../shared/New'
import colors from '../../styles/colors'

const container = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
`

const inner = css`
    ${ container };
`

const header = css`
    margin-bottom: 2rem;
    text-transform: uppercase;
`

const content = css`
    background: ${ colors.offWhite };
    border: 5px solid ${ colors.black };
    padding: 2rem 4rem;
    border-radius: 2px;
    width: 50%;
`

const templateContainer = css`
    margin-top: 0.5rem;
`

const templateName = css`
    margin-left: 0.5rem;
`

const description = css`
    margin-left: 3rem;
    margin-top: 0.25rem;
`

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
            <div className={ container }>
                <div className={ inner }>
                    <div className={ content }>
                        <h2 className={ header }>Create a new retro board</h2>
                        <New placeholder="Board name" submitLabel="Create" onSubmit={ boardName => onSubmit(boardName, this.state.template) } />
                        {templates.length > 0 && 
                            <div>
                                <h3>Choose a template</h3>
                                {this.props.templates.map((template, index) => (
                                    <div key={ `template-${ index }` } className={ templateContainer }>
                                        <input type="radio" id={ `input-${ index }` } checked={ this.state.template === template.id } onChange={ () => this.setState({ template: template.id }) } />
                                        <label htmlFor={ `input-${ index }` } className={ templateName }>{ template.name }</label>
                                        {this.state.template === template.id &&
                                            <div>
                                                <p className={ description }>{ template.description }</p>
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
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
