import { createColumn } from '../actions/board'
import { connect } from 'react-redux'
import { getBoard } from '../actions/board'
import Board from '../components/Board'

const mapStateToProps = state => ({
    name: state.board.name,
    columns: state.board.columns,
    isFetching: state.board.isFetchingBoard
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onNewColumn: (value) => {
        dispatch(createColumn(value))
    },
    load: () => {
        dispatch(getBoard(ownProps.match.params.id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)
