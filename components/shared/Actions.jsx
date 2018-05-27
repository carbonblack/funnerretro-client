import React, { Component } from 'react'
import { css } from 'react-emotion'
import FontAwesome from 'react-fontawesome'
import { actionButton } from '../../styles/button'
import colors from '../../styles/colors'

const actions = css`
    position: relative;
    display: flex;
    align-content: center;
`

const action = css`
    ${ actionButton }
    padding: 0.5rem 0.25rem;
`

const actionsInner = css`
    position: absolute;
    top: 1.5rem;
    right: 0;
    background: ${ colors.white };
    box-shadow: 0px 2px 5px 2px ${ colors.gray };
    padding: 0.5rem 1rem;
`

class Actions extends Component {
    constructor() {
        super()

        this.state = {
            shouldShowActions: false
        }
    }

    onActionClick(action) {
        this.setState({
            shouldShowActions: false
        })

        action.action(this.props.id)
    }

    render() {
        return (
            <div className={ actions }>
                <button onClick={ () => this.setState({ shouldShowActions: !this.state.shouldShowActions }) } className={ actionButton }>
                    <FontAwesome name="ellipsis-v" />
                </button>
                {this.state.shouldShowActions &&
                    <div className={ actionsInner }> 
                        {this.props.actions.map(a => (
                            <div key={ `action-${ a.text }` }>
                                <button onClick={ () => this.onActionClick(a) } className={ action }>{ a.text }</button>
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}

export default Actions
