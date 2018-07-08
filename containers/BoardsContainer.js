import { connect } from 'react-redux'
import { getBoards, deleteBoard } from 'actions/board'
import Boards from 'components/boards/Boards'

const mapStateToProps = state => ({
    boards: state.board.boards,
    isFetching: state.board.isFetchingBoards
})

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(getBoards()),
    onDelete: (boardId) => dispatch(deleteBoard(boardId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Boards)
