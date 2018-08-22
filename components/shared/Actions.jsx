import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import onClickOutside from 'react-onclickoutside'
import FontAwesome from 'react-fontawesome'
import { actionButton, actionButtonDark } from 'styles/button'
import colors from 'styles/colors'

const actionsContainer = css`
    position: relative;
    display: flex;
    align-content: center;
    padding: 0 0.25rem;
`

const action = css`
    ${ actionButtonDark };
    padding: 0.5rem 0rem;
`

const actionToggle = css`
    ${ actionButton };
    padding: 0;
`

const actionsInner = css`
    position: absolute;
    top: 1.5rem;
    right: 0;
    background: ${ colors.white };
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    padding: 0.5rem 1rem;
`

class Actions extends Component {
    state = {
        shouldShowActions: false
    }

    handleClickOutside = () => this.setState({ shouldShowActions: false })

    onActionClick = a => {
        this.setState({
            shouldShowActions: false
        })
        a.action()
    }

    render() {
        const { actions } = this.props
        const { shouldShowActions } = this.state

        return (
            <div className={ actionsContainer }>
                <button onClick={ () => this.setState({ shouldShowActions: !shouldShowActions }) } className={ actionToggle }>
                    <FontAwesome name="ellipsis-v" />
                </button>
                {shouldShowActions &&
                    <div className={ actionsInner }> 
                        {actions.map(a => (
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

export { Actions }

export default onClickOutside(Actions)
