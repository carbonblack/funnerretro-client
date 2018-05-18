import React, { Component } from 'react'
import { css } from 'react-emotion'
import New from '../shared/New'
import colors from '../../styles/colors'

const container = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    margin-top: -4rem;
`

const inner = css`
    ${ container };
    max-width: 50%;
`

const header = css`
    margin-bottom: 2rem;
    text-transform: uppercase;
`

const content = css`
    background: ${ colors.offWhite };
    border: 4px solid ${ colors.black };
    padding: 2rem 4rem;
    border-radius: 2px;
`

const templateContainer = css`
    margin-top: 0.5rem;
`

const templateName = css`
    margin-left: 0.5rem;
`

class NewBoard extends Component {
    constructor() {
        super()

        this.state = {
            template: 'empty'
        }
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
                                <h4>Choose a template</h4>
                                {this.props.templates.map((template, index) => (
                                    <div key={ `template-${ index }` } className={ templateContainer }>
                                        <input type="radio" id="radioButton" checked={ this.state.template === template.id } onChange={ () => this.setState({ template: template.id }) } />
                                        <span className={ templateName }>{ template.name }</span>
                                        <p>{ template.description }</p>
                                        {template.columns.length > 0 && <p>Columns: { template.columns.join(', ') }</p>}
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

export default NewBoard
