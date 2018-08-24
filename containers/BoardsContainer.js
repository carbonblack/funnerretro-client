import { connect } from 'react-redux'
import { getBoards, deleteBoard, toggleEditingBoards } from 'actions/board'
import Boards from 'components/boards/Boards'
import { updateBoardsSearchDefinition } from '../actions/board';

const mapStateToProps = (state, ownProps) => ({
    boards: state.board.boards,
    isFetchingBoards: state.board.isFetchingBoards,
    isEditingBoards: state.board.isEditingBoards,
    key: ownProps.match.params.id
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    load: sortKey => {
        dispatch(updateBoardsSearchDefinition(sortKey, 'DESC', ownProps.match.params.id))
        dispatch(getBoards(sortKey, ownProps.match.params.id))
    },
    onDelete: id => dispatch(deleteBoard(id)),
    onEditBoards: () => dispatch(toggleEditingBoards())
})

export default connect(mapStateToProps, mapDispatchToProps)(Boards)
