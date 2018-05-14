import React, { Component } from 'react'

class Boards extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.load()
    }

    render() {
        return (
            <div>
                All boards
            </div>
        )
    }
}

export default Boards
