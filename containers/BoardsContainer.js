import { createColumn } from '../actions/board'
import { connect } from 'react-redux'
import { getBoards } from '../actions/board'
import Boards from '../components/Boards'

const mapStateToProps = state => ({
    boards: state.board.boards,
    isFetching: state.board.isFetchingBoards
})

const mapDispatchToProps = dispatch => ({
    load: () => {
        dispatch(getBoards())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Boards)
