import { connect } from 'react-redux'
import { getBoards } from 'actions/board'
import Boards from 'components/boards/Boards'

const mapStateToProps = state => ({
    boards: state.board.boards,
    isFetching: state.board.isFetchingBoards
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    load: () => dispatch(getBoards(ownProps.match.params.id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Boards)
