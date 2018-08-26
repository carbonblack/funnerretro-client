import { connect } from 'react-redux'
import { getBoards, deleteBoard, toggleEditingBoards } from 'actions/board'
import Boards from 'components/boards/Boards'
import { updateBoardsSearchDefinition } from 'actions/board'

const mapStateToProps = (state, ownProps) => {
    const groupId = ownProps.match.params.id
    const group = groupId !== '0' ? state.groups.groups.find(g => g.id === groupId) : { name: 'My Boards' }

    return {
        boards: state.board.boards,
        isFetchingBoards: state.board.isFetchingBoards,
        isEditingBoards: state.board.isEditingBoards,
        key: groupId,
        group: group
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    load: (sortKey, sortDirection) => {
        dispatch(updateBoardsSearchDefinition(sortKey, sortDirection, ownProps.match.params.id))
        dispatch(getBoards(sortKey, ownProps.match.params.id))
    },
    onDelete: id => dispatch(deleteBoard(id)),
    onEditBoards: () => dispatch(toggleEditingBoards())
})

export default connect(mapStateToProps, mapDispatchToProps)(Boards)
