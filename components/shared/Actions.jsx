import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import onClickOutside from "react-onclickoutside";
import FontAwesome from 'react-fontawesome'
import { actionButton } from '../../styles/button'
import colors from '../../styles/colors'

const actions = css`
    position: relative;
    display: flex;
    align-content: center;
    padding: 0 0.25rem;
`

const action = css`
    ${ actionButton }
    padding: 0.5rem 0rem;
`

const actionToggle = css`
    ${ actionButton }
    padding: 0;
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
    state = {
        shouldShowActions: false
    }

    handleClickOutside = () => {
        this.setState({
            shouldShowActions: false
        })
    }

    onActionClick = a => {
        this.setState({
            shouldShowActions: false
        })

        a.action()
    }

    render() {
        return (
            <div className={ actions }>
                <button onClick={ () => this.setState({ shouldShowActions: !this.state.shouldShowActions }) } className={ actionToggle }>
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

Actions.propTypes = {
    actions: PropTypes.array
}

Actions.defaultProps = {
    actions: []
}

export default onClickOutside(Actions)
