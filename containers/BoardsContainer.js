import { connect } from 'react-redux'
import { getBoards, deleteBoard, toggleEditingBoards } from 'actions/board'
import Boards from 'components/boards/Boards'

const mapStateToProps = state => ({
    boards: state.board.boards,
    isFetchingBoards: state.board.isFetchingBoards,
    isEditingBoards: state.board.isEditingBoards
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    load: () => dispatch(getBoards(ownProps.match.params.id)),
    onDelete: id => dispatch(deleteBoard(id)),
    onEditBoards: () => dispatch(toggleEditingBoards())
})

export default connect(mapStateToProps, mapDispatchToProps)(Boards)
