import React, { Component } from 'react'
import { css } from 'react-emotion'
import FontAwesome from 'react-fontawesome'
import { actionButton } from '../../styles/button'
import New from '../shared/New'
import colors from '../../styles/colors'

const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const title = css`
    margin-bottom: 1rem;
`

const actions = css`
    position: relative;
    margin-bottom: 1rem;
`

const actionsInner = css`
    position: absolute;
    top: 1rem;
    right: 0;
    background: ${ colors.white };
    box-shadow: 0px 2px 5px 2px ${ colors.gray };
    padding: 0.5rem 1rem;
`

const action = css`
    ${ actionButton }
    padding: 0.5rem 0.25rem;
`

class ColumnHeader extends Component {
    constructor() {
        super()

        this.state = {
            shouldShowActions: false
        }
    }

    onEdit(id) {
        this.setState({
            shouldShowActions: false
        })

        this.props.onEdit(id)
    }

    onDelete(id) {
        this.setState({
            shouldShowActions: false
        })

        this.props.onDelete(id)
    }

    render() {
        const { name, id, editing, onSave } = this.props

        if(editing) {
            return (
                <div>
                    <New value={ name } onSubmit={ val => onSave(val) } submitLabel="Save" />
                </div>
            )
        }
    
        return (
            <div className={ header }>
                <h3 className={ title }>{ name }</h3>
                <div className={ actions }>
                    <button onClick={ () => this.setState({ shouldShowActions: !this.state.shouldShowActions }) } className={ actionButton }>
                        <FontAwesome name="ellipsis-v" />
                    </button>
                    {this.state.shouldShowActions && 
                        <div className={ actionsInner }>
                            <button onClick={ () => this.onEdit(id) } className={ action }>Edit</button>
                            <button onClick={ () => this.onDelete(id) } className={ action }>Delete</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default ColumnHeader
