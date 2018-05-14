import React, { Component } from 'react'

class New extends Component {
    constructor() {
        super()
        this.state = {
            value: ''
        }
    }

    onChange(value) {
        this.setState({
            value: value
        })
    }

    onSubmit(e) {
        e.stopPropagation()
        e.preventDefault()
        this.props.onSubmit(this.state.value)
    }

    render() {
        const { placeholder } = this.props

        return (
            <div>
                <form onSubmit={ () => false }>
                    <input placeholder={ placeholder } onChange={ e => this.onChange(e.target.value) } />
                    <button onClick={ e => this.onSubmit(e) }>Create</button>
                </form>
            </div>
        )
    }
}

export default New
