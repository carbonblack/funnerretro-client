import { createColumn } from 'actions/board'
import { connect } from 'react-redux'
import { getBoard, deleteBoard } from 'actions/board'
import { subscribeToBoard, unsubscribeToBoard } from 'actions/websocket'
import Board from 'components/board/Board'

const mapStateToProps = state => ({
    name: state.board.content.name,
    id: state.board.id,
    columns: state.board.columns,
    isFetching: state.board.isFetchingBoard
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onColumnForm: value => dispatch(createColumn(value)),
    load: () => {
        subscribeToBoard(ownProps.match.params.id)
        dispatch(getBoard(ownProps.match.params.id))
    },
    unload: () => unsubscribeToBoard(ownProps.match.params.id),
    onDelete: boardId => dispatch(deleteBoard(boardId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)
