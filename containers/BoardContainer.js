import { createColumn } from '../actions/board'
import { connect } from 'react-redux'
import Board from '../components/Board'

const mapStateToProps = state => ({
    name: state.board.name,
    columns: state.board.columns
})

const mapDispatchToProps = dispatch => ({
    onNewColumn: (value) => {
        dispatch(createColumn(value))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)
