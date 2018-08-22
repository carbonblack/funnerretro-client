import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import ColumnContainer from 'containers/ColumnContainer'
import ColumnForm from 'components/column/ColumnForm'
import colors from 'styles/colors'

const styles = {
    container: css`
        display: flex;
        flex-wrap: wrap;
        margin: 0 2.1rem 2rem;
    `,
    header: css`
        display: flex;
        width: 100%;
        color: ${ colors.orange };
        margin: 0 0.5rem;

        h1 {
            font-size: 3rem;
        }
    `,
    columnsContainer: css`
        display: flex;
    `
}

class Board extends Component {
    componentDidMount() {
        this.props.load()
    }

    componentWillUnmount() {
        this.props.unload()
    }

    render() {
        const { name, columns, onColumnForm } = this.props

        return (
            <div className={ styles.container }>
                <div className={ styles.header }>
                    <h1>{ name }</h1>
                </div>
                <div className={ styles.columnsContainer }>
                    { columns.map(column => <ColumnContainer key={ `column-${column.id}` } column={ column } />) }
                    <ColumnForm placeholder='Column name' submitLabel='Add' onSubmit={ value => onColumnForm(value) } />
                </div>
            </div>
        )
    }
}

Board.propTypes = {
    load: PropTypes.func.isRequired,
    unload: PropTypes.func.isRequired,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    columns: PropTypes.array,
    onColumnForm: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

Board.defaultProps = {
    name: '',
    columns: []
}

export default Board
